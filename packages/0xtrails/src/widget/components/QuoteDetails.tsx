import { TokenImage } from "./TokenImage.js"
import { InfoIcon, Tooltip } from "@0xsequence/design-system"
import type React from "react"
import { getExplorerUrlForAddress } from "../../explorer.js"
import type { PrepareSendQuote } from "../../prepareSend.js"
import { useState, useEffect, useRef } from "react"
import { truncateAddress } from "../../address.js"

interface QuoteDetailsProps {
  quote?: PrepareSendQuote | null
  showContent?: boolean
  children?: React.ReactNode
  onExpand?: (isExpanded: boolean) => void
}

// Helper function to format completion time
const formatCompletionTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return remainingSeconds > 0
      ? `${minutes}m${remainingSeconds}s`
      : `${minutes}m`
  } else {
    const hours = Math.floor(seconds / 3600)
    const remainingMinutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    if (remainingMinutes > 0 || remainingSeconds > 0) {
      return `${hours}h${remainingMinutes}m${remainingSeconds > 0 ? `${remainingSeconds}s` : ""}`
    } else {
      return `${hours}h`
    }
  }
}

export const QuoteDetails: React.FC<QuoteDetailsProps> = ({
  quote,
  showContent = true,
  children,
  onExpand,
}) => {
  const [showCalldata, setShowCalldata] = useState(false)
  const [showOriginRate, setShowOriginRate] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const calldataRef = useRef<HTMLDivElement>(null)

  // Handle visibility animation and auto-scroll
  useEffect(() => {
    if (showContent) {
      // Small delay to ensure the element is rendered before showing
      const timer = setTimeout(() => {
        // Component is now visible, but details remain collapsed by default
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [showContent])

  // Notify parent when expansion state changes
  useEffect(() => {
    onExpand?.(isExpanded)
  }, [isExpanded, onExpand])

  if (!showContent) return null

  return (
    <div className="relative">
      {/* More Details Button - only visible when collapsed */}
      {!isExpanded && (
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-center gap-2 py-1 px-4 trails-border-radius-button transition-colors cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label="Show more details"
          >
            <span>More Details</span>
            <svg
              className="w-3 h-3 transition-transform duration-300 ease-out"
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
        </div>
      )}

      {/* Details container */}
      <div
        ref={containerRef}
        className={`overflow-auto transition-all duration-300 ease-out ${
          isExpanded ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 rounded-lg text-sm space-y-4 trails-bg-secondary">
          {/* Close Button - only visible when expanded, at top center */}
          <div className="flex justify-center mb-4 -mt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 trails-border-radius-button transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              aria-label="Close details"
            >
              <span>Close</span>
              <svg
                className="w-3 h-3 transition-transform duration-300 ease-out"
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
          </div>
          <div className="space-y-3">
            {quote?.originTokenRate && quote?.destinationTokenRate && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  Exchange Rate:
                  <Tooltip message="The current exchange rate between the origin and destination tokens">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <button
                  type="button"
                  onClick={() => setShowOriginRate(!showOriginRate)}
                  className="font-medium text-xs hover:underline cursor-pointer text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                >
                  {showOriginRate
                    ? quote.originTokenRate
                    : quote.destinationTokenRate}
                </button>
              </div>
            )}
            {quote?.completionEstimateSeconds != null && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  Estimated Time:
                  <Tooltip message="Estimated time for the transaction to complete across all chains">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <span className="font-medium text-xs text-gray-900 dark:text-white flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  ~{formatCompletionTime(quote.completionEstimateSeconds)}
                </span>
              </div>
            )}

            {quote?.gasCostUsd != null && quote?.gasCostUsd > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  Network Cost:
                  <Tooltip message="The estimated gas cost for executing this transaction on the origin chain">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <span className="font-medium text-xs text-gray-900 dark:text-white flex items-center gap-1">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="gas-pump"
                    className="svg-inline--fa fa-gas-pump "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="12"
                  >
                    <path
                      fill="currentColor"
                      d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"
                    ></path>
                  </svg>
                  {quote.gasCostUsdDisplay}
                </span>
              </div>
            )}

            {quote?.originAmount &&
              quote?.originToken.symbol &&
              quote?.originChain.id && (
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    Origin Transfer Amount:
                    <Tooltip message="The amount of tokens you will send from the origin chain">
                      <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                    </Tooltip>
                  </span>
                  <div className="text-right">
                    {quote.originToken.contractAddress ===
                    "0x0000000000000000000000000000000000000000" ? (
                      <>
                        <div className="font-medium text-xs text-gray-900 dark:text-white flex items-center gap-1 justify-end">
                          <TokenImage
                            imageUrl={quote.originToken.imageUrl}
                            symbol={quote.originToken.symbol}
                            chainId={quote.originChain.id}
                            size={16}
                          />
                          {quote.originAmountDisplay} {quote.originToken.symbol}
                        </div>
                        {quote.originAmountUsdDisplay && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            ≈ {quote.originAmountUsdDisplay}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <a
                          href={getExplorerUrlForAddress({
                            address: quote.originToken.contractAddress,
                            chainId: quote.originChain.id,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline cursor-pointer"
                        >
                          <div className="font-medium text-xs text-gray-900 dark:text-white flex items-center gap-1 justify-end">
                            <TokenImage
                              imageUrl={quote.originToken.imageUrl}
                              symbol={quote.originToken.symbol}
                              chainId={quote.originChain.id}
                              size={16}
                            />
                            {quote.originAmountDisplay}{" "}
                            {quote.originToken.symbol}
                          </div>
                        </a>
                        {quote.originAmountUsdDisplay && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            ≈ {quote.originAmountUsdDisplay}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

            {quote?.destinationToken.symbol &&
              quote?.destinationAmount &&
              quote?.destinationAmountUsdDisplay &&
              quote?.destinationChain.id && (
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    Destination Target Amount:
                    <Tooltip message="The amount of tokens you will receive on the destination chain after the swap and/or bridge">
                      <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                    </Tooltip>
                  </span>
                  <div className="text-right">
                    {quote.destinationToken.contractAddress ===
                    "0x0000000000000000000000000000000000000000" ? (
                      <>
                        <div className="font-medium text-xs text-gray-900 dark:text-white flex items-center gap-1 justify-end">
                          <TokenImage
                            imageUrl={quote.destinationToken.imageUrl}
                            symbol={quote.destinationToken.symbol}
                            chainId={quote.destinationChain.id}
                            size={16}
                          />
                          {quote.destinationAmountDisplay}{" "}
                          {quote.destinationToken.symbol}
                        </div>
                        {quote.destinationAmountUsdDisplay && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            ≈ {quote.destinationAmountUsdDisplay}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <a
                          href={getExplorerUrlForAddress({
                            address: quote.destinationToken.contractAddress,
                            chainId: quote.destinationChain.id,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline cursor-pointer"
                        >
                          <div className="font-medium text-xs text-gray-900 dark:text-white flex items-center gap-1 justify-end">
                            <TokenImage
                              imageUrl={quote.destinationToken.imageUrl}
                              symbol={quote.destinationToken.symbol}
                              chainId={quote.destinationChain.id}
                              size={16}
                            />
                            {quote.destinationAmountDisplay}{" "}
                            {quote.destinationToken.symbol}
                          </div>
                        </a>
                        {quote.destinationAmountUsdDisplay && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            ≈ {quote.destinationAmountUsdDisplay}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

            {quote?.originAddress && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
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
                  className="font-mono text-xs hover:underline flex items-center gap-1 text-gray-700 dark:text-gray-300"
                >
                  {truncateAddress(quote.originAddress)}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {quote?.destinationAddress && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
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
                  className="font-mono text-xs hover:underline flex items-center gap-1 text-gray-700 dark:text-gray-300"
                >
                  {truncateAddress(quote.destinationAddress)}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {quote?.slippageTolerance != null && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  Max Slippage:
                  <Tooltip message="The maximum percentage by which the exchange rate can change before the transaction fails. Higher slippage means more tolerance for price changes but potentially worse rates.">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <span className="font-medium text-xs text-gray-900 dark:text-white">
                  {quote.slippageTolerance}%
                </span>
              </div>
            )}

            {quote?.priceImpact != null && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  Price Impact:
                  <Tooltip message="The percentage change in the token price caused by your trade. Higher impact means your trade affects the market price more, potentially resulting in worse rates.">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <span className="font-medium text-xs text-gray-900 dark:text-white">
                  {quote.priceImpact}%
                </span>
              </div>
            )}

            {quote?.fees?.totalFeeAmountUsd != null && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  Total Fees:
                  <Tooltip message="The total fees charged for this transaction, including gas fees, bridge fees, and any platform fees. These fees are deducted from your transaction.">
                    <InfoIcon className="w-3 h-3 text-gray-500 dark:text-gray-400 cursor-pointer" />
                  </Tooltip>
                </span>
                <span className="font-medium text-xs text-gray-900 dark:text-white">
                  {quote.fees.totalFeeAmountUsdDisplay}
                </span>
              </div>
            )}

            {quote?.destinationCalldata && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCalldata(!showCalldata)
                    // Auto-scroll to calldata when expanding
                    if (!showCalldata) {
                      setTimeout(() => {
                        if (calldataRef.current) {
                          calldataRef.current.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                          })
                        }
                      }, 150) // Delay to let the expansion animation start
                    }
                  }}
                  className="flex items-center gap-1 text-xs hover:underline cursor-pointer transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label={
                    showCalldata
                      ? "Hide custom calldata"
                      : "Show custom calldata"
                  }
                >
                  <span className="text-[10px]">
                    Includes custom destination calldata
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ease-out ${
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
                <div
                  ref={calldataRef}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    showCalldata ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-2">
                    <textarea
                      value={quote.destinationCalldata}
                      readOnly
                      className={`w-full p-2 text-xs font-mono rounded border resize-none transition-all duration-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200`}
                      rows={4}
                      placeholder="No custom calldata"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Children content */}
            {children && <div className="space-y-2">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteDetails
