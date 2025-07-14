import { NetworkImage } from "@0xsequence/design-system"
import { SUPPORTED_TO_CHAINS } from "@0xsequence/trails-sdk"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ChainSelectorProps {
  selectedChainId: number | undefined
  onChainSelect: (chainId: number) => void
  disabled?: boolean
  className?: string
  theme?: "light" | "dark"
  showIconsOnly?: boolean
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({
  selectedChainId,
  onChainSelect,
  disabled = false,
  className = "",
  theme = "dark",
  showIconsOnly = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedChain = SUPPORTED_TO_CHAINS.find(
    (chain) => chain.id === selectedChainId,
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
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
        disabled={disabled}
        className={`w-full flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        } ${showIconsOnly ? "justify-center" : ""}`}
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
              <span className="ml-2 flex-1 text-left text-gray-900 dark:text-gray-200 truncate">
                {selectedChain.name} ({selectedChain.id})
              </span>
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
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
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
          {SUPPORTED_TO_CHAINS.map((chain) => (
            <button
              key={chain.id}
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
                <span className="ml-2">
                  {chain.name} ({chain.id})
                </span>
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
