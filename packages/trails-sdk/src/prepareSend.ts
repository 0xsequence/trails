import type {
  GetIntentCallsPayloadsArgs,
  IntentPrecondition,
  SequenceAPIClient,
} from "@0xsequence/trails-api"
import type { MetaTxnReceipt } from "@0xsequence/trails-relayer"
import type { Relayer } from "@0xsequence/wallet-core"
import type { Payload } from "@0xsequence/wallet-primitives"
import { useQuery } from "@tanstack/react-query"
import type {
  Account,
  Chain,
  PublicClient,
  TransactionReceipt,
  WalletClient,
} from "viem"
import {
  createPublicClient,
  createWalletClient,
  decodeFunctionData,
  erc20Abi,
  formatUnits,
  http,
  parseUnits,
  zeroAddress,
} from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { useAPIClient } from "./apiClient.js"
import {
  cctpTransfer,
  getIsUsdcAddress,
  getMessageTransmitter,
  getMintUSDCData,
} from "./cctp.js"
import { attemptSwitchChain } from "./chainSwitch.js"
import { getChainInfo, getTestnetChainInfo } from "./chains.js"
import { intentEntrypoints, DEFAULT_USE_V3_RELAYERS } from "./constants.js"
import { getERC20TransferData } from "./encoders.js"
import { getExplorerUrl } from "./explorer.js"
import {
  getDepositToIntentCalls,
  getPermitCalls,
  getPermitSignature,
} from "./gasless.js"
import { useIndexerGatewayClient } from "./indexerClient.js"
import type { QuoteProvider } from "./intents.js"
import {
  calculateIntentAddress,
  commitIntentConfig,
  getIntentCallsPayloads as getIntentCallsPayloadsFromIntents,
  sendOriginTransaction,
} from "./intents.js"
import type { MetaTxn } from "./metaTxnMonitor.js"
import { getMetaTxStatus } from "./metaTxnMonitor.js"
import { relayerSendMetaTx } from "./metaTxns.js"
import {
  getDelegatorSmartAccount,
  getPaymasterGaslessTransaction,
  sendPaymasterGaslessTransaction,
} from "./paymasterSend.js"
import { findFirstPreconditionForChainId } from "./preconditions.js"
import { useTokenPrice } from "./prices.js"
import { getQueryParam } from "./queryParams.js"
import type { RelayerEnvConfig } from "./relayer.js"
import { useRelayers } from "./relayer.js"
import {
  executeSimpleRelayTransaction,
  getRelaySDKQuote,
  getTxHashFromRelayResult,
} from "./relaySdk.js"
import {
  getFeeOptions,
  sequenceSendTransaction,
  simpleCreateSequenceWallet,
} from "./sequenceWallet.js"
import { useAccountTokenBalance } from "./tokenBalances.js"
import { useSupportedTokens } from "./tokens.js"
import { requestWithTimeout } from "./utils.js"

type TransactionStateStatus = "pending" | "failed" | "confirmed"

export type TransactionState = {
  transactionHash: string
  explorerUrl: string
  chainId: number
  state: TransactionStateStatus
  label: string
}

export type SendOptions = {
  account: Account
  originTokenAddress: string
  originChainId: number
  originTokenAmount: string
  destinationChainId: number
  recipient: string
  destinationTokenAddress: string
  destinationTokenAmount: string
  destinationTokenSymbol: string
  sequenceProjectAccessKey: string
  fee: string
  client?: WalletClient
  dryMode: boolean
  apiClient: SequenceAPIClient
  originRelayer: Relayer.Standard.Rpc.RpcRelayer
  destinationRelayer: Relayer.Standard.Rpc.RpcRelayer
  destinationCalldata?: string
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  sourceTokenPriceUsd?: number | null
  destinationTokenPriceUsd?: number | null
  sourceTokenDecimals: number
  destinationTokenDecimals: number
  paymasterUrl?: string
  gasless?: boolean
  relayerConfig: RelayerEnvConfig
}

export type PrepareSendReturn = {
  intentAddress?: string
  originSendAmount: string
  send: (onOriginSend?: () => void) => Promise<SendReturn>
}

export type SendReturn = {
  originUserTxReceipt: TransactionReceipt | null
  originMetaTxnReceipt: MetaTxnReceipt | null
  destinationMetaTxnReceipt: MetaTxnReceipt | null
}

export function getIsToSameChain(
  originChainId: number,
  destinationChainId: number,
): boolean {
  return originChainId?.toString() === destinationChainId?.toString()
}

export function getIsToSameToken(
  originTokenAddress: string,
  destinationTokenAddress: string,
): boolean {
  return (
    originTokenAddress?.toLowerCase() === destinationTokenAddress?.toLowerCase()
  )
}

export function getIsToSameChainAndToken(
  originChainId: number,
  originTokenAddress: string,
  destinationChainId: number,
  destinationTokenAddress: string,
): boolean {
  return (
    getIsToSameChain(originChainId, destinationChainId) &&
    getIsToSameToken(originTokenAddress, destinationTokenAddress)
  )
}

export function getUseCctp(
  originTokenAddress: string,
  destinationTokenAddress: string,
  originChainId: number,
  destinationChainId: number,
) {
  return (
    getIsUsdcAddress(originTokenAddress, originChainId) &&
    getIsUsdcAddress(destinationTokenAddress, destinationChainId)
  )
}

function isTestnetDebugMode(): boolean {
  return getQueryParam("testnet") === "true"
}

function getTestnetOriginTokenAddress(): string {
  return "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
}

function getIntentArgs(
  mainSignerAddress: string,
  originChainId: number,
  originTokenAddress: string,
  originTokenAmount: string,
  destinationChainId: number,
  destinationTokenAddress: string,
  destinationTokenAmount: string,
  destinationTokenSymbol: string,
  recipient: string,
  destinationCalldata?: string,
): GetIntentCallsPayloadsArgs {
  const _destinationCalldata =
    destinationCalldata ||
    (destinationTokenAddress === zeroAddress
      ? "0x"
      : getERC20TransferData({
          recipient,
          amount: BigInt(destinationTokenAmount),
        }))
  const _destinationToAddress = destinationCalldata
    ? recipient
    : destinationTokenAddress === zeroAddress
      ? recipient
      : destinationTokenAddress
  const _destinationCallValue =
    destinationTokenAddress === zeroAddress ? destinationTokenAmount : "0"

  const intentArgs = {
    userAddress: mainSignerAddress,
    originChainId,
    originTokenAddress,
    originTokenAmount:
      originTokenAddress === destinationTokenAddress
        ? destinationTokenAmount
        : originTokenAmount, // max amount
    destinationChainId,
    destinationToAddress: _destinationToAddress,
    destinationTokenAddress: destinationTokenAddress,
    destinationTokenAmount: destinationTokenAmount,
    destinationTokenSymbol: destinationTokenSymbol,
    destinationCallData: _destinationCalldata,
    destinationCallValue: _destinationCallValue,
  }

  return intentArgs
}

