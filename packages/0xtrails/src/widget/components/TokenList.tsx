import type { SequenceIndexerGateway } from "@0xsequence/indexer"
import { ChevronLeft, Search } from "lucide-react"
import type React from "react"
import { useEffect, useRef } from "react"
import type { Token, TokenFormatted } from "../hooks/useTokenList.js"
import { useTokenList } from "../hooks/useTokenList.js"
import { TokenImage } from "./TokenImage.js"
import type { Mode } from "../../mode.js"

interface TokenListProps {
  onContinue: (selectedToken: Token) => void
  onBack: () => void
  indexerGatewayClient: SequenceIndexerGateway
  targetAmountUsd?: number | null
  targetAmountUsdFormatted?: string | null
  onError: (error: Error | string | null) => void
  mode?: Mode
}

export const TokenList: React.FC<TokenListProps> = ({
  onContinue,
  onBack,
  indexerGatewayClient,
  targetAmountUsd,
  targetAmountUsdFormatted,
  onError,
  mode,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-focus the search input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])
  const {
    searchQuery,
    setSearchQuery,
    handleTokenSelect,
    filteredTokens,
    isLoadingSortedTokens,
    isTokenSelected,
    selectedToken,
    showContinueButton,
    filteredTokensFormatted,
    totalBalanceUsd,
    totalBalanceUsdFormatted,
    showInsufficientBalance,
    balanceError,
  } = useTokenList({
    onContinue,
    targetAmountUsd,
    indexerGatewayClient,
    onError,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center">
          {!targetAmountUsd && mode !== "fund" && (
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-full transition-colors cursor-pointer hover:trails-hover-bg text-gray-400"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <h2
            className={`text-lg font-semibold ${targetAmountUsd || mode === "fund" ? "text-left" : "text-center"} ${"text-gray-900 dark:text-white"}`}
          >
            {mode === "fund"
              ? "Fund with any token in your wallet"
              : targetAmountUsd
                ? `Pay ${targetAmountUsdFormatted} with:`
                : "Select Token"}
          </h2>
        </div>

        {totalBalanceUsd > 0 && mode !== "fund" && (
          <div className="text-right max-w-[125px] mr-8">
            <p className={`text-xs ${"text-gray-500 dark:text-gray-400"}`}>
              Total balance:
            </p>
            <p
              className={`text-xs font-medium ${"text-gray-900 dark:text-white"}`}
            >
              {totalBalanceUsdFormatted}
            </p>
          </div>
        )}
      </div>

      {/* Search Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${"text-gray-500 dark:text-gray-500"}`} />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tokens"
          className="block w-full pl-10 pr-3 py-2 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-input"
        />
      </div>

      {isLoadingSortedTokens && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto border-black dark:border-white"></div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Loading your token balances...
          </p>
        </div>
      )}

      {!isLoadingSortedTokens &&
        !balanceError &&
        filteredTokens.length === 0 && (
          <div className="text-center py-4 rounded-lg trails-bg-secondary">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery.trim()
                ? "No tokens found matching your search."
                : "No tokens found with balance greater than 0."}
            </p>
          </div>
        )}

      {/* Token List */}
      {filteredTokensFormatted.length > 0 && (
        <div className="max-h-[35vh] overflow-y-auto trails-border-radius-list trails-scrollbar trails-list">
          {filteredTokensFormatted.map((token: TokenFormatted) => {
            const {
              symbol,
              imageUrl,
              chainId,
              contractAddress,
              balanceUsdFormatted,
              tokenName,
              priceUsd,
              balanceFormatted,
              isSufficientBalance,
            } = token

            return (
              <button
                key={`${chainId}-${contractAddress}`}
                type="button"
                onClick={() => handleTokenSelect(token)}
                title={
                  !isSufficientBalance
                    ? "Insufficient balance for this token"
                    : undefined
                }
                className={`w-full py-2.5 px-3 flex items-center space-x-3 transition-colors trails-list-item border-b trails-border-list ${
                  isTokenSelected(token) ? "bg-gray-50 dark:bg-gray-800" : ""
                } ${!isSufficientBalance ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700`}
                  >
                    {contractAddress ? (
                      <TokenImage
                        symbol={symbol[0]}
                        imageUrl={imageUrl}
                        chainId={chainId}
                        size={32}
                      />
                    ) : (
                      <span className="text-base font-medium text-gray-600 dark:text-gray-300">
                        {symbol}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <h3
                    className={`text-sm font-medium truncate ${"text-gray-900 dark:text-white"} ${!isSufficientBalance ? "text-gray-500 dark:text-gray-500" : ""}`}
                  >
                    {tokenName}
                  </h3>
                  <p
                    className={`text-xs ${"text-gray-500 dark:text-gray-400"} ${!isSufficientBalance ? "text-gray-600 dark:text-gray-600" : ""}`}
                  >
                    {symbol}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  {priceUsd > 0 ? (
                    <>
                      <p
                        className={`text-sm font-medium ${"text-gray-900 dark:text-white"} ${!isSufficientBalance ? "text-gray-500 dark:text-gray-500" : ""}`}
                      >
                        {balanceUsdFormatted}
                      </p>
                      <p
                        className={`text-xs ${"text-gray-500 dark:text-gray-400"} ${!isSufficientBalance ? "text-gray-600 dark:text-gray-600" : ""}`}
                      >
                        {balanceFormatted}
                      </p>
                    </>
                  ) : (
                    <p
                      className={`text-sm font-medium ${"text-gray-900 dark:text-white"} ${!isSufficientBalance ? "text-gray-500 dark:text-gray-500" : ""}`}
                    >
                      {balanceFormatted}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {showInsufficientBalance && (
        <div
          className={`text-left py-3 px-4 rounded-lg ${"bg-amber-500/10 border border-amber-500/30"}`}
        >
          <p className={`text-xs font-medium ${"text-amber-400"}`}>
            Insufficient balance
          </p>
          <p className={`text-xs mt-1 ${"text-amber-300"}`}>
            You do not have enough funds to reach the target amount
          </p>
        </div>
      )}

      {showContinueButton && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => selectedToken && onContinue(selectedToken)}
            disabled={!selectedToken}
            className={`w-full font-semibold py-3 px-4 trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default TokenList
