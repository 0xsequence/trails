import type {
  SequenceAPIClient,
  Token,
  TokenPrice,
} from "@0xsequence/trails-api"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { zeroAddress } from "viem"

// Global caching configuration
const CACHE_CONFIG = {
  // Time configurations
  staleTime: 30000, // 30 seconds - prices change frequently
  gcTime: 120000, // 2 minutes cache time
  refetchInterval: 60000, // Background refetch every minute for prices

  // Retry configurations
  retry: 2,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),

  // Refetch behaviors
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchIntervalInBackground: true,

  // Retry logic for specific error types
  shouldRetry: (failureCount: number, error: any) => {
    if (error && "status" in error && error.status === 404) return false
    if (failureCount < 2) return true
    return false
  },
} as const

// Extract common query options for reuse
const COMMON_QUERY_OPTIONS = {
  staleTime: CACHE_CONFIG.staleTime,
  gcTime: CACHE_CONFIG.gcTime,
  retry: CACHE_CONFIG.shouldRetry,
  retryDelay: CACHE_CONFIG.retryDelay,
  refetchOnWindowFocus: CACHE_CONFIG.refetchOnWindowFocus,
  refetchOnReconnect: CACHE_CONFIG.refetchOnReconnect,
  refetchInterval: CACHE_CONFIG.refetchInterval,
  refetchIntervalInBackground: CACHE_CONFIG.refetchIntervalInBackground,
} as const

// Initialize query client for token prices
const tokenPricesQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...COMMON_QUERY_OPTIONS,
      // Override retry for QueryClient (use number instead of function)
      retry: CACHE_CONFIG.retry,
    },
  },
})

// Cache key generation methods
const createTokenCacheKey = (token: Token): string => {
  return `${token.contractAddress}-${token.chainId}-${token.tokenId}`
}

const createBatchCacheKey = (
  tokens: Token[],
): (string | number | string[])[] => {
  return [
    "tokenPrices",
    "batch",
    tokens.length,
    tokens.map(createTokenCacheKey).sort(),
  ]
}

const createSingleCacheKey = (token: Token | null): (string | null)[] => {
  return ["tokenPrices", "single", token ? createTokenCacheKey(token) : null]
}

// Separate fetch function for token prices
export const fetchGetTokenPrices = async (
  apiClient: SequenceAPIClient,
  tokens: Token[],
): Promise<TokenPrice[]> => {
  if (!apiClient) {
    throw new Error("API client is required")
  }

  if (tokens.length === 0) {
    return [] as TokenPrice[]
  }

  try {
    const res = await apiClient.getCoinPrices({ tokens })
    return res?.tokenPrices || []
  } catch (error) {
    console.error("[trails-sdk] Failed to fetch token prices:", error)
    throw error
  }
}

export function normalizeToken(
  token: Token & { tokenID?: string; symbol?: string },
): Token {
  return {
    chainId: token.chainId,
    contractAddress: token.contractAddress || zeroAddress,
    tokenId: token.tokenId || token.tokenID || token.symbol,
  }
}

export const getTokenPrices = async (
  apiClient: SequenceAPIClient,
  tokens: Token[],
): Promise<TokenPrice[]> => {
  tokens = tokens.map(normalizeToken)

  return tokenPricesQueryClient.fetchQuery({
    queryKey: createBatchCacheKey(tokens),
    queryFn: () => fetchGetTokenPrices(apiClient, tokens),
    ...COMMON_QUERY_OPTIONS,
  })
}

export const getTokenPrice = async (
  apiClient: SequenceAPIClient,
  token: Token,
): Promise<TokenPrice | null> => {
  return tokenPricesQueryClient.fetchQuery({
    queryKey: createSingleCacheKey(token),
    queryFn: async () => {
      const prices = await getTokenPrices(apiClient, [token])
      return prices?.length ? prices[0] : null
    },
    ...COMMON_QUERY_OPTIONS,
  })
}

export const useTokenPrices = (
  tokens: Token[],
  apiClient: SequenceAPIClient,
) => {
  tokens = tokens.map(normalizeToken)

  return useQuery({
    queryKey: createBatchCacheKey(tokens),
    queryFn: () => getTokenPrices(apiClient, tokens),
    enabled: tokens.length > 0 && !!apiClient,
    ...COMMON_QUERY_OPTIONS,
  })
}

export const useTokenPrice = (
  token: Token | null,
  apiClient: SequenceAPIClient,
) => {
  return useQuery({
    queryKey: createSingleCacheKey(token),
    queryFn: () => (token ? getTokenPrice(apiClient, token) : null),
    enabled: !!token && !!apiClient,
    ...COMMON_QUERY_OPTIONS,
  })
}

// Cache invalidation utility function
export function invalidateTokenPricesCache(token?: Token) {
  if (token) {
    // Invalidate specific token price using consistent cache key
    tokenPricesQueryClient.invalidateQueries({
      queryKey: createSingleCacheKey(token),
    })
  } else {
    // Invalidate all token price queries
    tokenPricesQueryClient.invalidateQueries({
      queryKey: ["tokenPrices"],
    })
  }
}
