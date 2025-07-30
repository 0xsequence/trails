import { TokenImage } from "./TokenImage.js"
import { InfoIcon, Tooltip } from "@0xsequence/design-system"
import type React from "react"
import { getExplorerUrlForAddress } from "../../explorer.js"
import type { ActiveTheme } from "../../theme.js"
import type { PrepareSendFees } from "../../prepareSend.js"

interface QuoteDetailsProps {
  theme?: ActiveTheme
  amount?: string
  amountUsd?: string
  recipient?: string
  tokenSymbol?: string
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
  showContent?: boolean
}

export const QuoteDetails: React.FC<QuoteDetailsProps> = ({
  theme = "light",
  amount,
  amountUsd,
  recipient,
  tokenSymbol,
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
  showContent = true,
}) => {
  return (
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
                Transfer Amount:
              </span>
              <div className="text-right">
                <div
                  className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"} flex items-center gap-1 justify-end`}
                >
                  <TokenImage
                    imageUrl={fromTokenImageUrl}
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
                      imageUrl={destinationTokenImageUrl}
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
                className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
              >
                To (Intent):
                <Tooltip message="This is the intent address to deposit to that will then execute the swap and bridge">
                  <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                </Tooltip>
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

          {priceImpact != null && (
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

          {fees?.totalFeeAmountUsd && Number(fees.totalFeeAmountUsd) > 0 && (
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
  )
}

export default QuoteDetails
