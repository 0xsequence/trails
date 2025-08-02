import { useQuery } from "@tanstack/react-query"
import type React from "react"
import { useEffect, useState } from "react"
import type { TransactionState } from "../../transactions.js"
import { GreenCheckAnimation } from "./GreenCheckAnimation.js"
import { getTxTimeDiff } from "../../transactions.js"
import { QuoteDetails } from "./QuoteDetails.js"
import type { PrepareSendQuote } from "../../prepareSend.js"
import { truncateAddress } from "../../address.js"

interface ReceiptProps {
  onSendAnother: () => void
  onClose: () => void
  renderInline?: boolean
  transactionStates?: TransactionState[]
  totalCompletionSeconds?: number
  quote?: PrepareSendQuote | null
}

// Hook to fetch the time difference in seconds between two transactions on possibly different chains
function useTxTimeDiff(firstTx?: TransactionState, lastTx?: TransactionState) {
  const enabled = Boolean(
    firstTx?.chainId &&
      lastTx?.chainId &&
      firstTx &&
      lastTx &&
      (firstTx.blockNumber || firstTx.transactionHash) &&
      (lastTx.blockNumber || lastTx.transactionHash) &&
      (firstTx.blockNumber !== lastTx.blockNumber ||
        firstTx.transactionHash !== lastTx.transactionHash),
  )
  const { data: completionTimeSeconds = 0 } = useQuery({
    queryKey: [
      "completionTimeSeconds",
      firstTx?.blockNumber,
      lastTx?.blockNumber,
      firstTx?.transactionHash,
      lastTx?.transactionHash,
      firstTx?.chainId,
      lastTx?.chainId,
    ],
    enabled,
    queryFn: async () => {
      return getTxTimeDiff(firstTx, lastTx)
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
  return completionTimeSeconds
}

// Custom hook to compute finalExplorerUrl and completionTimeSeconds
function useReceipt(transactionStates?: TransactionState[]) {
  const finalExplorerUrl =
    transactionStates?.[transactionStates.length - 1]?.explorerUrl

  // Only consider confirmed transactions
  const confirmedTxs = (transactionStates || []).filter(
    (tx) => tx.state === "confirmed",
  )

  const first = confirmedTxs[0]
  const last = confirmedTxs[confirmedTxs.length - 1]

  const completionTimeSeconds = useTxTimeDiff(first, last)
  return { finalExplorerUrl, completionTimeSeconds }
}

export const Receipt: React.FC<ReceiptProps> = ({
  onClose,
  renderInline = false,
  transactionStates = [],
  totalCompletionSeconds,
  quote,
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  const { finalExplorerUrl, completionTimeSeconds: calculatedCompletionTime } =
    useReceipt(transactionStates)

  // Use provided totalCompletionSeconds if available, otherwise use calculated time
  const completionTimeSeconds =
    totalCompletionSeconds ?? calculatedCompletionTime

  if (!finalExplorerUrl) {
    return (
      <div className="flex flex-col justify-center min-h-full space-y-6 pt-8">
        <div className="text-center">
          <div className={`mx-auto flex items-center justify-center mb-4`}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/20">
              <svg
                className="w-8 h-8 text-red-500 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Error</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transaction Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            No final transaction hash found. This is likely due to a failed
            transaction or failed relay. Please reach out to support.
          </p>
        </div>

        {!renderInline && (
          <div className="text-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center min-h-full space-y-6 pt-8">
      <div className="text-center">
        <div className={`mx-auto flex items-center justify-center`}>
          <GreenCheckAnimation />
        </div>

        <div
          className={`transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Transaction Confirmed
          </h2>
          {completionTimeSeconds > 0 && (
            <div
              className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 justify-center animate-fade-in-up"
              style={{
                animation: "fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                animationFillMode: "both",
              }}
            >
              <span className="inline-block animate-fade-in-up">
                Completed in <strong>{completionTimeSeconds}s</strong>
              </span>
              {totalCompletionSeconds && totalCompletionSeconds < 15 && (
                <svg
                  className="w-4 h-4 ml-1 text-yellow-400 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <title>Lightning Fast</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    fill="currentColor"
                  />
                </svg>
              )}
              <style>{`
                @keyframes fadeInUp {
                  0% { opacity: 0; transform: translateY(16px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>

      <div
        className={`text-center transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <a
          href={finalExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors border text-sm bg-white border-gray-200 text-black hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-blue-300 dark:hover:bg-gray-800 dark:hover:text-blue-200"
        >
          View on Explorer
          <svg
            className="w-4 h-4 ml-1 text-black dark:text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>External Link</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      <div
        className={`space-y-3 transition-all duration-500 ease-out delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {!renderInline && (
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            Close
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[24px] transition-colors cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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
        {showDetails && (
          <div className="p-4 rounded-lg text-sm space-y-4 trails-bg-secondary">
            {transactionStates.length > 0 && (
              <div className="space-y-2">
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  Transactions:
                </div>
                <div className="space-y-2">
                  {transactionStates.map((state) => (
                    <div
                      key={state.transactionHash}
                      className="p-2 rounded bg-gray-100 dark:bg-gray-700/50"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          {state.label}:
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            state.state === "confirmed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
                          }`}
                        >
                          {state.state}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Chain ID:
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {state.chainId}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">
                          Hash:
                        </span>
                        <a
                          href={state.explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:underline text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <span>{truncateAddress(state.transactionHash)}</span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <title>External Link</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quote Details */}
            {quote && (
              <div className="mt-6">
                <div className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Quote Details:
                </div>
                <QuoteDetails quote={quote} showContent={showDetails} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Receipt
