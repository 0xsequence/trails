import { TokenImage } from "./TokenImage.js"
import { ChevronLeft } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import type { PrepareSendQuote } from "../../prepareSend.js"
import { QuoteDetails } from "./QuoteDetails.js"

interface WalletConfirmationProps {
  onBack: () => void
  onComplete: () => void
  retryEnabled?: boolean
  onRetry?: () => void
  quote?: PrepareSendQuote | null
}

export const WalletConfirmation: React.FC<WalletConfirmationProps> = ({
  retryEnabled = false,
  onRetry,
  onBack,
  quote,
}) => {
  const [showContent, setShowContent] = useState(false)

  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!retryEnabled) {
        setShowTimeoutWarning(true)
      }
    }, 60000) // 1 minute

    return () => clearTimeout(timer)
  }, [retryEnabled])

  return (
    <div className="space-y-6">
      <div className="flex items-center relative">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 top-0 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:trails-hover-bg text-gray-600 dark:text-gray-400"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-col justify-center min-h-full space-y-6 pt-8">
        <div className="text-center">
          <div
            className={`mx-auto flex items-center justify-center transition-all duration-500 ease-out relative ${showContent ? "transform -translate-y-8" : ""}`}
          >
            {retryEnabled ? (
              <div className={`h-24 w-24`} />
            ) : (
              <div
                className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-500 dark:border-blue-400"
                style={{ borderTopWidth: "2px", borderBottomWidth: "2px" }}
              />
            )}

            <div className="absolute">
              <TokenImage
                imageUrl={quote?.originToken.imageUrl}
                symbol={quote?.originToken.symbol}
                chainId={quote?.originChain.id}
                size={64}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {retryEnabled ? "Try again" : "Waiting for wallet…"}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Please approve the request in your wallet
            </p>
          </div>
        </div>

        {/* Timeout Warning */}
        {showTimeoutWarning && (
          <div
            className={`transition-all duration-500 ease-out delay-150 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="p-4 rounded-lg text-sm bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700/50">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Warning</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    Request is taking longer than expected
                  </p>
                  <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                    This transaction request is taking longer than expected.
                    Please reach out to support for help if the issue persists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Details */}
        <QuoteDetails quote={quote} showContent={true} />

        {/* Retry Button */}
        {retryEnabled && onRetry && (
          <div
            className={`transition-all duration-500 ease-out delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <button
              type="button"
              onClick={onRetry}
              className="w-full px-4 py-2 trails-border-radius-button font-medium transition-colors cursor-pointer bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
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
