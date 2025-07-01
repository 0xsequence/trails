import { ChevronLeft } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import type { ActiveTheme } from "../../theme.js"

interface WalletConfirmationProps {
  onBack: () => void
  onComplete: () => void
  theme?: ActiveTheme
  amount?: string
  recipient?: string
  tokenSymbol?: string
  error?: string
  retryEnabled?: boolean
  onRetry?: () => void
}

export const WalletConfirmation: React.FC<WalletConfirmationProps> = ({
  theme = "light",
  amount,
  recipient,
  tokenSymbol,
  error,
  retryEnabled = false,
  onRetry,
  onBack,
}) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center relative">
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
      </div>

      <div className="flex flex-col justify-center min-h-full space-y-6 pt-8">
        <div className="text-center">
          <div
            className={`mx-auto flex items-center justify-center transition-all duration-500 ease-out ${showContent ? "transform -translate-y-8" : ""}`}
          >
            {!retryEnabled && (
              <div
                className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
                  theme === "dark" ? "border-blue-400" : "border-blue-500"
                }`}
                style={{ borderTopWidth: "2px", borderBottomWidth: "2px" }}
              />
            )}
          </div>

          <div
            className={`transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2
              className={`mt-6 text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Confirm Transaction
            </h2>

            <p
              className={`mt-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              Please check your wallet to confirm the transaction
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div
          className={`transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div
            className={`p-4 rounded-lg border ${
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="space-y-3">
              {amount && tokenSymbol && (
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Amount:
                  </span>
                  <span
                    className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {amount} {tokenSymbol}
                  </span>
                </div>
              )}

              {recipient && (
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    To (Intent):
                  </span>
                  <span
                    className={`font-mono text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {recipient.slice(0, 6)}...{recipient.slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div
            className={`transition-all duration-500 ease-out delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-h-80 overflow-y-auto ${
                theme === "dark" ? "bg-red-900/20" : "bg-red-50"
              }`}
            >
              <p
                className={`text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`}
              >
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Retry Button */}
        {retryEnabled && onRetry && (
          <div
            className={`transition-all duration-500 ease-out delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <button
              type="button"
              onClick={onRetry}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletConfirmation
