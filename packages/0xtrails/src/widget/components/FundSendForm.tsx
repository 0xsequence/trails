import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import type { Account, WalletClient } from "viem"
import { formatUnits } from "viem"
import type { TransactionState } from "../../transactions.js"
import type { RelayerEnv } from "../../relayer.js"
import type { OnCompleteProps, Token, TokenInfo } from "../hooks/useSendForm.js"
import { useSendForm } from "../hooks/useSendForm.js"
import { ChainImage } from "./ChainImage.js"
import { TokenImage } from "./TokenImage.js"
import { QuoteDetails } from "./QuoteDetails.js"
import { TruncatedAddress } from "./TruncatedAddress.js"
import { TradeType } from "../../prepareSend.js"
import type { PrepareSendQuote } from "../../prepareSend.js"
import { formatAmount, formatUsdAmountDisplay } from "../../tokenBalances.js"

interface FundSendFormProps {
  selectedToken: Token
  onSend: (amount: string, recipient: string) => void
  onBack: () => void
  onConfirm: () => void
  onComplete: (result: OnCompleteProps) => void
  account: Account
  sequenceProjectAccessKey: string
  apiUrl?: string
  env?: RelayerEnv
  toRecipient?: string
  toAmount?: string
  toChainId?: number
  toToken?: string
  toCalldata?: string
  walletClient: WalletClient
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  onError: (error: Error | string | null) => void
  onWaitingForWalletConfirm: (props: PrepareSendQuote) => void
  paymasterUrls?: Array<{ chainId: number; url: string }>
  gasless?: boolean
  setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void
}

