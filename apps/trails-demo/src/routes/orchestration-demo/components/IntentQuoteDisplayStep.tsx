import { NetworkImage, Text } from "@0xsequence/design-system"
import type {
  IntentCallsPayload,
  IntentPrecondition,
} from "@0xsequence/trails-api"
import type { MetaTxn, TokenBalance, TrailsFee, WagmiAccount } from "0xtrails"
import {
  AlertCircle,
  AlertTriangle,
  Box,
  Clipboard,
  Info,
  Layers,
  Loader2,
  PenSquare,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { Address as OxAddress } from "ox"
import type React from "react"
import { formatUnits, type Hex, isAddressEqual, zeroAddress } from "viem"
import {
  MOCK_CHAIN_ID,
  MOCK_CONTRACT_ADDRESS,
  MOCK_TOKEN_ADDRESS,
  MOCK_TOKEN_AMOUNT,
  PAY_AMOUNT,
  PAY_CHAIN_ID,
  PAY_RECIPIENT_ADDRESS,
  PAY_TOKEN_DECIMALS,
  PAY_TOKEN_SYMBOL,
} from "@/config"
import { SectionHeader } from "@/routes/orchestration-demo/components/SectionHeader"
import type { IntentAction } from "@/types"
import { getChainInfo } from "@/utils/formatting"

interface IntentQuoteDisplayStepProps {
  createIntentPending: boolean
  createIntentError: Error | null
  intentCallsPayloads: IntentCallsPayload[] | null
  intentPreconditions: IntentPrecondition[] | null
  metaTxns: MetaTxn[] | null
  trailsFee: TrailsFee | null
  intentActionType: IntentAction | null
  selectedToken: TokenBalance | null
  account: WagmiAccount | undefined
  customCallData: {
    to: string
    value: string
    chainId: string
    data: string
  }
}

export const IntentQuoteDisplayStep: React.FC<IntentQuoteDisplayStepProps> = ({
  createIntentPending,
  createIntentError,
  intentCallsPayloads,
  intentPreconditions,
  metaTxns,
  trailsFee,
  intentActionType,
  selectedToken,
  account,
  customCallData,
}) => {
  if (createIntentPending) {
    return (
      <div className="px-6 pb-6">
        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 animate-pulse">
          <div className="flex items-center text-center">
            <Loader2 className="animate-spin h-4 w-4 mr-2 text-yellow-500" />
            <Text variant="small" color="warning">
              Generating intent quote...
            </Text>
          </div>
        </div>
      </div>
    )
  }

  if (createIntentError) {
    return (
      <div className="px-6 pb-6">
        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
          <Text
            variant="small"
            color="negative"
            className="break-words flex items-center text-center"
          >
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>Error: {createIntentError.message}</span>
          </Text>
        </div>
      </div>
    )
  }

  if (!intentCallsPayloads) {
    return (
      <div className="px-6 pb-6">
        <div className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4 flex items-center justify-center text-gray-300">
          <Text
            variant="small"
            color="secondary"
            className="flex flex-col items-center text-center text-gray-300"
          >
            <ShieldCheck className="h-10 w-10 text-gray-600 mb-2 text-gray-300" />
            Select a token and click an action above to generate the intent
            quote.
          </Text>
        </div>
      </div>
    )
  }

  const primarySubtitleNode = (() => {
    if (!intentCallsPayloads || !intentActionType || !selectedToken) return null

    if (intentActionType === "pay") {
      const baseChainInfo = getChainInfo(PAY_CHAIN_ID)
      const baseChainName = baseChainInfo?.name || `Chain ID ${PAY_CHAIN_ID}`
      return (
        <>
          <Zap className="h-3.5 w-3.5 mr-1.5 text-purple-400 flex-shrink-0" />
          Intent: Send{" "}
          <strong className="text-gray-200 mx-1">
            {formatUnits(PAY_AMOUNT, PAY_TOKEN_DECIMALS)} {PAY_TOKEN_SYMBOL}
          </strong>
          to{" "}
          <strong
            className="text-gray-200 font-mono mx-1 truncate max-w-[100px]"
            title={PAY_RECIPIENT_ADDRESS}
          >
            {PAY_RECIPIENT_ADDRESS}
          </strong>
          on <strong className="text-gray-200 mx-1">{baseChainName}</strong>
        </>
      )
    } else if (intentActionType === "mock_interaction") {
      const mockChainInfo = getChainInfo(MOCK_CHAIN_ID)
      const mockChainName = mockChainInfo?.name || `Chain ID ${MOCK_CHAIN_ID}`
      return (
        <>
          <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-yellow-400 flex-shrink-0" />
          Intent: Target{" "}
          <strong
            className="text-gray-200 font-mono mx-1 truncate max-w-[70px]"
            title={MOCK_CONTRACT_ADDRESS}
          >
            {MOCK_CONTRACT_ADDRESS}
          </strong>
          on <strong className="text-gray-200 mx-1">{mockChainName}</strong>.
          {(MOCK_TOKEN_ADDRESS || MOCK_TOKEN_AMOUNT) && (
            <span className="ml-1">
              (Token:{" "}
              <strong
                className="text-gray-200 font-mono mx-1 truncate max-w-[70px]"
                title={MOCK_TOKEN_ADDRESS || "N/A"}
              >
                {MOCK_TOKEN_ADDRESS || "N/A"}
              </strong>
              , Amount:{" "}
              <strong className="text-gray-200 mx-1">
                {MOCK_TOKEN_AMOUNT || "N/A"} wei
              </strong>
              )
            </span>
          )}
        </>
      )
    } else if (intentActionType === "custom_call") {
      const destChainId = parseInt(customCallData.chainId)
      const destChainInfo = getChainInfo(destChainId)
      const destChainName = destChainInfo?.name || `Chain ID ${destChainId}`
      const formattedVal = formatUnits(
        BigInt(customCallData.value || "0"),
        destChainInfo?.nativeCurrency.decimals || 18,
      )
      const nativeSymbol = destChainInfo?.nativeCurrency.symbol || "ETH"

      return (
        <>
          <PenSquare className="h-3.5 w-3.5 mr-1.5 text-green-400 flex-shrink-0" />
          Intent: Call{" "}
          <strong
            className="text-gray-200 font-mono mx-1 truncate max-w-[70px]"
            title={customCallData.to}
          >
            {customCallData.to}
          </strong>
          on <strong className="text-gray-200 mx-1">{destChainName}</strong>.
          {BigInt(customCallData.value || "0") > 0 && (
            <span className="ml-1">
              (Value:{" "}
              <strong className="text-gray-200 mx-1">
                {formattedVal} {nativeSymbol}
              </strong>
              )
            </span>
          )}
        </>
      )
    }
    return null
  })()

  const routeSubtitleNode = (() => {
    if (
      !intentCallsPayloads ||
      !intentActionType ||
      !selectedToken ||
      !account?.address ||
      !intentPreconditions
    )
      return null

    try {
      const tokenName =
        selectedToken.contractInfo?.symbol ||
        selectedToken.contractInfo?.name ||
        "Token"
      const selectedTokenChainIdStr = selectedToken.chainId.toString()
      const originChainInfo = getChainInfo(selectedToken.chainId)
      const originChainName =
        originChainInfo?.name || `Chain ID ${selectedToken.chainId}`
      let amountToSendFormatted = "[Amount Error]"

      const isNativeEquivalent = selectedToken.contractAddress === zeroAddress
      let amountBigInt: bigint | undefined
      let decimals: number | undefined

      if (isNativeEquivalent) {
        const nativePrecondition = intentPreconditions.find(
          (p: IntentPrecondition) =>
            (p.type === "transfer-native" || p.type === "native-balance") &&
            p.chainId === selectedTokenChainIdStr,
        )
        const nativeMinAmount =
          nativePrecondition?.data?.minAmount ?? nativePrecondition?.data?.min
        if (nativeMinAmount !== undefined) {
          amountBigInt = BigInt(nativeMinAmount)
          decimals = selectedToken.contractInfo?.decimals || 18
        }
      } else {
        const erc20Precondition = intentPreconditions.find(
          (p: IntentPrecondition) =>
            p.type === "erc20-balance" &&
            p.chainId === selectedTokenChainIdStr &&
            p.data?.token &&
            isAddressEqual(
              OxAddress.from(p.data.token),
              OxAddress.from(selectedToken.contractAddress as Hex),
            ),
        )
        const erc20MinAmount = erc20Precondition?.data?.min
        if (erc20MinAmount !== undefined) {
          amountBigInt = BigInt(erc20MinAmount)
          decimals = selectedToken.contractInfo?.decimals
        }
      }

      if (amountBigInt !== undefined && decimals !== undefined) {
        amountToSendFormatted = formatUnits(amountBigInt, decimals)
      } else {
        console.warn(
          "Could not determine amount to send from preconditions for subtitle.",
        )
        amountToSendFormatted = "[Unknown Amount]"
      }

      return (
        <>
          <Info className="h-3.5 w-3.5 mr-1.5 text-sky-400 flex-shrink-0" />
          <span>
            Via route: Sending{" "}
            <strong className="text-gray-200 mx-1">
              {amountToSendFormatted} {tokenName}
            </strong>
            on <strong className="text-gray-200 mx-1">{originChainName}</strong>{" "}
            to intent addr:
            <strong
              className="text-gray-200 font-mono mx-1 truncate max-w-[70px] sm:max-w-[100px] inline-block align-bottom"
              title={undefined}
            >
              {undefined}
            </strong>
          </span>
        </>
      )
    } catch (routeError) {
      console.error("Error processing route subtitle data:", routeError)
      return (
        <span className="flex items-center text-red-400">
          <AlertTriangle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
          Error generating route summary.
        </span>
      )
    }
  })()

  return (
    <SectionHeader
      noFrame={true}
      titleContainerClassName="px-6 pt-4 pb-4 flex items-center justify-between w-full hover:bg-gray-700/60 rounded-md"
      contentContainerClassName="px-6 pb-4 border-t border-gray-700/30"
      isCollapsible={true}
      defaultOpen={false}
      title={
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-2 shadow-lg">
            <span>4</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Intent Quote</h3>
        </div>
      }
      actionSubtitle={primarySubtitleNode}
      subtitle={routeSubtitleNode}
    >
      <div className="text-xs text-gray-300 bg-gray-900/90 p-4 mt-2 rounded-lg border-t border-gray-700/70 overflow-x-auto space-y-2 shadow-inner animate-fadeIn">
        <Text
          variant="medium"
          color="primary"
          className="mb-2 pb-1 border-b border-gray-700/50 flex items-center text-gray-300"
        >
          <Zap className="h-4 w-4 mr-1 text-gray-300" />
          Intent all payloads
          <Text
            variant="small"
            color="secondary"
            className="ml-1 text-gray-300"
          >
            (List of all payloads that are pre-authorized to be executed):
          </Text>
        </Text>

        {intentCallsPayloads && intentCallsPayloads.length > 0 ? (
          <div className="space-y-2">
            <div className="bg-gray-800/70 p-3 rounded-md mb-4">
              <div className="flex items-center justify-between mb-2">
                <Text
                  variant="small"
                  color="primary"
                  className="font-semibold flex items-center text-gray-300"
                >
                  <Clipboard className="h-4 w-4 mr-2" />
                  Raw JSON Data
                </Text>
              </div>
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap bg-gray-900/50 p-2 rounded border border-gray-700/50 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {JSON.stringify(intentCallsPayloads, null, 2)}
              </pre>
            </div>
            {intentCallsPayloads.map((operation, index) => (
              <div
                key={`operation-${index}`}
                className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
              >
                <div className="pb-2">
                  <Text
                    variant="small"
                    color="primary"
                    className="font-semibold text-gray-300"
                  >
                    Payload #{index + 1}
                  </Text>
                </div>
                {operation.calls &&
                  operation.calls.length > 0 &&
                  operation.calls.map((call, callIndex) => (
                    <div
                      key={`call-${index}-${callIndex}`}
                      className="space-y-2"
                    >
                      <div className="bg-gray-800/70 p-2 rounded-md mb-1">
                        <Text variant="small" color="secondary">
                          <strong className="text-blue-300">To: </strong>{" "}
                          <span className="text-yellow-300 break-all font-mono">
                            {call.to}
                          </span>
                        </Text>
                      </div>
                      <div className="bg-gray-800/70 p-2 rounded-md mb-1">
                        <Text variant="small" color="secondary">
                          <strong className="text-blue-300">Value: </strong>
                          <span className="font-mono text-gray-300">
                            {call.value || "0"}
                          </span>
                        </Text>
                      </div>
                      <div className="bg-gray-800/70 p-2 rounded-md mb-1">
                        <Text variant="small" color="secondary">
                          <div className="break-all">
                            <strong className="text-blue-300">Data: </strong>
                            <div className="max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                              <span className="font-mono text-green-300">
                                {call.data || "0x"}
                              </span>
                            </div>
                          </div>
                        </Text>
                      </div>
                      <div className="bg-gray-800/70 p-2 rounded-md mb-1 flex items-center">
                        <Text variant="small" color="secondary">
                          <strong className="text-blue-300">Chain ID: </strong>
                          <span className="font-mono bg-blue-900/30 px-2 py-0.5 rounded-full text-gray-300">
                            {operation.chainId.toString()}
                          </span>
                        </Text>
                        <NetworkImage
                          chainId={parseInt(operation.chainId.toString())}
                          size="sm"
                          className="w-4 h-4 ml-1"
                        />
                        <Text
                          variant="small"
                          color="secondary"
                          className="ml-1 text-gray-300"
                        >
                          {getChainInfo(parseInt(operation.chainId.toString()))
                            ?.name || "Unknown Chain"}
                        </Text>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/70 p-3 rounded-md border border-gray-700/50">
            <Text variant="small" color="secondary">
              No operations available.
            </Text>
          </div>
        )}

        {metaTxns && metaTxns.length > 0 && (
          <div className="mt-4">
            <Text
              variant="medium"
              color="primary"
              className="mb-2 pb-1 border-b border-gray-700/50 flex items-center text-gray-300"
            >
              <Layers className="h-4 w-4 mr-1 text-gray-300" />
              Meta-transactions
              <Text
                variant="small"
                color="secondary"
                className="ml-1 text-gray-300"
              >
                (Transactions that will be relayed):
              </Text>
            </Text>
            <div className="space-y-2">
              <div className="bg-gray-800/70 p-3 rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Text
                    variant="small"
                    color="primary"
                    className="font-semibold flex items-center text-gray-300"
                  >
                    <Clipboard className="h-4 w-4 mr-2" />
                    Raw JSON Data
                  </Text>
                </div>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap bg-gray-900/50 p-2 rounded border border-gray-700/50 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {JSON.stringify(metaTxns, null, 2)}
                </pre>
              </div>
              {metaTxns.map((tx, index) => (
                <div
                  key={`metatx-${index}`}
                  className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
                >
                  <div className="space-y-2">
                    <div className="bg-gray-800/70 p-2 rounded-md mb-1">
                      <Text variant="small" color="secondary">
                        <strong className="text-blue-300">ID: </strong>
                        <span className="font-mono text-yellow-300 break-all">
                          {tx.id || "N/A"}
                        </span>
                      </Text>
                    </div>
                    <div className="bg-gray-800/70 p-2 rounded-md mb-1">
                      <Text variant="small" color="secondary">
                        <strong className="text-blue-300">Contract: </strong>
                        <span className="font-mono text-yellow-300 break-all">
                          {tx.contract || "N/A"}
                        </span>
                      </Text>
                    </div>
                    <div className="bg-gray-800/70 p-2 rounded-md mb-1">
                      <Text variant="small" color="secondary">
                        <strong className="text-blue-300">Chain ID: </strong>
                        <span className="font-mono bg-blue-900/30 px-2 py-0.5 rounded-full text-gray-300">
                          {tx.chainId.toString()}
                        </span>
                        <NetworkImage
                          chainId={parseInt(tx.chainId.toString())}
                          size="sm"
                          className="w-4 h-4 ml-1 inline-block"
                        />
                        <span className="ml-1 text-gray-300">
                          {getChainInfo(parseInt(tx.chainId.toString()))
                            ?.name || "Unknown Chain"}
                        </span>
                      </Text>
                    </div>
                    <div className="bg-gray-800/70 p-2 rounded-md mb-1">
                      <Text variant="small" color="secondary">
                        <div className="break-all">
                          <strong className="text-blue-300">
                            Input Data:{" "}
                          </strong>
                          <div className="max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            <span className="font-mono text-green-300">
                              {tx.input || "0x"}
                            </span>
                          </div>
                        </div>
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {trailsFee && (
          <div className="mt-4">
            <Text
              variant="medium"
              color="primary"
              className="mb-2 pb-1 border-b border-gray-700/50 flex items-center text-gray-300"
            >
              <Zap className="h-4 w-4 mr-1 text-gray-300" />
              Trails Fee
            </Text>
            <div className="space-y-2">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 space-y-2">
                {trailsFee.totalFeeUSD && trailsFee.totalFeeAmount && (
                  <div className="text-lg font-semibold text-white flex items-center">
                    Total Estimated Fee:{" "}
                    <span className="text-green-400">
                      $
                      {Number(trailsFee.totalFeeUSD).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                      })}
                    </span>{" "}
                    <span className="font-medium text-gray-400 text-xs ml-1.5">
                      (Total Fee Amount: {trailsFee.totalFeeAmount})
                    </span>
                  </div>
                )}
                {trailsFee.quoteProvider && (
                  <div className="text-xs font-semibold text-white flex items-center">
                    Quote Provider:
                    <span className="font-mono text-yellow-300 ml-2 text-xs font-medium bg-gray-900/50 px-2 py-1 rounded-md border border-gray-700/50">
                      {trailsFee.quoteProvider.toLocaleUpperCase()}
                    </span>
                  </div>
                )}
                {trailsFee.feeToken && (
                  <div className="text-xs font-semibold text-white flex items-center">
                    Fee Token:
                    <span className="font-mono text-yellow-300 ml-2 text-xs font-medium bg-gray-900/50 px-2 py-1 rounded-md border border-gray-700/50">
                      {trailsFee.feeToken}
                    </span>
                  </div>
                )}
                {trailsFee.trailsFixedFeeUSD && (
                  <div className="text-xs font-semibold text-white flex items-center">
                    Fixed Fee ($0.01):
                    <span className="font-mono text-yellow-300 ml-2 text-xs font-medium bg-gray-900/50 px-2 py-1 rounded-md border border-gray-700/50">
                      {trailsFee.trailsFixedFeeUSD}
                    </span>
                  </div>
                )}

                {trailsFee.crossChainFee && (
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">
                      Cross-Chain Fees
                    </h4>
                    <div className="space-y-1 text-sm pl-2">
                      <p>
                        <span className="font-medium text-gray-400">
                          Provider Fee:
                        </span>{" "}
                        $
                        {trailsFee.crossChainFee.providerFeeUSD.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          },
                        )}{" "}
                        <span className="font-medium text-gray-400">
                          (Excluded from total fee)
                        </span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-400">
                          Trails Fee:
                        </span>{" "}
                        $
                        {trailsFee.crossChainFee.trailsSwapFeeUSD.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          },
                        )}
                      </p>
                      <p>
                        <span className="font-medium text-gray-400">
                          Total Fee:
                        </span>{" "}
                        {trailsFee.crossChainFee.totalFeeAmount} (
                        {trailsFee.feeToken})
                      </p>
                      <p>
                        <span className="font-medium text-gray-400">
                          Total Fee (USD):
                        </span>{" "}
                        $
                        {trailsFee.crossChainFee.totalFeeUSD.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          },
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {trailsFee.executeQuote &&
                  trailsFee.executeQuote.chainQuotes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">
                        Execution Fees
                      </h4>
                      {trailsFee.executeQuote.chainQuotes.map(
                        (quote, index) => {
                          const chainInfo = getChainInfo(
                            parseInt(quote.chainId),
                          )
                          return (
                            <div
                              key={index}
                              className="bg-gray-800/70 p-3 rounded-md mb-2"
                            >
                              <div className="flex items-center mb-2">
                                <NetworkImage
                                  chainId={parseInt(quote.chainId)}
                                  size="sm"
                                  className="w-4 h-4 mr-2"
                                />
                                <strong className="text-gray-300">
                                  {chainInfo?.name ||
                                    `Chain ID: ${quote.chainId}`}
                                </strong>
                              </div>
                              <div className="space-y-1 text-sm pl-2">
                                <p>
                                  <span className="font-medium text-gray-400">
                                    Total Fee:
                                  </span>{" "}
                                  {formatUnits(
                                    BigInt(quote.totalFeeAmount),
                                    chainInfo?.nativeCurrency.decimals ?? 18,
                                  )}{" "}
                                  {quote.nativeTokenSymbol ||
                                    chainInfo?.nativeCurrency.symbol}
                                  {quote.totalFeeUSD &&
                                    ` ($${Number(quote.totalFeeUSD).toFixed(
                                      5,
                                    )})`}
                                </p>
                                {quote.metaTxnFeeDetails.map(
                                  (detail, detailIndex) => (
                                    <div
                                      key={detailIndex}
                                      className="pl-2 border-l border-gray-600 mt-1"
                                    >
                                      <p>
                                        <span className="font-medium text-gray-500">
                                          MetaTxn ID:
                                        </span>{" "}
                                        {detail.metaTxnID}
                                      </p>
                                      <p>
                                        <span className="font-medium text-gray-500">
                                          Fee:
                                        </span>{" "}
                                        {formatUnits(
                                          BigInt(detail.feeNative),
                                          chainInfo?.nativeCurrency.decimals ??
                                            18,
                                        )}{" "}
                                        {quote.nativeTokenSymbol ||
                                          chainInfo?.nativeCurrency.symbol}
                                      </p>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )
                        },
                      )}
                    </div>
                  )}
              </div>
              <div className="bg-gray-800/70 p-3 rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Text
                    variant="small"
                    color="primary"
                    className="font-semibold flex items-center text-gray-300"
                  >
                    <Clipboard className="h-4 w-4 mr-2" />
                    Raw JSON Data
                  </Text>
                </div>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap bg-gray-900/50 p-2 rounded border border-gray-700/50 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {JSON.stringify(trailsFee, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {intentPreconditions && intentPreconditions.length > 0 && (
          <>
            <Text
              variant="medium"
              color="primary"
              className="mt-4 mb-2 pb-1 border-b border-gray-700/50 flex items-center text-gray-300"
            >
              <Box className="h-4 w-4 mr-1 text-gray-300" />
              Preconditions
              <Text
                variant="small"
                color="secondary"
                className="ml-1 text-gray-300"
              >
                (Conditions that are to be met for the intent to be executed):
              </Text>
            </Text>
            <ul className="space-y-2 pl-2">
              {intentPreconditions.map((cond, index) => (
                <li
                  key={index}
                  className="break-all bg-gray-800/70 p-2 rounded-md border-l-2 border-purple-500"
                >
                  <pre className="font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(
                      cond,
                      (_, value) =>
                        typeof value === "bigint" ? value.toString() : value,
                      2,
                    )}
                  </pre>
                </li>
              ))}
            </ul>
          </>
        )}
        {!intentPreconditions?.length && (
          <div className="bg-gray-800/70 p-3 rounded-md border border-gray-700/50 mt-3">
            <Text
              variant="small"
              color="secondary"
              className="flex items-center text-center"
            >
              <Info className="h-4 w-4 mr-1 text-gray-500" />
              No specific preconditions returned for this intent.
            </Text>
          </div>
        )}
      </div>
    </SectionHeader>
  )
}
