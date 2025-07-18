import { QueryClient, useQuery } from "@tanstack/react-query";
import { zeroAddress } from "viem";
// Global caching configuration
const CACHE_CONFIG = {
    // Time configurations
    staleTime: 30000, // 30 seconds - prices change frequently
    gcTime: 120000, // 2 minutes cache time
    refetchInterval: 60000, // Background refetch every minute for prices
    // Retry configurations
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Refetch behaviors
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    // Retry logic for specific error types
    shouldRetry: (failureCount, error) => {
        if (error && "status" in error && error.status === 404)
            return false;
        if (failureCount < 2)
            return true;
        return false;
    },
};
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
};
// Initialize query client for token prices
const tokenPricesQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...COMMON_QUERY_OPTIONS,
            // Override retry for QueryClient (use number instead of function)
            retry: CACHE_CONFIG.retry,
        },
    },
});
// Cache key generation methods
const createTokenCacheKey = (token) => {
    return `${token.contractAddress}-${token.chainId}-${token.tokenId}`;
};
const createBatchCacheKey = (tokens) => {
    return [
        "tokenPrices",
        "batch",
        tokens.length,
        tokens.map(createTokenCacheKey).sort(),
    ];
};
const createSingleCacheKey = (token) => {
    return ["tokenPrices", "single", token ? createTokenCacheKey(token) : null];
};
// Separate fetch function for token prices
export const fetchGetTokenPrices = async (apiClient, tokens) => {
    if (!apiClient) {
        throw new Error("API client is required");
    }
    if (tokens.length === 0) {
        return [];
    }
    try {
        const res = await apiClient.getCoinPrices({ tokens });
        return res?.tokenPrices || [];
    }
    catch (error) {
        console.error("[trails-sdk] Failed to fetch token prices:", error);
        throw error;
    }
};
export function normalizeToken(token) {
    return {
        chainId: token.chainId,
        contractAddress: token.contractAddress || zeroAddress,
        tokenId: token.tokenId || token.tokenID || token.symbol,
    };
}
export const getTokenPrices = async (apiClient, tokens) => {
    tokens = tokens.map(normalizeToken);
    return tokenPricesQueryClient.fetchQuery({
        queryKey: createBatchCacheKey(tokens),
        queryFn: () => fetchGetTokenPrices(apiClient, tokens),
        ...COMMON_QUERY_OPTIONS,
    });
};
export const getTokenPrice = async (apiClient, token) => {
    return tokenPricesQueryClient.fetchQuery({
        queryKey: createSingleCacheKey(token),
        queryFn: async () => {
            const prices = await getTokenPrices(apiClient, [token]);
            return prices?.length ? prices[0] : null;
        },
        ...COMMON_QUERY_OPTIONS,
    });
};
export const useTokenPrices = (tokens, apiClient) => {
    tokens = tokens.map(normalizeToken);
    const { data: tokenPrices, isLoading: isLoadingTokenPrices } = useQuery({
        queryKey: createBatchCacheKey(tokens),
        queryFn: () => getTokenPrices(apiClient, tokens),
        enabled: tokens.length > 0 && !!apiClient,
        ...COMMON_QUERY_OPTIONS,
    });
    return {
        tokenPrices,
        isLoadingTokenPrices,
    };
};
export const useTokenPrice = (token, apiClient) => {
    const { data: tokenPrice, isLoading: isLoadingTokenPrice } = useQuery({
        queryKey: createSingleCacheKey(token),
        queryFn: () => token && apiClient ? getTokenPrice(apiClient, token) : null,
        enabled: !!token && !!apiClient,
        ...COMMON_QUERY_OPTIONS,
    });
    return {
        tokenPrice,
        isLoadingTokenPrice,
    };
};
// Cache invalidation utility function
export function invalidateTokenPricesCache(token) {
    if (token) {
        // Invalidate specific token price using consistent cache key
        tokenPricesQueryClient.invalidateQueries({
            queryKey: createSingleCacheKey(token),
        });
    }
    else {
        // Invalidate all token price queries
        tokenPricesQueryClient.invalidateQueries({
            queryKey: ["tokenPrices"],
        });
    }
}
