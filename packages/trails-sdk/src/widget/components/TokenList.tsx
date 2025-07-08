import { NetworkImage, TokenImage } from "@0xsequence/design-system"
import type { SequenceIndexerGateway } from "@0xsequence/indexer"
import { ChevronLeft, Search } from "lucide-react"
import type React from "react"
import type { ActiveTheme } from "../../theme.js"
import type { Token, TokenFormatted } from "../hooks/useTokenList.js"
import { useTokenList } from "../hooks/useTokenList.js"

interface TokenListProps {
  onContinue: (selectedToken: Token) => void
  onBack: () => void
  indexerGatewayClient: SequenceIndexerGateway
  theme?: ActiveTheme
  toAmountUsd?: string | null
}

export const TokenList: React.FC<TokenListProps> = ({
  onContinue,
  onBack,
  indexerGatewayClient,
  theme = "light",
  toAmountUsd,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    handleTokenSelect,
    filteredTokens,
    isLoadingSortedTokens,
    balanceError,
    isTokenSelected,
    selectedToken,
    showContinueButton,
    filteredTokensFormatted,
  } = useTokenList({
    onContinue,
    indexerGatewayClient,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center relative">
        {!toAmountUsd && (
          <button
            type="button"
            onClick={onBack}
            className={`absolute -left-2 p-2 rounded-full transition-colors cursor-pointer ${
              theme === "dark"
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <h2
          className={`text-lg font-semibold w-full ${toAmountUsd ? "text-left" : "text-center"} ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          {toAmountUsd ? `Pay ${toAmountUsd} with` : "Select Token"}
        </h2>
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

      {balanceError && (
        <div
          className={`border rounded-lg p-4 mb-4 ${
            theme === "dark"
              ? "bg-red-900/20 border-red-800"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start">
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${theme === "dark" ? "text-red-200" : "text-red-800"}`}
              >
                Error loading balances
              </h3>
              <p
                className={`text-sm mt-1 ${theme === "dark" ? "text-red-200" : "text-red-700"}`}
              >
                {balanceError instanceof Error
                  ? balanceError.message
                  : "Failed to fetch token balances. Please try again."}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={`mt-2 text-sm font-medium underline ${
                  theme === "dark"
                    ? "text-red-200 hover:text-red-100"
                    : "text-red-700 hover:text-red-900"
                }`}
              >
                Refresh page
              </button>
            </div>
          </div>
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
          } = token

          return (
            <button
              key={`${chainId}-${contractAddress}`}
              type="button"
              onClick={() => handleTokenSelect(token)}
              className={`w-full py-2.5 px-3 flex items-center space-x-3 cursor-pointer transition-colors ${
                theme === "dark"
                  ? isTokenSelected(token)
                    ? "bg-gray-800"
                    : "hover:bg-gray-800/80"
                  : isTokenSelected(token)
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
              }`}
            >
              <div className="relative flex-shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {contractAddress ? (
                    <TokenImage
                      symbol={symbol[0]}
                      src={imageUrl}
                      disableAnimation={true}
                    />
                  ) : (
                    <span
                      className={`text-base font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {symbol}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5">
                  <NetworkImage
                    chainId={chainId}
                    size="sm"
                    className="w-3.5 h-3.5"
                    disableAnimation={true}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0 text-left">
                <h3
                  className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {tokenName}
                </h3>
                <p
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  {symbol}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                {priceUsd > 0 ? (
                  <>
                    <p
                      className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {balanceUsdFormatted}
                    </p>
                    <p
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {balanceFormatted}
                    </p>
                  </>
                ) : (
                  <p
                    className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {balanceFormatted}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>

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
