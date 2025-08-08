import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import relayIcon from "../../../assets/relay.ico"
import lifiIcon from "../../../assets/lifi.ico"
import cctpIcon from "../../../assets/circle.png"

export interface QuoteProvider {
  id: string
  name: string
  description: string
  icon?: string
}

const QUOTE_PROVIDERS: QuoteProvider[] = [
  {
    id: "auto",
    name: "Auto",
    description: "Recommended - Automatically selects the best provider",
  },
  {
    id: "relay",
    name: "Relay",
    description: "Sequence Relay Network",
    icon: relayIcon,
  },
  {
    id: "lifi",
    name: "LiFi",
    description: "LiFi Protocol",
    icon: lifiIcon,
  },
  {
    id: "cctp",
    name: "CCTP",
    description: "Circle CCTP Protocol",
    icon: cctpIcon,
  },
]

interface QuoteProviderSelectorProps {
  selectedProvider: string
  onProviderSelect: (providerId: string) => void
  disabled?: boolean
  className?: string
}

export const QuoteProviderSelector: React.FC<QuoteProviderSelectorProps> = ({
  selectedProvider,
  onProviderSelect,
  disabled = false,
  className = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedProviderData = QUOTE_PROVIDERS.find(
    (provider) => provider.id === selectedProvider,
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

  const handleProviderSelect = (providerId: string) => {
    onProviderSelect(providerId)
    setIsDropdownOpen(false)
  }

  const ProviderIcon: React.FC<{
    provider: QuoteProvider
    className?: string
  }> = ({ provider, className = "w-4 h-4" }) => {
    if (provider.id === "auto") {
      return (
        <div
          className={`${className} bg-blue-500 rounded-full flex items-center justify-center`}
        >
          <svg
            className="w-2.5 h-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )
    }

    if (provider.icon) {
      return (
        <img src={provider.icon} alt={provider.name} className={className} />
      )
    }

    return (
      <div
        className={`${className} bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold text-white`}
      >
        {provider.name[0]}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
        disabled={disabled}
        className={`w-full flex items-center px-3 sm:px-4 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          disabled
            ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
            : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-200"
        }`}
      >
        {selectedProviderData && (
          <>
            <ProviderIcon provider={selectedProviderData} />
            <div className="ml-3 flex-1 text-left">
              <span className="text-sm font-medium">
                {selectedProviderData.name}
                {selectedProviderData.id === "auto" && " (Recommended)"}
              </span>
            </div>
          </>
        )}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform ${
            isDropdownOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {QUOTE_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleProviderSelect(provider.id)}
              className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm ${
                selectedProvider === provider.id
                  ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-200"
              }`}
            >
              <ProviderIcon provider={provider} />
              <div className="ml-3 flex-1 text-left">
                <div className="font-medium">
                  {provider.name}
                  {provider.id === "auto" && " (Recommended)"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {provider.description}
                </div>
              </div>
              {selectedProvider === provider.id && (
                <span className="ml-auto text-blue-400">•</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
