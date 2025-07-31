import type {
  GetIntentCallsPayloadsArgs,
  GetIntentCallsPayloadsReturn,
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
  maxUint256,
  parseUnits,
  zeroAddress,
} from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import * as chains from "viem/chains"
import {
  trackPaymentCompleted,
  trackPaymentError,
  trackPaymentStarted,
  trackRelayerCallCompleted,
  trackRelayerCallError,
  trackRelayerCallStarted,
  trackTransactionConfirmed,
} from "./analytics.js"
import { useAPIClient } from "./apiClient.js"
import {
  approveERC20,
  cctpTransfer,
  cctpTransferWithCustomCall,
  getCCTPRelayerCallData,
  getIsUsdcAddress,
  getMessageTransmitter,
  getMintUSDCData,
  getNeedsApproval,
  getUSDCTokenAddress,
} from "./cctp.js"
import type { Attestation } from "./cctp.js"
import { getChainInfo, getTestnetChainInfo } from "./chains.js"
import { attemptSwitchChain } from "./chainSwitch.js"
import { DEFAULT_USE_V3_RELAYERS, intentEntrypoints } from "./constants.js"
import { getERC20TransferData } from "./encoders.js"
import { getExplorerUrl } from "./explorer.js"
import {
  getDepositToIntentCalls,
  getPermitCalls,
  getPermitSignature,
} from "./gasless.js"
import { useIndexerGatewayClient } from "./indexerClient.js"
import {
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
import { calcAmountUsdPrice, useTokenPrice } from "./prices.js"
import { getQueryParam } from "./queryParams.js"
import type { RelayerEnvConfig } from "./relayer.js"
import { useRelayers } from "./relayer.js"
import {
  executeSimpleRelayTransaction,
  getRelaySDKQuote,
  getTxHashFromRelayResult,
  waitForRelayDestinationTx,
  type RelayQuote,
  type RelayTradeType,
} from "./relaySdk.js"
import {
  getFeeOptions,
  sequenceSendTransaction,
  simpleCreateSequenceWallet,
} from "./sequenceWallet.js"
import {
  formatUsdAmountDisplay,
  useAccountTokenBalance,
  formatAmount,
  formatRawAmount,
} from "./tokenBalances.js"
import {
  getTokenInfo,
  type SupportedToken,
  useSupportedTokens,
} from "./tokens.js"
import type {
  TransactionState,
  TransactionStateStatus,
} from "./transactions.js"
import { getTxTimeDiff } from "./transactions.js"
import { requestWithTimeout } from "./utils.js"
import { InsufficientBalanceError } from "./error.js"
import { estimateGasCostUsd } from "./estimate.js"

export enum TradeType {
  EXACT_INPUT = "EXACT_INPUT",
  EXACT_OUTPUT = "EXACT_OUTPUT",
}

export type SendOptions = {
  account: Account
  originTokenAddress: string
  originChainId: number
  originTokenBalance: string
  destinationChainId: number
  recipient: string
  destinationTokenAddress: string
  swapAmount: string
  tradeType?: TradeType
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
  slippageTolerance?: string
  originNativeTokenPriceUsd?: number | null
}

export type PrepareSendFees = {
  feeTokenAddress: string | null
  totalFeeAmount: string | null
  totalFeeAmountUsd: string | null
  totalFeeAmountUsdDisplay: string | null
}

export type PrepareSendQuote = {
  originAddress: string
  destinationAddress: string
  destinationCalldata: string
  originChain: Chain
  destinationChain: Chain
  originAmount: string
  originAmountMin: string
  originAmountMinUsdFormatted: string
  originAmountMinUsdDisplay: string
  destinationAmount: string
  destinationAmountMin: string
  destinationAmountMinUsdFormatted: string
  destinationAmountMinUsdDisplay: string
  originAmountFormatted: string
  originAmountUsdFormatted: string
  originAmountUsdDisplay: string
  destinationAmountFormatted: string
  destinationAmountUsdFormatted: string
  destinationAmountUsdDisplay: string
  originToken: SupportedToken
  destinationToken: SupportedToken
  fees: PrepareSendFees
  slippageTolerance: string
  priceImpact: string
  completionEstimateSeconds: number
  transactionStates: TransactionState[]
  gasCostUsd: number
  gasCostUsdDisplay: string
}

export type PrepareSendReturn = {
  quote: PrepareSendQuote
  send: (onOriginSend?: () => void) => Promise<SendReturn>
}

export type SendReturn = {
  originUserTxReceipt: TransactionReceipt | null
  originMetaTxnReceipt: MetaTxnReceipt | null
  destinationMetaTxnReceipt: MetaTxnReceipt | null
  totalCompletionSeconds?: number
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

function getTestnetOriginTokenAddress(testnetChainId: number): string {
  return getUSDCTokenAddress(testnetChainId)!
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
  destinationCalldata: string | undefined,
  destinationSalt: string = Date.now().toString(),
  slippageTolerance: string, // 0.03 = 3%
  tradeType: TradeType,
): GetIntentCallsPayloadsArgs {
  const hasCustomCalldata = getIsCustomCalldata(destinationCalldata)
  const _destinationCalldata = hasCustomCalldata ? destinationCalldata : "0x"

  const _destinationToAddress = recipient
  const _destinationCallValue =
    destinationTokenAddress === zeroAddress ? destinationTokenAmount : "0"

  const intentArgs = {
    userAddress: mainSignerAddress,
    originChainId,
    originTokenAddress,
    originTokenAmount: originTokenAmount, // max amount for exact_output
    destinationChainId,
    destinationToAddress: _destinationToAddress,
    destinationTokenAddress: destinationTokenAddress,
    destinationTokenAmount: destinationTokenAmount,
    destinationTokenSymbol: destinationTokenSymbol,
    destinationCallData: _destinationCalldata,
    destinationCallValue: _destinationCallValue,
    destinationSalt,
    slippageTolerance: Number(slippageTolerance),
    tradeType,
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
    originTokenBalance, // account balance
    destinationChainId,
    recipient,
    destinationTokenAddress,
    swapAmount,
    tradeType = TradeType.EXACT_OUTPUT,
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
    slippageTolerance = "0.03", // 0.03 = 3%
    originNativeTokenPriceUsd,
  } = options

  // Track payment start
  trackPaymentStarted({
    userAddress: account.address,
    originChainId,
    destinationChainId,
    originTokenAddress,
    destinationTokenAddress,
    destinationTokenAmount: swapAmount,
  })

  if (originTokenBalance === "0") {
    throw new Error("Origin token amount must be greater than 0")
  }

  if (!walletClient) {
    trackPaymentError({
      error: "Wallet client not provided",
      userAddress: account.address,
    })
    throw new Error("Wallet client not provided")
  }

  const chain = getChainInfo(originChainId)
  if (!chain) {
    trackPaymentError({
      error: `Chain ${originChainId} not found`,
      userAddress: account.address,
    })
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

  const hasCustomCalldata = getIsCustomCalldata(destinationCalldata)
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
      label: hasCustomCalldata ? "Execute" : "Receive",
    })
  }

  if (isToSameChain && !isToSameToken) {
    return await sendHandlerForSameChainDifferentToken({
      originTokenAddress,
      swapAmount,
      tradeType,
      destinationTokenAddress,
      destinationCalldata,
      recipient,
      originChainId,
      walletClient,
      publicClient,
      account,
      slippageTolerance,
      onTransactionStateChange,
      transactionStates,
      sourceTokenPriceUsd,
      destinationTokenPriceUsd,
      originNativeTokenPriceUsd,
    })
  }

  if (isToSameToken && isToSameChain) {
    return await sendHandlerForSameChainSameToken({
      originTokenAddress,
      destinationTokenAmount: swapAmount,
      destinationCalldata,
      recipient,
      originChainId,
      walletClient,
      publicClient,
      onTransactionStateChange,
      dryMode,
      account,
      chain,
      transactionStates,
      sourceTokenPriceUsd,
      destinationTokenPriceUsd,
      originNativeTokenPriceUsd,
    })
  }

  return await sendHandlerForDifferentChainDifferentToken({
    mainSignerAddress,
    originChainId,
    originTokenAddress,
    originTokenBalance,
    destinationChainId,
    destinationTokenAddress,
    swapAmount,
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
    slippageTolerance,
    tradeType,
    originNativeTokenPriceUsd,
  })
}

