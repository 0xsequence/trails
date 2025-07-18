import { useQuery } from "@tanstack/react-query"
import type { Chain } from "viem"
import * as chains from "viem/chains"
import { getRelaySupportedChains } from "./relaySdk.js"

export const supportedSequenceChains: Record<number, Chain> = {
  [chains.apeChain.id]: chains.mainnet,
  [chains.arbitrum.id]: chains.arbitrum,
  [chains.arbitrumNova.id]: chains.arbitrumNova,
  [chains.avalanche.id]: chains.avalanche,
  [chains.b3.id]: chains.b3,
  [chains.base.id]: chains.base,
  [chains.blast.id]: chains.polygon,
  // [chains.opBNB.id]: chains.opBNB, // Needs chain image
  [chains.mainnet.id]: chains.mainnet,
  [chains.gnosis.id]: chains.gnosis,
  [chains.optimism.id]: chains.optimism,
  [chains.polygon.id]: chains.polygon,
  [chains.soneium.id]: chains.soneium,
  [chains.xai.id]: chains.xai,
}

export const supportedSequenceTestnetChains: Record<number, Chain> = {
  [chains.arbitrumSepolia.id]: chains.arbitrumSepolia,
  [chains.avalancheFuji.id]: chains.avalancheFuji,
  [chains.b3Sepolia.id]: chains.b3Sepolia,
  [chains.baseSepolia.id]: chains.baseSepolia,
  [chains.blastSepolia.id]: chains.blastSepolia,
  [chains.opBNBTestnet.id]: chains.opBNBTestnet,
  [chains.sepolia.id]: chains.sepolia,
  [chains.gnosisChiado.id]: chains.gnosisChiado,
  [chains.polygonAmoy.id]: chains.polygonAmoy,
  [chains.optimismSepolia.id]: chains.optimismSepolia,
  [chains.soneiumMinato.id]: chains.soneiumMinato,
  [chains.xaiTestnet.id]: chains.xaiTestnet,
}

// Helper to get chain info
export function getChainInfo(chainId: number): Chain | null {
  return (
    (Object.values(chains) as Array<Chain>).find(
      (chain: Chain) => chain.id === chainId,
    ) || null
  )
}

// Get testnet chain info from mainnet chain as input
export function getTestnetChainInfo(
  mainnetChain: Chain | number,
): Chain | null {
  if (typeof mainnetChain === "number") {
    return supportedSequenceTestnetChains[mainnetChain] || null
  }
  return supportedSequenceTestnetChains[mainnetChain.id] || null
}

export async function getSupportedSequenceChains(): Promise<Chain[]> {
  return Object.values(supportedSequenceChains)
}

export async function getSupportedSequenceTestnetChains(): Promise<Chain[]> {
  return Object.values(supportedSequenceTestnetChains)
}

// Priority chains that should appear first in the list
const PRIORITY_CHAIN_IDS = [1, 8453, 42161, 10, 137]

// Sort function for chains with priority order and then by name
function sortChains(chains: Chain[]): Chain[] {
  return chains.sort((a, b) => {
    // 1. Priority chains first (1, 8453, 42161, 10, 137)
    const aPriority = PRIORITY_CHAIN_IDS.indexOf(a.id)
    const bPriority = PRIORITY_CHAIN_IDS.indexOf(b.id)

    // If both are priority chains, sort by priority order
    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority
    }

    // If only one is a priority chain, prioritize it
    if (aPriority !== -1) return -1
    if (bPriority !== -1) return 1

    // 2. Sort by chain name alphabetically
    return a.name.localeCompare(b.name)
  })
}

export async function getSupportedChains(): Promise<Chain[]> {
  const sequenceChains = await getSupportedSequenceChains()
  const relayChains = await getRelaySupportedChains()

  // Find intersection of sequence chains and relay chains
  const supportedChains = sequenceChains.filter((sequenceChain) =>
    relayChains.some((relayChain) => relayChain.id === sequenceChain.id),
  )

  // Ensure unique chain IDs by filtering duplicates
  const uniqueChains = supportedChains.filter(
    (chain, index, self) => index === self.findIndex((c) => c.id === chain.id),
  )

  // Sort chains by priority and then by name
  return sortChains(uniqueChains)
}

export function useSupportedChains(): {
  supportedChains: Chain[]
  isLoadingChains: boolean
} {
  const { data: supportedChains = [], isLoading: isLoadingChains } = useQuery({
    queryKey: ["supportedChains"],
    queryFn: getSupportedChains,
    staleTime: 60 * 60 * 1000, // 1 hour - chains rarely change
    gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache for a full day
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on network reconnect
  })

  return {
    supportedChains: supportedChains || [],
    isLoadingChains,
  }
}
