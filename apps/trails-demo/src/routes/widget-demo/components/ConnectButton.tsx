import { ConnectKitButton } from "connectkit"

// Export ConnectButton component
export function ConnectButton() {
  return (
    <div className="flex justify-center">
      <ConnectKitButton.Custom>
        {({ isConnected, show, address }) => {
          return (
            <>
              {isConnected && address ? (
                <button
                  type="button"
                  className={
                    "w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] transition-colors text-sm font-medium cursor-pointer"
                  }
                  onClick={show}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    <span>
                      {address.slice(0, 6)}…{address.slice(-4)}
                    </span>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  className={
                    "w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] transition-colors text-sm font-medium cursor-pointer"
                  }
                  onClick={show}
                >
                  Connect wallet
                </button>
              )}
            </>
          )
        }}
      </ConnectKitButton.Custom>
    </div>
  )
}
