import { TokenImage } from "./TokenImage.js"
import { InfoIcon, Tooltip } from "@0xsequence/design-system"
import type React from "react"
import { getExplorerUrlForAddress } from "../../explorer.js"
import type { ActiveTheme } from "../../theme.js"
import type { PrepareSendQuote } from "../../prepareSend.js"
import { useState } from "react"

interface QuoteDetailsProps {
  theme?: ActiveTheme
  quote?: PrepareSendQuote | null
  showContent?: boolean
}

export const QuoteDetails: React.FC<QuoteDetailsProps> = ({
  theme = "light",
  quote,
  showContent = true,
}) => {
  const [showCalldata, setShowCalldata] = useState(false)

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
          {quote?.originAmount &&
            quote?.originToken.symbol &&
            quote?.originChain.id && (
              <div className="flex justify-between items-start">
                <span
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
                >
                  Origin Transfer Amount:
                  <Tooltip message="The amount of tokens you will send from the origin chain">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <div className="text-right">
                  <div
                    className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"} flex items-center gap-1 justify-end`}
                  >
                    <TokenImage
                      imageUrl={quote.originToken.imageUrl}
                      symbol={quote.originToken.symbol}
                      chainId={quote.originChain.id}
                      size={16}
                    />
                    {quote.originAmountFormatted} {quote.originToken.symbol}
                  </div>
                  {quote.originAmountUsdDisplay && (
                    <div
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mt-0.5`}
                    >
                      ≈ {quote.originAmountUsdDisplay}
                    </div>
                  )}
                </div>
              </div>
            )}

          {quote?.destinationToken.symbol &&
            quote?.destinationAmount &&
            quote?.destinationAmountUsdDisplay &&
            quote?.destinationChain.id && (
              <div className="flex justify-between items-start">
                <span
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
                >
                  Destination Target Amount:
                  <Tooltip message="The amount of tokens you will receive on the destination chain after the swap and/or bridge">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <div className="text-right">
                  <div
                    className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"} flex items-center gap-1 justify-end`}
                  >
                    <TokenImage
                      imageUrl={quote.destinationToken.imageUrl}
                      symbol={quote.destinationToken.symbol}
                      chainId={quote.destinationChain.id}
                      size={16}
                    />
                    {quote.destinationAmountFormatted}{" "}
                    {quote.destinationToken.symbol}
                  </div>
                  {quote.destinationAmountUsdDisplay && (
                    <div
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mt-0.5`}
                    >
                      ≈ {quote.destinationAmountUsdDisplay}
                    </div>
                  )}
                </div>
              </div>
            )}

          {quote?.originAddress && (
            <div className="flex justify-between items-center">
              <span
                className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
              >
                Origin Deposit Address:
                <Tooltip message="This is the intent address to deposit to that will then execute the swap and/or bridge">
                  <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                </Tooltip>
              </span>
              <a
                href={getExplorerUrlForAddress({
                  address: quote.originAddress,
                  chainId: quote.originChain.id,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-xs hover:underline ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {quote.originAddress.slice(0, 6)}…
                {quote.originAddress.slice(-4)}
              </a>
            </div>
          )}

          {quote?.destinationAddress && (
            <div className="flex justify-between items-center">
              <span
                className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
              >
                Destination Target Address:
                <Tooltip message="This is the address that will receive the tokens after any swap and/or bridge">
                  <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                </Tooltip>
              </span>
              <a
                href={getExplorerUrlForAddress({
                  address: quote.destinationAddress,
                  chainId: quote.destinationChain.id,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-xs hover:underline ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {quote.destinationAddress.slice(0, 6)}…
                {quote.destinationAddress.slice(-4)}
              </a>
            </div>
          )}

          {quote?.slippageTolerance != null && (
            <div className="flex justify-between items-center">
              <span
                className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
              >
                Max Slippage:
                <Tooltip message="The maximum percentage by which the exchange rate can change before the transaction fails. Higher slippage means more tolerance for price changes but potentially worse rates.">
                  <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                </Tooltip>
              </span>
              <span
                className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {quote.slippageTolerance}%
              </span>
            </div>
          )}

          {quote?.priceImpact != null && (
            <div className="flex justify-between items-center">
              <span
                className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
              >
                Price Impact:
                <Tooltip message="The percentage change in the token price caused by your trade. Higher impact means your trade affects the market price more, potentially resulting in worse rates.">
                  <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                </Tooltip>
              </span>
              <span
                className={`font-medium text-xs ${
                  Number(quote.priceImpact) > 5
                    ? theme === "dark"
                      ? "text-red-400"
                      : "text-red-600"
                    : Number(quote.priceImpact) > 2
                      ? theme === "dark"
                        ? "text-yellow-400"
                        : "text-yellow-600"
                      : theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                }`}
              >
                {quote.priceImpact}%
              </span>
            </div>
          )}

          {quote?.fees?.totalFeeAmountUsd &&
            Number(quote?.fees.totalFeeAmountUsd) > 0 && (
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} flex items-center gap-1`}
                >
                  Total Fees:
                  <Tooltip message="The total fees charged for this transaction, including gas fees, bridge fees, and any platform fees. These fees are deducted from your transaction.">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <span
                  className={`font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {quote.fees.totalFeeAmountUsdFormatted}
                </span>
              </div>
            )}

          {quote?.destinationCalldata && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowCalldata(!showCalldata)}
                className={`flex items-center gap-1 text-xs hover:underline cursor-pointer ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-700"
                }`}
                aria-label={
                  showCalldata ? "Hide custom calldata" : "Show custom calldata"
                }
              >
                <span className="text-[10px]">
                  Includes custom destination calldata
                </span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    showCalldata ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showCalldata && (
                <div className="mt-2">
                  <textarea
                    value={quote.destinationCalldata}
                    readOnly
                    className={`w-full p-2 text-xs font-mono rounded border resize-none ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-gray-100 border-gray-300 text-gray-800"
                    }`}
                    rows={4}
                    placeholder="No custom calldata"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuoteDetails
