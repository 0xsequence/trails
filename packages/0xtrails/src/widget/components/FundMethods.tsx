import type React from "react"
import { ArrowLeft, Link as LinkIcon, Wallet } from "lucide-react"
import { useAccount } from "wagmi"
import { truncateAddress } from "../../address.js"

export interface FundMethodsProps {
  onBack?: () => void
  onSelectWalletConnect: () => void
  onSelectExchange: () => void
  onSelectConnectedAccount: () => void
}

const FundMethods: React.FC<FundMethodsProps> = ({
  onBack,
  onSelectWalletConnect,
  onSelectExchange,
  onSelectConnectedAccount,
}) => {
  const { address, isConnected } = useAccount()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">Choose Funding Method</h2>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm grid grid-cols-1 gap-5">
          <button
            type="button"
            onClick={onSelectConnectedAccount}
            className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <span className="font-medium">Connected Account</span>
            <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
              {isConnected && address
                ? truncateAddress(address)
                : "No wallet connected"}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Use your currently connected wallet to fund directly.
            </span>
          </button>

          <button
            type="button"
            onClick={onSelectWalletConnect}
            className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <Wallet className="w-5 h-5" />
            <span className="font-medium">WalletConnect</span>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Connect a mobile wallet via QR code using WalletConnect.
            </span>
          </button>

          <button
            type="button"
            onClick={onSelectExchange}
            className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <LinkIcon className="w-5 h-5" />
            <span className="font-medium">Exchange</span>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Transfer from a centralized exchange using Mesh Connect.
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FundMethods