export async function prepareSend(
  options: SendOptions,
): Promise<PrepareSendReturn> {
  const {
    account,
    originTokenAddress,
    originChainId,
    originTokenAmount, // account balance
    destinationChainId,
    recipient,
    destinationTokenAddress,
    destinationTokenAmount,
    destinationTokenSymbol,
    fee,
    client: walletClient,
    dryMode = false,
    apiClient,
    originRelayer,
    destinationRelayer,
    destinationCalldata,
    onTransactionStateChange,
    sourceTokenPriceUsd,
    destinationTokenPriceUsd,
    sourceTokenDecimals,
    destinationTokenDecimals,
    paymasterUrl,
    gasless = false,
    relayerConfig,
    sequenceProjectAccessKey,
  } = options

  if (!walletClient) {
    throw new Error("Wallet client not provided")
  }

  const chain = getChainInfo(originChainId)
  if (!chain) {
    throw new Error(`Chain ${originChainId} not found`)
  }
  const isToSameChain = getIsToSameChain(originChainId, destinationChainId)
  const isToSameToken = getIsToSameToken(
    originTokenAddress,
    destinationTokenAddress,
  )

  console.log("[trails-sdk] isToSameChain", isToSameChain)
  console.log("[trails-sdk] isToSameToken", isToSameToken)

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  const mainSignerAddress = account.address
  const transactionStates: TransactionState[] = []

  // origin tx
  transactionStates.push({
    transactionHash: "",
    explorerUrl: "",
    chainId: originChainId,
    state: "pending",
    label:
      isToSameChain && isToSameToken
        ? "Execute"
        : isToSameChain && !isToSameToken
          ? "Swap"
          : "Transfer",
  })

  if (!isToSameChain) {
    // swap + bridge tx
    transactionStates.push({
      transactionHash: "",
      explorerUrl: "",
      chainId: originChainId,
      state: "pending",
      label: isToSameToken ? "Bridge" : "Swap & Bridge",
    })

    // destination tx
    transactionStates.push({
      transactionHash: "",
      explorerUrl: "",
      chainId: destinationChainId,
      state: "pending",
      label: "Execute",
    })
  }

  if (isToSameChain && !isToSameToken) {
    return await sendHandlerForSameChainDifferentToken({
      originTokenAddress,
      destinationTokenAmount,
      destinationTokenAddress,
      destinationCalldata,
      recipient,
      originChainId,
      walletClient,
      publicClient,
      account,
    })
  }

  if (isToSameToken && isToSameChain) {
    return await sendHandlerForSameChainSameToken({
      originTokenAddress,
      destinationTokenAmount,
      destinationCalldata,
      recipient,
      originChainId,
      walletClient,
      publicClient,
      onTransactionStateChange,
      dryMode,
      account,
      chain,
    })
  }

  return await sendHandlerForDifferentChainDifferentToken({
    mainSignerAddress,
    originChainId,
    originTokenAddress,
    originTokenAmount,
    destinationChainId,
    destinationTokenAddress,
    destinationTokenAmount,
    destinationTokenSymbol,
    recipient,
    destinationCalldata,
    apiClient,
    sourceTokenPriceUsd,
    destinationTokenPriceUsd,
    sourceTokenDecimals,
    destinationTokenDecimals,
    gasless,
    paymasterUrl,
    originRelayer,
    destinationRelayer,
    sequenceProjectAccessKey,
    relayerConfig,
    walletClient,
    publicClient,
    chain,
    account,
    fee,
    dryMode,
    onTransactionStateChange,
    transactionStates,
  })
}

