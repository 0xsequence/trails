import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import {
  cookieStorage,
  createConfig,
  createStorage,
  http,
  WagmiProvider,
} from "wagmi"
import type { Transport } from "wagmi"
import * as chains from "viem/chains"
import { useTheme } from "@/contexts/ThemeContext"
import { connectors } from "./connectors"
import { reownProjectId } from "../../config"

interface ConnectKitProviderProps {
  children: React.ReactNode
}

type ConnectKitChain = any

export const ConnectProvider = ({ children }: ConnectKitProviderProps) => {
  const { theme } = useTheme()

  // Create wagmi config with ConnectKit defaults
  const config = createConfig(
    getDefaultConfig({
      connectors,
      enableFamily: false,
      chains: (
        Object.values(chains) as [ConnectKitChain, ...ConnectKitChain[]]
      ).sort((a, b) => a.id - b.id),
      transports: Object.values(chains).reduce(
        (acc, chain) => {
          acc[chain.id] = http()
          return acc
        },
        {} as Record<number, Transport>,
      ),
      ssr: false,
      storage: createStorage({
        storage: cookieStorage,
      }),

      // WalletConnect configuration
      walletConnectProjectId: reownProjectId,

      // App metadata
      appName: "Trails",
      appDescription: "Trails",
      appUrl: "https://trails.build",
      // appIcon: 'https://trails.build/logo.png', // Uncomment and update with actual icon
    }),
  )

  return (
    <WagmiProvider config={config}>
      <ConnectKitProvider
        theme="nouns"
        mode={theme === "dark" ? "dark" : "light"}
      >
        {children}
      </ConnectKitProvider>
    </WagmiProvider>
  )
}
