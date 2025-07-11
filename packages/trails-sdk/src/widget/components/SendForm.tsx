import { NetworkImage, TokenImage } from "@0xsequence/design-system"
import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react"
import type React from "react"
import { useEffect, useRef } from "react"
import type { Account, WalletClient } from "viem"
import { isAddress } from "viem"
import type { TransactionState } from "../../prepareSend.js"
import type { RelayerEnv } from "../../relayer.js"
import type { ActiveTheme } from "../../theme.js"
import type { OnCompleteProps, Token } from "../hooks/useSendForm.js"
import { useSendForm } from "../hooks/useSendForm.js"
import { FeeOptions } from "./FeeOptions.js"

interface SendFormProps {
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
  useSourceTokenForButtonText?: boolean
  onError: (error: Error) => void
  onWaitingForWalletConfirm: (
    intentAddress?: string,
    originTokenInfo?: {
      amount: string
      amountUsd: string
      tokenSymbol: string
      tokenName: string
      chainId: number
      imageUrl: string
    },
  ) => void
  paymasterUrls?: Array<{ chainId: number; url: string }>
  gasless?: boolean
  setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void
}

export const SendForm: React.FC<SendFormProps> = ({
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
  useSourceTokenForButtonText = false,
  onError,
  onWaitingForWalletConfirm,
  paymasterUrls,
  gasless,
  setWalletConfirmRetryHandler,
}) => {
  const {
    amount,
    amountUsdFormatted,
    balanceUsdFormatted,
    chainInfo,
    balanceFormatted,
    handleRecipientInputChange,
    handleSubmit,
    isChainDropdownOpen,
    isSubmitting,
    isTokenDropdownOpen,
    recipient,
    recipientInput,
    selectedChain,
    selectedDestToken,
    setAmount,
    setRecipient,
    setRecipientInput,
    setSelectedChain,
    setSelectedDestToken,
    buttonText,
    isValidRecipient,
    ensAddress,
    selectedFeeToken,
    setSelectedFeeToken,
    FEE_TOKENS,
    SUPPORTED_TO_TOKENS,
    SUPPORTED_TO_CHAINS,
    setIsChainDropdownOpen,
    setIsTokenDropdownOpen,
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
    theme,
    onTransactionStateChange,
    useSourceTokenForButtonText,
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

  const chainDropdownRef = useRef<HTMLDivElement>(null)
  const tokenDropdownRef = useRef<HTMLDivElement>(null)

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

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setIsChainDropdownOpen, setIsTokenDropdownOpen])

  if (!selectedChain) {
    return null
  }

  return (
    <div className="space-y-6">
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
          Send Payment
        </h2>
      </div>

      <div
        className={`flex items-center space-x-4 p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {selectedToken.contractAddress ? (
              <TokenImage
                symbol={selectedToken.symbol}
                src={selectedToken.imageUrl}
                disableAnimation={true}
              />
            ) : (
              <span
                className={`text-2xl font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                {selectedToken.symbol[0]}
              </span>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1">
            <NetworkImage
              chainId={selectedToken.chainId}
              size="sm"
              className="w-6 h-6"
              disableAnimation={true}
            />
          </div>
        </div>
        <div>
          <h3
            className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            From: {selectedToken.name}
          </h3>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            on {chainInfo?.name || "Unknown Chain"} • Balance:{" "}
            {balanceFormatted} {selectedToken.symbol}
            {balanceUsdFormatted && (
              <span
                className={`ml-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              >
                ({balanceUsdFormatted})
              </span>
            )}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Chain Selection - More Compact */}
        <div className={!toChainId ? "mb-4" : undefined}>
          <label
            htmlFor="destination-chain"
            className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Destination Chain
          </label>
          {toChainId ? (
            <div className="flex items-center px-2 py-1">
              <NetworkImage
                chainId={selectedChain.id}
                size="sm"
                className="w-5 h-5"
                disableAnimation={true}
              />
              <span
                className={`ml-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {selectedChain.name}
              </span>
            </div>
          ) : (
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
                <NetworkImage
                  chainId={selectedChain.id}
                  size="sm"
                  className="w-5 h-5"
                  disableAnimation={true}
                />
                <span className="ml-2 flex-1 text-left">
                  {selectedChain.name}
                </span>
                <ChevronDown
                  className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} transition-transform ${
                    isChainDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isChainDropdownOpen && (
                <div
                  className={`absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {SUPPORTED_TO_CHAINS.map((chain) => (
                    <button
                      key={chain.id}
                      type="button"
                      onClick={() => {
                        setSelectedChain(chain)
                        setIsChainDropdownOpen(false)
                      }}
                      className={`w-full flex items-center px-4 py-3 ${
                        theme === "dark"
                          ? selectedChain.id === chain.id
                            ? "bg-gray-700 text-white"
                            : "text-white hover:bg-gray-700"
                          : selectedChain.id === chain.id
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <NetworkImage
                        chainId={chain.id}
                        size="sm"
                        className="w-5 h-5"
                        disableAnimation={true}
                      />
                      <span className="ml-2">{chain.name}</span>
                      {selectedChain.id === chain.id && (
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
          )}
        </div>

        {/* Token Selection - More Compact */}
        <div className={!toToken ? "mb-4" : undefined}>
          <label
            htmlFor="token"
            className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Receive Token
          </label>
          {toToken ? (
            <div className="flex items-center px-2 py-1">
              <TokenImage
                symbol={selectedDestToken.symbol}
                src={selectedDestToken.imageUrl}
                size="sm"
                disableAnimation={true}
              />
              <span
                className={`ml-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {selectedDestToken.name} ({selectedDestToken.symbol})
              </span>
            </div>
          ) : (
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
                    symbol={selectedDestToken.symbol}
                    src={selectedDestToken.imageUrl}
                    size="sm"
                    disableAnimation={true}
                  />
                </div>
                <span className="ml-2 flex-1 text-left">
                  {selectedDestToken.name} ({selectedDestToken.symbol})
                </span>
                <ChevronDown
                  className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} transition-transform ${
                    isTokenDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isTokenDropdownOpen && (
                <div
                  className={`absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {SUPPORTED_TO_TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      type="button"
                      onClick={() => {
                        setSelectedDestToken(token)
                        setIsTokenDropdownOpen(false)
                      }}
                      className={`w-full flex items-center px-4 py-3 cursor-pointer ${
                        theme === "dark"
                          ? selectedDestToken.symbol === token.symbol
                            ? "bg-gray-700 text-white"
                            : "text-white hover:bg-gray-700"
                          : selectedDestToken.symbol === token.symbol
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        <TokenImage
                          symbol={token.symbol}
                          src={token.imageUrl}
                          size="sm"
                          disableAnimation={true}
                        />
                      </div>
                      <span className="ml-2">
                        {token.name} ({token.symbol})
                      </span>
                      {selectedDestToken.symbol === token.symbol && (
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
          )}
        </div>

        {/* Amount Input - More Compact */}
        <div className={!toAmount ? "mb-2" : undefined}>
          <label
            htmlFor="amount"
            className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Amount to Receive
          </label>
          {toAmount ? (
            <div className="flex items-center justify-between px-2 py-1">
              <span
                className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {toAmount} {selectedDestToken.symbol}
              </span>
              <span
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              >
                ≈ {amountUsdFormatted}
              </span>
            </div>
          ) : (
            <>
              <div className="relative rounded-lg">
                <input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={`block w-full pl-4 pr-12 py-3 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    {selectedDestToken.symbol}
                  </span>
                </div>
              </div>
              <div className="h-6 mt-1">
                {amount && selectedDestToken.symbol && (
                  <div
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                  >
                    ≈ {amountUsdFormatted}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Recipient Input - More Compact */}
        <div className={!toRecipient ? "mb-4" : undefined}>
          <div className="flex justify-between items-center mb-1">
            <div>
              <label
                htmlFor="recipient"
                className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {toCalldata ? "Destination Address" : "Recipient Address"}
              </label>
              {recipient &&
                isAddress(recipient) &&
                recipient.toLowerCase() === account.address.toLowerCase() && (
                  <div
                    className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Same as sender
                  </div>
                )}
            </div>
            <div className="h-7 flex items-center">
              {!toRecipient && recipient !== account.address ? (
                <button
                  type="button"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault()
                    setRecipientInput(account.address)
                    setRecipient(account.address)
                  }}
                  className={`px-2 py-1 text-xs cursor-pointer rounded-[24px] transition-colors bg-blue-500 hover:bg-blue-600 text-white`}
                >
                  Use Account
                </button>
              ) : null}
            </div>
          </div>
          {toRecipient ? (
            <div className="px-2 py-1 font-mono text-sm">
              <span
                className={`break-all ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {recipient}
              </span>
            </div>
          ) : (
            <>
              <input
                id="recipient"
                type="text"
                value={recipientInput}
                onChange={handleRecipientInputChange}
                placeholder="0x... or name.eth"
                className={`block w-full px-4 py-3 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              />
              {ensAddress && (
                <p
                  className={
                    theme === "dark"
                      ? "text-sm text-gray-400"
                      : "text-sm text-gray-500"
                  }
                >
                  {recipient}
                </p>
              )}
            </>
          )}
        </div>

        {/* Custom Calldata - More Compact */}
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

        {/* Fee Options */}
        <FeeOptions
          options={FEE_TOKENS}
          selectedOption={selectedFeeToken ?? undefined}
          onSelect={setSelectedFeeToken}
          theme={theme}
        />

        {/* Error and Submit Button */}
        <div className="flex flex-col space-y-3 pt-2">
          <button
            type="submit"
            disabled={!amount || !isValidRecipient || isSubmitting}
            className={`w-full font-semibold py-3 px-4 rounded-[24px] transition-colors relative ${
              theme === "dark"
                ? "bg-blue-600 disabled:bg-gray-700 text-white disabled:text-gray-400 enabled:hover:bg-blue-700"
                : "bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 enabled:hover:bg-blue-600"
            } disabled:cursor-not-allowed cursor-pointer`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2
                  className={`w-5 h-5 animate-spin mr-2 ${theme === "dark" ? "text-gray-400" : "text-white"}`}
                />
                <span>{buttonText}</span>
              </div>
            ) : (
              buttonText
            )}
          </button>
        </div>
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

export default SendForm
