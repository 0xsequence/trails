import { useEffect, useState } from "react"
import { zeroAddress } from "viem"

export function getTokenAddress(chainId: number, tokenSymbol: string) {
  if (tokenSymbol === "ETH") {
    return zeroAddress
  }

  if (chainId === 1) {
    if (tokenSymbol === "USDC") {
      return "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    }
    if (tokenSymbol === "USDT") {
      return "0xdac17f958d2ee523a2206206994597c13d831ec7"
    }
    if (tokenSymbol === "BAT") {
      return "0x0d8775f648430679a709e98d2b0cb6250d2887ef"
    }
    if (tokenSymbol === "ARB") {
      return "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1"
    }
  }

  if (chainId === 10) {
    if (tokenSymbol === "USDC") {
      return "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
    }
    if (tokenSymbol === "USDT") {
      return "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
    }
  }

  if (chainId === 42161) {
    if (tokenSymbol === "USDC") {
      return "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
    }
    if (tokenSymbol === "USDT") {
      return "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
    }
    if (tokenSymbol === "ARB") {
      return "0x912ce59144191c1204e64559fe8253a0e49e6548"
    }
  }

  if (chainId === 8453) {
    if (tokenSymbol === "USDC") {
      return "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    }
    if (tokenSymbol === "USDT") {
      return "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2"
    }
  }

  if (chainId === 137) {
    if (tokenSymbol === "USDC") {
      return "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
    }
    if (tokenSymbol === "USDT") {
      return "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
    }
    if (tokenSymbol === "BAT") {
      return "0x3cef98bb43d732e2f285ee605a8158cde967d219"
    }
  }

  throw new Error(
    `Unsupported token symbol: ${tokenSymbol} for chainId: ${chainId}`,
  )
}

type UseTokenAddressProps = {
  chainId?: number | null
  tokenSymbol?: string | null
}

export function useTokenAddress({
  chainId,
  tokenSymbol,
}: UseTokenAddressProps) {
  const [tokenAddress, setTokenAddress] = useState<string | null>(null)

  useEffect(() => {
    if (!chainId || !tokenSymbol) {
      return
    }

    try {
      setTokenAddress(getTokenAddress(chainId, tokenSymbol))
    } catch (error) {
      console.error("[trails-sdk] Error getting token address", error)
    }
  }, [chainId, tokenSymbol])

  return tokenAddress
}
