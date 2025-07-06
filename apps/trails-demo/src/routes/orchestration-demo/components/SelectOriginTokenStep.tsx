import { NetworkImage, Text } from "@0xsequence/design-system"
import type { NativeTokenBalance, TokenBalance } from "@0xsequence/trails-sdk"
import type React from "react"
import { type Hex, zeroAddress } from "viem"
import { SectionHeader } from "@/routes/orchestration-demo/components/SectionHeader"
import { formatBalance, getChainInfo } from "@/utils/formatting"

interface SelectOriginTokenStepProps {
  isLoadingBalances: boolean
  balanceError: Error | null
  sortedTokens: (TokenBalance | NativeTokenBalance)[]
  selectedToken: TokenBalance | null
  setSelectedToken: (token: TokenBalance | null) => void
  clearIntent: () => void
}

export const SelectOriginTokenStep: React.FC<SelectOriginTokenStepProps> = ({
  isLoadingBalances,
  balanceError,
  sortedTokens,
  selectedToken,
  setSelectedToken,
  clearIntent,
}) => {
  return (
    <SectionHeader
      noFrame={true}
      titleContainerClassName="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex items-center justify-between w-full"
      contentContainerClassName="px-4 sm:px-6 pb-3 sm:pb-4"
      isCollapsible={false}
      title={
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mr-2 shadow-lg text-sm sm:text-base">
            <span>2</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Select Origin Token
          </h3>
        </div>
      }
      statusPill={
        <div className="px-2 sm:px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs sm:text-sm flex items-center">
          <span
            className={`w-2 h-2 rounded-full ${isLoadingBalances ? "bg-yellow-400" : sortedTokens.length > 0 ? "bg-green-400" : "bg-red-400"} mr-2 animate-pulse`}
          ></span>
          {isLoadingBalances
            ? "Loading..."
            : sortedTokens.length > 0
              ? `${sortedTokens.length} Tokens`
              : "No Tokens"}
        </div>
      }
    >
      {isLoadingBalances && (
        <Text variant="small" color="secondary">
          Loading balances...
        </Text>
      )}
      {balanceError && (
        <Text variant="small" color="negative">
          Error loading balances: {balanceError.message}
        </Text>
      )}
      {!isLoadingBalances && !balanceError && sortedTokens.length === 0 && (
        <Text variant="small" color="secondary">
          No tokens with balance &gt; 0 found across any chain.
        </Text>
      )}
      <div className="max-h-60 overflow-y-auto border border-gray-700/50 rounded-lg p-2 sm:p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {sortedTokens.map((token) => {
          const isNative = !("contractAddress" in token)
          const tokenBalance = isNative ? undefined : (token as TokenBalance)
          const chainInfo = getChainInfo(token.chainId)
          const nativeSymbol = chainInfo?.nativeCurrency.symbol || "ETH"

          return (
            <div
              key={
                isNative
                  ? `${token.chainId}-native`
                  : `${tokenBalance?.chainId}-${tokenBalance?.contractAddress}-${tokenBalance?.tokenID ?? "0"}`
              }
              onClick={() => {
                if (isNative) {
                  const nativeToken = token as NativeTokenBalance
                  const nativeAsTokenBalanceShape = {
                    ...nativeToken,
                    contractAddress: zeroAddress as Hex,
                    contractType: "ERC20", // Mimic ERC20 for selection logic
                    contractInfo: {
                      // Basic contractInfo structure
                      name: chainInfo?.nativeCurrency.name || "Native Token",
                      symbol: chainInfo?.nativeCurrency.symbol || "ETH",
                      decimals: 18,
                    },
                    // Ensure these fields are added to match the original cast's intent in home-index-route
                    blockHash:
                      "blockHash" in nativeToken && nativeToken.blockHash
                        ? nativeToken.blockHash
                        : "",
                    blockNumber:
                      "blockNumber" in nativeToken && nativeToken.blockNumber
                        ? nativeToken.blockNumber
                        : 0,
                    uniqueCollectibles:
                      "uniqueCollectibles" in nativeToken &&
                      nativeToken.uniqueCollectibles
                        ? nativeToken.uniqueCollectibles
                        : [],
                    isSummary:
                      "isSummary" in nativeToken &&
                      typeof nativeToken.isSummary === "boolean"
                        ? nativeToken.isSummary
                        : true,
                  }
                  setSelectedToken(
                    nativeAsTokenBalanceShape as unknown as TokenBalance,
                  )
                } else {
                  setSelectedToken(token as TokenBalance)
                }
                clearIntent()
              }}
              className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-center ${selectedToken?.chainId === token.chainId && (isNative ? selectedToken?.contractAddress === zeroAddress : selectedToken?.contractAddress === (token as TokenBalance).contractAddress) ? "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 shadow-lg" : "bg-gray-700/80 hover:bg-gray-600/90 hover:shadow-md"}`}
            >
              <div className="flex items-center min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2 shadow-sm">
                    <Text
                      variant="medium"
                      color="primary"
                      className="font-semibold text-xs sm:text-sm"
                    >
                      {isNative
                        ? nativeSymbol[0]
                        : tokenBalance?.contractInfo?.symbol?.[0] || "T"}
                    </Text>
                  </div>
                  <div className="absolute -bottom-1 right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-800 border-2 border-gray-700 shadow-sm">
                    <NetworkImage
                      chainId={token.chainId}
                      size="sm"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <Text
                    variant="medium"
                    color="primary"
                    className="font-semibold text-sm sm:text-base truncate"
                  >
                    {isNative
                      ? `${nativeSymbol} (${chainInfo?.name || "Unknown Chain"})`
                      : tokenBalance?.contractInfo?.symbol ||
                        tokenBalance?.contractInfo?.name ||
                        "Token"}
                  </Text>
                  {isNative && (
                    <Text
                      variant="small"
                      color="secondary"
                      className="ml-1 text-xs bg-blue-900/50 px-2 py-0.5 rounded-full"
                    >
                      Native
                    </Text>
                  )}
                </div>
              </div>
              <Text
                variant="small"
                color="secondary"
                className="font-mono bg-gray-800/50 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex-shrink-0 ml-2"
              >
                {formatBalance(token)}
              </Text>
            </div>
          )
        })}
      </div>
      {selectedToken && (
        <div className="mt-3 bg-green-900/20 border border-green-700/30 rounded-lg p-2 sm:p-3 animate-fadeIn">
          <Text
            variant="small"
            color="positive"
            className="flex flex-wrap items-center text-xs sm:text-sm"
          >
            <span className="bg-green-800 text-green-100 px-2 py-0.5 rounded-full text-xs mr-2">
              Selected
            </span>
            <span className="text-gray-300 font-semibold mr-1">
              {selectedToken.contractInfo?.symbol || "Native Token"}
            </span>
            <span className="text-gray-400 text-xs">
              Chain:{" "}
              <span className="text-gray-300">{selectedToken.chainId}</span>
            </span>
            <span className="ml-2 text-gray-400 text-xs truncate max-w-full">
              Address:{" "}
              <span className="text-gray-300 font-mono">
                {selectedToken.contractAddress}
              </span>
            </span>
          </Text>
        </div>
      )}
    </SectionHeader>
  )
}