async function sendHandlerForDifferentChainDifferentToken({
  mainSignerAddress,
  originChainId,
  originTokenAddress,
  originTokenAmount,
  destinationChainId,
  destinationTokenAddress,
  destinationTokenAmount,
  destinationTokenSymbol,
  recipient,
  destinationCalldata,
  apiClient,
  sourceTokenPriceUsd,
  destinationTokenPriceUsd,
  sourceTokenDecimals,
  destinationTokenDecimals,
  gasless,
  paymasterUrl,
  originRelayer,
  destinationRelayer,
  sequenceProjectAccessKey,
  relayerConfig,
  walletClient,
  publicClient,
  chain,
  account,
  fee,
  dryMode,
  onTransactionStateChange,
  transactionStates,
}: {
  mainSignerAddress: string
  originChainId: number
  originTokenAddress: string
  originTokenAmount: string
  destinationChainId: number
  destinationTokenAddress: string
  destinationTokenAmount: string
  destinationTokenSymbol: string
  recipient: string
  destinationCalldata?: string
  apiClient: SequenceAPIClient
  sourceTokenPriceUsd?: number | null
  destinationTokenPriceUsd?: number | null
  sourceTokenDecimals: number
  destinationTokenDecimals: number
  gasless: boolean
  paymasterUrl?: string
  originRelayer: Relayer.Standard.Rpc.RpcRelayer
  destinationRelayer: Relayer.Standard.Rpc.RpcRelayer
  sequenceProjectAccessKey: string
  relayerConfig: RelayerEnvConfig
  walletClient: WalletClient
  publicClient: PublicClient
  chain: Chain
  account: Account
  fee: string
  dryMode: boolean
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  transactionStates: TransactionState[]
}): Promise<PrepareSendReturn> {
  const testnet = isTestnetDebugMode()
  const useCctp = getUseCctp(
    originTokenAddress,
    destinationTokenAddress,
    originChainId,
    destinationChainId,
  )
  if (useCctp && testnet) {
    const amount = destinationTokenAmount

    return {
      intentAddress: "",
      originSendAmount: amount,
      send: async (onOriginSend?: () => void): Promise<SendReturn> => {
        const originChain = testnet ? getTestnetChainInfo(chain)! : chain
        const destinationChain = testnet
          ? getTestnetChainInfo(destinationChainId)!
          : getChainInfo(destinationChainId)

        if (!originChain || !destinationChain) {
          throw new Error("Invalid chain")
        }

        console.log("[trails-sdk] originChain", originChain)
        console.log("[trails-sdk] destinationChain", destinationChain)

        const originPublicClient = createPublicClient({
          chain: originChain,
          transport: http(),
        })

        const { txHash, attestation } = await cctpTransfer({
          walletClient,
          originChain,
          destinationChain,
          amount: BigInt(destinationTokenAmount),
        })

        if (!attestation) {
          throw new Error("Failed to retrieve attestation")
        }

        if (onOriginSend) {
          onOriginSend()
        }

        console.log("[trails-sdk] waiting for tx", txHash)

        const receipt = await originPublicClient.waitForTransactionReceipt({
          hash: txHash,
        })

        console.log("[trails-sdk] tx receipt", receipt)

        transactionStates[0] = getTransactionStateFromReceipt(
          receipt,
          originChain.id,
          "Transfer",
        )
        transactionStates[1] = getTransactionStateFromReceipt(
          receipt,
          originChain.id,
          "Bridge",
        )

        onTransactionStateChange(transactionStates)

        const tokenMessenger = getMessageTransmitter(destinationChain.id)!

        console.log("[trails-sdk] tokenMessenger", tokenMessenger)
        const calls = [
          await getMintUSDCData({
            tokenMessenger,
            attestation,
          }),
        ]

        console.log("[trails-sdk] calls", calls)
        const delegatorPrivateKey = generatePrivateKey()
        const delegatorAccount = privateKeyToAccount(delegatorPrivateKey)
        const delegatorClient = createWalletClient({
          account: delegatorAccount,
          chain: destinationChain,
          transport: http(),
        })
        const destinationPublicClient = createPublicClient({
          chain: destinationChain,
          transport: http(),
        })
        console.log("[trails-sdk] delegatorClient", delegatorClient)

        const sequenceWalletAddress = await simpleCreateSequenceWallet(
          delegatorAccount as any,
          relayerConfig,
          sequenceProjectAccessKey,
        )
        console.log("[trails-sdk] sequenceWalletAddress", sequenceWalletAddress)
        const sequenceTxHash = await sequenceSendTransaction(
          sequenceWalletAddress,
          delegatorClient,
          destinationPublicClient,
          calls,
          destinationChain,
          relayerConfig,
          sequenceProjectAccessKey,
        )

        const destinationReceipt =
          await destinationPublicClient.waitForTransactionReceipt({
            hash: sequenceTxHash as `0x${string}`,
          })

        console.log("[trails-sdk] destinationReceipt", destinationReceipt)

        transactionStates[2] = getTransactionStateFromReceipt(
          destinationReceipt,
          destinationChain.id,
          "Receive",
        )
        onTransactionStateChange(transactionStates)

        return {
          originUserTxReceipt: receipt,
          originMetaTxnReceipt: null,
          destinationMetaTxnReceipt: null,
        }
      },
    }
  }

  const intentArgs = getIntentArgs(
    mainSignerAddress,
    originChainId,
    originTokenAddress,
    originTokenAmount,
    destinationChainId,
    destinationTokenAddress,
    destinationTokenAmount,
    destinationTokenSymbol,
    recipient,
    destinationCalldata,
  )
  console.log("[trails-sdk] Creating intent with args:", intentArgs)
  const intent = await getIntentCallsPayloadsFromIntents(apiClient, intentArgs)
  console.log("[trails-sdk] Got intent:", intent)

  if (!intent) {
    throw new Error("Invalid intent")
  }

  if (
    !intent.preconditions?.length ||
    !intent.calls?.length ||
    !intent.trailsInfos?.length
  ) {
    throw new Error("Invalid intent")
  }

  const intentAddress = calculateIntentAddress(
    mainSignerAddress,
    intent.calls,
    intent.trailsInfos,
    intent.trailsFee?.quoteProvider as QuoteProvider,
  )
  console.log(
    "[trails-sdk] Calculated intent address:",
    intentAddress.toString(),
  )

  await commitIntentConfig(
    apiClient,
    mainSignerAddress,
    intent.calls,
    intent.preconditions,
    intent.trailsInfos,
    intent.trailsFee?.quoteProvider as QuoteProvider,
  )

  console.log("[trails-sdk] Committed intent config")

  const firstPrecondition = findFirstPreconditionForChainId(
    intent.preconditions,
    originChainId,
  )

  if (!firstPrecondition) {
    throw new Error("No precondition found for origin chain")
  }

  const firstPreconditionMin = firstPrecondition?.data?.min?.toString()
  const depositAmount = firstPreconditionMin

  const hasEnoughBalance = await checkAccountBalance({
    account,
    tokenAddress: originTokenAddress,
    depositAmount,
    publicClient,
  })

  if (!hasEnoughBalance) {
    throw new Error("Account does not have enough balance for deposit")
  }

  return {
    intentAddress,
    originSendAmount: depositAmount,
    send: async (onOriginSend?: () => void): Promise<SendReturn> => {
      console.log("[trails-sdk] sending origin transaction")

      const needsNativeFee = getNeedsLifiNativeFee({
        originTokenAddress,
        destinationTokenAmount,
        destinationTokenDecimals,
        sourceTokenDecimals,
        sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
        destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
        depositAmount,
      })

      console.log("[trails-sdk] needsNativeFee", needsNativeFee)
      console.log("[trails-sdk] sourceTokenPriceUsd", sourceTokenPriceUsd)
      console.log(
        "[trails-sdk] destinationTokenPriceUsd",
        destinationTokenPriceUsd,
      )
      console.log("[trails-sdk] sourceTokenDecimals", sourceTokenDecimals)
      console.log(
        "[trails-sdk] destinationTokenDecimals",
        destinationTokenDecimals,
      )

      // const originCallParams = {
      //   to:
      //     originTokenAddress === zeroAddress
      //       ? firstPreconditionAddress
      //       : originTokenAddress,
      //   data:
      //     originTokenAddress === zeroAddress
      //       ? "0x"
      //       : getERC20TransferData({
      //           recipient: firstPreconditionAddress,
      //           amount: BigInt(firstPreconditionMin) + BigInt(fee),
      //         }),
      //   value:
      //     originTokenAddress === zeroAddress
      //       ? BigInt(firstPreconditionMin) + BigInt(fee)
      //       : "0",
      //   chainId: originChainId,
      //   chain,
      // }

      let originUserTxReceipt: TransactionReceipt | null = null
      let originMetaTxnReceipt: MetaTxnReceipt | null = null
      let destinationMetaTxnReceipt: MetaTxnReceipt | null = null

      const testnet = isTestnetDebugMode()
      const testnetOriginTokenAddress = getTestnetOriginTokenAddress()
      const chainToUse = testnet ? getTestnetChainInfo(chain)! : chain

      console.log("[trails-sdk] testnet", testnet)

      originUserTxReceipt = await attemptUserDepositTx({
        originTokenAddress: testnet
          ? testnetOriginTokenAddress
          : originTokenAddress,
        gasless,
        paymasterUrl,
        chain: chainToUse,
        account,
        relayerConfig,
        sequenceProjectAccessKey,
        originRelayer,
        firstPreconditionMin,
        intentAddress,
        onOriginSend,
        publicClient,
        walletClient,
        destinationTokenDecimals,
        sourceTokenDecimals,
        fee,
        dryMode,
        sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
        destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
        destinationTokenAmount,
      })

      if (!originUserTxReceipt) {
        throw new Error("Failed to send origin transaction")
      }

      transactionStates[0] = getTransactionStateFromReceipt(
        originUserTxReceipt,
        originChainId,
        "Transfer",
      )
      onTransactionStateChange(transactionStates)

      if (intent.metaTxns[0] && intent.preconditions[0]) {
        originMetaTxnReceipt = await sendMetaTxAndWaitForReceipt({
          metaTx: intent.metaTxns[0] as MetaTxn,
          relayer: originRelayer,
          precondition: intent.preconditions[0] as IntentPrecondition,
        })

        if (originMetaTxnReceipt) {
          transactionStates[1] = getTransactionStateFromReceipt(
            originMetaTxnReceipt,
            originChainId,
            "Swap & Bridge",
          )
          onTransactionStateChange(transactionStates)
        }
      }

      if (intent.metaTxns[1] && intent.preconditions[1]) {
        destinationMetaTxnReceipt = await sendMetaTxAndWaitForReceipt({
          metaTx: intent.metaTxns[1] as MetaTxn,
          relayer: destinationRelayer,
          precondition: intent.preconditions[1] as IntentPrecondition,
        })

        if (destinationMetaTxnReceipt) {
          transactionStates[2] = getTransactionStateFromReceipt(
            destinationMetaTxnReceipt,
            destinationChainId,
            "Execute",
          )
          onTransactionStateChange(transactionStates)
        }
      }

      return {
        originUserTxReceipt,
        originMetaTxnReceipt,
        destinationMetaTxnReceipt,
      }
    },
  }
}

