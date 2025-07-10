import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import * as chains from "viem/chains"
import { WagmiProvider } from "wagmi"

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
  ssr: false,
})

// Create AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
  enableReconnect: true,
  debug: false,
  enableWalletGuide: false,
})

// Export AppKit Provider component
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>{children}</WagmiProvider>
  )
}