async function sendHandlerForDifferentChainDifferentToken({
  mainSignerAddress,
  originChainId,
  originTokenAddress,
  originTokenBalance,
  destinationChainId,
  destinationTokenAddress,
  swapAmount,
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
  slippageTolerance,
  tradeType,
  originNativeTokenPriceUsd,
}: {
  mainSignerAddress: string
  originChainId: number
  originTokenAddress: string
  originTokenBalance: string
  destinationChainId: number
  destinationTokenAddress: string
  swapAmount: string
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
  slippageTolerance: string
  tradeType: TradeType
  originNativeTokenPriceUsd?: number | null
}): Promise<PrepareSendReturn> {
  const testnet = isTestnetDebugMode()
  const useCctp = getUseCctp(
    originTokenAddress,
    destinationTokenAddress,
    originChainId,
    destinationChainId,
  )

  const cctpFlag = getQueryParam("cctp") === "true"
  const hasCustomCalldata = getIsCustomCalldata(destinationCalldata)

  if (useCctp && cctpFlag) {
    console.log("[trails-sdk] using cctp")
    return {
      quote: await getNormalizedQuoteObject({
        destinationAddress: recipient,
        destinationCalldata,
        originAmount: swapAmount,
        originTokenPriceUsd: sourceTokenPriceUsd?.toString() || null,
        destinationAmount: swapAmount,
        destinationTokenPriceUsd: destinationTokenPriceUsd?.toString() || null,
        originTokenAddress: originTokenAddress,
        destinationTokenAddress: destinationTokenAddress,
        originChainId,
        destinationChainId,
        transactionStates,
        originNativeTokenPriceUsd,
      }),
      send: async (onOriginSend?: () => void): Promise<SendReturn> => {
        const originChain = testnet ? getTestnetChainInfo(chain)! : chain
        const destinationChain = testnet
          ? getTestnetChainInfo(destinationChainId)!
          : getChainInfo(destinationChainId)

        if (!originChain || !destinationChain) {
          console.error("[trails-sdk] Invalid chain", {
            originChain,
            destinationChain,
            originChainId,
            destinationChainId,
            chain,
            testnet,
          })
          throw new Error("Invalid chain")
        }

        console.log("[trails-sdk] originChain", originChain)
        console.log("[trails-sdk] destinationChain", destinationChain)

        const originPublicClient = createPublicClient({
          chain: originChain,
          transport: http(),
        })

        let txHash: `0x${string}`
        let waitForAttestation: () => Promise<Attestation>

        if (hasCustomCalldata) {
          const result = await cctpTransferWithCustomCall({
            walletClient,
            originChain,
            destinationChain,
            amount: BigInt(swapAmount),
          })

          txHash = result.txHash
          waitForAttestation = result.waitForAttestation
        } else {
          const result = await cctpTransfer({
            walletClient,
            originChain,
            destinationChain,
            amount: BigInt(swapAmount),
          })

          txHash = result.txHash
          waitForAttestation = result.waitForAttestation
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

        const attestation = await waitForAttestation()

        if (!attestation) {
          throw new Error("Failed to retrieve attestation")
        }

        const tokenMessenger = getMessageTransmitter(destinationChain.id)!

        console.log("[trails-sdk] tokenMessenger", tokenMessenger)
        const calls: {
          to: `0x${string}`
          data: `0x${string}`
          value: bigint
        }[] = []

        if (hasCustomCalldata) {
          calls.push(
            await getCCTPRelayerCallData({
              attestation,
              targetContract: recipient,
              calldata: destinationCalldata as `0x${string}`,
              gasLimit: 300000n,
              destinationChain,
            }),
          )
        } else {
          calls.push(
            await getMintUSDCData({
              tokenMessenger,
              attestation,
            }),
          )
        }

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
          totalCompletionSeconds: 0,
        }
      },
    }
  }

  const destinationSalt = Date.now().toString()

  const intentArgs = getIntentArgs(
    mainSignerAddress,
    originChainId,
    originTokenAddress,
    tradeType === TradeType.EXACT_OUTPUT ? originTokenBalance : swapAmount, // originTokenAmount
    destinationChainId,
    destinationTokenAddress,
    tradeType === TradeType.EXACT_OUTPUT ? swapAmount : "0", // destinationTokenAmount
    destinationTokenSymbol,
    recipient,
    destinationCalldata,
    destinationSalt,
    slippageTolerance,
    tradeType,
  )

  console.log("[trails-sdk] Creating intent with args:", intentArgs)

  const intent = await getIntentCallsPayloadsFromIntents(apiClient, intentArgs)
  console.log("[trails-sdk] Got intent:", intent)

  if (!intent.preconditions?.length || !intent.calls?.length) {
    throw new Error("Invalid intent")
  }

  const intentAddress = intent.originIntentAddress
  console.log("[trails-sdk] intent address:", intentAddress.toString())

  await commitIntentConfig(
    apiClient,
    mainSignerAddress,
    intent.calls,
    intent.preconditions,
  )

  const firstPrecondition = findFirstPreconditionForChainId(
    intent.preconditions,
    originChainId,
  )

  if (!firstPrecondition) {
    throw new Error("No precondition found for origin chain")
  }

  const firstPreconditionMin = firstPrecondition?.data?.min?.toString()
  const depositAmount = firstPreconditionMin

  const quoteToAmount = intent.quote.toAmount
  const quoteToAmountMin = intent.quote.toAmountMin

  const originSendAmountFormatted = formatRawAmount(
    depositAmount,
    sourceTokenDecimals,
  )

  const depositAmountUsd = calcAmountUsdPrice({
    amount: originSendAmountFormatted,
    usdPrice: sourceTokenPriceUsd,
  })

  console.log("[trails-sdk] depositAmountUsd", depositAmountUsd, {
    amount: originSendAmountFormatted,
    usdPrice: sourceTokenPriceUsd,
  })

  const effectiveDestinationTokenAmount = quoteToAmount
  const effectiveDestinationTokenAmountFormatted = formatRawAmount(
    effectiveDestinationTokenAmount,
    destinationTokenDecimals,
  )

  const effectiveDestinationTokenAmountUsd = calcAmountUsdPrice({
    amount: effectiveDestinationTokenAmountFormatted,
    usdPrice: destinationTokenPriceUsd,
  })

  console.log(
    "[trails-sdk] effectiveDestinationTokenAmountUsd",
    effectiveDestinationTokenAmountUsd,
    {
      amount: effectiveDestinationTokenAmountFormatted,
      usdPrice: destinationTokenPriceUsd,
    },
  )

  return {
    quote: await getNormalizedQuoteObject({
      originAddress: intentAddress,
      destinationAddress: recipient,
      destinationCalldata,
      originAmount: depositAmount,
      destinationAmount: quoteToAmount,
      originAmountMin: depositAmount,
      destinationAmountMin: quoteToAmountMin,
      originTokenAddress: originTokenAddress,
      destinationTokenAddress: destinationTokenAddress,
      originTokenPriceUsd: sourceTokenPriceUsd?.toString() || null,
      destinationTokenPriceUsd: destinationTokenPriceUsd?.toString() || null,
      fees: getFeesFromIntent(intent, {
        tradeType,
        fromAmountUsd: depositAmountUsd,
        toAmountUsd: effectiveDestinationTokenAmountUsd,
      }),
      originChainId,
      destinationChainId,
      slippageTolerance: getSlippageToleranceFromIntent(intent),
      priceImpact: getPriceImpactFromIntent(intent),
      transactionStates,
      originNativeTokenPriceUsd,
    }),
    send: async (onOriginSend?: () => void): Promise<SendReturn> => {
      const { hasEnoughBalance, balanceError } = await checkAccountBalance({
        account,
        tokenAddress: originTokenAddress,
        depositAmount,
        publicClient,
      })

      if (!hasEnoughBalance) {
        throw balanceError
      }

      console.log("[trails-sdk] sending origin transaction")
      const usingLIfi = false
      let needsNativeFee = false

      if (usingLIfi) {
        needsNativeFee = getNeedsLifiNativeFee({
          originTokenAddress,
          destinationTokenAmount: swapAmount,
          destinationTokenDecimals,
          sourceTokenDecimals,
          sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
          destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
          depositAmount,
        })
      }

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

      let originUserTxReceipt: TransactionReceipt | null = null
      let originMetaTxnReceipt: MetaTxnReceipt | null = null
      let destinationMetaTxnReceipt: MetaTxnReceipt | null = null

      const testnet = isTestnetDebugMode()
      const effectiveOriginChain = testnet ? getTestnetChainInfo(chain)! : chain
      const effectiveOriginTokenAddress = testnet
        ? getTestnetOriginTokenAddress(effectiveOriginChain.id)
        : originTokenAddress

      console.log("[trails-sdk] testnet", testnet)

      const depositPromise = async () => {
        originUserTxReceipt = await attemptUserDepositTx({
          originTokenAddress: effectiveOriginTokenAddress,
          gasless,
          paymasterUrl,
          chain: effectiveOriginChain,
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
          swapAmount,
          onTransactionStateChange,
          transactionStates,
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
      }

      const originMetaTxnPromise = async () => {
        if (intent.metaTxns[0] && intent.preconditions[0]) {
          originMetaTxnReceipt = await sendMetaTxAndWaitForReceipt({
            metaTx: intent.metaTxns[0] as MetaTxn,
            relayer: originRelayer,
            precondition: intent.preconditions[0] as IntentPrecondition,
          })

          if (originMetaTxnReceipt && transactionStates[1]) {
            transactionStates[1] = getTransactionStateFromReceipt(
              originMetaTxnReceipt,
              originChainId,
              "Swap & Bridge",
            )
            onTransactionStateChange(transactionStates)
          }
        }
      }

      const destinationMetaTxnPromise = async () => {
        if (
          intent.quote.quoteProvider === "relay" &&
          intent.quote.quoteProviderRequestId &&
          !intent.preconditions[1] &&
          !intent.metaTxns[1]
        ) {
          console.log("[trails-sdk] waitForRelayDestinationTx")
          try {
            const txHash = await waitForRelayDestinationTx(
              intent.quote.quoteProviderRequestId,
            )
            console.log("[trails-sdk] waitForRelayDestinationTx txHash", txHash)
            if (txHash) {
              const destinationPublicClient = createPublicClient({
                chain: getChainInfo(destinationChainId)!,
                transport: http(),
              })
              const destinationTxnReceipt =
                await destinationPublicClient.getTransactionReceipt({
                  hash: txHash as `0x${string}`,
                })
              console.log(
                "[trails-sdk] relay destinationTxnReceipt",
                destinationTxnReceipt,
              )
              transactionStates[2] = getTransactionStateFromReceipt(
                destinationTxnReceipt,
                destinationChainId,
                transactionStates[2]?.label,
              )
              onTransactionStateChange(transactionStates)
            }
          } catch (error: unknown) {
            console.error("Error waiting for relay destination tx", error)
            if (transactionStates?.[2]) {
              transactionStates[2].state = "failed"
              onTransactionStateChange(transactionStates)
            }
          }
        } else {
          if (intent.metaTxns[1] && intent.preconditions[1]) {
            destinationMetaTxnReceipt = await sendMetaTxAndWaitForReceipt({
              metaTx: intent.metaTxns[1] as MetaTxn,
              relayer: destinationRelayer,
              precondition: intent.preconditions[1] as IntentPrecondition,
            })

            if (destinationMetaTxnReceipt && transactionStates[2]) {
              transactionStates[2] = getTransactionStateFromReceipt(
                destinationMetaTxnReceipt,
                destinationChainId,
                transactionStates?.[2]?.label,
              )
              onTransactionStateChange(transactionStates)
            }
          }
        }
      }

      await Promise.all([
        depositPromise(),
        originMetaTxnPromise(),
        destinationMetaTxnPromise(),
      ])

      // Track payment completion
      if (originUserTxReceipt && destinationMetaTxnReceipt) {
        trackPaymentCompleted({
          userAddress: account.address,
          intentAddress,
          originTxHash: (originUserTxReceipt as TransactionReceipt)
            .transactionHash,
          destinationTxHash: (destinationMetaTxnReceipt as MetaTxnReceipt)
            ?.txnHash,
          originChainId,
          destinationChainId,
        })
      } else {
        // Track payment error if transactions didn't complete successfully
        trackPaymentError({
          error: "Payment transactions did not complete successfully",
          userAddress: account.address,
          intentAddress,
        })
      }

      return {
        originUserTxReceipt,
        originMetaTxnReceipt,
        destinationMetaTxnReceipt,
        totalCompletionSeconds: await getTxTimeDiff(
          transactionStates[0],
          transactionStates[2],
        ),
      }
    },
  }
}

async function sendHandlerForSameChainSameToken({
  originTokenAddress,
  destinationTokenAmount,
  destinationCalldata,
  recipient,
  walletClient,
  onTransactionStateChange,
  dryMode,
  account,
  chain,
  transactionStates,
  sourceTokenPriceUsd,
  destinationTokenPriceUsd,
  originNativeTokenPriceUsd,
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
  transactionStates: TransactionState[]
  sourceTokenPriceUsd?: number | null
  destinationTokenPriceUsd?: number | null
  originNativeTokenPriceUsd?: number | null
}): Promise<PrepareSendReturn> {
  console.log("[trails-sdk] isToSameToken && isToSameChain")
  const testnet = isTestnetDebugMode()
  const effectiveOriginChain = testnet ? getTestnetChainInfo(chain)! : chain
  const effectiveOriginChainId = effectiveOriginChain.id
  const effectiveOriginTokenAddress = testnet
    ? getTestnetOriginTokenAddress(effectiveOriginChainId)
    : originTokenAddress
  const effectivePublicClient = createPublicClient({
    chain: effectiveOriginChain,
    transport: http(),
  })

  return {
    quote: await getNormalizedQuoteObject({
      originAddress: recipient,
      destinationAddress: recipient,
      destinationCalldata,
      originAmount: destinationTokenAmount, // fromAmount is same as toAmount for same chain same token
      destinationAmount: destinationTokenAmount,
      originTokenPriceUsd: sourceTokenPriceUsd?.toString() || null,
      destinationTokenPriceUsd: destinationTokenPriceUsd?.toString() || null,
      originTokenAddress: effectiveOriginTokenAddress,
      destinationTokenAddress: effectiveOriginTokenAddress,
      transactionStates,
      originChainId: effectiveOriginChainId,
      destinationChainId: effectiveOriginChainId,
      originNativeTokenPriceUsd,
    }),
    send: async (onOriginSend?: () => void): Promise<SendReturn> => {
      const { hasEnoughBalance, balanceError } = await checkAccountBalance({
        account,
        tokenAddress: effectiveOriginTokenAddress,
        depositAmount: destinationTokenAmount,
        publicClient: effectivePublicClient,
      })

      if (!hasEnoughBalance) {
        throw balanceError
      }

      const hasCustomCalldata = getIsCustomCalldata(destinationCalldata)
      const originCallParams = {
        to: hasCustomCalldata
          ? recipient
          : effectiveOriginTokenAddress === zeroAddress
            ? recipient
            : effectiveOriginTokenAddress,
        data: hasCustomCalldata
          ? destinationCalldata
          : effectiveOriginTokenAddress === zeroAddress
            ? "0x"
            : getERC20TransferData({
                recipient,
                amount: BigInt(destinationTokenAmount),
              }),
        value:
          effectiveOriginTokenAddress === zeroAddress
            ? BigInt(destinationTokenAmount)
            : "0",
        chainId: effectiveOriginChainId,
        chain: effectiveOriginChain,
      }

      console.log("[trails-sdk] origin call params", originCallParams)

      let originUserTxReceipt: TransactionReceipt | null = null
      const originMetaTxnReceipt: MetaTxnReceipt | null = null
      const destinationMetaTxnReceipt: MetaTxnReceipt | null = null

      await attemptSwitchChain({
        walletClient,
        desiredChainId: effectiveOriginChainId,
      })
      if (!dryMode) {
        onTransactionStateChange([
          {
            transactionHash: "",
            explorerUrl: "",
            chainId: effectiveOriginChainId,
            state: "pending",
            label: "Execute",
          },
        ])

        if (hasCustomCalldata) {
          try {
            const needsApproval = await getNeedsApproval({
              publicClient: effectivePublicClient,
              token: effectiveOriginTokenAddress,
              account: account.address,
              spender: recipient,
              amount: BigInt(destinationTokenAmount),
            })

            if (needsApproval) {
              const txHash = await approveERC20({
                walletClient,
                tokenAddress: effectiveOriginTokenAddress,
                spender: recipient,
                amount: maxUint256,
                chain: effectiveOriginChain,
              })

              console.log("waiting for approve", txHash)
              await effectivePublicClient.waitForTransactionReceipt({
                hash: txHash,
              })
              console.log("approve done")
            }
          } catch (error) {
            console.error("[trails-sdk] Error approving ERC20", error)
          }
        }

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
        const receipt = await effectivePublicClient.waitForTransactionReceipt({
          hash: txHash,
        })
        console.log("[trails-sdk] receipt", receipt)
        originUserTxReceipt = receipt

        trackTransactionConfirmed({
          transactionHash: txHash,
          chainId: effectiveOriginChainId,
          userAddress: account.address,
          blockNumber: Number(receipt.blockNumber),
        })

        onTransactionStateChange([
          getTransactionStateFromReceipt(
            originUserTxReceipt,
            effectiveOriginChainId,
            "Swap",
          ),
        ])

        // Track payment completion for same-chain same-token transaction
        if (originUserTxReceipt && originUserTxReceipt.status === "success") {
          trackPaymentCompleted({
            userAddress: account.address,
            originTxHash: originUserTxReceipt.transactionHash,
            originChainId: effectiveOriginChainId,
            destinationChainId: effectiveOriginChainId, // Same chain
          })
        } else if (originUserTxReceipt) {
          trackPaymentError({
            error: "Transaction failed",
            userAddress: account.address,
          })
        }
      }

      return {
        originUserTxReceipt,
        originMetaTxnReceipt,
        destinationMetaTxnReceipt,
        totalCompletionSeconds: 0,
      }
    },
  }
}

async function sendHandlerForSameChainDifferentToken({
  originTokenAddress,
  swapAmount,
  destinationTokenAddress,
  destinationCalldata,
  recipient,
  originChainId,
  walletClient,
  publicClient,
  account,
  tradeType = TradeType.EXACT_OUTPUT,
  slippageTolerance,
  onTransactionStateChange,
  transactionStates,
  sourceTokenPriceUsd,
  destinationTokenPriceUsd,
  originNativeTokenPriceUsd,
}: {
  originTokenAddress: string
  swapAmount: string
  destinationTokenAddress: string
  destinationCalldata?: string
  recipient: string
  originChainId: number
  walletClient: WalletClient
  publicClient: PublicClient
  account: Account
  tradeType?: TradeType
  slippageTolerance?: string
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  transactionStates: TransactionState[]
  sourceTokenPriceUsd?: number | null
  destinationTokenPriceUsd?: number | null
  originNativeTokenPriceUsd?: number | null
}): Promise<PrepareSendReturn> {
  const destinationTxs: { to: string; value: string; data: string }[] = []
  const hasCustomCalldata = getIsCustomCalldata(destinationCalldata)
  if (hasCustomCalldata && tradeType === TradeType.EXACT_OUTPUT) {
    destinationTxs.push({
      to: recipient,
      value: destinationTokenAddress === zeroAddress ? swapAmount : "0",
      data: destinationCalldata as `0x${string}`,
    })
  }

  const quote = await getRelaySDKQuote({
    wallet: walletClient,
    chainId: originChainId,
    amount: swapAmount,
    currency: originTokenAddress,
    toCurrency: destinationTokenAddress,
    txs: destinationTxs,
    tradeType: tradeType as unknown as RelayTradeType,
    slippageTolerance: slippageTolerance,
  })

  console.log("[trails-sdk] relaysdk quote", quote)
  let depositAmount = "0"
  let destinationTokenAmount = "0"

  if (tradeType === TradeType.EXACT_INPUT) {
    depositAmount = swapAmount
    destinationTokenAmount = quote?.details?.currencyOut?.amount?.toString()
  } else {
    try {
      destinationTokenAmount = swapAmount
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
  }

  const depositOriginAddress =
    quote?.steps?.[quote?.steps?.length - 1]?.items?.[
      quote?.steps?.[quote?.steps?.length - 1]?.items?.length - 1
    ]?.data?.to

  return {
    quote: await getNormalizedQuoteObject({
      originAddress: depositOriginAddress,
      destinationAddress: recipient,
      destinationCalldata,
      originAmount: depositAmount,
      destinationAmount: destinationTokenAmount,
      originTokenAddress: originTokenAddress,
      destinationTokenAddress: destinationTokenAddress,
      originTokenPriceUsd: sourceTokenPriceUsd?.toString() || null,
      destinationTokenPriceUsd: destinationTokenPriceUsd?.toString() || null,
      fees: getFeesFromRelaySdkQuote(quote),
      slippageTolerance: getSlippageToleranceFromRelaySdkQuote(quote),
      priceImpact: getPriceImpactFromRelaySdkQuote(quote),
      transactionStates,
      originChainId,
      destinationChainId: originChainId,
      originNativeTokenPriceUsd,
    }),
    send: async (onOriginSend?: () => void): Promise<SendReturn> => {
      const { hasEnoughBalance, balanceError } = await checkAccountBalance({
        account,
        tokenAddress: originTokenAddress,
        depositAmount,
        publicClient,
      })

      if (!hasEnoughBalance) {
        throw balanceError
      }

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

      transactionStates[0] = getTransactionStateFromReceipt(
        originUserTxReceipt,
        originChainId,
        "Swap",
      )
      onTransactionStateChange(transactionStates)

      // Track payment completion for same-chain different-token transaction
      if (originUserTxReceipt && originUserTxReceipt.status === "success") {
        trackPaymentCompleted({
          userAddress: account.address,
          originTxHash: originUserTxReceipt.transactionHash,
          originChainId,
          destinationChainId: originChainId, // Same chain
        })
      } else if (originUserTxReceipt) {
        trackPaymentError({
          error: "Relay transaction failed",
          userAddress: account.address,
        })
      }

      return {
        originUserTxReceipt: originUserTxReceipt,
        originMetaTxnReceipt: null,
        destinationMetaTxnReceipt: null,
        totalCompletionSeconds: 0,
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
  swapAmount,
  destinationTokenDecimals,
  sourceTokenDecimals,
  intentAddress,
  onTransactionStateChange,
  transactionStates,
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
  swapAmount: string
  destinationTokenDecimals: number
  sourceTokenDecimals: number
  intentAddress: string
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  transactionStates: TransactionState[]
}): Promise<TransactionReceipt | null> {
  let originUserTxReceipt: TransactionReceipt | null = null
  const usingLIfi = false
  let needsNativeFee = false

  if (usingLIfi) {
    needsNativeFee = await getNeedsLifiNativeFee({
      originTokenAddress,
      destinationTokenAmount: swapAmount,
      destinationTokenDecimals,
      sourceTokenDecimals,
      sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
      destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
      depositAmount: firstPreconditionMin,
    })
  }
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

      if (transactionStates[0]) {
        transactionStates[0].state = "pending"
        onTransactionStateChange(transactionStates)
      }

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: tx,
      })

      trackTransactionConfirmed({
        transactionHash: tx,
        chainId: originChainId,
        userAddress: account.address,
        blockNumber: Number(receipt.blockNumber),
        intentAddress,
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
  swapAmount,
  onTransactionStateChange,
  transactionStates,
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
  swapAmount: string
  dryMode: boolean
  sourceTokenPriceUsd: number | null
  destinationTokenPriceUsd: number | null
  fee: string
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  transactionStates: TransactionState[]
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
      swapAmount,
      destinationTokenDecimals,
      sourceTokenDecimals,
      onTransactionStateChange,
      transactionStates,
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
  label: string = "Transaction",
): TransactionState {
  let txHash: string = ""
  let state: TransactionStateStatus = "pending"
  let blockNumber: number = 0
  if ("transactionHash" in receipt) {
    txHash = receipt.transactionHash
    state = receipt.status === "success" ? "confirmed" : "failed"
    blockNumber = Number(receipt.blockNumber)
  } else if ("txnHash" in receipt) {
    txHash = receipt.txnHash
    state = receipt.status === "SUCCEEDED" ? "confirmed" : "failed"
    blockNumber = Number(receipt.blockNumber)
  }

  return {
    transactionHash: txHash,
    explorerUrl: getExplorerUrl({ txHash, chainId }),
    chainId,
    blockNumber,
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
  try {
    let originMetaTxnReceipt: MetaTxnReceipt | null = null
    console.log("[trails-sdk] metaTx", metaTx)
    trackRelayerCallStarted({
      walletAddress: metaTx.walletAddress as `0x${string}`,
      contractAddress: metaTx.contract as `0x${string}`,
      chainId: Number(metaTx.chainId),
    })
    const opHash = await relayerSendMetaTx(relayer, metaTx, [precondition])
    console.log("[trails-sdk] opHash", opHash)

    trackRelayerCallCompleted({
      walletAddress: metaTx.walletAddress as `0x${string}`,
      contractAddress: metaTx.contract as `0x${string}`,
      chainId: Number(metaTx.chainId),
    })

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
  } catch (error) {
    trackRelayerCallError({
      walletAddress: metaTx.walletAddress as `0x${string}`,
      contractAddress: metaTx.contract as `0x${string}`,
      chainId: Number(metaTx.chainId),
      error: error instanceof Error ? error.message : "Unknown error",
    })
    throw error
  }
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
}): Promise<{
  hasEnoughBalance: boolean
  balance: bigint
  requiredAmount: bigint
  balanceFormatted: string
  requiredAmountFormatted: string
  balanceError: Error | null
}> {
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
    const hasEnoughBalance = balance >= requiredAmount
    console.log("[trails-sdk] hasEnoughBalance", hasEnoughBalance)

    let balanceFormatted = ""
    let requiredAmountFormatted = ""
    if (tokenAddress === zeroAddress) {
      balanceFormatted = formatUnits(balance, 18)
      requiredAmountFormatted = formatUnits(requiredAmount, 18)
    } else {
      // ERC20 token balance
      const decimals = await publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "decimals",
      })
      balanceFormatted = formatUnits(balance, decimals)
      requiredAmountFormatted = formatUnits(requiredAmount, decimals)
    }

    let balanceError = null
    if (!hasEnoughBalance) {
      balanceError = new InsufficientBalanceError(
        `Insufficient balance: Need ${formatAmount(requiredAmountFormatted)} but only have ${formatAmount(balanceFormatted)}`,
      )
    }

    return {
      hasEnoughBalance,
      balance,
      balanceFormatted,
      requiredAmount,
      requiredAmountFormatted,
      balanceError,
    }
  } catch (error) {
    console.error("[trails-sdk] Error checking account balance:", error)
    return {
      hasEnoughBalance: false,
      balance: BigInt(0),
      balanceFormatted: "0",
      requiredAmount: BigInt(0),
      requiredAmountFormatted: "0",
      balanceError: error instanceof Error ? error : null,
    }
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
    const destinationAmountUsd = calcAmountUsdPrice({
      amount: destinationAmount,
      usdPrice: destinationTokenPriceUsd,
    })
    const depositAmountUsd = calcAmountUsdPrice({
      amount: depositAmountFormatted,
      usdPrice: sourceTokenPriceUsd,
    })
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
  walletClient?: any // TODO: fix this, has to do with viem/wagmi versions
  fromTokenAddress?: string | null
  fromChainId?: number | null
  toTokenAddress?: string | null
  toChainId?: number | null
  swapAmount?: string | bigint
  toRecipient?: string | null
  tradeType?: TradeType | null
  slippageTolerance?: string | number | null
  onStatusUpdate?: ((transactionStates: TransactionState[]) => void) | null
}

export type SwapReturn = {
  originTransaction: {
    transactionHash?: string | null
    explorerUrl?: string | null
    receipt: TransactionReceipt | MetaTxnReceipt | null
  }
  destinationTransaction: {
    transactionHash?: string | null
    explorerUrl?: string | null
    receipt: MetaTxnReceipt | null
  }
  totalCompletionSeconds?: number
}

export type UseQuoteReturn = {
  quote: {
    fromAmount: string
    fromAmountMin: string
    toAmount: string
    toAmountMin: string
    originToken: SupportedToken
    destinationToken: SupportedToken
    originChain: Chain
    destinationChain: Chain
    fees: PrepareSendFees
    slippageTolerance: string
    priceImpact: string
    completionEstimateSeconds: number
    transactionStates?: TransactionState[]
  } | null
  swap: (() => Promise<SwapReturn | null>) | null
  isLoadingQuote: boolean
  quoteError: unknown
}

export function useQuote({
  walletClient,
  fromTokenAddress,
  fromChainId,
  toTokenAddress,
  toChainId,
  swapAmount,
  tradeType,
  toRecipient,
  slippageTolerance,
  onStatusUpdate,
}: Partial<UseQuoteProps> = {}): UseQuoteReturn {
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
      swapAmount?.toString(),
      toRecipient,
      tradeType,
      slippageTolerance,
    ],
    queryFn: async () => {
      if (
        !walletClient ||
        !apiClient ||
        !fromTokenAddress ||
        !toTokenAddress ||
        !swapAmount ||
        !toRecipient ||
        !fromChainId ||
        !toChainId ||
        !originTokenBalance?.balance
      ) {
        return null
      }

      const originTokenBalanceAmount = originTokenBalance?.balance ?? "0"
      const sequenceProjectAccessKey = ""
      const destinationRelayer = getRelayer(toChainId)
      const originRelayer = getRelayer(fromChainId)
      const sourceTokenPriceUsd = originTokenBalance?.price?.value ?? 0
      const destinationTokenPriceUsd = destinationTokenPrice?.price?.value ?? 0

      if (originTokenBalanceAmount === "0") {
        return null
      }

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
        originTokenBalance: originTokenBalanceAmount,
        destinationChainId: toChainId,
        recipient: toRecipient,
        destinationTokenAddress: toTokenAddress,
        swapAmount: swapAmount.toString(),
        tradeType: tradeType ?? TradeType.EXACT_OUTPUT,
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
        onTransactionStateChange: onStatusUpdate ?? (() => {}),
        relayerConfig: {},
        slippageTolerance: slippageTolerance?.toString(),
      }

      console.log("[trails-sdk] options", options)

      const { quote: prepareSendQuote, send } = await prepareSend(options)

      const quote = {
        fromAmount: prepareSendQuote.originAmount,
        toAmount: prepareSendQuote.destinationAmount,
        fromAmountMin: prepareSendQuote.originAmountMin,
        toAmountMin: prepareSendQuote.destinationAmountMin,
        originToken: prepareSendQuote.originToken,
        destinationToken: prepareSendQuote.destinationToken,
        originChain: prepareSendQuote.originChain,
        destinationChain: prepareSendQuote.destinationChain,
        fees: prepareSendQuote.fees,
        priceImpact: prepareSendQuote.priceImpact,
        completionEstimateSeconds: prepareSendQuote.completionEstimateSeconds,
        slippageTolerance: prepareSendQuote.slippageTolerance,
        transactionStates: prepareSendQuote.transactionStates,
      }

      const swap = async (): Promise<SwapReturn> => {
        const {
          originUserTxReceipt,
          destinationMetaTxnReceipt,
          totalCompletionSeconds,
        } = await send()

        return {
          originTransaction: {
            transactionHash: originUserTxReceipt?.transactionHash,
            explorerUrl: getExplorerUrl({
              txHash: originUserTxReceipt?.transactionHash as string,
              chainId: fromChainId,
            }),
            receipt: originUserTxReceipt,
          },
          destinationTransaction: {
            transactionHash: destinationMetaTxnReceipt?.txnHash,
            explorerUrl: getExplorerUrl({
              txHash: destinationMetaTxnReceipt?.txnHash as string,
              chainId: toChainId,
            }),
            receipt: destinationMetaTxnReceipt,
          },
          totalCompletionSeconds,
        }
      }

      return {
        quote,
        swap,
      }
    },
    // Prevent unnecessary refetching
    enabled: Boolean(
      walletClient &&
        apiClient &&
        fromTokenAddress &&
        toTokenAddress &&
        swapAmount &&
        toRecipient &&
        fromChainId &&
        toChainId &&
        originTokenBalance?.balance,
    ),
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component remount if data exists
    refetchInterval: false, // Disable automatic polling
    retry: 2, // Limit retry attempts
    refetchOnReconnect: true, // Refetch when network reconnects
  })

  return {
    quote: data?.quote || null,
    swap: data?.swap || null,
    isLoadingQuote: isLoading,
    quoteError: error,
  }
}

