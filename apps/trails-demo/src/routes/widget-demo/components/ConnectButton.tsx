import { useAppKitAccount } from "@reown/appkit/react"
import { appKit } from "@/routes/widget-demo/Providers"

// Export ConnectButton component
export function ConnectButton() {
  const { isConnected, address } = useAppKitAccount()

  console.log("[trails-demo reown] account", address, isConnected)

  return (
    <div className="flex justify-center">
      {isConnected ? (
        <appkit-button balance="hide" />
      ) : (
        <button
          type="button"
          onClick={() => appKit.open({ view: "Connect" })}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] transition-colors text-sm font-medium cursor-pointer"
        >
          Connect wallet
        </button>
      )}
    </div>
  )
}
