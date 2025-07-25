import { TokenImage } from "./TokenImage.js"
import { ChevronLeft } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { getExplorerUrlForAddress } from "../../explorer.js"
import type { ActiveTheme } from "../../theme.js"
import type { PrepareSendFees } from "../../prepareSend.js"

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
}) => {
  const [showContent, setShowContent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

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

        {/* Transaction Details */}
        {showDetails && (
          <div
            className={`transition-all duration-500 ease-out delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div
              className={`p-4 rounded-lg text-sm space-y-4 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <div className="space-y-3">
                {amount && tokenSymbol && fromChainId && (
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Transfer Amount (incl. fees):
                    </span>
                    <div className="text-right">
                      <div
                        className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"} flex items-center gap-1 justify-end`}
                      >
                        <TokenImage
                          symbol={fromTokenSymbol}
                          chainId={fromChainId}
                          size={16}
                        />
                        {amount} {fromTokenSymbol}
                      </div>
                      {amountUsd && (
                        <div
                          className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mt-0.5`}
                        >
                          ≈ {amountUsd}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {destinationTokenSymbol &&
                  destinationTokenAmount &&
                  destinationTokenAmountUsd &&
                  destinationChainId && (
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Destination Amount:
                      </span>
                      <div className="text-right">
                        <div
                          className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"} flex items-center gap-1 justify-end`}
                        >
                          <TokenImage
                            symbol={destinationTokenSymbol}
                            chainId={destinationChainId}
                            size={16}
                          />
                          {destinationTokenAmount} {destinationTokenSymbol}
                        </div>
                        {destinationTokenAmountUsd && (
                          <div
                            className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mt-0.5`}
                          >
                            ≈ {destinationTokenAmountUsd}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {recipient && (
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      To (Intent):
                    </span>
                    <a
                      href={getExplorerUrlForAddress({
                        address: recipient,
                        chainId: fromChainId,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-xs hover:underline ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {recipient.slice(0, 6)}…{recipient.slice(-4)}
                    </a>
                  </div>
                )}

                {slippageTolerance && Number(slippageTolerance) > 0 && (
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Max Slippage:
                    </span>
                    <span
                      className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {slippageTolerance}%
                    </span>
                  </div>
                )}

                {priceImpact && Number(priceImpact) > 0 && (
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Price Impact:
                    </span>
                    <span
                      className={`font-medium text-xs ${
                        Number(priceImpact) > 5
                          ? theme === "dark"
                            ? "text-red-400"
                            : "text-red-600"
                          : Number(priceImpact) > 2
                            ? theme === "dark"
                              ? "text-yellow-400"
                              : "text-yellow-600"
                            : theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                      }`}
                    >
                      {priceImpact}%
                    </span>
                  </div>
                )}

                {fees?.totalFeeAmountUsd &&
                  Number(fees.totalFeeAmountUsd) > 0 && (
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Total Fees:
                      </span>
                      <span
                        className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {fees.totalFeeAmountUsdFormatted}
                      </span>
                    </div>
                  )}
              </div>
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
