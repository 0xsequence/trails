// biome-ignore lint/style/useImportType: Need to use React
import React, { useEffect, useState } from "react"
import { useAccount, useDisconnect } from "wagmi"
import MetaMaskFox from "../assets/MetaMask-icon-fox.svg"
import MetaMaskLogoWhite from "../assets/MetaMask-logo-white.svg"
import PrivyLogoBlack from "../assets/Privy_Brandmark_Black.svg"
import PrivyLogoWhite from "../assets/Privy_Brandmark_White.svg"

export interface WalletOption {
  id: string
  name: string
  connector: () => void
}

export interface ConnectWalletProps {
  onConnect: (walletId: string) => void
  onDisconnect: () => void
  onContinue: () => void
  onError: (error: Error) => void
  walletOptions: WalletOption[]
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  onConnect,
  onDisconnect,
  onContinue,
  onError,
  walletOptions,
}) => {
  const { isConnected, address, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      if (onError) {
        onError(new Error(error))
      }
    }
  }, [error, onError])

  const handleDisconnect = () => {
    try {
      setError(null)
      disconnect()
      onDisconnect()
    } catch (error) {
      console.error("[trails-sdk] Failed to disconnect:", error)
      setError(
        error instanceof Error ? error.message : "Failed to disconnect wallet",
      )
    }
  }

  const getWalletButtonStyle = (walletId: string) => {
    let isMetaMask = false
    try {
      if (walletId === "injected") {
        isMetaMask =
          typeof window !== "undefined" && !!window.ethereum?.isMetaMask
      }
    } catch (error) {
      console.error(
        "[trails-sdk] Failed to check if MetaMask is installed:",
        error,
      )
    }

    if (isMetaMask) {
      return "bg-[#FF5C16] hover:bg-[#FF5C16]/90 text-white"
    }

    switch (walletId) {
      case "privy":
        return "bg-black hover:bg-black/90 text-white dark:bg-white dark:hover:bg-white/90 dark:text-black"
      default:
        return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center relative">
        <h2 className="text-lg font-semibold w-full text-center text-gray-900 dark:text-white">
          Connect a Wallet
        </h2>
      </div>

      {isConnected ? (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl trails-bg-secondary">
            <p className="text-gray-500 dark:text-gray-400">
              Connected with {connector?.name || ""}
            </p>
            <p
              className="text-gray-900 dark:text-white"
              style={{ wordBreak: "break-all" }}
            >
              {address}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {error && (
              <div className="border rounded-lg p-4 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm break-words text-red-600 dark:text-red-200">
                  {error}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={onContinue}
              className="w-full cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 text-white"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleDisconnect}
              className="w-full cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors border trails-bg-card trails-hover-bg trails-text-primary trails-border-primary"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {walletOptions.length > 0 ? (
            walletOptions.map((wallet) => (
              <button
                type="button"
                key={wallet.id}
                onClick={() => onConnect(wallet.id)}
                className={`w-full flex items-center justify-center space-x-2 cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors ${getWalletButtonStyle(wallet.id)}`}
              >
                {wallet.id === "privy" ? (
                  <>
                    <img
                      src={PrivyLogoWhite}
                      alt="Privy"
                      className="h-6 dark:hidden"
                    />
                    <img
                      src={PrivyLogoBlack}
                      alt="Privy"
                      className="h-6 hidden dark:block"
                    />
                  </>
                ) : wallet.id === "injected" && window.ethereum?.isMetaMask ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={MetaMaskFox}
                      alt="MetaMask Fox"
                      className="h-6 w-6"
                    />
                    <img
                      src={MetaMaskLogoWhite}
                      alt="MetaMask"
                      className="h-6"
                    />
                  </div>
                ) : (
                  <span>{wallet.name}</span>
                )}
              </button>
            ))
          ) : (
            <div className="space-y-6">
              <div className="text-center p-4 rounded-lg trails-text-tertiary trails-bg-secondary">
                Please connect wallet in dapp
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ConnectWallet
