import { TokenImage } from "@0xsequence/design-system"
import { ChevronDown, Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

interface Token {
  id: string
  symbol: string
  name: string
  contractAddress: string
  decimals: number
  chainId: number
  chainName: string
  imageUrl: string
}

interface TokenSelectorProps {
  selectedToken: { chainId: number; contractAddress: string } | undefined
  onTokenSelect: (token: Token | null) => void
  tokens: Token[]
  disabled?: boolean
  className?: string
  placeholder?: string
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  tokens,
  disabled = false,
  className = "",
  placeholder = "Select Token",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedTokenData = tokens.find((token: Token) => {
    return (
      token.chainId === selectedToken?.chainId &&
      token.contractAddress.toLowerCase() ===
        selectedToken?.contractAddress.toLowerCase()
    )
  })

  // Check if all tokens have the same chain ID
  const allSameChain = useMemo(() => {
    if (tokens.length <= 1) return true
    const firstChainId = tokens[0]?.chainId
    return tokens.every((token) => token.chainId === firstChainId)
  }, [tokens])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleTokenSelect = (token: Token | null) => {
    onTokenSelect(token)
    setIsDropdownOpen(false)
    setSearchTerm("") // Clear search when selecting
  }

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      // Small delay to ensure the dropdown is rendered
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isDropdownOpen])

  // Filter tokens based on search term
  const filteredTokens = useMemo(() => {
    if (!searchTerm.trim()) {
      return tokens
    }

    const query = searchTerm.toLowerCase().trim()
    const queryParts = query.split(/\s+/).filter((part) => part.length > 0)

    const filtered = tokens.filter((token: Token) => {
      const tokenName = token.name || ""
      const tokenSymbol = token.symbol || ""
      const chainName = token.chainName || ""
      const chainId = token.chainId?.toString() || ""
      const tokenNameLower = tokenName.toLowerCase()
      const tokenSymbolLower = tokenSymbol.toLowerCase()
      const chainNameLower = chainName.toLowerCase()
      const contractAddress = token.contractAddress || ""

      // If multiple query parts, check if they match any combination
      if (queryParts.length > 1) {
        const matchesName = queryParts.some((part) =>
          tokenNameLower.includes(part),
        )
        const matchesSymbol = queryParts.some((part) =>
          tokenSymbolLower.includes(part),
        )
        const matchesChainName = queryParts.some((part) =>
          chainNameLower.includes(part),
        )
        const matchesChainId = queryParts.some((part) => chainId.includes(part))
        const matchesAddress = queryParts.some((part) =>
          contractAddress.toLowerCase().includes(part),
        )
        return (
          matchesName ||
          matchesSymbol ||
          matchesChainName ||
          matchesChainId ||
          matchesAddress
        )
      }

      // Single query part - match against any field
      return queryParts.some(
        (part) =>
          tokenNameLower.includes(part) ||
          tokenSymbolLower.includes(part) ||
          chainNameLower.includes(part) ||
          chainId.includes(part) ||
          contractAddress.toLowerCase().includes(part),
      )
    })

    // Deduplicate by symbol and chainId combination
    const seen = new Set<string>()
    return filtered.filter((token: Token) => {
      const key = `${token.symbol}-${token.chainId}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }, [tokens, searchTerm])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
        disabled={disabled}
        className={`w-full flex items-center px-3 sm:px-4 h-12 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          disabled
            ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
            : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-200"
        }`}
      >
        {selectedTokenData ? (
          <>
            <TokenImage
              symbol={
                selectedTokenData.imageUrl
                  ? selectedTokenData.symbol
                  : selectedTokenData.symbol[0]
              }
              src={selectedTokenData.imageUrl}
              size="sm"
              disableAnimation={true}
              className={disabled ? "opacity-50" : ""}
            />
            <div className="ml-2 flex-1 text-left">
              <div
                className={`font-medium text-sm truncate ${
                  disabled
                    ? "text-gray-500"
                    : "text-gray-900 dark:text-gray-200"
                }`}
              >
                {selectedTokenData.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {selectedTokenData.symbol}
                {!allSameChain && selectedTokenData.chainName && (
                  <span className="ml-1">• {selectedTokenData.chainName}</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <span
            className={`flex-1 text-left text-sm truncate ${
              disabled ? "text-gray-500" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {placeholder}
          </span>
        )}
        <ChevronDown
          className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {isDropdownOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {/* Search Input */}
          <div className="sticky top-0 p-3 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 z-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tokens..."
                className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Clear Selection Option */}
          <button
            type="button"
            onClick={() => handleTokenSelect(null)}
            className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm ${
              !selectedToken
                ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                : "text-gray-900 dark:text-gray-200"
            }`}
          >
            <span className="ml-2">{placeholder}</span>
            {!selectedToken && <span className="ml-auto text-blue-400">•</span>}
          </button>

          {/* Token List */}
          {filteredTokens.map((token: Token, index: number) => (
            <button
              key={`${token.symbol}-${token.chainId || "native"}-${token.contractAddress || index}`}
              type="button"
              onClick={() => handleTokenSelect(token)}
              className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm ${
                selectedToken?.chainId === token.chainId &&
                selectedToken?.contractAddress?.toLowerCase() ===
                  token.contractAddress?.toLowerCase()
                  ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-200"
              }`}
            >
              <TokenImage
                symbol={token.imageUrl ? token.symbol : token.symbol[0]}
                src={token.imageUrl}
                size="sm"
                disableAnimation={true}
              />
              <div className="ml-2 flex-1 text-left">
                <div className="font-medium">{token.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {token.symbol}
                  {!allSameChain && token.chainName && (
                    <span className="ml-1">• {token.chainName}</span>
                  )}
                </div>
              </div>
              {selectedToken?.chainId === token.chainId &&
                selectedToken?.contractAddress?.toLowerCase() ===
                  token.contractAddress?.toLowerCase() && (
                  <span className="ml-auto text-blue-400">•</span>
                )}
            </button>
          ))}

          {/* No results message */}
          {filteredTokens.length === 0 && searchTerm.trim() && (
            <div className="px-3 sm:px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              No tokens found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