export function getFeesFromIntent(
  intent: GetIntentCallsPayloadsReturn,
  {
    tradeType,
    fromAmountUsd,
    toAmountUsd,
  }: { tradeType: TradeType; fromAmountUsd: number; toAmountUsd: number },
): PrepareSendFees {
  const totalFeeAmountUsd = Math.max(fromAmountUsd - toAmountUsd, 0)

  const totalFeeAmountUsdDisplay = formatUsdAmountDisplay(totalFeeAmountUsd)

  console.log("[trails-sdk] getFeesFromIntent", {
    tradeType,
    fromAmountUsd,
    toAmountUsd,
    totalFeeAmountUsd,
    totalFeeAmountUsdDisplay,
  })

  return {
    feeTokenAddress: intent.trailsFee?.feeToken ?? zeroAddress,
    totalFeeAmount: intent.trailsFee?.totalFeeAmount ?? "0",
    totalFeeAmountUsd: totalFeeAmountUsd.toString(),
    totalFeeAmountUsdDisplay,
  }
}

export function getSlippageToleranceFromIntent(
  intent: GetIntentCallsPayloadsReturn,
): string {
  return intent.quote?.maxSlippage?.toString() ?? "0"
}

export function getPriceImpactFromIntent(
  intent: GetIntentCallsPayloadsReturn,
): string {
  return intent?.quote?.priceImpact?.toString() ?? "0"
}

