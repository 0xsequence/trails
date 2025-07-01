import type { SequenceAPIClient } from "@0xsequence/anypay-api"
import type { MetaTxnReceipt } from "@0xsequence/anypay-relayer"
import type { Relayer } from "@0xsequence/wallet-core"
import type { Payload } from "@0xsequence/wallet-primitives"
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
  formatUnits,
  http,
  parseUnits,
  zeroAddress,
} from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import * as chains from "viem/chains"
import { attemptSwitchChain } from "./chainSwitch.js"
import { getChainInfo } from "./chains.js"
import { getERC20TransferData } from "./encoders.js"
import { getExplorerUrl } from "./explorer.js"
import {
  getPermitCalls,
  getPermitSignature,
  runGasless7702Flow,
} from "./gasless.js"
import {
  calculateIntentAddress,
  commitIntentConfig,
  getIntentCallsPayloads as getIntentCallsPayloadsFromIntents,
  sendOriginTransaction,
} from "./intents.js"
import { getMetaTxStatus } from "./metaTxnMonitor.js"
import { relayerSendMetaTx } from "./metaTxns.js"
import { findFirstPreconditionForChainId } from "./preconditions.js"
import { getQueryParam } from "./queryParams.js"
import type { RelayerEnvConfig } from "./relayer.js"
import {
  executeSimpleRelayTransaction,
  getRelaySDKQuote,
  getTxHashFromRelayResult,
} from "./relaysdk.js"
import {
  getFeeOptions,
  sequenceSendTransaction,
  simpleCreateSequenceWallet,
} from "./sequenceWallet.js"
import { requestWithTimeout } from "./utils.js"

export type TransactionState = {
  transactionHash: string
  explorerUrl: string
  chainId: number
  state: "pending" | "failed" | "confirmed"
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
  originRelayer: Relayer.Rpc.RpcRelayer
  destinationRelayer: Relayer.Rpc.RpcRelayer
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
  send: (onOriginSend: () => void) => Promise<SendReturn>
}

export type SendReturn = {
  originUserTxReceipt: TransactionReceipt | null
  originMetaTxnReceipt: MetaTxnReceipt | null
  destinationMetaTxnReceipt: MetaTxnReceipt | null
}

export function getIsToSameChain(
  originChainId: number,
  destinationChainId: number,
) {
  return originChainId === destinationChainId
}

export function getIsToSameToken(
  originTokenAddress: string,
  destinationTokenAddress: string,
) {
  return originTokenAddress === destinationTokenAddress
}

export function getIsToSameChainAndToken(
  originChainId: number,
  originTokenAddress: string,
  destinationChainId: number,
  destinationTokenAddress: string,
) {
  return (
    getIsToSameChain(originChainId, destinationChainId) &&
    getIsToSameToken(originTokenAddress, destinationTokenAddress)
  )
}

function isTestnetDebugMode() {
  return getQueryParam("testnet") === "true"
}

function getTestnetOriginTokenAddress() {
  return "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
}

