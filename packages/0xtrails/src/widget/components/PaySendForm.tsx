import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef } from "react"
import type { Account, WalletClient } from "viem"
import { isAddress } from "viem"
import type { TransactionState } from "../../transactions.js"
import type { RelayerEnv } from "../../relayer.js"
import type { OnCompleteProps, Token, TokenInfo } from "../hooks/useSendForm.js"
import { useSendForm } from "../hooks/useSendForm.js"
import { ChainImage } from "./ChainImage.js"
import { FeeOptions } from "./FeeOptions.js"
import { TokenImage } from "./TokenImage.js"
import { QuoteDetails } from "./QuoteDetails.js"
import { TruncatedAddress } from "./TruncatedAddress.js"
import { type PrepareSendQuote, TradeType } from "../../prepareSend.js"

interface PaySendFormProps {
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

export const PaySendForm: React.FC<PaySendFormProps> = ({
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
  const {
    amount,
    amountUsdDisplay,
    balanceUsdDisplay,
    chainInfo,
    balanceFormatted,
    handleRecipientInputChange,
    handleSubmit,
    isChainDropdownOpen,
    isSubmitting,
    isLoadingQuote,
    isTokenDropdownOpen,
    recipient,
    recipientInput,
    selectedDestinationChain,
    selectedDestToken,
    setAmount,
    setRecipient,
    setRecipientInput,
    setSelectedDestinationChain,
    setSelectedDestToken,
    buttonText,
    isValidRecipient,
    ensAddress,
    selectedFeeToken,
    setSelectedFeeToken,
    FEE_TOKENS,
    supportedTokens,
    setIsChainDropdownOpen,
    setIsTokenDropdownOpen,
    toAmountDisplay,
    destinationTokenAddress,
    supportedChains,
    isValidCustomToken,
    prepareSendQuote,
  } = useSendForm({
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
    onConfirm,
    onComplete,
    onSend,
    selectedToken,
    setWalletConfirmRetryHandler,
    tradeType: TradeType.EXACT_OUTPUT,
  })

  // Handle amount input changes with decimal validation
  const handleAmountChange = useCallback(
    (value: string) => {
      // Validate decimal places (max 8 decimals)
      const decimalMatch = value.match(/^\d*\.?\d{0,8}$/)
      if (!decimalMatch && value !== "") {
        return // Don't update if more than 8 decimals
      }
      setAmount(value)
    },
    [setAmount],
  )

  const chainDropdownRef = useRef<HTMLDivElement>(null)
  const tokenDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(
        "[trails-sdk] click outside handler called, isChainDropdownOpen:",
        isChainDropdownOpen,
      )
      if (
        chainDropdownRef.current &&
        !chainDropdownRef.current.contains(event.target as Node)
      ) {
        console.log("[trails-sdk] closing chain dropdown from outside click")
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

  if (!selectedDestinationChain) {
    return null
  }

  if (!selectedToken) {
    return null
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center relative">
        <button
          type="button"
          onClick={onBack}
          className="absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:trails-hover-bg text-gray-400"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold w-full text-center text-gray-900 dark:text-white">
          Send Payment
        </h2>
      </div>

      <div className="flex items-center space-x-2 p-4 trails-border-radius-container trails-bg-secondary">
        <div className="flex items-start justify-between w-full">
          {/* Left side - Chain and Token images with token name */}
          <div className="flex items-start space-x-2">
            {/* Token Image and Name */}
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

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Chain Selection - More Compact */}
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
                className="w-full flex items-center px-4 py-3 border trails-border-radius-dropdown hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-dropdown"
              >
                <ChainImage chainId={selectedDestinationChain.id} size={24} />
                <span className="ml-2 flex-1 text-left">
                  {selectedDestinationChain.name}
                </span>
                <ChevronDown
                  className={`h-5 w-5 ${"text-gray-400"} transition-transform ${
                    isChainDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isChainDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 border trails-border-radius-dropdown shadow-lg max-h-60 overflow-y-auto custom-scrollbar trails-dropdown">
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
                      className={`w-full flex items-center px-4 py-3 trails-dropdown-item ${
                        selectedDestinationChain.id === chain.id
                          ? "trails-dropdown-item-selected"
                          : "hover:trails-dropdown-item"
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

        {/* Token Selection - More Compact */}
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
                className="w-full flex items-center px-4 py-3 border trails-border-radius-dropdown hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-dropdown"
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
                <div className="absolute z-10 w-full mt-1 border trails-border-radius-dropdown shadow-lg max-h-60 overflow-y-auto custom-scrollbar trails-dropdown">
                  {supportedTokens.map((token) => (
                    <button
                      key={`${token.contractAddress}-${token.chainId}`}
                      type="button"
                      onClick={() => {
                        setSelectedDestToken(token as TokenInfo)
                        setIsTokenDropdownOpen(false)
                      }}
                      className={`w-full flex items-center px-4 py-3 cursor-pointer trails-dropdown-item ${
                        selectedDestToken?.symbol === token.symbol
                          ? "trails-dropdown-item-selected"
                          : "hover:trails-dropdown-item"
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

        {/* Amount Input - More Compact */}
        {!toAmount && (
          <div className="mb-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Amount to Receive
            </label>
            <div className="relative trails-border-radius-container">
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className="block w-full pl-4 pr-12 py-3 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg trails-input"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-gray-400">
                  {selectedDestToken?.symbol}
                </span>
              </div>
            </div>
            <div className="h-6 mt-1">
              {amount && selectedDestToken?.symbol && (
                <div className="text-sm text-gray-400">
                  ≈ {amountUsdDisplay}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receive Section - Similar to FundSendForm */}
        {(toAmount || toChainId || toToken) && (
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
                        className={`animate-spin rounded-full h-4 w-4 border-b-2 ${"border-blue-400"}`}
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
                    ≈ {amountUsdDisplay}{" "}
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
                  <div className={`text-xs ${"text-gray-400"}`}>
                    Recipient:{" "}
                    <TruncatedAddress
                      address={recipient}
                      chainId={selectedDestinationChain.id}
                    />
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Recipient Input - More Compact */}
        {!toRecipient && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <div>
                <label
                  htmlFor="recipient"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {toCalldata ? "Destination Address" : "Recipient Address"}
                </label>
                {recipient &&
                  isAddress(recipient) &&
                  recipient.toLowerCase() === account.address.toLowerCase() && (
                    <div className="text-xs mt-0.5 text-gray-400">
                      Same as sender
                    </div>
                  )}
              </div>
              <div className="h-7 flex items-center">
                {recipient !== account.address ? (
                  <button
                    type="button"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      event.preventDefault()
                      setRecipientInput(account.address)
                      setRecipient(account.address)
                    }}
                    className={`px-2 py-1 text-xs cursor-pointer trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 text-white`}
                  >
                    Use Account
                  </button>
                ) : null}
              </div>
            </div>
            <input
              id="recipient"
              type="text"
              value={recipientInput}
              onChange={handleRecipientInputChange}
              placeholder="0x... or name.eth"
              className="block w-full px-4 py-3 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm trails-input"
            />
            {ensAddress && <p className="text-sm text-gray-400">{recipient}</p>}
          </div>
        )}

        {/* Custom Calldata - More Compact */}
        {toCalldata && (
          <div className="px-2 py-1">
            <p className={`text-[10px] ${"text-gray-400"}`}>
              This transaction includes custom calldata for contract interaction
              at the destination address
            </p>
          </div>
        )}

        {/* Fee Options */}
        <FeeOptions
          options={FEE_TOKENS}
          selectedOption={selectedFeeToken ?? undefined}
          onSelect={setSelectedFeeToken}
        />

        <button
          type="submit"
          disabled={
            !amount ||
            !isValidRecipient ||
            isSubmitting ||
            !destinationTokenAddress ||
            !isValidCustomToken ||
            isLoadingQuote ||
            !prepareSendQuote
          }
          className={`w-full font-semibold py-4 px-4 trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer relative`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2
                className={`w-5 h-5 animate-spin mr-2 ${"text-gray-400"}`}
              />
              <span>{buttonText}</span>
            </div>
          ) : (
            buttonText
          )}
        </button>

        {/* Quote Details */}
        {prepareSendQuote && (
          <div className="space-y-2">
            <QuoteDetails quote={prepareSendQuote} showContent={true} />
          </div>
        )}
      </form>
    </div>
  )
}

const styles = `
  select {
    appearance: none;
    border: 1px solid #e5e7eb;
    outline: none;
    font-size: 1rem;
    width: 100%;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    padding-right: 2rem;
    
    cursor: pointer;
    transition: all 0.2s;
  }

  select:hover {
    border-color: #d1d5db;
  }

  select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  select option {
    padding: 0.75rem 1rem;
    min-height: 3rem;
    display: flex;
    align-items: center;
    padding-left: 2.75rem;
    position: relative;
    cursor: pointer;
  }

  select option:hover {
    background-color: #f3f4f6;
  }

  select option:checked {
    background-color: #eff6ff;
    color: #1d4ed8;
  }
`

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style")
  styleTag.textContent = styles
  document.head.appendChild(styleTag)
}
