import * as chains from "viem/chains"
import { createConfig, http } from "wagmi"
import { injected, metaMask } from "wagmi/connectors"
import { sequenceProjectAccessKey } from "./config"

// import { sequenceWallet } from '@0xsequence/wagmi-connector'

if (!sequenceProjectAccessKey) {
  console.warn(
    "VITE_PROJECT_ACCESS_KEY is not set in .env file. Sequence connector may not work correctly.",
  )
}

export const config = createConfig({
  // @ts-expect-error
  chains: Object.values(chains),
  connectors: [
    // sequenceWallet({
    //   connectOptions: {
    //     app: 'Trails Demo',
    //     projectAccessKey: projectAccessKey,
    //   },
    //   defaultNetwork: chains.mainnet.id,
    // }),
    injected(),
    metaMask(),
  ],
  transports: Object.values(chains).reduce(
    (acc, chain) => ({
      ...acc,
      [chain.id]: http(),
    }),
    {},
  ) as Record<number, ReturnType<typeof http>>,
})