export function getFeesFromRelaySdkQuote(quote: RelayQuote): PrepareSendFees {
  const totalFeeAmountUsd = quote?.fees?.relayer?.amount ?? 0
  const totalFeeAmountUsdDisplay = formatUsdAmountDisplay(totalFeeAmountUsd)
  return {
    feeTokenAddress: quote?.fees?.relayer?.currency?.address ?? zeroAddress,
    totalFeeAmount: quote?.fees?.relayer?.amount ?? "0",
    totalFeeAmountUsd: totalFeeAmountUsd.toString(),
    totalFeeAmountUsdDisplay,
  }
}

export function getSlippageToleranceFromRelaySdkQuote(
  quote: RelayQuote,
): string {
  return (
    Number(quote?.details?.slippageTolerance?.origin?.percent ?? "0") / 100
  ).toString()
}

export function getPriceImpactFromRelaySdkQuote(quote: RelayQuote): string {
  return quote?.details?.swapImpact?.percent ?? "0"
}

export function getZeroFees(): PrepareSendFees {
  return {
    feeTokenAddress: zeroAddress,
    totalFeeAmount: "0",
    totalFeeAmountUsd: "0",
    totalFeeAmountUsdDisplay: formatUsdAmountDisplay(0),
  }
}

// TODO: make this dyanamic
export function getCompletionEstimateSeconds({
  originChainId,
  destinationChainId,
}: {
  originChainId: number
  destinationChainId: number
}): number {
  if (
    originChainId === chains.mainnet.id &&
    destinationChainId === chains.mainnet.id
  ) {
    return 60
  }

  if (
    originChainId === chains.mainnet.id ||
    destinationChainId === chains.mainnet.id
  ) {
    return 30
  }

  return 10
}

