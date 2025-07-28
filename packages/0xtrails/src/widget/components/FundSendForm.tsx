import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import type { Account, WalletClient } from "viem"
import { formatUnits } from "viem"
import type { TransactionState } from "../../transactions.js"
import type { RelayerEnv } from "../../relayer.js"
import type { ActiveTheme } from "../../theme.js"
import type {
  OnCompleteProps,
  SendFormQuote,
  Token,
  TokenInfo,
} from "../hooks/useSendForm.js"
import { useSendForm } from "../hooks/useSendForm.js"
import { ChainImage } from "./ChainImage.js"
import { TokenImage } from "./TokenImage.js"
import { TradeType } from "../../prepareSend.js"
import { formatValue, formatUsdValue } from "../../tokenBalances.js"

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
  theme?: ActiveTheme
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  onError: (error: Error | string | null) => void
  onWaitingForWalletConfirm: (props: SendFormQuote) => void
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
  theme = "light",
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
    amount,
    amountUsdFormatted,
    balanceFormatted,
    balanceUsdFormatted,
    chainInfo,
    isSubmitting,
    isLoadingQuote,
    selectedDestinationChain,
    selectedDestToken,
    setAmount,
    handleSubmit,
    buttonText,
    toAmountFormatted,
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
    theme,
    onTransactionStateChange,
    useSourceTokenForButtonText: false,
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

  // Handle input amount changes with USD conversion
  const handleAmountChange = useCallback(
    (value: string) => {
      if (isInputTypeUsd && sourceTokenPrice > 0) {
        // Convert USD to token amount
        const usdAmount = parseFloat(value) || 0
        const tokenAmount = usdAmount / sourceTokenPrice
        setAmount(tokenAmount.toString())
      } else {
        // Direct token amount
        setAmount(value)
      }
    },
    [isInputTypeUsd, sourceTokenPrice, setAmount],
  )

  // Get display values based on input type
  const displayAmount = useMemo(() => {
    if (isInputTypeUsd && sourceTokenPrice > 0) {
      // Show USD amount when in USD mode
      const tokenAmount = parseFloat(amount) || 0
      const usdAmount = tokenAmount * sourceTokenPrice
      // Cap USD decimals to 2 places
      const cappedUsdAmount = parseFloat(usdAmount.toFixed(2))
      return cappedUsdAmount.toString()
    }
    return amount
  }, [amount, isInputTypeUsd, sourceTokenPrice])

  const displayUsdValue = useMemo(() => {
    if (isInputTypeUsd && sourceTokenPrice > 0) {
      // Show token amount when in USD mode
      const tokenAmount = parseFloat(amount) || 0
      return `${formatValue(tokenAmount)} ${selectedToken.symbol}`
    }
    return amountUsdFormatted
  }, [
    amount,
    isInputTypeUsd,
    sourceTokenPrice,
    selectedToken.symbol,
    amountUsdFormatted,
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
        formatted: formatUsdValue(usdValue),
      })
      return formatUsdValue(usdValue)
    }
    return "$0.00"
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
      // Cap decimals to 7 places
      const cappedAmount = parseFloat(calculatedAmount.toFixed(7))
      setAmount(cappedAmount.toString())
    },
    [selectedToken, setAmount],
  )

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

    return { fontSize }
  }, [displayAmount.length])

  console.log("[trails-sdk] FundForm", {
    amount, // actual token amount used by backend
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
          className={`absolute -left-2 p-2 rounded-full transition-colors cursor-pointer ${
            theme === "dark"
              ? "hover:bg-gray-800 text-gray-400"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2
          className={`text-lg font-semibold w-full text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Fund
        </h2>
      </div>

      {/* Balance Info Section */}
      <div
        className={`flex items-center space-x-4 p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
      >
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
                <span
                  className={`text-sm font-medium max-w-[135px] truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {selectedToken.name}
                </span>
                <span
                  className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                  on {chainInfo?.name || "Unknown Chain"}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - USD value and amount */}
          <div className="text-right">
            <div
              className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              <span
                className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                Balance:{" "}
              </span>
              {balanceUsdFormatted}
            </div>
            <div
              className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
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
                className={`bg-transparent border-none outline-none ${inputStyles.fontSize} font-bold text-right ${
                  theme === "dark"
                    ? "text-white placeholder-white"
                    : "text-gray-900 placeholder-gray-900"
                }`}
                style={{
                  width: `${Math.max((displayAmount || "0").length, 1)}ch`,
                  minWidth: "1ch",
                  maxWidth: "270px",
                  padding: "0",
                  margin: "0",
                }}
              />
              <span
                className={`${inputStyles.fontSize} font-bold ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
                style={{
                  marginLeft: "0",
                  padding: "0",
                }}
              >
                {isInputTypeUsd ? "USD" : selectedToken.symbol.slice(0, 4)}
              </span>
            </div>
          </div>

          {/* USD Value centered below input */}
          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => setIsInputTypeUsd(!isInputTypeUsd)}
              className={`flex items-center justify-center w-[21px] h-[26px] p-0.5 rounded-md transition-colors cursor-pointer ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-medium tracking-[-2px]">↑↓</span>
            </button>
            <div
              className={`text-sm font-normal ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {displayUsdValue}
            </div>
          </div>

          {/* Percentage Buttons */}
          <div className="flex space-x-1 justify-center">
            {[25, 50, 100].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => handlePercentageClick(percentage)}
                className={`py-1 px-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                }`}
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
              className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Destination Chain
            </label>
            <div className="relative" ref={chainDropdownRef}>
              <button
                type="button"
                onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
                className={`w-full flex items-center px-4 py-3 border rounded-[24px] hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <ChainImage chainId={selectedDestinationChain.id} size={24} />
                <span className="ml-2 flex-1 text-left">
                  {selectedDestinationChain.name}
                </span>
                <ChevronDown
                  className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} transition-transform ${
                    isChainDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isChainDropdownOpen && (
                <div
                  className={`absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg max-h-60 overflow-y-auto ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
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
                        theme === "dark"
                          ? selectedDestinationChain.id === chain.id
                            ? "bg-gray-700 text-white"
                            : "text-white hover:bg-gray-700"
                          : selectedDestinationChain.id === chain.id
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <ChainImage chainId={chain.id} size={24} />
                      <span className="ml-2">{chain.name}</span>
                      {selectedDestinationChain.id === chain.id && (
                        <span
                          className={`ml-auto ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
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
              className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Receive Token
            </label>
            <div className="relative" ref={tokenDropdownRef}>
              <button
                type="button"
                onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                className={`w-full flex items-center px-4 py-3 border rounded-[24px] hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
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
                  className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} transition-transform ${
                    isTokenDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isTokenDropdownOpen && (
                <div
                  className={`absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg max-h-60 overflow-y-auto ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {supportedTokens.map((token) => (
                    <button
                      key={`${token.contractAddress}-${token.chainId}`}
                      type="button"
                      onClick={() => {
                        setSelectedDestToken(token as TokenInfo)
                        setIsTokenDropdownOpen(false)
                      }}
                      className={`w-full flex items-center px-4 py-3 cursor-pointer ${
                        theme === "dark"
                          ? selectedDestToken?.symbol === token.symbol
                            ? "bg-gray-700 text-white"
                            : "text-white hover:bg-gray-700"
                          : selectedDestToken?.symbol === token.symbol
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-900 hover:bg-gray-50"
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
                        <span
                          className={`ml-auto ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
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
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
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
                <div
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {toAmountFormatted || "0.00"} {selectedDestToken?.symbol}
                </div>
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  ≈ {receiveUsdValue}
                </div>
              </div>
            </div>
          </div>

          {/* Show recipient address if different from sender */}
          {recipient &&
            recipient.toLowerCase() !== account.address.toLowerCase() && (
              <div className="px-2 pb-2">
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Recipient: {recipient.slice(0, 6)}...{recipient.slice(-4)}
                </div>
              </div>
            )}
        </div>

        {/* Custom Calldata */}
        {toCalldata && (
          <div className="px-2 py-1">
            <p
              className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              This transaction includes custom calldata for contract interaction
              at the destination address
            </p>
          </div>
        )}

        {/* More Details */}
        <div className="space-y-3" style={{ display: "none" }}>
          <button
            type="button"
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[24px] transition-colors cursor-pointer text-sm ${
              theme === "dark"
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>More Details</span>
            <svg
              className={`w-4 h-4 transition-transform ${showMoreDetails ? "rotate-180" : ""}`}
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
            <div
              className={`p-4 rounded-lg text-sm space-y-4 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Origin Chain:
                  </span>
                  <div className="flex items-center space-x-2">
                    <ChainImage chainId={selectedToken.chainId} size={16} />
                    <span
                      className={`text-xs font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Chain {selectedToken.chainId}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Origin Token:
                  </span>
                  <div className="flex items-center space-x-2">
                    <TokenImage
                      symbol={selectedToken.symbol}
                      imageUrl={selectedToken.imageUrl}
                      chainId={selectedToken.chainId}
                      size={16}
                    />
                    <span
                      className={`text-xs font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedToken.name}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Estimated Time:
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    2-5 minutes
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          disabled={
            !amount ||
            parseFloat(amount) <= 0 ||
            isSubmitting ||
            isLoadingQuote ||
            !isValidRecipient ||
            buttonText === "No quote available" ||
            buttonText === "Getting quote..."
          }
          className={`w-full font-semibold py-4 px-4 rounded-[24px] transition-colors relative ${
            theme === "dark"
              ? "bg-blue-600 disabled:bg-gray-700 text-white disabled:text-gray-400 enabled:hover:bg-blue-700"
              : "bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 enabled:hover:bg-blue-600"
          } disabled:cursor-not-allowed cursor-pointer`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2
                className={`w-5 h-5 animate-spin mr-2 ${
                  theme === "dark" ? "text-gray-400" : "text-white"
                }`}
              />
              <span>{buttonText}</span>
            </div>
          ) : (
            buttonText
          )}
        </button>
      </form>
    </div>
  )
}
