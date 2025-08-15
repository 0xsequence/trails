import { ChevronLeft, TrendingUp, Search, ChevronDown } from "lucide-react"
import { motion } from "motion/react"
import { useState, useRef, useEffect, useMemo } from "react"
import { usePools, type Pool } from "../../pools.js"
import { ChainImage } from "./ChainImage.js"
import { TokenImage } from "./TokenImage.js"
import { getChainInfo, getChainColor } from "../../chains.js"
import { formatTvl } from "../../prices.js"
import aaveLogo from "../assets/aave.svg"

interface EarnPoolsProps {
  onBack: () => void
  onPoolSelect: (pool: Pool) => void
}

export const EarnPools: React.FC<EarnPoolsProps> = ({
  onBack,
  onPoolSelect,
}) => {
  const { data: pools, loading, error } = usePools()
  const [selectedProtocol, setSelectedProtocol] = useState<string>("all")
  const [searchFilter, setSearchFilter] = useState<string>("")
  const [filterByChainId, setFilterByChainId] = useState<number | null>(null)
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const protocols = useMemo(() => {
    if (!pools || !Array.isArray(pools)) {
      return ["all"]
    }

    try {
      return [
        "all",
        ...new Set(pools.map((pool) => pool.protocol).filter(Boolean)),
      ]
    } catch (error) {
      console.error("[trails-sdk] Error computing protocols:", error)
      return ["all"]
    }
  }, [pools])

  // Get unique chains from all pools
  const uniqueChains = useMemo(() => {
    if (!pools || !Array.isArray(pools)) {
      return []
    }

    try {
      const chainIds = new Set(
        pools.map((pool) => pool.chainId).filter(Boolean),
      )
      return Array.from(chainIds)
        .map((chainId) => ({
          chainId,
          name: getChainInfo(chainId)?.name ?? "",
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
      console.error("[trails-sdk] Error computing unique chains:", error)
      return []
    }
  }, [pools])

  const filteredPools = useMemo(() => {
    if (!pools || !Array.isArray(pools)) {
      return []
    }

    return pools.filter((pool) => {
      try {
        // Protocol filter
        const protocolMatch =
          selectedProtocol === "all" || pool.protocol === selectedProtocol

        // Chain filter
        const chainMatch =
          filterByChainId === null || pool.chainId === filterByChainId

        // Search filter - split by spaces to allow "usdc base" type searches
        const searchTerms = searchFilter
          .toLowerCase()
          .split(/\s+/)
          .filter((term) => term.length > 0)
        const searchMatch =
          !searchFilter ||
          searchTerms.every(
            (term) =>
              pool.token?.symbol?.toLowerCase().includes(term) ||
              pool.token?.name?.toLowerCase().includes(term) ||
              pool.protocol?.toLowerCase().includes(term) ||
              getChainInfo(pool.chainId)?.name?.toLowerCase().includes(term),
          )

        return protocolMatch && chainMatch && searchMatch
      } catch (error) {
        console.error("[trails-sdk] Error filtering pool:", pool, error)
        return false
      }
    })
  }, [pools, selectedProtocol, filterByChainId, searchFilter])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading pools...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-500 text-center">
          <p className="text-sm">Failed to load pools</p>
          <p className="text-xs text-gray-500 mt-1">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden px-2">
      {/* Header */}
      <div className="flex items-center relative mb-2">
        <button
          type="button"
          onClick={onBack}
          className="absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:trails-hover-bg text-gray-400"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold w-full text-center text-gray-900 dark:text-white">
          Earn
        </h2>
      </div>

      {/* Search Field */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${"text-gray-500 dark:text-gray-500"}`} />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchFilter}
          onChange={(e) => {
            try {
              setSearchFilter(e.target.value || "")
            } catch (error) {
              console.error("[trails-sdk] Error updating search filter:", error)
              setSearchFilter("")
            }
          }}
          placeholder="Filter pools"
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

      {/* Protocol Filter */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {protocols.map((protocol) => (
            <button
              key={protocol}
              onClick={() => setSelectedProtocol(protocol)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center ${
                selectedProtocol === protocol
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {protocol === "Aave" && (
                <img src={aaveLogo} alt="Aave" className="w-3 h-3 mr-1" />
              )}
              {protocol === "all" ? "All Protocols" : protocol}
            </button>
          ))}
        </div>
      </div>

      {/* Pools List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 max-h-[300px] px-2">
        {filteredPools.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No pools available for the selected protocol
            </p>
          </div>
        ) : (
          filteredPools.map((pool) => (
            <motion.div
              key={pool.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onPoolSelect(pool)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div style={{ width: "32px", height: "32px" }}>
                    <TokenImage
                      symbol={pool.token.symbol}
                      imageUrl={pool.token.logoUrl}
                      chainId={pool.chainId}
                      size={32}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {pool.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        {pool.protocol === "Aave" && (
                          <img
                            src={aaveLogo}
                            alt="Aave"
                            className="w-3 h-3 mr-1"
                          />
                        )}
                        {pool.protocol}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getChainColor(pool.chainId)}`}
                      >
                        {getChainInfo(pool.chainId)?.name ||
                          `Chain ${pool.chainId}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-semibold text-sm">
                      {pool.apy.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    APY
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                  <span>TVL: {formatTvl(pool.tvl)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className={`w-2 h-2 rounded-full ${pool.isActive ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {pool.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          APY rates are variable and subject to change.
        </p>
      </div>
    </div>
  )
}

export default EarnPools
