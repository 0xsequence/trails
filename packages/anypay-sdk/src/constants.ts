import type { Chain } from "viem"
import * as chains from "viem/chains"

export const ANYPAY_LIFI_SAPIENT_SIGNER_ADDRESS =
  "0xd7571bd1e3af468c3a49966c9a92a2e907cdfa52"
export const ANYPAY_LIFI_SAPIENT_SIGNER_LITE_ADDRESS =
  "0xaA3f6B332237aFb83789d3F5FBaD817EF3102648"
export const ANYPAY_LIFI_ATTESATION_SIGNER_ADDRESS =
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
export const ANYPAY_RELAY_SAPIENT_SIGNER_ADDRESS =
  "0xe3DB8e4A02bdFD958a1009582b4C527bf1A1505d"
export const ANYPAY_RELAY_SAPIENT_SIGNER_LITE_ADDRESS =
  "0xe3DB8e4A02bdFD958a1009582b4C527bf1A1505d"
export const ANYPAY_RELAY_ATTESATION_SIGNER_ADDRESS =
  "0xe3DB8e4A02bdFD958a1009582b4C527bf1A1505d"

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