export function getIsCustomCalldata(calldata: string | undefined): boolean {
  return calldata !== undefined && calldata !== "" && calldata !== "0x"
}

export async function getNormalizedQuoteObject({
  originAddress,
  destinationAddress,
  destinationCalldata,
  originChainId,
  destinationChainId,
  originAmount,
  originAmountMin,
  destinationAmount,
  destinationAmountMin,
  originTokenAddress,
  destinationTokenAddress,
  originTokenPriceUsd,
  destinationTokenPriceUsd,
  transactionStates,
  fees,
  slippageTolerance,
  priceImpact,
  originNativeTokenPriceUsd,
}: {
  originAddress?: string
  destinationAddress?: string
  destinationCalldata?: string
  originChainId: number
  destinationChainId?: number
  originAmount: string
  originAmountMin?: string
  destinationAmount: string
  destinationAmountMin?: string
  originTokenAddress: string
  destinationTokenAddress?: string
  originTokenPriceUsd?: string | null
  destinationTokenPriceUsd?: string | null
  transactionStates?: TransactionState[]
  fees?: PrepareSendFees
  slippageTolerance?: string
  priceImpact?: string
  originNativeTokenPriceUsd?: number | null
}): Promise<PrepareSendQuote> {
  if (!destinationChainId) {
    throw new Error("Destination chain id is required")
  }

  if (!destinationTokenAddress && originChainId === destinationChainId) {
    destinationTokenAddress = originTokenAddress
  }

  if (!destinationTokenAddress && originChainId === destinationChainId) {
    destinationTokenAddress = originTokenAddress
  }

  if (!destinationTokenAddress) {
    throw new Error("Destination token address is required")
  }

  const originToken = await getTokenInfo(originChainId, originTokenAddress)
  const destinationToken = await getTokenInfo(
    destinationChainId,
    destinationTokenAddress,
  )

  const originChain = getChainInfo(originChainId)
  const destinationChain = getChainInfo(destinationChainId)

  if (!originToken || !destinationToken || !originChain || !destinationChain) {
    console.error("[trails-sdk] Token or chain not found", {
      originToken,
      destinationToken,
      originChain,
      destinationChain,
    })
    throw new Error("Token or chain not found")
  }

  const originAmountMinFormatted = formatRawAmount(
    originAmountMin || "0",
    originToken.decimals,
  )
  const originAmountMinUsdFormatted = formatAmount(
    calcAmountUsdPrice({
      amount: originAmountMinFormatted,
      usdPrice: originTokenPriceUsd,
    }),
  )
  const originAmountMinUsdDisplay = formatUsdAmountDisplay(
    originAmountMinUsdFormatted,
  )

  const destinationAmountMinFormatted = formatRawAmount(
    destinationAmountMin || "0",
    destinationToken.decimals,
  )
  const destinationAmountMinUsdFormatted = formatAmount(
    calcAmountUsdPrice({
      amount: destinationAmountMinFormatted,
      usdPrice: destinationTokenPriceUsd,
    }),
  )
  const destinationAmountMinUsdDisplay = formatUsdAmountDisplay(
    destinationAmountMinUsdFormatted,
  )

  const originAmountFormatted = formatRawAmount(
    originAmount,
    originToken.decimals,
  )
  const originAmountUsdFormatted = formatAmount(
    calcAmountUsdPrice({
      amount: originAmountFormatted,
      usdPrice: originTokenPriceUsd,
    }),
  )
  const originAmountUsdDisplay = formatUsdAmountDisplay(
    originAmountUsdFormatted,
  )

  const destinationAmountFormatted = formatRawAmount(
    destinationAmount,
    destinationToken.decimals,
  )
  const destinationAmountUsdFormatted = formatAmount(
    calcAmountUsdPrice({
      amount: destinationAmountFormatted,
      usdPrice: destinationTokenPriceUsd,
    }),
  )
  const destinationAmountUsdDisplay = formatUsdAmountDisplay(
    destinationAmountUsdFormatted,
  )

  const hasCustomCalldata = getIsCustomCalldata(destinationCalldata)

  const publicClient = createPublicClient({
    chain: originChain,
    transport: http(),
  })

  let gasCostUsd: number = 0
  let gasCostUsdDisplay: string = "0"
  try {
    if (originNativeTokenPriceUsd) {
      gasCostUsd = await estimateGasCostUsd(
        publicClient,
        originNativeTokenPriceUsd,
        200_000n,
      )
      gasCostUsdDisplay = formatUsdAmountDisplay(gasCostUsd)
    }
  } catch (error) {
    console.error("[trails-sdk] Error estimating gas cost", error)
  }

  return {
    originAddress: originAddress || "",
    destinationAddress: destinationAddress || "",
    destinationCalldata: hasCustomCalldata ? destinationCalldata || "" : "",
    originAmount: originAmount || "0",
    originAmountMin: originAmountMin || originAmount || "0",
    originAmountMinUsdFormatted: originAmountMinUsdFormatted || "0",
    originAmountMinUsdDisplay: originAmountMinUsdDisplay || "0",
    destinationAmount: destinationAmount || "0",
    destinationAmountMin: destinationAmountMin || destinationAmount || "0",
    destinationAmountMinUsdFormatted: destinationAmountMinUsdFormatted || "0",
    destinationAmountMinUsdDisplay: destinationAmountMinUsdDisplay || "0",
    originAmountFormatted,
    originAmountUsdFormatted,
    originAmountUsdDisplay,
    destinationAmountFormatted,
    destinationAmountUsdFormatted,
    destinationAmountUsdDisplay,
    originToken,
    destinationToken,
    fees: fees || getZeroFees(),
    slippageTolerance: slippageTolerance || "0",
    priceImpact: priceImpact || "0",
    originChain,
    destinationChain,
    completionEstimateSeconds: getCompletionEstimateSeconds({
      originChainId,
      destinationChainId,
    }),
    transactionStates: transactionStates || [],
    gasCostUsd,
    gasCostUsdDisplay,
  }
}