// TODO: fix up this one-click send
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
    gasless,
    relayerConfig,
    sequenceProjectAccessKey,
  } = options

  if (!walletClient) {
    throw new Error("Wallet client not provided")
  }

  const chain = getChainInfo(originChainId)!
  const isToSameChain = getIsToSameChain(originChainId, destinationChainId)
  const isToSameToken = getIsToSameToken(
    originTokenAddress,
    destinationTokenAddress,
  )

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  const testnet = isTestnetDebugMode()
  const testnetOriginTokenAddress = getTestnetOriginTokenAddress()

  console.log("testnet", testnet)

  const mainSignerAddress = account.address

  const _destinationCalldata =
    destinationCalldata ||
    (destinationTokenAddress === zeroAddress
      ? "0x"
      : getERC20TransferData(recipient, BigInt(destinationTokenAmount)))
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

  const transactionStates: TransactionState[] = []

  // origin tx
  transactionStates.push({
    transactionHash: "",
    explorerUrl: "",
    chainId: originChainId,
    state: "pending",
  })

  if (!isToSameChain) {
    // swap + bridge tx
    transactionStates.push({
      transactionHash: "",
      explorerUrl: "",
      chainId: originChainId,
      state: "pending",
    })

    // destination tx
    transactionStates.push({
      transactionHash: "",
      explorerUrl: "",
      chainId: destinationChainId,
      state: "pending",
    })
  }

  if (isToSameChain && !isToSameToken) {
    return sendHandlerForSameChainDifferentToken({
      originTokenAmount,
      originTokenAddress,
      destinationTokenAmount,
      destinationTokenAddress,
      destinationCalldata,
      recipient,
      originChainId,
      walletClient,
      publicClient,
    })
  }

  if (isToSameToken && isToSameChain) {
    return sendHandlerForSameChainSameToken({
      originTokenAmount,
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

  console.log("Creating intent with args:", intentArgs)
  const intent = await getIntentCallsPayloadsFromIntents(
    apiClient,
    intentArgs as any,
  ) // TODO: Add proper type
  console.log("Got intent:", intent)

  if (!intent) {
    throw new Error("Invalid intent")
  }

  if (
    !intent.preconditions?.length ||
    !intent.calls?.length ||
    !intent.anypayInfos?.length
  ) {
    throw new Error("Invalid intent")
  }

  const intentAddress = calculateIntentAddress(
    mainSignerAddress,
    intent.calls as any[],
    intent.anypayInfos as any[],
    intent.anypayFee?.quoteProvider as "lifi" | "relay",
  ) // TODO: Add proper type
  console.log("Calculated intent address:", intentAddress.toString())

  await commitIntentConfig(
    apiClient,
    mainSignerAddress,
    intent.calls as any[],
    intent.preconditions as any[],
    intent.anypayInfos as any[],
    intent.anypayFee?.quoteProvider as "lifi" | "relay",
  )

  console.log("Committed intent config")

  const firstPrecondition = findFirstPreconditionForChainId(
    intent.preconditions,
    originChainId,
  )

  if (!firstPrecondition) {
    throw new Error("No precondition found for origin chain")
  }

  // const firstPreconditionAddress = firstPrecondition?.data?.address
  const firstPreconditionMin = firstPrecondition?.data?.min?.toString()

  return {
    intentAddress,
    originSendAmount: firstPreconditionMin,
    send: async (onOriginSend: () => void): Promise<SendReturn> => {
      console.log("sending origin transaction")

      const firstPrecondition = findFirstPreconditionForChainId(
        intent.preconditions,
        originChainId,
      )

      if (!firstPrecondition) {
        throw new Error("No precondition found for origin chain")
      }

      const firstPreconditionAddress = firstPrecondition?.data?.address
      const firstPreconditionMin = firstPrecondition?.data?.min?.toString()

      // ETH fee required by some bridges for low token amounts
      // TODO: update backend API to return the native fee requirement, if any
      let needsNativeFee = false
      console.log("sourceTokenPriceUsd", sourceTokenPriceUsd)
      console.log("destinationTokenPriceUsd", destinationTokenPriceUsd)
      console.log("sourceTokenDecimals", sourceTokenDecimals)
      console.log("destinationTokenDecimals", destinationTokenDecimals)
      if (
        originTokenAddress !== zeroAddress &&
        sourceTokenPriceUsd &&
        destinationTokenPriceUsd &&
        firstPreconditionMin &&
        destinationTokenDecimals !== undefined &&
        sourceTokenDecimals !== undefined
      ) {
        // Convert from wei to token units using formatUnits
        const destinationAmount = Number(
          formatUnits(BigInt(destinationTokenAmount), destinationTokenDecimals),
        )
        const preconditionMin = Number(
          formatUnits(BigInt(firstPreconditionMin), destinationTokenDecimals),
        )
        console.log("destinationAmount", destinationAmount)
        console.log("preconditionMin", preconditionMin)
        const destinationAmountUsd =
          destinationAmount * destinationTokenPriceUsd
        const preconditionMinUsd = preconditionMin * sourceTokenPriceUsd
        const diff = preconditionMinUsd - destinationAmountUsd
        console.log(
          "destinationAmountUsd",
          destinationAmountUsd,
          "preconditionMinUsd",
          preconditionMinUsd,
          "diff",
          diff,
        )
        if (diff >= 0 && diff <= 0.02) {
          needsNativeFee = true
        }
      }
      console.log("needsNativeFee", needsNativeFee)

      // const originCallParams = {
      //   to:
      //     originTokenAddress === zeroAddress
      //       ? firstPreconditionAddress
      //       : originTokenAddress,
      //   data:
      //     originTokenAddress === zeroAddress
      //       ? "0x"
      //       : getERC20TransferData(
      //           firstPreconditionAddress,
      //           BigInt(firstPreconditionMin) + BigInt(fee),
      //         ),
      //   value:
      //     originTokenAddress === zeroAddress
      //       ? BigInt(firstPreconditionMin) + BigInt(fee)
      //       : "0",
      //   chainId: originChainId,
      //   chain,
      // }

      let originUserTxReceipt: TransactionReceipt | null = null
      let originMetaTxnReceipt: any = null // TODO: Add proper type
      let destinationMetaTxnReceipt: any = null // TODO: Add proper type

      const doGasless =
        originTokenAddress !== zeroAddress && (gasless || paymasterUrl)
      try {
        console.log("doGasless", doGasless, paymasterUrl)
        if (doGasless) {
          if (paymasterUrl) {
            console.log("doing gasless with paymaster")
            const txHash = await runGasless7702Flow(
              walletClient,
              testnet ? chains.baseSepolia : chain,
              testnet
                ? (testnetOriginTokenAddress as `0x${string}`)
                : (originTokenAddress as `0x${string}`),
              BigInt(firstPreconditionMin),
              intentAddress as `0x${string}`,
              paymasterUrl,
            )
            if (onOriginSend) {
              onOriginSend()
            }

            const receipt = await publicClient.waitForTransactionReceipt({
              hash: txHash as `0x${string}`,
            })
            console.log("receipt", receipt)
            originUserTxReceipt = receipt
          } else {
            console.log("doing gasless with sequence wallet")
            const delegatorPrivateKey = generatePrivateKey()
            const delegatorAccount = privateKeyToAccount(delegatorPrivateKey)
            const delegatorClient = createWalletClient({
              account: delegatorAccount,
              chain: testnet ? chains.baseSepolia : chain,
              transport: http(),
            })

            console.log("attempting to switch chain")
            await attemptSwitchChain(walletClient, originChainId)

            console.log("creating sequence wallet")
            const sequenceWalletAddress = await simpleCreateSequenceWallet(
              delegatorAccount as any,
              relayerConfig,
              sequenceProjectAccessKey,
            )
            console.log("sequenceWalletAddress", sequenceWalletAddress)

            // Initialize clients
            const sequencePublicClient = createPublicClient({
              chain: testnet ? chains.baseSepolia : chain,
              transport: http(),
            })

            const { signature, deadline } = await getPermitSignature(
              sequencePublicClient as PublicClient,
              walletClient,
              account.address,
              sequenceWalletAddress,
              testnet
                ? (testnetOriginTokenAddress as `0x${string}`)
                : (originTokenAddress as `0x${string}`),
              BigInt(firstPreconditionMin),
              testnet ? chains.baseSepolia : chain,
            )

            const calls = getPermitCalls(
              account.address,
              sequenceWalletAddress,
              BigInt(firstPreconditionMin),
              deadline,
              signature,
              intentAddress as `0x${string}`,
              testnet
                ? (testnetOriginTokenAddress as `0x${string}`)
                : (originTokenAddress as `0x${string}`),
            )

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

            console.log("feeOptions", feeOptions)

            const sequenceTxHash = await sequenceSendTransaction(
              sequenceWalletAddress,
              delegatorClient,
              sequencePublicClient as PublicClient,
              calls,
              testnet ? chains.baseSepolia : chain,
              relayerConfig,
              sequenceProjectAccessKey,
            )
            console.log("sequenceTxHash", sequenceTxHash)
            if (onOriginSend) {
              onOriginSend()
            }

            const receipt = await publicClient.waitForTransactionReceipt({
              hash: sequenceTxHash as `0x${string}`,
            })
            console.log("receipt", receipt)
            originUserTxReceipt = receipt
          }
        }
      } catch (error) {
        console.log("gassless attempt failed", error)
      }

      // If gasless attempt failed, try to send a regular transaction
      if (!originUserTxReceipt) {
        // ETH fee required by some bridges for low token amounts
        // TODO: update backend API to return the native fee requirement, if any
        let needsNativeFee = false
        let nativeFee = parseUnits("0.00005", 18).toString()
        if (originChainId === 137) {
          nativeFee = parseUnits("1.5", 18).toString()
        }
        console.log("sourceTokenPriceUsd", sourceTokenPriceUsd)
        console.log("destinationTokenPriceUsd", destinationTokenPriceUsd)
        console.log("sourceTokenDecimals", sourceTokenDecimals)
        console.log("destinationTokenDecimals", destinationTokenDecimals)
        if (
          originTokenAddress !== zeroAddress &&
          sourceTokenPriceUsd &&
          destinationTokenPriceUsd &&
          firstPreconditionMin &&
          destinationTokenDecimals !== undefined &&
          sourceTokenDecimals !== undefined
        ) {
          // Convert from wei to token units using formatUnits
          const destinationAmount = Number(
            formatUnits(
              BigInt(destinationTokenAmount),
              destinationTokenDecimals,
            ),
          )
          const preconditionMin = Number(
            formatUnits(BigInt(firstPreconditionMin), destinationTokenDecimals),
          )
          console.log("destinationAmount", destinationAmount)
          console.log("preconditionMin", preconditionMin)
          const destinationAmountUsd =
            destinationAmount * destinationTokenPriceUsd
          const preconditionMinUsd = preconditionMin * sourceTokenPriceUsd
          const diff = preconditionMinUsd - destinationAmountUsd
          console.log(
            "destinationAmountUsd",
            destinationAmountUsd,
            "preconditionMinUsd",
            preconditionMinUsd,
            "diff",
            diff,
          )
          if (diff >= 0 && diff <= 0.02) {
            needsNativeFee = true
          }
        }
        console.log("needsNativeFee", needsNativeFee)

        const originCallParams = {
          to:
            originTokenAddress === zeroAddress
              ? firstPreconditionAddress
              : originTokenAddress,
          data:
            originTokenAddress === zeroAddress
              ? "0x"
              : getERC20TransferData(
                  firstPreconditionAddress,
                  BigInt(firstPreconditionMin) + BigInt(fee),
                ),
          value:
            originTokenAddress === zeroAddress
              ? BigInt(firstPreconditionMin) + BigInt(fee)
              : "0",
          chainId: originChainId,
          chain,
        }

        onTransactionStateChange(transactionStates)
        await attemptSwitchChain(walletClient, originChainId)

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

            console.log("capabilities", capabilities)

            // Check if the chain supports atomic transactions
            const chainHex = `0x${originChainId.toString(16)}` as const
            const chainCapabilities = capabilities[chainHex]
            useSendCalls = chainCapabilities?.atomic?.status === "supported"
          } catch (error) {
            console.error("Error getting capabilities", error)
          }
        }

        if (dryMode) {
          console.log("dry mode, skipping send calls")
        }

        if (useSendCalls) {
          console.log("using sendCalls")
        } else {
          console.log("using sendTransaction")
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
                to: firstPreconditionAddress as `0x${string}`,
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

            console.log("sendCalls result", result)
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

              console.log("getCallsStatus result", status)
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
            console.log("receipt", receipt)
            originUserTxReceipt = receipt
          }
        } else {
          if (!dryMode) {
            if (needsNativeFee) {
              const tx0 = await sendOriginTransaction(account, walletClient, {
                to: firstPreconditionAddress,
                data: "0x00",
                value: nativeFee,
                chainId: originChainId,
                chain,
              } as any) // TODO: Add proper type
              console.log("origin tx", tx0)
              // Wait for transaction receipt
              const feeReceipt = await publicClient.waitForTransactionReceipt({
                hash: tx0,
              })
              console.log("nativeFeeReceipt", feeReceipt)
            }

            const tx = await sendOriginTransaction(
              account,
              walletClient,
              originCallParams as any,
            ) // TODO: Add proper type
            console.log("origin tx", tx)

            if (onOriginSend) {
              onOriginSend()
            }

            // Wait for transaction receipt
            const receipt = await publicClient.waitForTransactionReceipt({
              hash: tx,
            })
            console.log("receipt", receipt)
            originUserTxReceipt = receipt
          }
        }
      }

      transactionStates[0] = {
        transactionHash: originUserTxReceipt?.transactionHash!,
        explorerUrl: getExplorerUrl(
          originUserTxReceipt?.transactionHash!,
          originChainId,
        ),
        chainId: originChainId,
        state:
          originUserTxReceipt?.status === "success" ? "confirmed" : "failed",
      }

      onTransactionStateChange(transactionStates)

      await new Promise((resolve) => setTimeout(resolve, 2000)) // TODO: make sure relayer is ready with a better check

      const metaTx = intent.metaTxns[0]!
      console.log("metaTx", metaTx)
      const opHash = await relayerSendMetaTx(originRelayer, metaTx, [
        intent.preconditions[0]!,
      ])

      console.log("opHash", opHash)

      // eslint-disable-next-line no-constant-condition
      while (true) {
        console.log(
          "polling status",
          metaTx.id as `0x${string}`,
          BigInt(metaTx.chainId),
        )
        const receipt: any = await getMetaTxStatus(
          originRelayer,
          metaTx.id,
          Number(metaTx.chainId),
        )
        console.log("status", receipt)
        if (receipt?.transactionHash) {
          originMetaTxnReceipt = receipt.data?.receipt
          break
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      transactionStates[1] = {
        transactionHash: originMetaTxnReceipt?.txnHash!,
        explorerUrl: getExplorerUrl(
          originMetaTxnReceipt?.txnHash!,
          originChainId,
        ),
        chainId: originChainId,
        state:
          originMetaTxnReceipt?.status === "SUCCEEDED" ? "confirmed" : "failed",
      }

      onTransactionStateChange(transactionStates)

      if (!isToSameChain) {
        await new Promise((resolve) => setTimeout(resolve, 2000)) // TODO: make sure relayer is ready with a better check
        const metaTx2 = intent.metaTxns[1]!
        console.log("metaTx2", metaTx2)

        const opHash2 = await relayerSendMetaTx(destinationRelayer, metaTx2, [
          intent.preconditions[1]!,
        ])
        console.log("opHash2", opHash2)

        // eslint-disable-next-line no-constant-condition
        while (true) {
          console.log(
            "polling status",
            metaTx2.id as `0x${string}`,
            BigInt(metaTx2.chainId),
          )
          const receipt: any = await getMetaTxStatus(
            destinationRelayer,
            metaTx2.id,
            Number(metaTx2.chainId),
          )
          console.log("receipt", receipt)
          if (receipt?.transactionHash) {
            destinationMetaTxnReceipt = receipt.data?.receipt
            break
          }
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        transactionStates[2] = {
          transactionHash: destinationMetaTxnReceipt?.txnHash!,
          explorerUrl: getExplorerUrl(
            destinationMetaTxnReceipt?.txnHash!,
            destinationChainId,
          ),
          chainId: destinationChainId,
          state:
            destinationMetaTxnReceipt?.status === "SUCCEEDED"
              ? "confirmed"
              : "failed",
        }

        onTransactionStateChange(transactionStates)
      }

      return {
        originUserTxReceipt,
        originMetaTxnReceipt,
        destinationMetaTxnReceipt,
      }
    },
  }
}

function sendHandlerForSameChainSameToken({
  originTokenAmount,
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
  originTokenAmount: string
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
}) {
  console.log("isToSameToken && isToSameChain")
  return {
    originSendAmount: originTokenAmount,
    send: async (onOriginSend: () => void): Promise<SendReturn> => {
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
            : getERC20TransferData(recipient, BigInt(destinationTokenAmount))),
        value:
          originTokenAddress === zeroAddress
            ? BigInt(destinationTokenAmount)
            : "0",
        chainId: originChainId,
        chain,
      }

      console.log("origin call params", originCallParams)

      let originUserTxReceipt: TransactionReceipt | null = null
      const originMetaTxnReceipt: any = null // TODO: Add proper type
      const destinationMetaTxnReceipt: any = null // TODO: Add proper type

      await attemptSwitchChain(walletClient, originChainId)
      if (!dryMode) {
        onTransactionStateChange([
          {
            transactionHash: "",
            explorerUrl: "",
            chainId: originChainId,
            state: "pending",
          },
        ])
        console.log("origin call params", originCallParams)
        const txHash = await sendOriginTransaction(
          account,
          walletClient,
          originCallParams as any,
        ) // TODO: Add proper type
        console.log("origin tx", txHash)

        if (onOriginSend) {
          onOriginSend()
        }

        // Wait for transaction receipt
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
        console.log("receipt", receipt)
        originUserTxReceipt = receipt

        onTransactionStateChange([
          {
            transactionHash: originUserTxReceipt?.transactionHash!,
            explorerUrl: getExplorerUrl(
              originUserTxReceipt?.transactionHash!,
              originChainId,
            ),
            chainId: originChainId,
            state:
              originUserTxReceipt?.status === "success"
                ? "confirmed"
                : "failed",
          },
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

function sendHandlerForSameChainDifferentToken({
  originTokenAmount,
  originTokenAddress,
  destinationTokenAmount,
  destinationTokenAddress,
  destinationCalldata,
  recipient,
  originChainId,
  walletClient,
  publicClient,
}: {
  originTokenAmount: string
  originTokenAddress: string
  destinationTokenAmount: string
  destinationTokenAddress: string
  destinationCalldata?: string
  recipient: string
  originChainId: number
  walletClient: WalletClient
  publicClient: PublicClient
}) {
  return {
    originSendAmount: originTokenAmount,
    send: async (onOriginSend: () => void): Promise<SendReturn> => {
      const destinationTxs = []
      if (destinationCalldata) {
        destinationTxs.push({
          to: recipient,
          value:
            destinationTokenAddress === zeroAddress
              ? destinationTokenAmount
              : "0",
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

      console.log("relaysdk quote", quote)

      await attemptSwitchChain(walletClient, originChainId)

      const result = await executeSimpleRelayTransaction(quote, walletClient)
      console.log("relaysdk result", result)

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
