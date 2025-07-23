import type { Hex } from "viem"
import * as chains from "viem/chains"

export const LANDING_PAGE_URL = "https://trails.build/"
export const DOCS_URL = "https://docs.trails.build/"
export const DEMOS_URL = "https://demo.trails.build/"
export const TWITTER_URL = "https://x.com/0xsequence"
export const DISCORD_URL = "https://discord.gg/sequence"
export const GITHUB_URL = "https://github.com/0xsequence/trails"
export const SEQUENCE_URL = "https://sequence.xyz/"

// Mock Data for 'mock_interaction' action
export const MOCK_CONTRACT_ADDRESS =
  "0x0000000000000000000000000000000000000000"
export const MOCK_TRANSFER_DATA: Hex = `0xabcdef`
export const MOCK_CHAIN_ID = chains.arbitrum.id
export const MOCK_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000"
export const MOCK_TOKEN_AMOUNT = "3000000"

// Data for 'pay' action
export const PAY_CHAIN_ID = chains.base.id
// export const PAY_CHAIN_ID = chains.arbitrum.id
export const BASE_USDC_PAY_TOKEN_ADDRESS =
  "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
export const ARB_USDC_PAY_TOKEN_ADDRESS =
  "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
// export const PAY_TOKEN_ADDRESS = ARB_USDC_PAY_TOKEN_ADDRESS
export const PAY_TOKEN_ADDRESS = BASE_USDC_PAY_TOKEN_ADDRESS
export const PAY_TOKEN_SYMBOL = "USDC"
export const PAY_TOKEN_DECIMALS = 6
export const PAY_RECIPIENT_ADDRESS =
  "0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C"
export const PAY_AMOUNT = 100000n // 0.1 USDC
export const PAY_AMOUNT_FORMATTED = "0.1"
export const PAY_DISPLAY_TEXT = `(Donate $${PAY_AMOUNT_FORMATTED} ${PAY_TOKEN_SYMBOL})`

export const GIT_COMMIT_SHA = import.meta.env.VITE_COMMIT_SHA || ""
