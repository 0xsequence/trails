import {
  useAccountTotalBalanceUsd,
  useHasSufficientBalanceToken,
  useHasSufficientBalanceUsd,
  useQuote,
  useTokenList,
} from "0xtrails"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { formatUnits, parseUnits } from "viem"
import { useAccount, useWalletClient } from "wagmi"
import { ConnectButton } from "@/routes/widget-demo/components/ConnectButton"
import { TokenSelector } from "../widget-demo/components/TokenSelector"

export function SdkSandbox() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()

  // State for input parameters
  const [targetAmountUsd, setTargetAmountUsd] = useState("10")
  const [tokenAddress, setTokenAddress] = useState(
    "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  )
  const [tokenAmount, setTokenAmount] = useState("5")
  const [chainId, setChainId] = useState("8453")

  // Quote state
  const [quoteFromToken, setQuoteFromToken] = useState<
    { chainId: number; contractAddress: string; decimals: number } | undefined
  >({
    chainId: 8453,
    contractAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    decimals: 6,
  })
  const [quoteToToken, setQuoteToToken] = useState<
    { chainId: number; contractAddress: string; decimals: number } | undefined
  >({
    chainId: 42161,
    contractAddress: "0x0000000000000000000000000000000000000000",
    decimals: 18,
  })
  const [quoteToAmount, setQuoteToAmount] = useState("0.00001")
  const [quoteToRecipient, setQuoteToRecipient] = useState("")

  // Prefill recipient with connected account address
  useEffect(() => {
    if (address && !quoteToRecipient) {
      setQuoteToRecipient(address)
    }
  }, [address, quoteToRecipient])

  // Use the hook-based methods instead of manual queries
  const { totalBalanceUsd, isLoadingTotalBalanceUsd } =
    useAccountTotalBalanceUsd(address || "")

  const { hasSufficientBalanceUsd, isLoadingHasSufficientBalanceUsd } =
    useHasSufficientBalanceUsd(address || "", targetAmountUsd)

  const { hasSufficientBalanceToken, isLoadingHasSufficientBalanceToken } =
    useHasSufficientBalanceToken(
      address || "",
      tokenAddress,
      tokenAmount,
      parseInt(chainId) || 0,
    )

  // Get supported tokens
  const { tokens: tokenList, isLoadingTokens } = useTokenList()

  // Quote hook - only call when walletClient is available
  const quoteParams =
    walletClient &&
    quoteFromToken?.contractAddress &&
    quoteToToken?.contractAddress &&
    quoteToRecipient
      ? {
          walletClient: walletClient,
          fromTokenAddress: quoteFromToken.contractAddress,
          fromChainId: quoteFromToken.chainId,
          toTokenAddress: quoteToToken.contractAddress,
          toChainId: quoteToToken.chainId,
          toAmount: parseUnits(
            quoteToAmount,
            quoteToToken?.decimals || 18,
          ).toString(),
          toRecipient: quoteToRecipient,
        }
      : null

  const { quote, swap, isLoadingQuote, quoteError } = useQuote(
    quoteParams || {
      walletClient: null as any,
      fromTokenAddress: "",
      fromChainId: 0,
      toTokenAddress: "",
      toChainId: 0,
      toAmount: "",
      toRecipient: "",
    },
  )

  const [executedOriginTxHash, setExecutedOriginTxHash] = useState<
    string | null
  >(null)
  const [executedDestinationTxHash, setExecutedDestinationTxHash] = useState<
    string | null
  >(null)
  const [swapError, setSwapError] = useState<string | null>(null)
  const [isSwapLoading, setIsSwapLoading] = useState(false)

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-12">
        <Link
          to="/widget"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200 flex items-center"
        >
          ← Back to Widget Demo
        </Link>
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            SDK Sandbox
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Debug information for Trails SDK functions
          </p>
        </div>
        <div className="w-24"></div> {/* Spacer to balance the layout */}
      </div>

      {/* Connection Status - Moved to top */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
          Connection Status
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full ${address ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-base text-gray-600 dark:text-gray-400">
              {address ? "Wallet Connected" : "No Wallet Connected"}
            </span>
          </div>
          {address && (
            <span className="text-base text-gray-700 dark:text-gray-300 font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          )}
        </div>

        {!isConnected && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <ConnectButton />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Total Balance USD Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Total Balance USD
                </h2>
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                $
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {!isConnected ? (
                <span className="text-sm">Connect wallet to view balance</span>
              ) : isLoadingTotalBalanceUsd ? (
                <span className="inline-flex items-center text-sm">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>Loading spinner</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : totalBalanceUsd ? (
                <span>${Number(totalBalanceUsd).toFixed(2)}</span>
              ) : (
                <span className="text-sm">Loading...</span>
              )}
            </p>
          </div>
          {/* Help icon positioned at bottom right of card */}
          <div className="absolute bottom-2 right-2 group">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-help"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Help icon</title>
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {/* Tooltip positioned relative to the help icon */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 bottom-full right-0 mb-2">
              <div className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-xs rounded py-2 px-3 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                <div className="font-semibold mb-1">
                  getAccountTotalBalanceUsd
                </div>
                <div className="text-gray-300 dark:text-gray-400">
                  Returns the total USD balance across all tokens for the
                  connected account
                </div>
                <div className="text-gray-400 dark:text-gray-500 mt-1">
                  Parameters: account, indexerGatewayClient, apiClient
                </div>
              </div>
              <div className="w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45 absolute right-2 -translate-x-1/2 top-full border-r border-b border-gray-200 dark:border-gray-700"></div>
            </div>
          </div>
        </div>

        {/* Has Sufficient Balance USD Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sufficient USD Balance
                </h2>
              </div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                !isConnected
                  ? "bg-gray-300 dark:bg-gray-600"
                  : isLoadingHasSufficientBalanceUsd
                    ? "bg-gray-300 dark:bg-gray-600"
                    : hasSufficientBalanceUsd
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-red-100 dark:bg-red-900"
              }`}
            >
              {!isConnected ? (
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  -
                </span>
              ) : isLoadingHasSufficientBalanceUsd ? (
                <svg
                  className="animate-spin h-4 w-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <title>Loading spinner</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    hasSufficientBalanceUsd
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {hasSufficientBalanceUsd ? "✓" : "✗"}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="targetAmountUsd"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Target Amount (USD)
              </label>
              <input
                id="targetAmountUsd"
                type="number"
                value={targetAmountUsd}
                onChange={(e) => setTargetAmountUsd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter USD amount"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {!isConnected ? (
                  <span className="text-sm">
                    Connect wallet to check balance
                  </span>
                ) : isLoadingHasSufficientBalanceUsd ? (
                  <span className="inline-flex items-center text-sm">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <title>Loading spinner</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : hasSufficientBalanceUsd !== null ? (
                  hasSufficientBalanceUsd ? (
                    "Yes"
                  ) : (
                    "No"
                  )
                ) : (
                  <span className="text-sm">Loading...</span>
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Target: ${targetAmountUsd} USD
              </p>
            </div>
          </div>
          {/* Help icon positioned at bottom right of card */}
          <div className="absolute bottom-2 right-2 group">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-help"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Help icon</title>
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {/* Tooltip positioned relative to the help icon */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 bottom-full right-0 mb-2">
              <div className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-xs rounded py-2 px-3 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                <div className="font-semibold mb-1">
                  getHasSufficientBalanceUsd
                </div>
                <div className="text-gray-300 dark:text-gray-400">
                  Checks if the account has sufficient USD balance for a target
                  amount
                </div>
                <div className="text-gray-400 dark:text-gray-500 mt-1">
                  Parameters: account, targetAmountUsd, indexerGatewayClient,
                  apiClient
                </div>
              </div>
              <div className="w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45 absolute right-2 -translate-x-1/2 top-full border-r border-b border-gray-200 dark:border-gray-700"></div>
            </div>
          </div>
        </div>

        {/* Has Sufficient Balance Token Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sufficient Token Balance
                </h2>
              </div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isLoadingHasSufficientBalanceToken
                  ? "bg-gray-300 dark:bg-gray-600"
                  : hasSufficientBalanceToken
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
              }`}
            >
              {isLoadingHasSufficientBalanceToken ? (
                <svg
                  className="animate-spin h-4 w-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <title>Loading spinner</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    hasSufficientBalanceToken
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {hasSufficientBalanceToken ? "✓" : "✗"}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="tokenAddress"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Token Address
              </label>
              <input
                id="tokenAddress"
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                placeholder="0x..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="tokenAmount"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Token Amount
                </label>
                <input
                  id="tokenAmount"
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="2.2"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label
                  htmlFor="chainId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Chain ID
                </label>
                <input
                  id="chainId"
                  type="number"
                  value={chainId}
                  onChange={(e) => setChainId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="8453"
                />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {!isConnected ? (
                  <span className="text-sm">
                    Connect wallet to check balance
                  </span>
                ) : isLoadingHasSufficientBalanceToken ? (
                  <span className="inline-flex items-center text-sm">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <title>Loading spinner</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : hasSufficientBalanceToken !== null ? (
                  hasSufficientBalanceToken ? (
                    "Yes"
                  ) : (
                    "No"
                  )
                ) : (
                  <span className="text-sm">Loading...</span>
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Target: {tokenAmount} tokens on chain Id {chainId}
              </p>
            </div>
          </div>
          {/* Help icon positioned at bottom right of card */}
          <div className="absolute bottom-2 right-2 group">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-help"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <title>Help icon</title>
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {/* Tooltip positioned relative to the help icon */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 bottom-full right-0 mb-2">
              <div className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-xs rounded py-2 px-3 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                <div className="font-semibold mb-1">
                  getHasSufficientBalanceToken
                </div>
                <div className="text-gray-300 dark:text-gray-400">
                  Checks if the account has sufficient balance of a specific
                  token
                </div>
                <div className="text-gray-400 dark:text-gray-500 mt-1">
                  Parameters: account, token, amount, chainId,
                  indexerGatewayClient, apiClient
                </div>
              </div>
              <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute right-2 -translate-x-1/2 top-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tokens JSON Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Tokens (JSON)
        </h2>
        {isLoadingTokens ? (
          <div className="text-gray-500 dark:text-gray-400">
            Loading tokens...
          </div>
        ) : (
          <pre className="overflow-x-auto text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700 max-h-96">
            {JSON.stringify(tokenList, null, 2)}
          </pre>
        )}
      </div>

      {/* Swap Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Swap
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="from-token-selector"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              From Token
            </label>
            <TokenSelector
              selectedToken={
                quoteFromToken
                  ? {
                      chainId: quoteFromToken.chainId,
                      contractAddress: quoteFromToken.contractAddress,
                    }
                  : undefined
              }
              onTokenSelect={(token) => {
                if (token) {
                  setQuoteFromToken({
                    chainId: token.chainId,
                    contractAddress: token.contractAddress,
                    decimals: token.decimals,
                  })
                } else {
                  setQuoteFromToken(undefined)
                }
              }}
              tokens={tokenList}
              placeholder="From Token"
              className=""
              // @ts-ignore
              id="from-token-selector"
            />
          </div>
          <div>
            <label
              htmlFor="to-token-selector"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              To Token
            </label>
            <TokenSelector
              selectedToken={
                quoteToToken
                  ? {
                      chainId: quoteToToken.chainId,
                      contractAddress: quoteToToken.contractAddress,
                    }
                  : undefined
              }
              onTokenSelect={(token) => {
                if (token) {
                  setQuoteToToken({
                    chainId: token.chainId,
                    contractAddress: token.contractAddress,
                    decimals: token.decimals,
                  })
                } else {
                  setQuoteToToken(undefined)
                }
              }}
              tokens={tokenList}
              placeholder="To Token"
              className=""
              // @ts-ignore
              id="to-token-selector"
            />
          </div>
        </div>

        {/* Amount and Recipient Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="quote-to-amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              To Amount
            </label>
            <input
              id="quote-to-amount"
              type="text"
              value={quoteToAmount}
              onChange={(e) => setQuoteToAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="1.0"
            />
          </div>

          <div>
            <label
              htmlFor="quote-to-recipient"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Recipient
            </label>
            <input
              id="quote-to-recipient"
              type="text"
              value={quoteToRecipient}
              onChange={(e) => setQuoteToRecipient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              placeholder="0."
            />
          </div>
        </div>

        {/* Quote Results */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Quote Results
          </h3>

          {isLoadingQuote ? (
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <title>Loading spinner</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading quote...
            </div>
          ) : quoteError ? (
            <div className="text-red-600 dark:text-red-400">
              Error:{" "}
              {typeof quoteError === "object" &&
              quoteError &&
              "message" in quoteError
                ? (quoteError as any).message
                : String(quoteError)}
            </div>
          ) : quote ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  From Amount:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatUnits(
                    BigInt(quote.fromAmount || "0"),
                    quoteFromToken?.decimals || 18,
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  To Amount:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {quoteToAmount}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              Select tokens above to get a quote
            </div>
          )}
        </div>

        {/* Execute Quote Button */}
        {quote && swap && (
          <>
            <button
              type="button"
              className="w-full md:w-auto cursor-pointer px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSwapLoading}
              onClick={async () => {
                try {
                  setIsSwapLoading(true)
                  setSwapError(null)
                  const result = await swap()
                  if (result) {
                    setExecutedOriginTxHash(
                      result.originTransaction?.transactionHash || null,
                    )
                    setExecutedDestinationTxHash(
                      result.destinationTransaction?.transactionHash || null,
                    )
                  }
                } catch (error) {
                  console.error("Quote execution failed:", error)
                  setSwapError(
                    error instanceof Error ? error.message : String(error),
                  )
                } finally {
                  setIsSwapLoading(false)
                }
              }}
            >
              {isSwapLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>Loading spinner</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Swapping...
                </div>
              ) : (
                "Swap"
              )}
            </button>
            {(executedOriginTxHash || executedDestinationTxHash) && (
              <div className="mt-4 space-y-2">
                {executedOriginTxHash && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                      Origin Tx Hash:
                    </span>
                    <span className="text-xs font-mono break-all text-blue-700 dark:text-blue-300">
                      {executedOriginTxHash}
                    </span>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                      onClick={() =>
                        navigator.clipboard.writeText(executedOriginTxHash)
                      }
                      title="Copy to clipboard"
                    >
                      Copy
                    </button>
                  </div>
                )}
                {executedDestinationTxHash && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                      Destination Tx Hash:
                    </span>
                    <span className="text-xs font-mono break-all text-blue-700 dark:text-blue-300">
                      {executedDestinationTxHash}
                    </span>
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
                      onClick={() =>
                        navigator.clipboard.writeText(executedDestinationTxHash)
                      }
                      title="Copy to clipboard"
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            )}
            {swapError && (
              <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
                Error: {swapError}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