async function sendHandlerForSameChainSameToken({
  originTokenAddress,
  destinationTokenAmount,
  destinationCalldata,
  recipient,
  originChainId,
  walletClient,
  publicClient,
  onTransactionStateChange,
  dryMode,
  account,
  chain,
}: {
  originTokenAddress: string
  destinationTokenAmount: string
  destinationCalldata?: string
  recipient: string
  originChainId: number
  walletClient: WalletClient
  publicClient: PublicClient
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  dryMode: boolean
  account: Account
  chain: Chain
}): Promise<PrepareSendReturn> {
  console.log("[trails-sdk] isToSameToken && isToSameChain")

  const hasEnoughBalance = await checkAccountBalance({
    account,
    tokenAddress: originTokenAddress,
    depositAmount: destinationTokenAmount,
    publicClient,
  })

  if (!hasEnoughBalance) {
    throw new Error("Account does not have enough balance for deposit")
  }

  return {
    originSendAmount: destinationTokenAmount,
    send: async (onOriginSend?: () => void): Promise<SendReturn> => {
      const originCallParams = {
        to: destinationCalldata
          ? recipient
          : originTokenAddress === zeroAddress
            ? recipient
            : originTokenAddress,
        data:
          destinationCalldata ||
          (originTokenAddress === zeroAddress
            ? "0x"
            : getERC20TransferData({
                recipient,
                amount: BigInt(destinationTokenAmount),
              })),
        value:
          originTokenAddress === zeroAddress
            ? BigInt(destinationTokenAmount)
            : "0",
        chainId: originChainId,
        chain,
      }

      console.log("[trails-sdk] origin call params", originCallParams)

      let originUserTxReceipt: TransactionReceipt | null = null
      const originMetaTxnReceipt: MetaTxnReceipt | null = null
      const destinationMetaTxnReceipt: MetaTxnReceipt | null = null

      await attemptSwitchChain({
        walletClient,
        desiredChainId: originChainId,
      })
      if (!dryMode) {
        onTransactionStateChange([
          {
            transactionHash: "",
            explorerUrl: "",
            chainId: originChainId,
            state: "pending",
            label: "Execute",
          },
        ])
        console.log("[trails-sdk] origin call params", originCallParams)
        const txHash = await sendOriginTransaction(
          account,
          walletClient,
          originCallParams as any,
        ) // TODO: Add proper type

        console.log("[trails-sdk] origin tx", txHash)

        if (onOriginSend) {
          onOriginSend()
        }

        // Wait for transaction receipt
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
        console.log("[trails-sdk] receipt", receipt)
        originUserTxReceipt = receipt

        onTransactionStateChange([
          getTransactionStateFromReceipt(
            originUserTxReceipt,
            originChainId,
            "Swap",
          ),
        ])
      }

      return {
        originUserTxReceipt,
        originMetaTxnReceipt,
        destinationMetaTxnReceipt,
      }
    },
  }
}

