// biome-ignore lint/style/useImportType: False positive
import React, { useState } from "react"
import type { TransactionState } from "../../anypay.js"
import { getExplorerUrl } from "../../anypay.js"

interface ReceiptProps {
  txHash?: string
  chainId?: number
  onSendAnother: () => void
  onClose: () => void
  theme?: "light" | "dark"
  renderInline?: boolean
  transactionStates?: TransactionState[]
}

export const Receipt: React.FC<ReceiptProps> = ({
  txHash,
  chainId,
  onSendAnother,
  onClose,
  theme = "light",
  renderInline = false,
  transactionStates = [],
}) => {
  const [showDetails, setShowDetails] = useState(false)

  if (!txHash || !chainId) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div
          className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
            theme === "dark" ? "bg-green-900/20" : "bg-green-100"
          }`}
        >
          <svg
            className={`h-6 w-6 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2
          className={`mt-4 text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Transaction Confirmed
        </h2>
      </div>

      <div className="text-center">
        <a
          href={getExplorerUrl(txHash, chainId)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors border text-sm
            ${
              theme === "dark"
                ? "bg-gray-900 border-gray-700 text-blue-300 hover:bg-gray-800 hover:text-blue-200"
                : "bg-white border-gray-200 text-black hover:bg-gray-50 hover:text-gray-900"
            }
          `}
        >
          View on Explorer
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke={theme === "dark" ? "currentColor" : "black"}
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

      <div className="space-y-3">
        <button
          onClick={onSendAnother}
          className={`w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Start Another Transaction
        </button>
        {!renderInline && (
          <button
            onClick={onClose}
            className={`w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
            }`}
          >
            Close
          </button>
        )}
        <button
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {showDetails && (
          <div
            className={`p-4 rounded-lg text-sm space-y-4 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            {transactionStates.length > 0 && (
              <div className="space-y-2">
                <div
                  className={`font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Transactions:
                </div>
                <div className="space-y-2">
                  {transactionStates.map((state, index) => (
                    <div
                      key={state.transactionHash}
                      className={`p-2 rounded ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Step {index + 1}:
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            state.state === "confirmed"
                              ? theme === "dark"
                                ? "bg-green-900/50 text-green-400"
                                : "bg-green-100 text-green-700"
                              : theme === "dark"
                                ? "bg-yellow-900/50 text-yellow-400"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {state.state}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between items-center">
                        <span
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Chain ID:
                        </span>
                        <span
                          className={
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }
                        >
                          {state.chainId}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between items-center">
                        <span
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          Hash:
                        </span>
                        <a
                          href={state.explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1 hover:underline ${
                            theme === "dark"
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-700"
                          }`}
                        >
                          <span>
                            {state.transactionHash.slice(0, 6)}...
                            {state.transactionHash.slice(-4)}
                          </span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Receipt
