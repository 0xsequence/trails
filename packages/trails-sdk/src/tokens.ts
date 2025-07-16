import { useQuery } from "@tanstack/react-query"
import * as chains from "viem/chains"
import { getChainInfo } from "./chains.js"
import type { RelayToken } from "./relaySdk.js"
import { getRelaySupportedTokens } from "./relaySdk.js"
import { zeroAddress } from "viem"

export type SupportedToken = RelayToken

export async function getSupportedTokens(): Promise<SupportedToken[]> {
  const tokens = await getRelaySupportedTokens()
  return tokens as SupportedToken[]
}

export function useSupportedTokens(): {
  supportedTokens: SupportedToken[]
  isLoadingTokens: boolean
} {
  const { data: supportedTokens = [], isLoading: isLoadingTokens } = useQuery({
    queryKey: ["supportedTokens"],
    queryFn: getSupportedTokens,
    staleTime: 60 * 60 * 1000, // 1 hour - tokens rarely change
    gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache for a full day
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on network reconnect
  })

  return {
    supportedTokens: supportedTokens || [],
    isLoadingTokens,
  }
}

export async function getSourceTokenList(): Promise<string[]> {
  const tokens = await getSupportedTokens()
  return tokens.map((token) => token.symbol)
}

export function useSourceTokenList(): string[] {
  const { data: list = [] } = useQuery({
    queryKey: ["sourceTokenList"],
    queryFn: getSourceTokenList,
    staleTime: 1000 * 60 * 60, // 1 hour - token list rarely changes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours cache time
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  return list
}

const tokenNames: Record<string, string> = {
  ETH: "Ethereum",
  WETH: "Wrapped ETH",
  USDC: "USDC",
  USDT: "Tether",
  DAI: "Dai Stablecoin",
  OP: "Optimism",
  ARB: "Arbitrum",
  POL: "POL",
  MATIC: "Matic Token",
  BAT: "Basic Attention Token",
}

export const tokensToPrefix: Record<string, string> = {
  USDC: "USDC",
  ETH: "ETH",
  POL: "POL",
}

export const tokenNamePrefixes: Record<string, string> = {
  [chains.optimism.id]: "Optimistic",
  [chains.arbitrum.id]: "Arbitrum",
  [chains.polygon.id]: "Polygon",
}

export function getFormatttedTokenName(
  currentName: string,
  tokenSymbol: string,
  chainId?: number,
): string {
  let name = tokenNames[tokenSymbol] || currentName || tokenSymbol
  if (chainId) {
    try {
      const chainInfo = getChainInfo(chainId)
      if (chainInfo) {
        if (tokensToPrefix[tokenSymbol]) {
          if (chainId !== chains.mainnet.id) {
            name = `${chainInfo?.name} ${tokenSymbol}`
          }
          const prefix = tokenNamePrefixes[chainId]
          if (prefix) {
            name = `${prefix} ${tokenSymbol}`
          }
        }
      }
    } catch (e) {
      console.error("[trails-sdk] Error getting chain info:", e)
    }
  }
  return name
}

export async function getTokenAddress(chainId: number, tokenSymbol: string) {
  const chainInfo = getChainInfo(chainId)
  if (tokenSymbol === chainInfo?.nativeCurrency.symbol) {
    return zeroAddress
  }

  const tokens = await getSupportedTokens()
  const token = tokens.find((t) => t.symbol === tokenSymbol)
  if (token?.contractAddress) {
    return token.contractAddress
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
  const { data: tokenAddress } = useQuery({
    queryKey: ["tokenAddress", chainId, tokenSymbol],
    queryFn: () => getTokenAddress(chainId!, tokenSymbol!),
    enabled: !!chainId && !!tokenSymbol,
    staleTime: 60 * 60 * 1000, // 1 hour - token addresses rarely change
    gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache for a full day
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on network reconnect
  })

  return tokenAddress || null
}