async function sendHandlerForSameChainDifferentToken({
  originTokenAddress,
  destinationTokenAmount,
  destinationTokenAddress,
  destinationCalldata,
  recipient,
  originChainId,
  walletClient,
  publicClient,
  account,
}: {
  originTokenAddress: string
  destinationTokenAmount: string
  destinationTokenAddress: string
  destinationCalldata?: string
  recipient: string
  originChainId: number
  walletClient: WalletClient
  publicClient: PublicClient
  account: Account
}): Promise<PrepareSendReturn> {
  const destinationTxs = []
  if (destinationCalldata) {
    destinationTxs.push({
      to: recipient,
      value:
        destinationTokenAddress === zeroAddress ? destinationTokenAmount : "0",
      data: destinationCalldata,
    })
  }

  const quote = await getRelaySDKQuote({
    wallet: walletClient,
    chainId: originChainId,
    amount: destinationTokenAmount,
    currency: originTokenAddress,
    toCurrency: destinationTokenAddress,
    txs: destinationTxs,
  })

  console.log("[trails-sdk] relaysdk quote", quote)
  let depositAmount = "0"

  try {
    depositAmount = quote.steps?.[0]?.items?.[0]?.data?.value
    if (originTokenAddress !== zeroAddress) {
      const decoded = decodeFunctionData({
        abi: erc20Abi,
        data: quote.steps?.[0]?.items?.[0]?.data?.data,
      })
      if (decoded.functionName === "approve") {
        depositAmount = decoded.args[1].toString()
      }
      if (decoded.functionName === "transfer") {
        depositAmount = decoded.args[1].toString()
      }
    }
  } catch (error) {
    console.error("[trails-sdk] Error decoding function data:", error)
  }

  const hasEnoughBalance = await checkAccountBalance({
    account,
    tokenAddress: originTokenAddress,
    depositAmount,
    publicClient,
  })

  if (!hasEnoughBalance) {
    throw new Error("Account does not have enough balance for deposit")
  }

  return {
    originSendAmount: depositAmount,
    send: async (onOriginSend?: () => void): Promise<SendReturn> => {
      await attemptSwitchChain({
        walletClient,
        desiredChainId: originChainId,
      })

      const result = await executeSimpleRelayTransaction(quote, walletClient)
      console.log("[trails-sdk] relaysdk result", result)

      const txHash = getTxHashFromRelayResult(result)

      if (onOriginSend) {
        onOriginSend()
      }

      const originUserTxReceipt = await publicClient.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
      })

      return {
        originUserTxReceipt: originUserTxReceipt,
        originMetaTxnReceipt: null,
        destinationMetaTxnReceipt: null,
      }
    },
  }
}

async function attemptGaslessDeposit({
  paymasterUrl,
  depositTokenAddress,
  depositTokenAmount,
  depositRecipient,
  onOriginSend,
  walletClient,
  chain,
  account,
  relayerConfig,
  sequenceProjectAccessKey,
  originRelayer,
}: {
  paymasterUrl?: string
  depositTokenAddress: string
  depositTokenAmount: string
  depositRecipient: string
  onOriginSend?: () => void
  walletClient: WalletClient
  chain: Chain
  account: Account
  relayerConfig: RelayerEnvConfig
  sequenceProjectAccessKey: string
  originRelayer: Relayer.Standard.Rpc.RpcRelayer
}): Promise<TransactionReceipt | null> {
  let originUserTxReceipt: TransactionReceipt | null = null
  const originChainId = chain.id
  console.log("[trails-sdk] originChainId", originChainId)

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  const intentEntrypoint = intentEntrypoints[chain.id]
  console.log("[trails-sdk] intentEntrypoint", intentEntrypoint)

  let calls: Array<{
    to: string
    data: string
    value: string
  }> = []

  if (paymasterUrl) {
    console.log("[trails-sdk] doing gasless with paymaster")
    const delegatorSmartAccount = await getDelegatorSmartAccount({
      publicClient,
    })

    if (intentEntrypoint) {
      calls = await getDepositToIntentCalls({
        publicClient,
        walletClient,
        account,
        intentEntrypoint,
        depositTokenAddress: depositTokenAddress as `0x${string}`,
        depositTokenAmount: BigInt(depositTokenAmount),
        depositRecipient: depositRecipient as `0x${string}`,
        chain,
      })
    } else {
      calls = await getPaymasterGaslessTransaction({
        walletClient,
        chain,
        tokenAddress: depositTokenAddress as `0x${string}`,
        amount: BigInt(depositTokenAmount),
        recipient: depositRecipient as `0x${string}`,
        delegatorSmartAccount,
      })
    }

    console.log("[trails-sdk] calls", calls)

    const txHash = await sendPaymasterGaslessTransaction({
      walletClient,
      publicClient,
      chain,
      paymasterUrl,
      delegatorSmartAccount,
      calls,
    })

    if (onOriginSend) {
      onOriginSend()
    }

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    })
    console.log("[trails-sdk] receipt", receipt)
    originUserTxReceipt = receipt
  } else {
    console.log("[trails-sdk] doing gasless with sequence wallet")
    const delegatorPrivateKey = generatePrivateKey()
    const delegatorAccount = privateKeyToAccount(delegatorPrivateKey)
    const delegatorClient = createWalletClient({
      account: delegatorAccount,
      chain,
      transport: http(),
    })

    console.log("[trails-sdk] attempting to switch chain")
    await attemptSwitchChain({
      walletClient,
      desiredChainId: originChainId,
    })

    console.log("[trails-sdk] creating sequence wallet")
    const sequenceWalletAddress = await simpleCreateSequenceWallet(
      delegatorAccount as any,
      relayerConfig,
      sequenceProjectAccessKey,
    )
    console.log("[trails-sdk] sequenceWalletAddress", sequenceWalletAddress)

    if (intentEntrypoint) {
      calls = await getDepositToIntentCalls({
        publicClient,
        walletClient,
        account,
        intentEntrypoint,
        depositTokenAddress: depositTokenAddress as `0x${string}`,
        depositTokenAmount: BigInt(depositTokenAmount),
        depositRecipient: depositRecipient as `0x${string}`,
        chain,
      })
    } else {
      const { signature, deadline } = await getPermitSignature({
        publicClient,
        walletClient,
        signer: account.address,
        spender: sequenceWalletAddress,
        tokenAddress: depositTokenAddress as `0x${string}`,
        amount: BigInt(depositTokenAmount),
        chain,
      })

      calls = getPermitCalls(
        account.address,
        sequenceWalletAddress,
        BigInt(depositTokenAmount),
        deadline,
        signature,
        depositRecipient as `0x${string}`,
        depositTokenAddress as `0x${string}`,
      )
    }

    console.log("[trails-sdk] calls", calls)

    const feeOptions = await getFeeOptions(
      originRelayer,
      sequenceWalletAddress,
      originChainId,
      calls.map((call) => ({
        to: call.to,
        value: BigInt(call.value),
        data: call.data,
        gasLimit: BigInt(0),
        delegateCall: false,
        onlyFallback: false,
        behaviorOnError: "revert",
      })) as Payload.Call[],
    )

    console.log("[trails-sdk] feeOptions", feeOptions)

    const sequenceTxHash = await sequenceSendTransaction(
      sequenceWalletAddress,
      delegatorClient,
      publicClient,
      calls,
      chain,
      relayerConfig,
      sequenceProjectAccessKey,
    )
    console.log("[trails-sdk] sequenceTxHash", sequenceTxHash)
    if (onOriginSend) {
      onOriginSend()
    }

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: sequenceTxHash as `0x${string}`,
    })
    console.log("[trails-sdk] receipt", receipt)
    originUserTxReceipt = receipt
  }

  return originUserTxReceipt
}

