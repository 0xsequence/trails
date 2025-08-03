import { useAppKitAccount } from "@reown/appkit/react"
import { appKit } from "@/routes/widget-demo/ReownProvider"

// Export ConnectButton component
export function ConnectButton() {
  const { isConnected } = useAppKitAccount()

  return (
    <div className="flex justify-center">
      {isConnected ? (
        <appkit-button balance="hide" />
      ) : (
        <button
          type="button"
          onClick={() => appKit.open({ view: "Connect" })}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white trails-border-radius-button transition-colors text-sm font-medium cursor-pointer"
        >
          Connect wallet
        </button>
      )}
    </div>
  )
}
