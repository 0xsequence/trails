import { ChevronDown, ChevronUp, Loader2, X } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import type { Account, WalletClient } from "viem"
import { formatUnits } from "viem"
import type { TransactionState } from "../../transactions.js"
import type { RelayerEnv } from "../../relayer.js"
import type { ActiveTheme } from "../../theme.js"
import type {
  OnCompleteProps,
  SendFormQuote,
  Token,
} from "../hooks/useSendForm.js"
import { useSendForm } from "../hooks/useSendForm.js"
import { ChainImage } from "./ChainImage.js"
import { TokenImage } from "./TokenImage.js"

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

  const {
    amount,
    amountUsdFormatted,
    balanceFormatted,
    balanceUsdFormatted,
    chainInfo,
    isSubmitting,
    selectedDestinationChain,
    selectedDestToken,
    setAmount,
    handleSubmit,
    buttonText,
    selectedToken: token,
    toAmountFormatted,
  } = useSendForm({
    account,
    sequenceProjectAccessKey,
    apiUrl,
    env,
    toAmount,
    toRecipient,
    toChainId,
    toToken,
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
  })

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

      const calculatedAmount = ((totalBalance * percentage) / 100).toString()
      setAmount(calculatedAmount)
    },
    [selectedToken, setAmount],
  )

  console.log("[trails-sdk] FundForm", {
    amount,
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
        <h2
          className={`text-lg font-semibold flex-1 text-left ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Fund
        </h2>
        <button
          type="button"
          onClick={onBack}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            theme === "dark"
              ? "hover:bg-gray-800 text-gray-400"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Origin Amount Input Section */}
        <div className="space-y-3">
          {/* Amount Input */}
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={`block w-full pl-4 pr-20 py-4 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-2xl font-semibold ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span
                className={`text-lg font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {selectedToken.symbol}
              </span>
            </div>
          </div>

          {/* Toggle and USD Value */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsInputTypeUsd(!isInputTypeUsd)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors cursor-pointer ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {isInputTypeUsd ? "Token" : "USD"}
            </button>
            <div
              className={`text-lg font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {amountUsdFormatted}
            </div>
          </div>

          {/* Percentage Buttons */}
          <div className="flex space-x-2">
            {[25, 50, 100].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => handlePercentageClick(percentage)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-[16px] border transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {percentage === 100 ? "MAX" : `${percentage}%`}
              </button>
            ))}
          </div>

          {/* Balance Display */}
          <div className="flex justify-between items-center">
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Balance: {balanceFormatted} {selectedToken.symbol}
            </span>
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {balanceUsdFormatted}
            </span>
          </div>
        </div>

        {/* Receive Section */}
        <div className="space-y-3">
          <div
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Receive
          </div>

          <div
            className={`p-4 rounded-[20px] ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TokenImage
                  symbol={selectedDestToken.symbol}
                  imageUrl={selectedDestToken.imageUrl}
                  size={32}
                />
                <div>
                  <div
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {toAmountFormatted || "0.00"} {selectedDestToken.symbol}
                  </div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    ~ {amountUsdFormatted}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-3">
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                on
              </span>
              <ChainImage chainId={selectedDestinationChain.id} size={20} />
              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {selectedDestinationChain.name}
              </span>
            </div>
          </div>
        </div>

        {/* More Details */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className={`w-full flex items-center justify-between py-3 px-4 rounded-[20px] border transition-colors cursor-pointer ${
              theme === "dark"
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-sm font-medium">more details</span>
            {showMoreDetails ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {showMoreDetails && (
            <div
              className={`p-4 rounded-[20px] space-y-3 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Origin Chain:
                </span>
                <div className="flex items-center space-x-2">
                  <ChainImage chainId={selectedToken.chainId} size={16} />
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {/* We'd need to get chain name here */}
                    Chain {selectedToken.chainId}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
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
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {selectedToken.name}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Estimated Time:
                </span>
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  2-5 minutes
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          disabled={!amount || parseFloat(amount) <= 0 || isSubmitting}
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
