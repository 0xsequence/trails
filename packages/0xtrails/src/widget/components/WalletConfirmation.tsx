import { TokenImage } from "./TokenImage.js"
import { ChevronLeft } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import type { ActiveTheme } from "../../theme.js"
import type { PrepareSendFees } from "../../prepareSend.js"
import { QuoteDetails } from "./QuoteDetails.js"

interface WalletConfirmationProps {
  onBack: () => void
  onComplete: () => void
  theme?: ActiveTheme
  amount?: string
  amountUsd?: string
  recipient?: string
  tokenSymbol?: string
  retryEnabled?: boolean
  onRetry?: () => void
  fromTokenSymbol: string
  fromChainId: number
  fromTokenImageUrl: string
  fees?: PrepareSendFees
  slippageTolerance?: string
  priceImpact?: string
  destinationTokenSymbol?: string
  destinationTokenAmount?: string
  destinationTokenAmountUsd?: string
  destinationChainId?: number
  destinationTokenImageUrl?: string
}

export const WalletConfirmation: React.FC<WalletConfirmationProps> = ({
  theme = "light",
  amount,
  amountUsd,
  recipient,
  tokenSymbol,
  retryEnabled = false,
  onRetry,
  onBack,
  fromTokenSymbol,
  fromChainId,
  fromTokenImageUrl,
  fees,
  slippageTolerance,
  priceImpact,
  destinationTokenSymbol,
  destinationTokenAmount,
  destinationTokenAmountUsd,
  destinationChainId,
  destinationTokenImageUrl,
}) => {
  const [showContent, setShowContent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeoutWarning(true)
    }, 60000) // 1 minute

    return () => clearTimeout(timer)
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
            className={`mx-auto flex items-center justify-center transition-all duration-500 ease-out relative ${showContent ? "transform -translate-y-8" : ""}`}
          >
            {retryEnabled ? (
              <div className={`h-24 w-24`} />
            ) : (
              <div
                className={`animate-spin rounded-full h-24 w-24 border-b-2 ${
                  theme === "dark" ? "border-blue-400" : "border-blue-500"
                }`}
                style={{ borderTopWidth: "2px", borderBottomWidth: "2px" }}
              />
            )}

            <div className="absolute">
              <TokenImage
                imageUrl={fromTokenImageUrl}
                symbol={fromTokenSymbol}
                chainId={fromChainId}
                size={64}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2
              className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {retryEnabled ? "Try again" : "Waiting for wallet…"}
            </h2>
            <p
              className={`mt-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              Please approve the request in your wallet
            </p>
          </div>
        </div>

        {/* More Details Button */}
        <div
          className={`transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[24px] transition-colors cursor-pointer text-sm ${
              theme === "dark"
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>More Details</span>
            <svg
              className={`w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Expand</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Timeout Warning */}
        {showTimeoutWarning && (
          <div
            className={`transition-all duration-500 ease-out delay-150 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div
              className={`p-4 rounded-lg text-sm ${
                theme === "dark"
                  ? "bg-yellow-900/20 border border-yellow-700/50"
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <div className="flex items-start space-x-3">
                <svg
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`}
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
                  <p
                    className={`font-medium ${theme === "dark" ? "text-yellow-300" : "text-yellow-800"}`}
                  >
                    Request is taking longer than expected
                  </p>
                  <p
                    className={`mt-1 text-xs ${theme === "dark" ? "text-yellow-400" : "text-yellow-700"}`}
                  >
                    This transaction request is taking longer than expected.
                    Please reach out to support for help if the issue persists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Details */}
        {showDetails && (
          <QuoteDetails
            theme={theme}
            amount={amount}
            amountUsd={amountUsd}
            recipient={recipient}
            tokenSymbol={tokenSymbol}
            fromTokenSymbol={fromTokenSymbol}
            fromChainId={fromChainId}
            fromTokenImageUrl={fromTokenImageUrl}
            fees={fees}
            slippageTolerance={slippageTolerance}
            priceImpact={priceImpact}
            destinationTokenSymbol={destinationTokenSymbol}
            destinationTokenAmount={destinationTokenAmount}
            destinationTokenAmountUsd={destinationTokenAmountUsd}
            destinationChainId={destinationChainId}
            destinationTokenImageUrl={destinationTokenImageUrl}
            showContent={showContent}
          />
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
