// biome-ignore lint/style/useImportType: Need to use React
import React, { useState } from "react"
import { useAccount, useDisconnect } from "wagmi"

interface WalletOption {
  id: string
  name: string
}

interface ConnectWalletProps {
  onConnect: (walletId: string) => void
  onDisconnect: () => void
  onContinue: () => void
  theme?: "light" | "dark"
  walletOptions: WalletOption[]
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  onConnect,
  onDisconnect,
  onContinue,
  theme = "light",
  walletOptions,
}) => {
  const { isConnected, address, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const [error, setError] = useState<string | null>(null)

  const handleDisconnect = () => {
    try {
      setError(null)
      disconnect()
      onDisconnect()
    } catch (error) {
      console.error("Failed to disconnect:", error)
      setError(
        error instanceof Error ? error.message : "Failed to disconnect wallet",
      )
    }
  }

  const getWalletButtonStyle = (walletId: string) => {
    switch (walletId) {
      case "metamask":
        return "bg-orange-500 hover:bg-orange-600"
      default:
        return theme === "dark"
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-blue-500 hover:bg-blue-600"
    }
  }

  // If no valid wallet options are available, show a simple message
  if (!walletOptions.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center relative">
          <h2
            className={`text-lg font-semibold w-full text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Connect a Wallet
          </h2>
        </div>
        <div
          className={`text-center p-4 rounded-lg ${
            theme === "dark"
              ? "text-gray-300 bg-gray-800"
              : "text-gray-600 bg-gray-50"
          }`}
        >
          Please connect wallet in dapp
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center relative">
        <h2
          className={`text-lg font-semibold w-full text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Connect a Wallet
        </h2>
      </div>

      {isConnected ? (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
          >
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              Connected with {connector?.name}
            </p>
            <p
              className={theme === "dark" ? "text-white" : "text-gray-900"}
              style={{ wordBreak: "break-all" }}
            >
              {address}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {error && (
              <div
                className={`border rounded-lg p-4 ${
                  theme === "dark"
                    ? "bg-red-900/20 border-red-800"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p
                  className={`text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`}
                >
                  {error}
                </p>
              </div>
            )}
            <button
              onClick={onContinue}
              className={`w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Continue
            </button>
            <button
              onClick={handleDisconnect}
              className={`w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors border ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                  : "bg-white hover:bg-gray-50 text-gray-900 border-gray-200"
              }`}
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {error && (
            <div
              className={`border rounded-lg p-4 ${
                theme === "dark"
                  ? "bg-red-900/20 border-red-800"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <p
                className={`text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`}
              >
                {error}
              </p>
            </div>
          )}
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => onConnect(wallet.id)}
              className={`w-full flex items-center justify-center space-x-2 cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors ${getWalletButtonStyle(wallet.id)} text-white`}
            >
              <span>{wallet.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConnectWallet
