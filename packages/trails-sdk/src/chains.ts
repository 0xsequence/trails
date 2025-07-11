import type { Chain } from "viem"
import * as chains from "viem/chains"

const testnetChains: Record<number, Chain> = {
  [chains.mainnet.id]: chains.sepolia,
  [chains.arbitrum.id]: chains.arbitrumSepolia,
  [chains.base.id]: chains.baseSepolia,
  [chains.polygon.id]: chains.polygonAmoy,
  [chains.optimism.id]: chains.optimismSepolia,
}

// Helper to get chain info
export function getChainInfo(chainId: number): Chain | null {
  return (
    (Object.values(chains) as Array<Chain>).find(
      (chain: Chain) => chain.id === chainId,
    ) || null
  )
}

export function getTestnetChainInfo(
  mainnetChain: Chain | number,
): Chain | null {
  if (typeof mainnetChain === "number") {
    return testnetChains[mainnetChain] || null
  }
  return testnetChains[mainnetChain.id] || null
}
