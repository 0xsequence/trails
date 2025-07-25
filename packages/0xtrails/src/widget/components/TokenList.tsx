import type { SequenceIndexerGateway } from "@0xsequence/indexer"
import { ChevronLeft, Search } from "lucide-react"
import type React from "react"
import type { ActiveTheme } from "../../theme.js"
import type { Token, TokenFormatted } from "../hooks/useTokenList.js"
import { useTokenList } from "../hooks/useTokenList.js"
import { TokenImage } from "./TokenImage.js"

interface TokenListProps {
  onContinue: (selectedToken: Token) => void
  onBack: () => void
  indexerGatewayClient: SequenceIndexerGateway
  theme?: ActiveTheme
  targetAmountUsd?: number | null
  targetAmountUsdFormatted?: string | null
  onError: (error: Error | string | null) => void
}

export const TokenList: React.FC<TokenListProps> = ({
  onContinue,
  onBack,
  indexerGatewayClient,
  theme = "light",
  targetAmountUsd,
  targetAmountUsdFormatted,
  onError,
}) => {
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
          {!targetAmountUsd && (
            <button
              type="button"
              onClick={onBack}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <h2
            className={`text-lg font-semibold ${targetAmountUsd ? "text-left" : "text-center"} ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {targetAmountUsd
              ? `Pay ${targetAmountUsdFormatted} with:`
              : "Select Token"}
          </h2>
        </div>

        {totalBalanceUsd > 0 && (
          <p
            className={`text-xs mr-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
            Total balance: {totalBalanceUsdFormatted}
          </p>
        )}
      </div>

      {/* Search Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search
            className={`h-5 w-5 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
          />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tokens"
          className={`block w-full pl-10 pr-3 py-2 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
      </div>

      {isLoadingSortedTokens && (
        <div className="text-center py-4">
          <div
            className={`animate-spin rounded-full h-8 w-8 border-b-2 mx-auto ${
              theme === "dark" ? "border-white" : "border-black"
            }`}
          ></div>
          <p
            className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
            Loading your token balances...
          </p>
        </div>
      )}

      {!isLoadingSortedTokens &&
        !balanceError &&
        filteredTokens.length === 0 && (
          <div
            className={`text-center py-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
          >
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              {searchQuery.trim()
                ? "No tokens found matching your search."
                : "No tokens found with balance greater than 0."}
            </p>
          </div>
        )}

      {/* Token List */}
      <div
        className={`divide-y ${
          theme === "dark" ? "divide-gray-700/50" : "divide-gray-200"
        } max-h-[35vh] overflow-y-auto rounded-[16px] ${theme === "dark" ? "bg-gray-800/50" : "bg-white"}`}
      >
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
              className={`w-full py-2.5 px-3 flex items-center space-x-3 transition-colors ${
                theme === "dark"
                  ? isTokenSelected(token)
                    ? "bg-gray-800"
                    : "hover:bg-gray-800/80"
                  : isTokenSelected(token)
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
              } ${!isSufficientBalance ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="relative flex-shrink-0">
                <div
                  className={`rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {contractAddress ? (
                    <TokenImage
                      symbol={symbol[0]}
                      imageUrl={imageUrl}
                      chainId={chainId}
                      size={32}
                    />
                  ) : (
                    <span
                      className={`text-base font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {symbol}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 text-left">
                <h3
                  className={`text-sm font-medium truncate ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  } ${!isSufficientBalance ? (theme === "dark" ? "text-gray-500" : "text-gray-400") : ""}`}
                >
                  {tokenName}
                </h3>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  } ${!isSufficientBalance ? (theme === "dark" ? "text-gray-600" : "text-gray-400") : ""}`}
                >
                  {symbol}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                {priceUsd > 0 ? (
                  <>
                    <p
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      } ${!isSufficientBalance ? (theme === "dark" ? "text-gray-500" : "text-gray-400") : ""}`}
                    >
                      {balanceUsdFormatted}
                    </p>
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      } ${!isSufficientBalance ? (theme === "dark" ? "text-gray-600" : "text-gray-400") : ""}`}
                    >
                      {balanceFormatted}
                    </p>
                  </>
                ) : (
                  <p
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } ${!isSufficientBalance ? (theme === "dark" ? "text-gray-500" : "text-gray-400") : ""}`}
                  >
                    {balanceFormatted}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {showInsufficientBalance && (
        <div
          className={`text-left py-3 px-4 rounded-lg ${
            theme === "dark"
              ? "bg-amber-500/10 border border-amber-500/30"
              : "bg-amber-50 border border-amber-200"
          }`}
        >
          <p
            className={`text-xs font-medium ${theme === "dark" ? "text-amber-400" : "text-amber-700"}`}
          >
            Insufficient balance
          </p>
          <p
            className={`text-xs mt-1 ${theme === "dark" ? "text-amber-300" : "text-amber-600"}`}
          >
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
            className={`w-full font-semibold py-3 px-4 rounded-[24px] transition-colors ${
              theme === "dark"
                ? "bg-blue-600 disabled:bg-gray-700 text-white disabled:text-gray-400 enabled:hover:bg-blue-700"
                : "bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 enabled:hover:bg-blue-600"
            } disabled:cursor-not-allowed cursor-pointer`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default TokenList
