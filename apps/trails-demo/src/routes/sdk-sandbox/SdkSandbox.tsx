import {
  getAccountTotalBalanceUsd,
  getHasSufficientBalanceToken,
  getHasSufficientBalanceUsd,
  useAPIClient,
  useIndexerGatewayClient,
} from "@0xsequence/trails-sdk"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router"
import { useAccount } from "wagmi"
import { ConnectButton } from "@/routes/widget-demo/components/ConnectButton"

export function SdkSandbox() {
  const { address, isConnected } = useAccount()
  const indexerGatewayClient = useIndexerGatewayClient()
  const apiClient = useAPIClient()

  // State for input parameters
  const [targetAmountUsd, setTargetAmountUsd] = useState("10")
  const [tokenAddress, setTokenAddress] = useState(
    "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  )
  const [tokenAmount, setTokenAmount] = useState("5")
  const [chainId, setChainId] = useState("8453")

  const { data: totalBalanceUsd, isLoading: isLoadingTotalBalance } = useQuery({
    queryKey: ["totalBalanceUsd", address],
    queryFn: () =>
      address
        ? getAccountTotalBalanceUsd({
            account: address,
            indexerGatewayClient: indexerGatewayClient,
            apiClient: apiClient,
          })
        : null,
  })
  const { data: hasSufficientBalanceUsd, isLoading: isLoadingSufficientUsd } =
    useQuery({
      queryKey: ["hasSufficientBalanceUsd", address, targetAmountUsd],
      queryFn: () =>
        address
          ? getHasSufficientBalanceUsd({
              account: address,
              targetAmountUsd: targetAmountUsd,
              indexerGatewayClient: indexerGatewayClient,
              apiClient: apiClient,
            })
          : null,
    })

  const {
    data: hasSufficientBalanceToken,
    isLoading: isLoadingSufficientToken,
  } = useQuery({
    queryKey: [
      "hasSufficientBalanceToken",
      address,
      tokenAddress,
      tokenAmount,
      chainId,
    ],
    queryFn: () =>
      address
        ? getHasSufficientBalanceToken({
            account: address,
            token: tokenAddress,
            amount: tokenAmount,
            chainId: parseInt(chainId),
            indexerGatewayClient: indexerGatewayClient,
            apiClient: apiClient,
          })
        : null,
  })

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 bg-gray-900">
      <div className="flex items-center justify-between mb-12">
        <Link
          to="/widget"
          className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
        >
          ← Back to Widget Demo
        </Link>
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-white mb-3">SDK Sandbox</h1>
          <p className="text-gray-400 text-lg">
            Debug information for Trails SDK functions
          </p>
        </div>
        <div className="w-24"></div> {/* Spacer to balance the layout */}
      </div>

      {/* Connection Status - Moved to top */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-base font-medium text-white mb-3">
          Connection Status
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full ${address ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-base text-gray-400">
              {address ? "Wallet Connected" : "No Wallet Connected"}
            </span>
          </div>
          {address && (
            <span className="text-base text-gray-300 font-mono">
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
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Total Balance USD
                </h2>
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-400 text-sm font-medium">$</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">
              {!isConnected ? (
                <span className="text-sm">Connect wallet to view balance</span>
              ) : isLoadingTotalBalance ? (
                <span className="inline-flex items-center text-sm">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
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
              className="w-4 h-4 text-gray-400 cursor-help"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {/* Tooltip positioned relative to the help icon */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 bottom-full right-0 mb-2">
              <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
                <div className="font-semibold mb-1">
                  getAccountTotalBalanceUsd
                </div>
                <div className="text-gray-300">
                  Returns the total USD balance across all tokens for the
                  connected account
                </div>
                <div className="text-gray-400 mt-1">
                  Parameters: account, indexerGatewayClient, apiClient
                </div>
              </div>
              <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute right-2 -translate-x-1/2 top-full"></div>
            </div>
          </div>
        </div>

        {/* Has Sufficient Balance USD Card */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Sufficient USD Balance
                </h2>
              </div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                !isConnected
                  ? "bg-gray-600"
                  : isLoadingSufficientUsd
                    ? "bg-gray-600"
                    : hasSufficientBalanceUsd
                      ? "bg-green-900"
                      : "bg-red-900"
              }`}
            >
              {!isConnected ? (
                <span className="text-sm font-medium text-gray-400">-</span>
              ) : isLoadingSufficientUsd ? (
                <svg
                  className="animate-spin h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
                    hasSufficientBalanceUsd ? "text-green-400" : "text-red-400"
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
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Target Amount (USD)
              </label>
              <input
                id="targetAmountUsd"
                type="number"
                value={targetAmountUsd}
                onChange={(e) => setTargetAmountUsd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter USD amount"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {!isConnected ? (
                  <span className="text-sm">
                    Connect wallet to check balance
                  </span>
                ) : isLoadingSufficientUsd ? (
                  <span className="inline-flex items-center text-sm">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
              <p className="text-sm text-gray-400">
                Target: ${targetAmountUsd} USD
              </p>
            </div>
          </div>
          {/* Help icon positioned at bottom right of card */}
          <div className="absolute bottom-2 right-2 group">
            <svg
              className="w-4 h-4 text-gray-400 cursor-help"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {/* Tooltip positioned relative to the help icon */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 bottom-full right-0 mb-2">
              <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
                <div className="font-semibold mb-1">
                  getHasSufficientBalanceUsd
                </div>
                <div className="text-gray-300">
                  Checks if the account has sufficient USD balance for a target
                  amount
                </div>
                <div className="text-gray-400 mt-1">
                  Parameters: account, targetAmountUsd, indexerGatewayClient,
                  apiClient
                </div>
              </div>
              <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute right-2 -translate-x-1/2 top-full"></div>
            </div>
          </div>
        </div>

        {/* Has Sufficient Balance Token Card */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Sufficient Token Balance
                </h2>
              </div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isLoadingSufficientToken
                  ? "bg-gray-600"
                  : hasSufficientBalanceToken
                    ? "bg-green-900"
                    : "bg-red-900"
              }`}
            >
              {isLoadingSufficientToken ? (
                <svg
                  className="animate-spin h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
                      ? "text-green-400"
                      : "text-red-400"
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
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Token Address
              </label>
              <input
                id="tokenAddress"
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 text-sm"
                placeholder="0x..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="tokenAmount"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Token Amount
                </label>
                <input
                  id="tokenAmount"
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                  placeholder="2.2"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <label
                  htmlFor="chainId"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Chain ID
                </label>
                <input
                  id="chainId"
                  type="number"
                  value={chainId}
                  onChange={(e) => setChainId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                  placeholder="8453"
                />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {!isConnected ? (
                  <span className="text-sm">
                    Connect wallet to check balance
                  </span>
                ) : isLoadingSufficientToken ? (
                  <span className="inline-flex items-center text-sm">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
              <p className="text-sm text-gray-400">
                Target: {tokenAmount} tokens on chain Id {chainId}
              </p>
            </div>
          </div>
          {/* Help icon positioned at bottom right of card */}
          <div className="absolute bottom-2 right-2 group">
            <svg
              className="w-4 h-4 text-gray-400 cursor-help"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {/* Tooltip positioned relative to the help icon */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 bottom-full right-0 mb-2">
              <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
                <div className="font-semibold mb-1">
                  getHasSufficientBalanceToken
                </div>
                <div className="text-gray-300">
                  Checks if the account has sufficient balance of a specific
                  token
                </div>
                <div className="text-gray-400 mt-1">
                  Parameters: account, token, amount, chainId,
                  indexerGatewayClient, apiClient
                </div>
              </div>
              <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute right-2 -translate-x-1/2 top-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
