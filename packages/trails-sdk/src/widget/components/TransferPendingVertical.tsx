import { TokenImage } from "@0xsequence/design-system"
import { ExternalLink } from "lucide-react"
import type React from "react"
import { useEffect } from "react"
import type { ActiveTheme } from "../../theme.js"

interface TransactionState {
  transactionHash: string
  explorerUrl: string
  chainId: number
  state: "pending" | "failed" | "confirmed"
}

interface TransferPendingProps {
  onComplete: () => void
  theme?: ActiveTheme
  transactionStates: TransactionState[]
  fromAmount: string
  fromAmountUsd: string
  fromTokenSymbol: string
  fromTokenName: string
  fromChainId: number
  fromTokenImageUrl?: string
  timestamp?: number
}

const getStepLabel = (index: number, total: number) => {
  if (total === 1) return "Transaction"
  if (total === 2) return index === 0 ? "Transaction" : "Swap"
  return index === 0 ? "Transfer" : index === 1 ? "Swap & Bridge" : "Execute"
}

const _truncateHash = (hash: string) => {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

export const TransferPending: React.FC<TransferPendingProps> = ({
  onComplete,
  theme = "light",
  transactionStates,
  fromAmount,
  fromAmountUsd,
  fromTokenSymbol,
  fromTokenName,
  fromChainId,
  fromTokenImageUrl,
  timestamp,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  // Calculate time difference
  const getTimeAgo = () => {
    if (!timestamp) return "Sent just now"

    const now = Date.now()
    const diffInSeconds = Math.floor((now - timestamp) / 1000)

    if (diffInSeconds < 1) return "Sent just now"
    if (diffInSeconds === 1) return "Sent 1 second ago"
    if (diffInSeconds < 60) return `Sent ${diffInSeconds} seconds ago`

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes === 1) return "Sent 1 minute ago"
    if (diffInMinutes < 60) return `Sent ${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours === 1) return "Sent 1 hour ago"
    if (diffInHours < 24) return `Sent ${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "Sent 1 day ago"
    return `Sent ${diffInDays} days ago`
  }

  // Find the first pending transaction index
  const activePendingIndex = transactionStates.findIndex(
    (tx) => tx.state === "pending",
  )

  const renderStep = (tx: TransactionState, index: number) => {
    // const isPending = tx.state === "pending"
    const isActivePending = index === activePendingIndex
    // const isAfterPending = activePendingIndex !== -1 && index > activePendingIndex
    const isCompleted = tx.state === "confirmed"
    const isFailed = tx.state === "failed"

    // Determine step state
    let stepState: "completed" | "active" | "pending" | "failed"
    if (isFailed) {
      stepState = "failed"
    } else if (isCompleted) {
      stepState = "completed"
    } else if (isActivePending) {
      stepState = "active"
    } else {
      stepState = "pending"
    }

    // Circle styles based on state
    const getCircleStyles = () => {
      const baseStyles =
        "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"

      switch (stepState) {
        case "completed":
          return `${baseStyles} ${
            theme === "dark" ? "bg-green-500" : "bg-green-600"
          }`
        case "active":
          return `${baseStyles} ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-600"
          }`
        case "failed":
          return `${baseStyles} ${
            theme === "dark" ? "bg-red-500" : "bg-red-600"
          }`
        case "pending":
          return `${baseStyles} ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-300"
          }`
      }
    }

    // Checkmark icon for completed steps
    const CheckmarkIcon = () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <title>Completed</title>
        <path
          d="M2.5 6L5 8.5L9.5 4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )

    // X icon for failed steps
    const XIcon = () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <title>Failed</title>
        <path
          d="M3 3L9 9M9 3L3 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )

    // Spinner icon for active steps
    const SpinnerIcon = () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="animate-spin"
      >
        <title>Processing</title>
        <circle
          cx="6"
          cy="6"
          r="4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 6"
          strokeDashoffset="0"
        />
      </svg>
    )

    // Text styles based on state
    const getTextStyles = () => {
      const baseStyles = "text-sm font-medium transition-colors duration-300"

      // Use regular colors instead of state-based colors
      return `${baseStyles} ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`
    }

    const content = (
      <div className="flex items-start space-x-4">
        {/* Circle with state indicator */}
        <div className="flex-shrink-0">
          <div className={getCircleStyles()}>
            {stepState === "completed" && <CheckmarkIcon />}
            {stepState === "failed" && <XIcon />}
            {stepState === "active" && <SpinnerIcon />}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className={getTextStyles()}>
              {getStepLabel(index, transactionStates.length)}
            </span>
            {stepState === "completed" && (
              <ExternalLink className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    )

    if (stepState === "completed" || stepState === "failed") {
      return (
        <a
          href={tx.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity"
        >
          {content}
        </a>
      )
    }

    return <div className="block">{content}</div>
  }

  return (
    <div className="space-y-8 flex flex-col items-center justify-center py-8">
      <h2
        className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Transaction status
      </h2>

      {/* Transfer Information */}
      <div
        className={`w-full max-w-md p-4 rounded-lg ${
          theme === "dark"
            ? "bg-gray-800/50 text-gray-200"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        <div className="flex items-start justify-between">
          {/* Left side - Chain and Token images with token name */}
          <div className="flex items-start space-x-3">
            {/* Token Image and Name */}
            <div className="flex items-center space-x-2">
              <div style={{ width: "48px", height: "48px" }}>
                <TokenImage
                  src={fromTokenImageUrl}
                  symbol={fromTokenSymbol}
                  size="md"
                  className="w-48 h-48 w-full h-full"
                  withNetwork={fromChainId}
                  disableAnimation={true}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {fromTokenName}
                </span>
                <span
                  className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  {getTimeAgo()}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - USD value and amount */}
          <div className="text-right">
            <div
              className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {fromAmountUsd}
            </div>
            <div
              className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
              {fromAmount} {fromTokenSymbol}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Stepper */}
      <div className="w-full max-w-[200px] mx-auto">
        <div className="relative">
          {/* Vertical line connecting all steps */}
          <div
            className={`absolute left-2.5 top-5 bottom-5 w-0.5 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
          />

          {/* Progress line for completed steps */}
          {activePendingIndex > 0 && (
            <div
              className="absolute left-2.5 top-5 w-0.5 bg-green-500 transition-all duration-500"
              style={{
                height: `${(activePendingIndex / (transactionStates.length - 1)) * 80}%`,
                maxHeight: "calc(100% - 20px)",
              }}
            />
          )}

          {/* Steps */}
          <div className="space-y-6">
            {transactionStates.map((tx, index) => (
              <div key={`${tx.transactionHash}-${index}`} className="relative">
                {renderStep(tx, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransferPending
