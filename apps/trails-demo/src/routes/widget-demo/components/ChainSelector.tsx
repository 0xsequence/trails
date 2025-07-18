import { NetworkImage } from "@0xsequence/design-system"
import { ChevronDown, Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

interface Chain {
  id: number
  name: string
}

interface ChainSelectorProps {
  selectedChainId: number | undefined
  onChainSelect: (chainId: number) => void
  chains: Chain[]
  disabled?: boolean
  className?: string
  showIconsOnly?: boolean
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({
  selectedChainId,
  onChainSelect,
  chains,
  disabled = false,
  className = "",
  showIconsOnly = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedChain = chains.find(
    (chain: Chain) => chain.id === selectedChainId,
  )

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

  const handleChainSelect = (chainId: number) => {
    onChainSelect(chainId)
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

  // Filter chains based on search term
  const filteredChains = useMemo(() => {
    if (!searchTerm.trim()) {
      return chains
    }

    const query = searchTerm.toLowerCase().trim()
    const queryParts = query.split(/\s+/).filter((part) => part.length > 0)

    const filtered = chains.filter((chain: Chain) => {
      const chainName = chain.name || ""
      const chainNameLower = chainName.toLowerCase()
      const chainIdStr = chain.id.toString()

      // If multiple query parts, check if they match chain name + chain ID combination
      if (queryParts.length > 1) {
        const matchesName = queryParts.some((part) =>
          chainNameLower.includes(part),
        )
        const matchesId = queryParts.some((part) => chainIdStr.includes(part))
        return matchesName || matchesId
      }

      // Single query part - match against any field
      return queryParts.some(
        (part) => chainNameLower.includes(part) || chainIdStr.includes(part),
      )
    })

    // Deduplicate by chain ID
    const seen = new Set<number>()
    return filtered.filter((chain: Chain) => {
      if (seen.has(chain.id)) {
        return false
      }
      seen.add(chain.id)
      return true
    })
  }, [chains, searchTerm])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
        disabled={disabled}
        className={`w-full flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-gray-200 ${showIconsOnly ? "justify-center" : ""}`}
      >
        {selectedChain ? (
          <>
            <NetworkImage
              chainId={selectedChain.id}
              size="sm"
              className="w-5 h-5"
              disableAnimation={true}
            />
            {!showIconsOnly && (
              <div className="ml-2 flex-1 text-left">
                <div className="font-medium text-gray-900 dark:text-gray-200 truncate">
                  {selectedChain.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  ID: {selectedChain.id}
                </div>
              </div>
            )}
          </>
        ) : (
          <span className="flex-1 text-left text-gray-500 dark:text-gray-400 truncate">
            {showIconsOnly ? "Select" : "Select Chain"}
          </span>
        )}
        {!showIconsOnly && (
          <ChevronDown
            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
          />
        )}
      </button>

      {isDropdownOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {/* Search Input */}
          <div className="sticky top-0 p-3 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search chains..."
                className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Clear Selection Option */}
          <button
            type="button"
            onClick={() => handleChainSelect(0)}
            className={`w-full flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${showIconsOnly ? "justify-center" : ""} ${
              !selectedChainId
                ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                : "text-gray-900 dark:text-gray-200"
            }`}
          >
            <span className={showIconsOnly ? "" : "ml-2"}>
              {showIconsOnly ? "Select" : "Select Chain"}
            </span>
            {!selectedChainId && !showIconsOnly && (
              <span className="ml-auto text-blue-400">•</span>
            )}
          </button>
          {filteredChains.map((chain: Chain, index: number) => (
            <button
              key={`${chain.id}-${index}`}
              type="button"
              onClick={() => handleChainSelect(chain.id)}
              className={`w-full flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${showIconsOnly ? "justify-center" : ""} ${
                selectedChainId === chain.id
                  ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-200"
              }`}
            >
              <NetworkImage
                chainId={chain.id}
                size="sm"
                className="w-5 h-5"
                disableAnimation={true}
              />
              {!showIconsOnly && (
                <div className="ml-2 flex-1 text-left">
                  <div className="font-medium">{chain.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {chain.id}
                  </div>
                </div>
              )}
              {selectedChainId === chain.id && !showIconsOnly && (
                <span className="ml-auto text-blue-400">•</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
