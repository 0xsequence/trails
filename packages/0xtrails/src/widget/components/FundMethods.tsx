import type React from "react"
import { ChevronLeft, Wallet, QrCode, Building2 } from "lucide-react"
import { useAccount } from "wagmi"
import { truncateAddress } from "../../address.js"
import { useTheme } from "../components/ThemeProvider.js"
import WalletConnectLogoWhite from "../assets/WalletConnect-logo-white.svg"
import WalletConnectLogoBlack from "../assets/WalletConnect-logo-black.svg"

export interface FundMethodsProps {
  onBack?: () => void
  onSelectWalletConnect: () => void
  onSelectExchange: () => void
  onSelectConnectedAccount: () => void
  onSelectQrCode: () => void
}

const FundMethods: React.FC<FundMethodsProps> = ({
  onBack,
  onSelectWalletConnect,
  onSelectExchange,
  onSelectConnectedAccount,
  onSelectQrCode,
}) => {
  const { address, isConnected, connector } = useAccount()
  const { getActiveTheme } = useTheme()

  const activeTheme = getActiveTheme()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-full transition-colors cursor-pointer hover:trails-hover-bg text-gray-400"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold">Choose Funding Method</h2>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={onSelectConnectedAccount}
            className="flex flex-col items-center justify-center gap-1 px-3 py-3 trails-border-radius-list border border-gray-200 dark:border-gray-700 trails-secondary-button-bg text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <span className="font-medium">Connected Account</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Use your connected wallet to fund directly.
            </span>
            <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
              {isConnected && address
                ? `${connector?.name || "Connected"}: ${truncateAddress(address)}`
                : "No wallet connected"}
            </span>
          </button>

          <button
            type="button"
            onClick={onSelectWalletConnect}
            className="flex flex-col items-center justify-center gap-1 px-3 py-3 trails-border-radius-list border border-gray-200 dark:border-gray-700 trails-secondary-button-bg text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <img
                src={
                  activeTheme === "dark"
                    ? WalletConnectLogoWhite
                    : WalletConnectLogoBlack
                }
                alt="WalletConnect"
                className="w-5 h-5"
              />
              <span className="font-medium">WalletConnect</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Connect another wallet.
            </span>
          </button>

          <button
            type="button"
            onClick={onSelectQrCode}
            className="flex flex-col items-center justify-center gap-1 px-3 py-3 trails-border-radius-list border border-gray-200 dark:border-gray-700 trails-secondary-button-bg text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              <span className="font-medium">Pay with QR Code</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Scan a QR code to deposit funds.
            </span>
          </button>

          <button
            type="button"
            onClick={onSelectExchange}
            className="flex flex-col items-center justify-center gap-1 px-3 py-3 trails-border-radius-list border border-gray-200 dark:border-gray-700 trails-secondary-button-bg text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span className="font-medium">Send from Exchange</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Transfer from Coinbase, Binance, etc.
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FundMethods
