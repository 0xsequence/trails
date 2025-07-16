import type { Chain } from "viem"
import * as chains from "viem/chains"

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