export async function attemptNonGaslessUserDeposit({
  originTokenAddress,
  firstPreconditionMin,
  onOriginSend,
  publicClient,
  walletClient,
  originChainId,
  chain,
  account,
  fee,
  dryMode,
  sourceTokenPriceUsd,
  destinationTokenPriceUsd,
  destinationTokenAmount,
  destinationTokenDecimals,
  sourceTokenDecimals,
  intentAddress,
}: {
  originTokenAddress: string
  firstPreconditionMin: string
  onOriginSend?: () => void
  publicClient: PublicClient
  walletClient: WalletClient
  originChainId: number
  chain: Chain
  account: Account
  fee: string
  dryMode: boolean
  sourceTokenPriceUsd?: number | null
  destinationTokenPriceUsd?: number | null
  destinationTokenAmount: string
  destinationTokenDecimals: number
  sourceTokenDecimals: number
  intentAddress: string
}): Promise<TransactionReceipt | null> {
  let originUserTxReceipt: TransactionReceipt | null = null

  const needsNativeFee = await getNeedsLifiNativeFee({
    originTokenAddress,
    destinationTokenAmount,
    destinationTokenDecimals,
    sourceTokenDecimals,
    sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
    destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
    depositAmount: firstPreconditionMin,
  })
  let nativeFee = parseUnits("0.00005", 18).toString()
  if (originChainId === 137) {
    nativeFee = parseUnits("1.5", 18).toString()
  }

  console.log("[trails-sdk] needsNativeFee", needsNativeFee)

  const originCallParams = {
    to: originTokenAddress === zeroAddress ? intentAddress : originTokenAddress,
    data:
      originTokenAddress === zeroAddress
        ? "0x"
        : getERC20TransferData({
            recipient: intentAddress,
            amount: BigInt(firstPreconditionMin) + BigInt(fee),
          }),
    value:
      originTokenAddress === zeroAddress
        ? BigInt(firstPreconditionMin) + BigInt(fee)
        : "0",
    chainId: originChainId,
    chain,
  }

  await attemptSwitchChain({
    walletClient,
    desiredChainId: originChainId,
  })

  let useSendCalls = false
  const moreThan1Tx = needsNativeFee

  if (moreThan1Tx) {
    try {
      // the reason for the timeout is some users experience this call to hang indefinitely on metamask on all chains.
      // not sure why this is happening, but it happens.
      const capabilities = await requestWithTimeout<Record<string, any>>(
        walletClient,
        [
          {
            method: "wallet_getCapabilities",
            params: [account.address],
          },
        ],
        10000,
      )

      console.log("[trails-sdk] capabilities", capabilities)

      // Check if the chain supports atomic transactions
      const chainHex = `0x${originChainId.toString(16)}` as const
      const chainCapabilities = capabilities[chainHex]
      useSendCalls = chainCapabilities?.atomic?.status === "supported"
    } catch (error) {
      console.error("[trails-sdk] Error getting capabilities", error)
    }
  }

  if (dryMode) {
    console.log("[trails-sdk] dry mode, skipping send calls")
  }

  if (useSendCalls) {
    console.log("[trails-sdk] using sendCalls")
  } else {
    console.log("[trails-sdk] using sendTransaction")
  }

  if (useSendCalls) {
    if (!dryMode) {
      const calls: Array<{
        to: `0x${string}`
        data: `0x${string}`
        value?: `0x${string}`
      }> = []
      if (needsNativeFee) {
        calls.push({
          to: intentAddress as `0x${string}`,
          data: "0x00",
          value: `0x${BigInt(nativeFee).toString(16)}` as `0x${string}`,
        })
      }

      // Add the origin call
      calls.push({
        to: originCallParams.to as `0x${string}`,
        data: originCallParams.data as `0x${string}`,
        value: originCallParams.value
          ? `0x${BigInt(originCallParams.value).toString(16)}`
          : "0x0",
      })

      // Send the batched call via EIP-7702
      const result = (await walletClient.request({
        method: "wallet_sendCalls",
        params: [
          {
            version: "2.0.0",
            chainId: `0x${originChainId.toString(16)}`,
            atomicRequired: true,
            calls,
          },
        ],
      })) as { requestId: `0x${string}` }

      console.log("[trails-sdk] sendCalls result", result)
      const requestId = result.requestId || (result as any).id

      // Poll to check if the tx has been submitted
      let txHash: `0x${string}` | undefined
      while (!txHash) {
        const status = (await walletClient.request({
          method: "wallet_getCallsStatus",
          params: [requestId],
        })) as {
          status: "pending" | "submitted" | "failed"
          transactionHash?: `0x${string}`
          error?: string
        }

        console.log("[trails-sdk] getCallsStatus result", status)
        const receipt = (status as any)?.receipts?.[0]

        if ((status as any).status === 200 && receipt?.transactionHash) {
          txHash = receipt.transactionHash
          break
        } else if ((status as any).status === 500) {
          throw new Error(`Transaction failed: ${status.error}`)
        }

        // wait a bit before polling again
        await new Promise((r) => setTimeout(r, 2000))
      }

      if (onOriginSend) {
        onOriginSend()
      }

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash as `0x${string}`,
      })
      console.log("[trails-sdk] receipt", receipt)
      originUserTxReceipt = receipt
    }
  } else {
    if (!dryMode) {
      if (needsNativeFee) {
        const tx0 = await sendOriginTransaction(account, walletClient, {
          to: intentAddress,
          data: "0x00",
          value: nativeFee,
          chainId: originChainId,
          chain,
        } as any) // TODO: Add proper type
        console.log("[trails-sdk] origin tx", tx0)
        // Wait for transaction receipt
        const feeReceipt = await publicClient.waitForTransactionReceipt({
          hash: tx0,
        })
        console.log("[trails-sdk] nativeFeeReceipt", feeReceipt)
      }

      const tx = await sendOriginTransaction(
        account,
        walletClient,
        originCallParams as any,
      ) // TODO: Add proper type
      console.log("[trails-sdk] origin tx", tx)

      if (onOriginSend) {
        onOriginSend()
      }

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: tx,
      })
      console.log("[trails-sdk] receipt", receipt)
      originUserTxReceipt = receipt
    }
  }

  return originUserTxReceipt
}

