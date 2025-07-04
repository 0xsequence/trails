import type { Chain } from "viem"
import * as chains from "viem/chains"

// Helper to get chain info
export function getChainInfo(chainId: number): Chain | null {
  return (
    (Object.values(chains) as Array<Chain>).find(
      (chain: Chain) => chain.id === chainId,
    ) || null
  )
}
