import { ExternalLink } from "lucide-react"
import React, { useEffect } from "react"
import type { TransactionState } from "../../transactions.js"
import type { ActiveTheme } from "../../theme.js"

interface TransferPendingProps {
  onComplete: () => void
  theme?: ActiveTheme
  transactionStates: TransactionState[]
}

const _truncateHash = (hash: string) => {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

export const TransferPending: React.FC<TransferPendingProps> = ({
  onComplete,
  theme = "light",
  transactionStates,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  // Find the first pending transaction index
  const activePendingIndex = transactionStates.findIndex(
    (tx) => tx.state === "pending",
  )

  const renderStep = (tx: TransactionState, index: number) => {
    const isPending = tx.state === "pending"
    const isActivePending = index === activePendingIndex
    const isAfterPending =
      activePendingIndex !== -1 && index > activePendingIndex

    const dotClasses = `relative w-3 h-3 rounded-full transition-colors ${
      isAfterPending
        ? theme === "dark"
          ? "bg-gray-700"
          : "bg-gray-300"
        : tx.state === "confirmed"
          ? theme === "dark"
            ? "bg-green-500"
            : "bg-green-600"
          : tx.state === "failed"
            ? theme === "dark"
              ? "bg-red-500"
              : "bg-red-600"
            : theme === "dark"
              ? "bg-blue-500"
              : "bg-blue-600"
    } ${isActivePending ? "animate-[pulse_1.5s_ease-in-out_infinite]" : ""}`

    const labelClasses = `mt-2 text-xs transition-colors text-center whitespace-nowrap flex items-center gap-1 ${
      isPending || isAfterPending
        ? theme === "dark"
          ? "text-gray-400 font-medium"
          : "text-gray-500 font-medium"
        : theme === "dark"
          ? "text-gray-100 font-semibold hover:underline"
          : "text-gray-900 font-semibold hover:underline"
    }`

    const content = (
      <>
        <div className="relative">
          <div className={dotClasses}>
            {isActivePending && (
              <div
                className={`absolute inset-0 rounded-full ${
                  theme === "dark" ? "bg-blue-500" : "bg-blue-600"
                } animate-[pulseRing_2s_cubic-bezier(0.4,0,0.6,1)_infinite]`}
              />
            )}
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <div className={labelClasses}>
            {tx.label}
            {!isPending && !isAfterPending && (
              <ExternalLink className="w-3 h-3" />
            )}
          </div>
        </div>
      </>
    )

    if (isPending || isAfterPending) {
      return (
        <div className="flex flex-col items-center relative">{content}</div>
      )
    }

    return (
      <a
        href={tx.explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center relative"
      >
        {content}
      </a>
    )
  }

  const renderDots = (index: number) => {
    const isActiveDots = index === activePendingIndex - 1

    return (
      <div className="flex-1 flex items-center justify-center mx-4">
        <div className="flex items-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                theme === "dark"
                  ? index >= activePendingIndex
                    ? "bg-gray-700"
                    : "bg-gray-600"
                  : index >= activePendingIndex
                    ? "bg-gray-300"
                    : "bg-gray-400"
              } ${isActiveDots ? "animate-[dotFadeIn_1.5s_ease-in-out_infinite]" : ""}`}
              style={{
                animationDelay: isActiveDots ? `${i * 0.2}s` : "0s",
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <style>
        {`
          @keyframes dotFadeIn {
            0% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
          }
          @keyframes pulseRing {
            0% { transform: scale(0.7); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}
      </style>
      <div className="space-y-8 flex flex-col items-center justify-center py-8">
        <h2
          className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Transfer Pending
        </h2>

        {/* Large Spinner */}
        <div
          className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
            theme === "dark" ? "border-blue-400" : "border-blue-500"
          }`}
          style={{ borderTopWidth: "2px", borderBottomWidth: "2px" }}
        />

        <div className="w-full max-w-2xl">
          <div className="relative flex items-center justify-center pb-8">
            <div
              className={`flex items-center ${
                transactionStates.length === 1
                  ? "w-auto"
                  : transactionStates.length === 2
                    ? "w-[200px]"
                    : "w-full justify-between"
              }`}
            >
              {/* Steps with dotted lines */}
              {transactionStates.map((tx, index) => (
                <React.Fragment key={`${tx.transactionHash}-${index}`}>
                  {/* Step */}
                  <div className="flex flex-col items-center">
                    {renderStep(tx, index)}
                  </div>

                  {/* Dotted line after each dot except the last one */}
                  {index < transactionStates.length - 1 && renderDots(index)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          Waiting for confirmation...
        </p>
      </div>
    </>
  )
}

export default TransferPending