async function attemptUserDepositTx({
  originTokenAddress,
  gasless,
  paymasterUrl,
  chain,
  account,
  relayerConfig,
  sequenceProjectAccessKey,
  originRelayer,
  firstPreconditionMin,
  intentAddress,
  onOriginSend,
  publicClient,
  walletClient,
  destinationTokenDecimals,
  sourceTokenDecimals,
  fee,
  dryMode,
  sourceTokenPriceUsd,
  destinationTokenPriceUsd,
  destinationTokenAmount,
}: {
  originTokenAddress: string
  gasless: boolean
  paymasterUrl?: string
  chain: Chain
  account: Account
  relayerConfig: RelayerEnvConfig
  sequenceProjectAccessKey: string
  originRelayer: Relayer.Standard.Rpc.RpcRelayer
  firstPreconditionMin: string
  intentAddress: string
  onOriginSend?: () => void
  publicClient: PublicClient
  walletClient: WalletClient
  destinationTokenDecimals: number
  sourceTokenDecimals: number
  destinationTokenAmount: string
  dryMode: boolean
  sourceTokenPriceUsd: number | null
  destinationTokenPriceUsd: number | null
  fee: string
}): Promise<TransactionReceipt | null> {
  let originUserTxReceipt: TransactionReceipt | null = null
  const originChainId = chain.id
  const doGasless = getDoGasless(originTokenAddress, gasless, paymasterUrl)
  console.log("[trails-sdk] doGasless", doGasless, paymasterUrl)
  if (doGasless) {
    try {
      originUserTxReceipt = await attemptGaslessDeposit({
        paymasterUrl,
        depositTokenAddress: originTokenAddress,
        depositTokenAmount: firstPreconditionMin,
        depositRecipient: intentAddress,
        onOriginSend,
        walletClient,
        chain,
        account,
        relayerConfig,
        sequenceProjectAccessKey,
        originRelayer,
      })
    } catch (error) {
      console.log("[trails-sdk] gassless attempt failed", error)
    }
  }

  // If gasless attempt failed, try to send a regular transaction
  if (!originUserTxReceipt) {
    originUserTxReceipt = await attemptNonGaslessUserDeposit({
      originTokenAddress,
      firstPreconditionMin,
      intentAddress,
      onOriginSend,
      publicClient,
      walletClient,
      originChainId,
      chain,
      account,
      fee,
      dryMode,
      sourceTokenPriceUsd,
      destinationTokenPriceUsd,
      destinationTokenAmount,
      destinationTokenDecimals,
      sourceTokenDecimals,
    })
  }

  return originUserTxReceipt
}

export function getDoGasless(
  originTokenAddress: string,
  gasless: boolean,
  paymasterUrl?: string,
): boolean {
  return Boolean(
    originTokenAddress !== zeroAddress && (gasless || paymasterUrl),
  )
}

function getTransactionStateFromReceipt(
  receipt: TransactionReceipt | MetaTxnReceipt,
  chainId: number,
  label: string,
): TransactionState {
  let txHash: string = ""
  let state: TransactionStateStatus = "pending"
  if ("transactionHash" in receipt) {
    txHash = receipt.transactionHash
    state = receipt.status === "success" ? "confirmed" : "failed"
  } else if ("txnHash" in receipt) {
    txHash = receipt.txnHash
    state = receipt.status === "SUCCEEDED" ? "confirmed" : "failed"
  }

  return {
    transactionHash: txHash,
    explorerUrl: getExplorerUrl({ txHash, chainId }),
    chainId,
    state,
    label,
  }
}

async function sendMetaTxAndWaitForReceipt({
  metaTx,
  relayer,
  precondition,
}: {
  metaTx: MetaTxn
  relayer: Relayer.Standard.Rpc.RpcRelayer
  precondition: IntentPrecondition
}): Promise<MetaTxnReceipt | null> {
  let originMetaTxnReceipt: MetaTxnReceipt | null = null
  console.log("[trails-sdk] metaTx", metaTx)
  const opHash = await relayerSendMetaTx(relayer, metaTx, [precondition])

  console.log("[trails-sdk] opHash", opHash)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(
      "[trails-sdk] polling status",
      metaTx.id as `0x${string}`,
      BigInt(metaTx.chainId),
    )
    const receipt: any = await getMetaTxStatus(
      relayer,
      metaTx.id,
      Number(metaTx.chainId),
    )
    console.log("[trails-sdk] status", receipt)
    if (receipt?.transactionHash) {
      originMetaTxnReceipt = receipt.data?.receipt
      break
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return originMetaTxnReceipt
}

/**
 * Check if the account has enough balance for the deposit amount
 */
async function checkAccountBalance({
  account,
  tokenAddress,
  depositAmount,
  publicClient,
}: {
  account: Account
  tokenAddress: string
  depositAmount: string
  publicClient: PublicClient
}): Promise<boolean> {
  try {
    let balance: bigint

    if (tokenAddress === zeroAddress) {
      // Native token balance
      balance = await publicClient.getBalance({ address: account.address })
    } else {
      // ERC20 token balance
      balance = await publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account.address],
      })
    }

    const requiredAmount = BigInt(depositAmount)

    console.log("[trails-sdk] balance", balance)
    console.log("[trails-sdk] requiredAmount", requiredAmount)
    return balance >= requiredAmount
  } catch (error) {
    console.error("[trails-sdk] Error checking account balance:", error)
    return false
  }
}