export const FundSendForm: React.FC<FundSendFormProps> = ({
  selectedToken,
  onSend,
  onBack,
  onConfirm,
  onComplete,
  account,
  sequenceProjectAccessKey,
  apiUrl,
  env,
  toAmount,
  toRecipient,
  toChainId,
  toToken,
  toCalldata,
  walletClient,
  onTransactionStateChange,
  onError,
  onWaitingForWalletConfirm,
  paymasterUrls,
  gasless,
  setWalletConfirmRetryHandler,
}) => {
  // Local state for fund-specific functionality
  const [isInputTypeUsd, setIsInputTypeUsd] = useState(false)
  const [showMoreDetails, setShowMoreDetails] = useState(false)
  const [tokenAmountForBackend, setTokenAmountForBackend] = useState("")
  const [inputDisplayValue, setInputDisplayValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const chainDropdownRef = useRef<HTMLDivElement>(null)
  const tokenDropdownRef = useRef<HTMLDivElement>(null)

  // Auto-focus input field on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const {
    amount: hookAmount,
    amountUsdDisplay,
    balanceFormatted,
    balanceUsdDisplay,
    chainInfo,
    isSubmitting,
    isLoadingQuote,
    selectedDestinationChain,
    selectedDestToken,
    setAmount: setHookAmount,
    handleSubmit,
    buttonText,
    toAmountFormatted,
    toAmountDisplay,
    sourceTokenPrices,
    destTokenPrices,
    isValidRecipient,
    recipient,
    isChainDropdownOpen,
    isTokenDropdownOpen,
    setIsChainDropdownOpen,
    setIsTokenDropdownOpen,
    supportedChains,
    supportedTokens,
    setSelectedDestinationChain,
    setSelectedDestToken,
    prepareSendQuote,
  } = useSendForm({
    account,
    sequenceProjectAccessKey,
    apiUrl,
    env,
    // Don't pass toAmount for fund form - user enters input amount
    toRecipient: toRecipient || account.address,
    toChainId,
    toToken,
    toCalldata,
    walletClient,
    onTransactionStateChange,
    onError,
    onWaitingForWalletConfirm,
    paymasterUrls,
    gasless,
    onConfirm,
    onComplete,
    onSend,
    selectedToken,
    setWalletConfirmRetryHandler,
    tradeType: TradeType.EXACT_INPUT,
  })

  // Get source token price for USD conversions
  const sourceTokenPrice = sourceTokenPrices?.[0]?.price?.value ?? 0

  // Get destination token price for receive USD value
  const destTokenPrice = destTokenPrices?.[0]?.price?.value ?? 0

  // Sync display value with token amount only when mode changes (not during typing)
  const [lastInputMode, setLastInputMode] = useState(isInputTypeUsd)

  useEffect(() => {
    // Only sync when mode actually changes, not during normal typing
    if (lastInputMode !== isInputTypeUsd && tokenAmountForBackend) {
      const tokenAmount = parseFloat(tokenAmountForBackend) || 0
      if (isInputTypeUsd && sourceTokenPrice > 0) {
        // Show USD with max 2 decimals
        const usdAmount = tokenAmount * sourceTokenPrice
        setInputDisplayValue(Number(usdAmount.toFixed(2)).toString())
      } else {
        // Show token with max 8 decimals
        setInputDisplayValue(Number(tokenAmount.toFixed(8)).toString())
      }
      setLastInputMode(isInputTypeUsd)
    }
  }, [isInputTypeUsd, sourceTokenPrice, tokenAmountForBackend, lastInputMode])

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chainDropdownRef.current &&
        !chainDropdownRef.current.contains(event.target as Node)
      ) {
        setIsChainDropdownOpen(false)
      }
      if (
        tokenDropdownRef.current &&
        !tokenDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTokenDropdownOpen(false)
      }
    }

    if (isChainDropdownOpen || isTokenDropdownOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [
    setIsChainDropdownOpen,
    setIsTokenDropdownOpen,
    isChainDropdownOpen,
    isTokenDropdownOpen,
  ])

  // Handle input amount changes with 8 decimal limit and 16 char total limit
  const handleAmountChange = useCallback(
    (value: string) => {
      // Allow empty string
      if (value === "") {
        setInputDisplayValue("")
        setTokenAmountForBackend("")
        setHookAmount("")
        return
      }

      // Limit total length to 16 characters
      if (value.length > 16) {
        return
      }

      // Validate decimal places (max 8 decimals) and allow single decimal point
      const decimalMatch = value.match(/^\d*\.?\d{0,8}$/)
      if (!decimalMatch) {
        return // Don't update if invalid format
      }

      // Store the display value
      setInputDisplayValue(value)

      // Update the token amount for backend and useSendForm
      if (isInputTypeUsd && sourceTokenPrice > 0) {
        const usdAmount = parseFloat(value) || 0
        const tokenAmount = usdAmount / sourceTokenPrice
        setTokenAmountForBackend(tokenAmount.toString())
        setHookAmount(tokenAmount.toString())
      } else {
        setTokenAmountForBackend(value)
        setHookAmount(value)
      }
    },
    [setHookAmount, isInputTypeUsd, sourceTokenPrice],
  )

  // Get display values based on input type
  const displayAmount = useMemo(() => {
    return inputDisplayValue
  }, [inputDisplayValue])

  const displayUsdValue = useMemo(() => {
    if (isInputTypeUsd && sourceTokenPrice > 0) {
      // Show token amount when in USD mode
      const tokenAmount = parseFloat(tokenAmountForBackend) || 0
      return `${formatAmount(tokenAmount)} ${selectedToken.symbol}`
    }
    return amountUsdDisplay
  }, [
    tokenAmountForBackend,
    isInputTypeUsd,
    sourceTokenPrice,
    selectedToken.symbol,
    amountUsdDisplay,
  ])

  // Calculate USD value for the receive section based on destination token
  const receiveUsdValue = useMemo(() => {
    if (destTokenPrice > 0) {
      const destinationAmount = parseFloat(toAmountFormatted) || 0
      const usdValue = destinationAmount * destTokenPrice
      console.log("[trails-sdk] Receive USD calculation:", {
        toAmountFormatted,
        destinationAmount,
        destTokenPrice,
        usdValue,
        formatted: formatUsdAmountDisplay(usdValue),
      })
      return formatUsdAmountDisplay(usdValue)
    }
    return formatUsdAmountDisplay(0)
  }, [toAmountFormatted, destTokenPrice])

  // Handle percentage clicks for quick amounts
  const handlePercentageClick = useCallback(
    (percentage: number) => {
      if (!selectedToken.balance || !selectedToken.contractInfo?.decimals) {
        return
      }

      const totalBalance = parseFloat(
        formatUnits(
          BigInt(selectedToken.balance),
          selectedToken.contractInfo.decimals,
        ),
      )

      const calculatedAmount = (totalBalance * percentage) / 100
      // Cap decimals to 8 places
      const cappedAmount = parseFloat(calculatedAmount.toFixed(8))
      const tokenAmountStr = cappedAmount.toString()

      // Update all states consistently
      setTokenAmountForBackend(tokenAmountStr)
      setHookAmount(tokenAmountStr)

      // Update display based on current mode
      if (isInputTypeUsd && sourceTokenPrice > 0) {
        const usdAmount = cappedAmount * sourceTokenPrice
        setInputDisplayValue(Number(usdAmount.toFixed(2)).toString())
      } else {
        setInputDisplayValue(tokenAmountStr)
      }
    },
    [selectedToken, setHookAmount, isInputTypeUsd, sourceTokenPrice],
  )

  // Handle input type toggle (USD ↔ Token)
  const handleInputTypeToggle = useCallback(() => {
    // Use tokenAmountForBackend as the source of truth for conversion
    const currentTokenAmount = parseFloat(tokenAmountForBackend) || 0

    if (isInputTypeUsd && sourceTokenPrice > 0) {
      // Switching from USD to token mode
      // Display the token amount (limit to 8 decimals)
      const tokenAmountStr = Number(currentTokenAmount.toFixed(8)).toString()
      setInputDisplayValue(tokenAmountStr)
    } else if (!isInputTypeUsd && sourceTokenPrice > 0) {
      // Switching from token to USD mode
      // Display USD amount (limit to 2 decimals)
      const usdAmount = currentTokenAmount * sourceTokenPrice
      const usdAmountStr = Number(usdAmount.toFixed(2)).toString()
      setInputDisplayValue(usdAmountStr)
    }

    // hookAmount stays as token amount (don't change it)
    // tokenAmountForBackend stays as token amount (don't change it)

    setIsInputTypeUsd(!isInputTypeUsd)
    // Focus the input field after toggling
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        // Select all text for easy replacement
        inputRef.current.select()
      }
    }, 0)
  }, [tokenAmountForBackend, isInputTypeUsd, sourceTokenPrice])

  // Dynamic font size based on input length
  const inputStyles = useMemo(() => {
    const inputLength = displayAmount.length
    let fontSize = "text-6xl" // Much larger initial size

    if (inputLength > 12) {
      fontSize = "text-2xl"
    } else if (inputLength > 9) {
      fontSize = "text-3xl"
    } else if (inputLength > 6) {
      fontSize = "text-4xl"
    } else if (inputLength > 3) {
      fontSize = "text-5xl"
    }

    return {
      fontSize,
      transition: "all 0.1s ease-in-out",
    }
  }, [displayAmount.length])

  console.log("[trails-sdk] FundForm", {
    hookAmount, // actual token amount used by backend
    displayAmount, // what user sees in input
    isInputTypeUsd,
    sourceTokenPrice,
    toAmount,
    isSubmitting,
    selectedDestinationChain,
  })

  if (!selectedDestinationChain) {
    return null
  }

  if (!selectedToken) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center relative">
        <button
          type="button"
          onClick={onBack}
          className="absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold w-full text-center text-gray-900 dark:text-white">
          Fund
        </h2>
      </div>

      {/* Balance Info Section */}
      <div className="flex items-center space-x-4 p-4 rounded-lg trails-bg-secondary">
        <div className="flex items-start justify-between w-full">
          {/* Left side - Chain and Token images with token name */}
          <div className="flex items-start space-x-2">
            <div className="flex items-center space-x-2">
              <div style={{ width: "32px", height: "32px" }}>
                <TokenImage
                  symbol={selectedToken.symbol}
                  imageUrl={selectedToken.imageUrl}
                  chainId={selectedToken.chainId}
                  size={32}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium max-w-[135px] truncate text-gray-900 dark:text-white">
                  {selectedToken.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  on {chainInfo?.name || "Unknown Chain"}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - USD value and amount */}
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              <span className="text-gray-600 dark:text-gray-400">
                Balance:{" "}
              </span>
              {balanceUsdDisplay}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {balanceFormatted} {selectedToken.symbol}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Origin Amount Input Section */}
        <div className="space-y-3">
          {/* Amount Input */}
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={displayAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className={`bg-transparent border-none outline-none ${inputStyles.fontSize} font-bold text-right text-gray-900 placeholder-gray-900 dark:text-white dark:placeholder-white`}
                style={{
                  width: `${Math.max((displayAmount || "0").length, 1)}ch`,
                  minWidth: "1ch",
                  maxWidth: "270px",
                  padding: "0",
                  margin: "0",
                }}
                inputMode="decimal"
              />
              <span
                className={`${inputStyles.fontSize} font-bold text-gray-400 dark:text-gray-500`}
                style={{
                  marginLeft:
                    displayAmount && displayAmount !== "0" ? "0.2em" : "0.1em",
                  padding: "0",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {isInputTypeUsd ? "USD" : selectedToken.symbol.slice(0, 4)}
              </span>
            </div>
          </div>

          {/* USD Value centered below input */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleInputTypeToggle}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <span className="text-xs font-medium tracking-[-2px]">↑↓</span>
              <div className="text-sm font-normal">{displayUsdValue}</div>
            </button>
          </div>

          {/* Percentage Buttons */}
          <div className="flex space-x-1 justify-center">
            {[25, 50, 100].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => handlePercentageClick(percentage)}
                className="py-1 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-500"
              >
                {percentage === 100 ? "MAX" : `${percentage}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Chain Selection */}
        {!toChainId && (
          <div className="mb-4">
            <label
              htmlFor="destination-chain"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Destination Chain
            </label>
            <div className="relative" ref={chainDropdownRef}>
              <button
                type="button"
                onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
                className="w-full flex items-center px-4 py-3 border rounded-[24px] hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <ChainImage chainId={selectedDestinationChain.id} size={24} />
                <span className="ml-2 flex-1 text-left">
                  {selectedDestinationChain.name}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    isChainDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isChainDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg max-h-60 overflow-y-auto custom-scrollbar bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  {supportedChains.map((chain) => (
                    <button
                      key={chain.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedDestinationChain(chain)
                        setIsChainDropdownOpen(false)
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      className={`w-full flex items-center px-4 py-3 ${
                        selectedDestinationChain.id === chain.id
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                          : "text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                      }`}
                    >
                      <ChainImage chainId={chain.id} size={24} />
                      <span className="ml-2">{chain.name}</span>
                      {selectedDestinationChain.id === chain.id && (
                        <span className="ml-auto text-gray-900 dark:text-white">
                          •
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Token Selection */}
        {!toToken && (
          <div className="mb-4">
            <label
              htmlFor="token"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Receive Token
            </label>
            <div className="relative" ref={tokenDropdownRef}>
              <button
                type="button"
                onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                className="w-full flex items-center px-4 py-3 border rounded-[24px] hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-sm bg-gray-100 dark:bg-gray-700">
                  <TokenImage
                    symbol={selectedDestToken?.symbol}
                    imageUrl={selectedDestToken?.imageUrl}
                    size={24}
                  />
                </div>
                <span className="ml-2 flex-1 text-left">
                  {selectedDestToken?.name} ({selectedDestToken?.symbol})
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    isTokenDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isTokenDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg max-h-60 overflow-y-auto custom-scrollbar bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  {supportedTokens.map((token) => (
                    <button
                      key={`${token.contractAddress}-${token.chainId}`}
                      type="button"
                      onClick={() => {
                        setSelectedDestToken(token as TokenInfo)
                        setIsTokenDropdownOpen(false)
                      }}
                      className={`w-full flex items-center px-4 py-3 cursor-pointer ${
                        selectedDestToken?.symbol === token.symbol
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                          : "text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                      }`}
                    >
                      <TokenImage
                        symbol={token.symbol}
                        imageUrl={token.imageUrl}
                        size={24}
                      />
                      <span className="ml-2">
                        {token.name} ({token.symbol})
                      </span>
                      {selectedDestToken?.symbol === token.symbol && (
                        <span className="ml-auto text-gray-900 dark:text-white">
                          •
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receive Section */}
        <div className="space-y-1">
          <div
            className={`text-lg font-semibold ${"text-gray-900 dark:text-white"}`}
          >
            Receive
          </div>

          <div className="p-2">
            <div className="flex items-center space-x-3">
              <TokenImage
                symbol={selectedDestToken?.symbol}
                imageUrl={selectedDestToken?.imageUrl}
                chainId={selectedDestinationChain.id}
                size={32}
              />
              <div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`text-lg font-semibold ${"text-gray-900 dark:text-white"} ${isLoadingQuote ? "animate-pulse" : ""}`}
                  >
                    {toAmountDisplay} {selectedDestToken?.symbol}
                  </div>
                  {isLoadingQuote && (
                    <div
                      className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 dark:border-blue-400"
                      style={{
                        borderTopWidth: "2px",
                        borderBottomWidth: "2px",
                      }}
                    />
                  )}
                </div>
                <div
                  className={`text-xs ${"text-gray-500 dark:text-gray-400"} ${isLoadingQuote ? "animate-pulse" : ""}`}
                >
                  ≈ {receiveUsdValue}{" "}
                  {selectedDestinationChain
                    ? `on ${selectedDestinationChain.name}`
                    : ""}
                </div>
              </div>
            </div>
          </div>

          {/* Show recipient address if different from sender */}
          {recipient &&
            recipient.toLowerCase() !== account.address.toLowerCase() && (
              <div className="px-2 pb-1">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Recipient:{" "}
                  <TruncatedAddress
                    address={recipient}
                    chainId={selectedDestinationChain.id}
                  />
                </div>
              </div>
            )}
        </div>

        {/* Custom Calldata */}
        {toCalldata && (
          <div className="px-2 pb-1">
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              This transaction includes custom calldata for contract interaction
              at the destination address
            </p>
          </div>
        )}

        {/* Continue Button */}
        <button
          type="submit"
          disabled={
            !tokenAmountForBackend ||
            parseFloat(tokenAmountForBackend) <= 0 ||
            isSubmitting ||
            isLoadingQuote ||
            !isValidRecipient ||
            buttonText === "No quote available" ||
            buttonText === "Getting quote..."
          }
          className={`w-full font-semibold py-4 px-4 rounded-[24px] transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer relative`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2 text-white dark:text-gray-400" />
              <span>{buttonText}</span>
            </div>
          ) : !tokenAmountForBackend ||
            parseFloat(tokenAmountForBackend) <= 0 ? (
            "Enter an amount"
          ) : (
            buttonText
          )}
        </button>

        {/* Quote Details */}
        {prepareSendQuote && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowMoreDetails(!showMoreDetails)}
              className="w-full flex items-center justify-center gap-2 py-1 px-4 rounded-[24px] transition-colors cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <span>More Details</span>
              <svg
                className={`w-3 h-3 transition-transform ${showMoreDetails ? "rotate-180" : ""}`}
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

            {showMoreDetails && (
              <QuoteDetails quote={prepareSendQuote} showContent={true} />
            )}
          </div>
        )}
      </form>
    </div>
  )
}
