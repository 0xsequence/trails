import type { SequenceIndexerGateway } from "@0xsequence/indexer"
import { ChevronLeft, Search, ChevronDown } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { Token, TokenFormatted } from "../hooks/useTokenList.js"
import { useTokenList } from "../hooks/useTokenList.js"
import { TokenImage } from "./TokenImage.js"
import { ChainImage } from "./ChainImage.js"
import type { Mode } from "../../mode.js"
import type { SupportedToken } from "../../tokens.js"
import { RecentTokens } from "./RecentTokens.js"
import { getChainInfo } from "../../chains.js"

interface TokenListProps {
  onContinue: (selectedToken: Token) => void
  onBack: () => void
  indexerGatewayClient: SequenceIndexerGateway
  targetAmountUsd?: number | null
  targetAmountUsdFormatted?: string | null
  onError: (error: Error | string | null) => void
  mode?: Mode
  recentTokens?: SupportedToken[]
  onRecentTokenSelect?: (token: SupportedToken) => void
  fundMethod?: string | null
  renderInline?: boolean
}

export const TokenList: React.FC<TokenListProps> = ({
  onContinue,
  onBack,
  indexerGatewayClient,
  targetAmountUsd,
  targetAmountUsdFormatted,
  onError,
  mode,
  recentTokens = [],
  onRecentTokenSelect,
  fundMethod,
  renderInline = false,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [filterByChainId, setFilterByChainId] = useState<number | null>(null)
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)

  useEffect(() => {
    // Auto-focus the search input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsChainDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  const {
    searchQuery,
    setSearchQuery,
    handleTokenSelect,
    filteredTokens,
    isLoadingTokens,
    isTokenSelected,
    selectedToken,
    showContinueButton,
    filteredTokensFormatted: baseFilteredTokensFormatted,
    totalBalanceUsd,
    totalBalanceUsdFormatted,
    showInsufficientBalance,
    balanceError,
  } = useTokenList({
    onContinue,
    targetAmountUsd,
    indexerGatewayClient,
    onError,
    fundMethod,
  })

  // Apply chain filter to tokens
  const filteredTokensFormatted = useMemo(() => {
    if (filterByChainId === null) {
      return baseFilteredTokensFormatted
    }
    return baseFilteredTokensFormatted.filter(
      (token) => token.chainId === filterByChainId,
    )
  }, [baseFilteredTokensFormatted, filterByChainId])

  // Get unique chains from all tokens (not filtered by chain)
  const uniqueChains = useMemo(() => {
    const chainIds = new Set(
      baseFilteredTokensFormatted.map((token) => token.chainId),
    )
    return Array.from(chainIds)
      .map((chainId) => {
        const chainInfo = getChainInfo(chainId)
        return {
          chainId,
          name: chainInfo?.name || `Chain ${chainId}`,
          imageUrl: "", // We'll use TokenImage component for chain icons
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [baseFilteredTokensFormatted])

  // Filter recent tokens to only show ones that exist in the current token list and match search
  const filteredRecentTokens = recentTokens.filter((recentToken) => {
    // First check if this recent token exists in the current token list
    const existsInTokenList = filteredTokensFormatted.some(
      (token) =>
        token.contractAddress.toLowerCase() ===
          recentToken.contractAddress.toLowerCase() &&
        token.chainId === recentToken.chainId,
    )

    if (!existsInTokenList) return false

    // Then apply search filtering
    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase()
    return (
      recentToken.symbol.toLowerCase().includes(query) ||
      recentToken.name.toLowerCase().includes(query) ||
      recentToken.contractAddress.toLowerCase().includes(query)
    )
  })

  // Handle recent token selection by finding the actual token from the list
  const handleRecentTokenSelect = (recentToken: SupportedToken) => {
    // Find the actual token from the filtered tokens list
    const actualToken = filteredTokensFormatted.find(
      (token) =>
        token.contractAddress.toLowerCase() ===
          recentToken.contractAddress.toLowerCase() &&
        token.chainId === recentToken.chainId,
    )

    if (actualToken) {
      // Use the actual token with balance info
      handleTokenSelect(actualToken)
    } else if (onRecentTokenSelect) {
      // Fallback to the original handler if token not found in current list
      onRecentTokenSelect(recentToken)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center">
          {mode !== "fund" && (
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

        {totalBalanceUsd > 0 &&
          mode !== "fund" &&
          fundMethod !== "qr-code" &&
          fundMethod !== "exchange" && (
            <div
              className={`text-right max-w-[125px] ${renderInline ? "" : "mr-8"}`}
            >
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
          className="block w-full pl-10 pr-12 py-2 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-input"
        />

        {/* Chain Filter Dropdown Button */}
        <div
          className="absolute inset-y-0 right-0 flex items-center"
          ref={dropdownRef}
        >
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsChainDropdownOpen(!isChainDropdownOpen)
            }}
            className="h-full px-3 flex items-center gap-2 cursor-pointer"
          >
            {filterByChainId && (
              <ChainImage chainId={filterByChainId} size={20} />
            )}
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                isChainDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isChainDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 min-w-10 p-2 trails-bg-secondary trails-border trails-border-radius-list shadow-lg z-50 max-h-[300px] overflow-y-auto trails-scrollbar">
              {/* All option */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFilterByChainId(null)
                  setIsChainDropdownOpen(false)
                }}
                className={`flex items-center justify-center py-2 cursor-pointer hover:trails-hover-bg transition-colors ${
                  filterByChainId === null ? "trails-bg-selected" : ""
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gray-400" />
                </div>
              </div>

              {/* Chain options */}
              {uniqueChains.map((chain) => (
                <div
                  key={chain.chainId}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setFilterByChainId(chain.chainId)
                    setIsChainDropdownOpen(false)
                  }}
                  className={`flex items-center justify-center py-2 cursor-pointer hover:trails-hover-bg transition-colors ${
                    filterByChainId === chain.chainId
                      ? "trails-bg-selected"
                      : ""
                  }`}
                >
                  <ChainImage chainId={chain.chainId} size={32} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Tokens */}
      <AnimatePresence>
        {!isLoadingTokens && filteredRecentTokens.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.05, ease: "easeOut" }}
          >
            <RecentTokens
              recentTokens={filteredRecentTokens}
              onTokenSelect={handleRecentTokenSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoadingTokens && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto border-black dark:border-white"></div>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Loading your token balances...
          </p>
        </div>
      )}

      {!isLoadingTokens && !balanceError && filteredTokens.length === 0 && (
        <div className="text-center py-4 rounded-lg trails-bg-secondary">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery.trim()
              ? "No tokens found matching your search."
              : fundMethod === "qr-code" || fundMethod === "exchange"
                ? ""
                : "No tokens found with balance greater than 0."}
          </p>
        </div>
      )}

      {/* Token List */}
      {filteredTokensFormatted.length > 0 && (
        <div className="max-h-[35vh] overflow-y-auto trails-border-radius-list trails-scrollbar trails-list">
          <AnimatePresence mode="popLayout">
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
                <motion.button
                  key={`${chainId}-${contractAddress}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.05,
                    ease: "easeOut",
                    layout: { duration: 0.08, ease: "easeOut" },
                  }}
                  type="button"
                  onClick={() => handleTokenSelect(token)}
                  title={
                    !isSufficientBalance &&
                    fundMethod !== "qr-code" &&
                    fundMethod !== "exchange"
                      ? "Insufficient balance for this token"
                      : undefined
                  }
                  className={`w-full py-2.5 px-3 flex items-center space-x-3 transition-colors trails-list-item border-b trails-border-list ${
                    isTokenSelected(token) ? "bg-gray-50 dark:bg-gray-800" : ""
                  } ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
                      className={`text-sm font-medium truncate ${"text-gray-900 dark:text-white"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-500 dark:text-gray-500" : ""}`}
                    >
                      {tokenName}
                    </h3>
                    <p
                      className={`text-xs ${"text-gray-500 dark:text-gray-400"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-600 dark:text-gray-600" : ""}`}
                    >
                      {symbol}
                    </p>
                  </div>

                  {fundMethod !== "qr-code" && fundMethod !== "exchange" && (
                    <div className="text-right flex-shrink-0">
                      {priceUsd > 0 ? (
                        <>
                          <p
                            className={`text-sm font-medium ${"text-gray-900 dark:text-white"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-500 dark:text-gray-500" : ""}`}
                          >
                            {balanceUsdFormatted}
                          </p>
                          <p
                            className={`text-xs ${"text-gray-500 dark:text-gray-400"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-600 dark:text-gray-600" : ""}`}
                          >
                            {balanceFormatted}
                          </p>
                        </>
                      ) : (
                        <p
                          className={`text-sm font-medium ${"text-gray-900 dark:text-white"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-500 dark:text-gray-500" : ""}`}
                        >
                          {balanceFormatted}
                        </p>
                      )}
                    </div>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {showInsufficientBalance &&
        fundMethod !== "qr-code" &&
        fundMethod !== "exchange" && (
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