// ETH fee required by some bridges for low token amounts
// TODO: update backend API to return the native fee requirement, if any
function getNeedsLifiNativeFee({
  originTokenAddress,
  destinationTokenAmount,
  destinationTokenDecimals,
  sourceTokenDecimals,
  sourceTokenPriceUsd,
  destinationTokenPriceUsd,
  depositAmount,
}: {
  originTokenAddress: string
  destinationTokenAmount: string
  destinationTokenDecimals: number
  sourceTokenDecimals: number
  sourceTokenPriceUsd: number | null
  destinationTokenPriceUsd: number | null
  depositAmount: string
}): boolean {
  let needsNativeFee = false
  if (
    originTokenAddress !== zeroAddress &&
    sourceTokenPriceUsd &&
    destinationTokenPriceUsd &&
    depositAmount &&
    destinationTokenDecimals !== undefined &&
    sourceTokenDecimals !== undefined
  ) {
    // Convert from wei to token units using formatUnits
    const destinationAmount = Number(
      formatUnits(BigInt(destinationTokenAmount), destinationTokenDecimals),
    )
    const depositAmountFormatted = Number(
      formatUnits(BigInt(depositAmount), destinationTokenDecimals),
    )
    console.log("[trails-sdk] destinationAmount", destinationAmount)
    console.log("[trails-sdk] depositAmountFormatted", depositAmountFormatted)
    const destinationAmountUsd = destinationAmount * destinationTokenPriceUsd
    const depositAmountUsd = depositAmountFormatted * sourceTokenPriceUsd
    const diff = depositAmountUsd - destinationAmountUsd
    console.log(
      "[trails-sdk] destinationAmountUsd",
      destinationAmountUsd,
      "[trails-sdk] depositAmountUsd",
      depositAmountUsd,
      "[trails-sdk] diff",
      diff,
    )
    if (diff >= 0 && diff <= 0.02) {
      needsNativeFee = true
    }
  }

  return needsNativeFee
}

export type UseQuoteProps = {
  walletClient?: WalletClient
  fromTokenAddress?: string
  fromChainId?: number
  toTokenAddress?: string
  toChainId?: number
  toAmount?: string | bigint
  toRecipient?: string
}

export function useQuote({
  walletClient,
  fromTokenAddress,
  fromChainId,
  toTokenAddress,
  toChainId,
  toAmount,
  toRecipient,
}: UseQuoteProps = {}): {
  quote: {
    fromAmount: string
  } | null
  swap:
    | (() => Promise<{
        originTransaction: {
          transactionHash: string | undefined
          receipt: TransactionReceipt | MetaTxnReceipt | null
        }
        destinationTransaction: {
          transactionHash: string | undefined
          receipt: MetaTxnReceipt | null
        }
      } | null>)
    | null
  isLoadingQuote: boolean
  quoteError: unknown
} {
  const apiClient = useAPIClient()
  const { getRelayer } = useRelayers({
    env: "dev",
    useV3Relayers: DEFAULT_USE_V3_RELAYERS,
  })
  const indexerGatewayClient = useIndexerGatewayClient()

  const { supportedTokens } = useSupportedTokens()

  const { tokenBalance: originTokenBalance } = useAccountTokenBalance({
    account: walletClient?.account?.address,
    token: fromTokenAddress,
    chainId: fromChainId,
    indexerGatewayClient,
    apiClient,
  })

  const destToken =
    toTokenAddress && toChainId
      ? {
          tokenId: toTokenAddress,
          chainId: toChainId,
          contractAddress: toTokenAddress,
        }
      : null

  const { tokenPrice: destinationTokenPrice } = useTokenPrice(
    destToken,
    apiClient,
  )

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "quote",
      fromTokenAddress,
      fromChainId,
      toTokenAddress,
      toChainId,
      toAmount?.toString(),
      toRecipient,
    ],
    queryFn: async () => {
      if (
        !walletClient ||
        !apiClient ||
        !fromTokenAddress ||
        !toTokenAddress ||
        !toAmount ||
        !toRecipient ||
        !fromChainId ||
        !toChainId
      ) {
        return null
      }

      const originTokenAmount = originTokenBalance?.balance ?? "0"
      const sequenceProjectAccessKey = ""
      const destinationRelayer = getRelayer(toChainId)
      const originRelayer = getRelayer(fromChainId)
      console.log("originRelayer", originRelayer)
      console.log("destinationRelayer", destinationRelayer)
      const sourceTokenPriceUsd = originTokenBalance?.price?.value ?? 0
      const destinationTokenPriceUsd = destinationTokenPrice?.price?.value ?? 0

      const originToken = supportedTokens?.find(
        (token) =>
          token.contractAddress === fromTokenAddress &&
          token.chainId === fromChainId,
      )
      const destinationToken = supportedTokens?.find(
        (token) =>
          token.contractAddress === toTokenAddress &&
          token.chainId === toChainId,
      )

      const sourceTokenDecimals = originToken?.decimals ?? 18
      const destinationTokenDecimals = destinationToken?.decimals ?? 18
      const destinationTokenSymbol = destinationToken?.symbol ?? ""

      const options = {
        account: walletClient.account!,
        originTokenAddress: fromTokenAddress,
        originChainId: fromChainId,
        originTokenAmount: originTokenAmount,
        destinationChainId: toChainId,
        recipient: toRecipient,
        destinationTokenAddress: toTokenAddress,
        destinationTokenAmount: toAmount.toString(),
        destinationTokenSymbol: destinationTokenSymbol,
        sequenceProjectAccessKey,
        client: walletClient,
        apiClient,
        originRelayer,
        destinationRelayer,
        sourceTokenPriceUsd,
        destinationTokenPriceUsd,
        sourceTokenDecimals,
        destinationTokenDecimals,
        fee: "0",
        dryMode: false,
        onTransactionStateChange: () => {},
        relayerConfig: {},
      }

      console.log("[trails-sdk] options", options)

      const { intentAddress, originSendAmount, send } =
        await prepareSend(options)
      console.log("[trails-sdk] Intent address:", intentAddress?.toString())

      const quote = {
        fromAmount: originSendAmount,
      }

      const swap = async () => {
        const { originUserTxReceipt, destinationMetaTxnReceipt } = await send()

        return {
          originTransaction: {
            transactionHash: originUserTxReceipt?.transactionHash,
            receipt: originUserTxReceipt,
          },
          destinationTransaction: {
            transactionHash: destinationMetaTxnReceipt?.txnHash,
            receipt: destinationMetaTxnReceipt,
          },
        }
      }

      return {
        quote,
        swap,
      }
    },
  })

  return {
    quote: data?.quote || null,
    swap: data?.swap || null,
    isLoadingQuote: isLoading,
    quoteError: error,
  }
}
