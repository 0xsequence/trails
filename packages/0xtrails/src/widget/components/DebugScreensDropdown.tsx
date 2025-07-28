import { ChevronDown } from "lucide-react"
import type React from "react"
import { useRef, useState } from "react"
import { useQueryParams } from "../../queryParams.js"
import type { ActiveTheme } from "../../theme.js"

interface DebugScreensDropdownProps {
  onScreenSelect: (screen: string) => void
  theme?: ActiveTheme
}

const SCREENS = [
  "Connect",
  "Tokens",
  "Send Form",
  "Fund Form",
  "Wallet Confirmation",
  "Pending 1-item-0-confirmed",
  "Pending 1-item-1-confirmed",
  "Pending 2-item-0-confirmed",
  "Pending 2-item-1-confirmed",
  "Pending 2-item-2-confirmed",
  "Pending 3-item-0-confirmed",
  "Pending 3-item-1-confirmed",
  "Pending 3-item-2-confirmed",
  "Pending 3-item-3-confirmed",
  "Receipt",
] as const

export const DebugScreensDropdown: React.FC<DebugScreensDropdownProps> = ({
  onScreenSelect,
  theme = "light",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { hasParam } = useQueryParams()

  const shouldShow = hasParam("debug", "true")

  if (!shouldShow) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 rounded-full hover:bg-opacity-10 ${
          theme === "dark"
            ? "hover:bg-gray-800 text-gray-200"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute bottom-full right-0 mb-1 w-40 border rounded-lg shadow-lg overflow-hidden max-h-[300px] overflow-y-auto ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-200 text-gray-700"
          }`}
        >
          {SCREENS.map((screen) => (
            <button
              key={screen}
              type="button"
              onClick={() => {
                onScreenSelect(screen?.toLowerCase().replace(" ", "-"))
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm ${
                theme === "dark"
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {screen}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DebugScreensDropdown
