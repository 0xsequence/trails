import type React from "react"
import { useEffect, useState } from "react"

interface WalletConfirmationProps {
  onBack: () => void
  onComplete: () => void
  theme?: "light" | "dark"
  amount?: string
  recipient?: string
  tokenSymbol?: string
  error?: string
}

export const WalletConfirmation: React.FC<WalletConfirmationProps> = ({
  theme = "light",
  amount,
  recipient,
  tokenSymbol,
  error,
}) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  return (
    <div className="flex flex-col justify-center min-h-full space-y-6 pt-8">
      <div className="text-center">
        <div
          className={`mx-auto flex items-center justify-center transition-all duration-500 ease-out ${showContent ? "transform -translate-y-8" : ""}`}
        >
          <div
            className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
              theme === "dark" ? "border-blue-400" : "border-blue-500"
            }`}
            style={{ borderBottomWidth: "2px" }}
          />
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
    </div>
  )
}

export default WalletConfirmation
