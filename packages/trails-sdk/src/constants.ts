import type { Chain } from "viem"
import * as chains from "viem/chains"

export const ATTESATION_SIGNER_ADDRESS =
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

export const TRAILS_LIFI_SAPIENT_SIGNER_ADDRESS =
  "0xd7571bd1e3af468c3a49966c9a92a2e907cdfa52"
export const TRAILS_RELAY_SAPIENT_SIGNER_ADDRESS =
  "0x9a013e7d186611af36a918ef23d81886e8c256f8"
export const TRAILS_CCTP_SAPIENT_SIGNER_ADDRESS =
  "0xc1A9B197eBb31Fc2B613C59dAC3f3E5698A429D0"

export const DEFAULT_INDEXER_GATEWAY_URL = "https://dev-indexer.sequence.app"
export const DEFAULT_API_URL = "https://v3-api.sequence.app"
export const DEFAULT_ENV = "dev"

// Available chains
// TODO: make this dynamic
export const SUPPORTED_TO_CHAINS: Array<{
  id: number
  name: string
  chain: Chain
}> = [
  { id: chains.mainnet.id, name: chains.mainnet.name, chain: chains.mainnet },
  { id: chains.base.id, name: chains.base.name, chain: chains.base },
  {
    id: chains.optimism.id,
    name: chains.optimism.name,
    chain: chains.optimism,
  },
  {
    id: chains.arbitrum.id,
    name: chains.arbitrum.name,
    chain: chains.arbitrum,
  },
  { id: chains.polygon.id, name: chains.polygon.name, chain: chains.polygon },
]

// Available tokens
// TODO: make this dynamic
export const SUPPORTED_TO_TOKENS: Array<{
  symbol: string
  name: string
  imageUrl: string
  decimals: number
}> = [
  {
    symbol: "ETH",
    name: "Ethereum",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0x0000000000000000000000000000000000000000.webp`,
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.webp`,
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0xdac17f958d2ee523a2206206994597c13d831ec7.webp`,
    decimals: 6,
  },
  {
    symbol: "BAT",
    name: "Basic Attention Token",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0x0d8775f648430679a709e98d2b0cb6250d2887ef.webp`,
    decimals: 18,
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    imageUrl: `https://assets.sequence.info/images/tokens/small/42161/0x912ce59144191c1204e64559fe8253a0e49e6548.webp`,
    decimals: 18,
  },
]

export const intentEntrypoints: Record<number, `0x${string}`> = {
  8453: "0x2bf4c63199eD7D8A737E8DB2cC19E0C0103F6bE3",
  84532: "0xdcd9160492C6D43ABbd28D4d06F68ad77f1A0F2b",
  421614: "0xf18A16E1C778baCA5d6f7F48cC4c9bb913e5e579",
  42161: "0x674827B6BE8780DBdb96DC02c735275e3a982c90",
  137: "0x4dBb20eA3A969F1A44d7653D4Dc8632B853E36DE",
}
