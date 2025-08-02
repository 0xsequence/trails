import { ExternalLink } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import type { TransactionState } from "../../transactions.js"
import { TokenImage } from "./TokenImage.js"
import type { PrepareSendQuote } from "../../prepareSend.js"
import { QuoteDetails } from "./QuoteDetails.js"

interface TransferPendingProps {
  onElapsedTime: (totalCompletionSeconds?: number) => void
  transactionStates: TransactionState[]
  quote?: PrepareSendQuote | null
  timestamp?: number
}

export const TransferPending: React.FC<TransferPendingProps> = ({
  onElapsedTime,
  transactionStates,
  quote,
  timestamp,
}) => {
  const [showContent, setShowContent] = useState(false)
  const [activePendingIndex, setActivePendingIndex] = useState(-1)
  const [showDots, setShowDots] = useState(false)
  const [showLine, setShowLine] = useState(false)
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const timeoutTimer = setTimeout(() => {
      setShowTimeoutWarning(true)
    }, 60000) // 1 minute

    return () => clearTimeout(timeoutTimer)
  }, [])

  useEffect(() => {
    // Animate content in
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 200)

    return () => clearTimeout(contentTimer)
  }, [])

  useEffect(() => {
    // Show dots first, then animate them in
    const dotsTimer = setTimeout(() => {
      setShowDots(true)
    }, 400)

    // Show line after dots are visible
    const lineTimer = setTimeout(() => {
      setShowLine(true)
    }, 800)

    return () => {
      clearTimeout(dotsTimer)
      clearTimeout(lineTimer)
    }
  }, [])

  useEffect(() => {
    // Update active pending index with animation
    const newActiveIndex = transactionStates.findIndex(
      (tx) => tx.state === "pending",
    )
    if (newActiveIndex !== activePendingIndex) {
      setActivePendingIndex(newActiveIndex)
    }
  }, [transactionStates, activePendingIndex])

  // Add CSS animation for draw effect
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes draw {
        from {
          stroke-dasharray: 0 100;
        }
        to {
          stroke-dasharray: 100 0;
        }
      }
      
      .animate-draw {
        animation: draw 0.6s ease-out forwards;
      }

      @keyframes slideInFromTop {
        from {
          transform: translateY(-20px);
        }
        to {
          transform: translateY(0);
        }
      }

      @keyframes lineGrow {
        from {
          height: 0;
        }
        to {
          height: 100%;
        }
      }

      .animate-slide-in {
        animation: slideInFromTop 0.3s ease-out forwards;
      }

      .animate-line-grow {
        animation: lineGrow 0.6s ease-out forwards;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Live timer state for 'Sent just now'
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(elapsedSeconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [elapsedSeconds])

  useEffect(() => {
    onElapsedTime(elapsedSeconds)
  }, [onElapsedTime, elapsedSeconds])

  // Format timer as 'Xs…', '1m1s…', etc.
  function formatElapsed(seconds: number) {
    if (seconds < 60) return `${seconds}s…`
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m${s}s…`
  }

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

  // Compute effective states: a tx is only confirmed if all previous are confirmed, else pending
  const effectiveStates: TransactionState[] = []
  let foundUnconfirmed = false
  for (const tx of transactionStates) {
    if (foundUnconfirmed || tx.state !== "confirmed") {
      foundUnconfirmed = true
      effectiveStates.push({
        ...tx,
        state: tx.state === "confirmed" ? "pending" : tx.state,
      })
    } else {
      effectiveStates.push(tx)
    }
  }

  const renderStep = (tx: TransactionState, index: number) => {
    const isActivePending = index === activePendingIndex
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
        "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ease-out"

      switch (stepState) {
        case "completed":
          return `${baseStyles} bg-green-600 dark:bg-green-500 scale-100`
        case "active":
          return `${baseStyles} bg-blue-600 dark:bg-blue-500 scale-110`
        case "failed":
          return `${baseStyles} bg-red-600 dark:bg-red-500 scale-100`
        case "pending":
          return `${baseStyles} bg-gray-300 dark:bg-gray-600 scale-100`
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
          className="animate-draw"
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
          className="animate-draw"
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
      const baseStyles =
        "text-sm font-medium transition-all duration-500 ease-out"

      // Use regular colors instead of state-based colors
      return `${baseStyles} text-gray-900 dark:text-white`
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
            <span className={getTextStyles()}>{tx.label}</span>
            {stepState === "completed" ? (
              <ExternalLink className="w-4 h-4 text-gray-400 transition-opacity duration-300" />
            ) : (
              <div className="w-4 h-4" />
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
          className="block hover:opacity-80 transition-all duration-300 ease-out"
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
        className={`text-2xl font-bold transition-all duration-500 ease-out ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } text-gray-900 dark:text-white`}
      >
        Transaction status
      </h2>

      {/* Transfer Information */}
      <div
        className={`w-full max-w-sm p-3 rounded-lg transition-all duration-500 ease-out delay-100 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } bg-gray-50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-200`}
      >
        <div className="flex items-start justify-between">
          {/* Left side - Chain and Token images with token name */}
          <div className="flex items-start space-x-2">
            {/* Token Image and Name */}
            <div className="flex items-center space-x-2">
              <div style={{ width: "24px", height: "24px" }}>
                <TokenImage
                  imageUrl={quote?.originToken.imageUrl}
                  symbol={quote?.originToken.symbol}
                  chainId={quote?.originChain.id}
                  size={24}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {quote?.originToken.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  {getTimeAgo()}
                  <span className="ml-1 font-mono animate-pulse text-gray-500 dark:text-gray-400">
                    {formatElapsed(elapsedSeconds)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right side - USD value and amount */}
          <div className="text-right">
            <div className="text-xs font-medium text-gray-900 dark:text-white">
              {quote?.originAmountUsdDisplay}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {quote?.originAmountFormatted} {quote?.originToken.symbol}
            </div>
          </div>
        </div>
      </div>

      {/* Timeout Warning */}
      {showTimeoutWarning && (
        <div
          className={`w-full max-w-sm transition-all duration-500 ease-out delay-150 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
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
                  Transaction taking longer than expected
                </p>
                <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                  This transaction is taking longer than expected. Please reach
                  out to support for help if the issue persists.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vertical Stepper */}
      <div className="w-full mx-auto" style={{ width: "auto" }}>
        <div className="relative">
          {/* Vertical line connecting all steps */}
          <div
            className={`absolute left-2.5 top-5 bottom-5 w-0.5 transition-all duration-500 ease-out bg-gray-300 dark:bg-gray-700 ${showLine ? "animate-line-grow" : "h-0"}`}
          />

          {/* Progress line for completed steps */}
          {activePendingIndex > 0 && showLine && (
            <div
              className="absolute left-2.5 top-5 w-0.5 bg-green-500 transition-all duration-1000 ease-out"
              style={{
                height: `${(activePendingIndex / (transactionStates.length - 1)) * 80}%`,
                maxHeight: "calc(100% - 20px)",
              }}
            />
          )}

          {/* Steps */}
          <div className="space-y-6">
            {effectiveStates.map((tx, index) => (
              <div
                key={`${tx.transactionHash}-${index}`}
                className="relative transition-all duration-300 ease-out"
                style={{
                  transitionDelay: showDots ? `${index * 100}ms` : "0ms",
                  transform: showDots ? "translateY(0)" : "translateY(-20px)",
                  visibility: showDots ? "visible" : "hidden",
                }}
              >
                {renderStep(tx, index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div
        className={`w-full max-w-sm transition-all duration-500 ease-out delay-200 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2 py-1 px-4 rounded-[24px] transition-colors cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label={
            showDetails
              ? "Hide transaction details"
              : "Show transaction details"
          }
        >
          <span>More Details</span>
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${
              showDetails ? "rotate-180" : ""
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

        {showDetails && (
          <div className="mt-4">
            <QuoteDetails quote={quote} showContent={true} />
          </div>
        )}
      </div>
    </div>
  )
}

export default TransferPending
