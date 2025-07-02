import {
  createAppKit,
  useAppKitAccount,
  useAppKitEvents,
  useWalletInfo,
} from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { reconnect } from "@wagmi/core"
import { useEffect, useState } from "react"
import * as chains from "viem/chains"
import { injected, useConnect, WagmiProvider } from "wagmi"

// Setup queryClient
const queryClient = new QueryClient()

// Get projectId
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID

// Create metadata object
const metadata = {
  name: "Trails Demo",
  description: "Trails Widget Demo",
  url:
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:5173",
  icons: ["https://sequence.xyz/favicon.ico"],
}

type AppKitNetwork = any // TODO: Add type

// Set networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  chains.mainnet as AppKitNetwork,
  ...Object.values(chains).map((chain) => chain as AppKitNetwork),
]

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
})

// Create AppKit instance
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
})

// Export AppKit Provider component
export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

interface ConnectButtonProps {
  onConnect: (provider: any) => void
}

// Export ConnectButton component
export function ConnectButton({ onConnect }: ConnectButtonProps) {
  const events = useAppKitEvents()
  const { connectors } = useConnect()
  const account = useAppKitAccount()
  const [lastEvent, setLastEvent] = useState<string | null>(null)
  const { walletInfo } = useWalletInfo()

  useEffect(() => {
    if (events.data?.event === lastEvent) {
      return
    } else {
      setLastEvent(events.data?.event)
    }

    // Check if already connected on mount
    if (events.data?.event === "INITIALIZE") {
      const checkConnection = async () => {
        console.log("account", account)

        try {
          const connectedType = localStorage.getItem("trails-connected")
          console.log("connectedType", connectedType)
          if (connectedType) {
            console.log("trails-connected")
            const provider = await appKit.getProvider("eip155")

            const accounts = await (provider as any).request({
              method: "eth_accounts",
            })
            console.log("accounts", accounts)

            console.log("provider", provider)
            console.log("connectors", connectors)
            if (connectedType === "injected") {
              reconnect(wagmiAdapter.wagmiConfig, { connectors: [injected()] })
            }
            if (provider) {
              onConnect(provider)
            }
          }
        } catch (error) {
          console.log("No existing connection found:", error)
          localStorage.removeItem("trails-connected")
        }
      }
      checkConnection()
    }
    if (events.data?.event === "CONNECT_SUCCESS") {
      console.log("connect", walletInfo)
      localStorage.setItem(
        "trails-connected",
        walletInfo?.type?.toLocaleLowerCase() || "unknown",
      )
    }

    if (events.data?.event === "DISCONNECT_SUCCESS") {
      console.log("disconnect")
      localStorage.removeItem("trails-connected")
    }
  }, [
    onConnect,
    events.data?.event,
    walletInfo,
    account,
    connectors,
    lastEvent,
  ])

  return (
    <div className="flex justify-center">
      <appkit-button balance="hide" />
    </div>
  )
}
