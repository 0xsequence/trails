import { QueryClient, useQuery } from "@tanstack/react-query";
import { zeroAddress, erc20Abi } from "viem";
import * as chains from "viem/chains";
import { getChainInfo } from "./chains.js";
import { getRelaySupportedTokens } from "./relaySdk.js";
import { useReadContracts } from "wagmi";
import { useMemo } from "react";
// LocalStorage cache utilities for token images
const TOKEN_IMAGE_CACHE_KEY = "trails-sdk:token-image-cache";
const TOKEN_IMAGE_CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
function getTokenImageCache() {
    if (typeof window === "undefined")
        return {};
    try {
        const cached = localStorage.getItem(TOKEN_IMAGE_CACHE_KEY);
        if (!cached)
            return {};
        const parsed = JSON.parse(cached);
        const now = Date.now();
        // Clean up expired entries
        const validEntries = Object.entries(parsed).filter(([_, entry]) => {
            return now - entry.timestamp < TOKEN_IMAGE_CACHE_EXPIRY;
        });
        return Object.fromEntries(validEntries);
    }
    catch {
        return {};
    }
}
function setTokenImageCache(key, imageUrl, found) {
    if (typeof window === "undefined")
        return;
    try {
        const cache = getTokenImageCache();
        cache[key] = {
            imageUrl,
            timestamp: Date.now(),
            found,
        };
        localStorage.setItem(TOKEN_IMAGE_CACHE_KEY, JSON.stringify(cache));
    }
    catch (error) {
        console.warn("[trails-sdk] Failed to cache token image:", error);
    }
}
// Dedicated QueryClient for token image fetching
const tokenImageQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 24 * 60 * 60 * 1000, // 24 hours
            gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});
// Priority tokens that should appear first in the list
const PRIORITY_TOKENS = [
    "ETH",
    "WETH",
    "AVAX",
    "WAVAX",
    "xDAI",
    "POL",
    "USDC",
    "USDT",
    "DAI",
    "MATIC",
    "ARB",
    "OP",
    "BAT",
    "WBTC",
    "cbBTC",
    "XAI",
];
// Sort function for tokens with the specified priority order
function sortTokens(tokens) {
    return tokens.sort((a, b) => {
        // 1. Priority tokens first (ETH, USDC, USDT, DAI)
        const aPriority = PRIORITY_TOKENS.indexOf(a.symbol);
        const bPriority = PRIORITY_TOKENS.indexOf(b.symbol);
        // If both are priority tokens, sort by priority order
        if (aPriority !== -1 && bPriority !== -1) {
            return aPriority - bPriority;
        }
        // If only one is a priority token, prioritize it
        if (aPriority !== -1)
            return -1;
        if (bPriority !== -1)
            return 1;
        // 2. Tokens with imageUrl before those without
        const aHasImage = !!a.imageUrl;
        const bHasImage = !!b.imageUrl;
        if (aHasImage && !bHasImage)
            return -1;
        if (!aHasImage && bHasImage)
            return 1;
        // 3. Alphabetical by symbol
        return a.symbol.localeCompare(b.symbol);
    });
}
export async function getTokenImageUrlOrFallback(chainId, contractAddress) {
    const cacheKey = `${chainId}:${contractAddress}`;
    const imageUrl = getTokenImageUrl(chainId, contractAddress);
    // Check localStorage cache first
    const cache = getTokenImageCache();
    const cachedEntry = cache[cacheKey];
    if (cachedEntry) {
        if (cachedEntry.found) {
            return cachedEntry.imageUrl;
        }
        else {
            return ""; // Return empty string if we previously found no image
        }
    }
    // Use QueryClient to fetch and cache the result
    try {
        const result = await tokenImageQueryClient.fetchQuery({
            queryKey: ["tokenImage", chainId, contractAddress],
            queryFn: async () => {
                const response = await fetch(imageUrl, {
                    method: "HEAD", // Only fetch headers to check if image exists
                    cache: "no-cache", // Don't cache the fetch request itself
                });
                const found = response.ok;
                const resultUrl = found ? imageUrl : "";
                // Cache the result in localStorage
                setTokenImageCache(cacheKey, resultUrl, found);
                return resultUrl;
            },
            staleTime: 24 * 60 * 60 * 1000, // 24 hours
            gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return result;
    }
    catch (error) {
        console.error("[trails-sdk] Error fetching token image:", error);
        // Cache the failure to avoid repeated requests
        setTokenImageCache(cacheKey, "", false);
        return "";
    }
}
export async function getSupportedTokens() {
    const tokens = await getRelaySupportedTokens();
    for (const token of tokens) {
        if (!token.imageUrl) {
            token.imageUrl = getTokenImageUrl(token.chainId, token.contractAddress);
        }
        getTokenImageUrlOrFallback(token.chainId, token.contractAddress)
            .then((imageUrl) => {
            token.imageUrl = imageUrl;
        })
            .catch((error) => {
            console.error("[trails-sdk] Error getting token image url:", error);
        });
    }
    const uniqueTokens = tokens.filter((token, index, self) => index ===
        self.findIndex((t) => t.chainId === token.chainId &&
            t.contractAddress === token.contractAddress));
    // Sort tokens according to priority order
    return sortTokens(uniqueTokens);
}
export function useSupportedTokens() {
    const { data: supportedTokens = [], isLoading: isLoadingTokens } = useQuery({
        queryKey: ["supportedTokens"],
        queryFn: getSupportedTokens,
        staleTime: 60 * 60 * 1000, // 1 hour - tokens rarely change
        gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache for a full day
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        refetchOnReconnect: false, // Don't refetch on network reconnect
    });
    return {
        supportedTokens: supportedTokens || [],
        isLoadingTokens,
    };
}
export async function getSourceTokenList() {
    const tokens = await getSupportedTokens();
    return tokens.map((token) => token.symbol);
}
export function useSourceTokenList() {
    const { data: list = [] } = useQuery({
        queryKey: ["sourceTokenList"],
        queryFn: getSourceTokenList,
        staleTime: 1000 * 60 * 60, // 1 hour - token list rarely changes
        gcTime: 1000 * 60 * 60 * 24, // 24 hours cache time
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
    return list;
}
const tokenNames = {
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
};
export const tokensToPrefix = {
    USDC: "USDC",
    ETH: "ETH",
    POL: "POL",
};
export const tokenNamePrefixes = {
    [chains.optimism.id]: "Optimistic",
    [chains.arbitrum.id]: "Arbitrum",
    [chains.polygon.id]: "Polygon",
};
export function getFormatttedTokenName(currentName, tokenSymbol, chainId) {
    let name = tokenNames[tokenSymbol] || currentName || tokenSymbol;
    if (chainId) {
        try {
            const chainInfo = getChainInfo(chainId);
            if (chainInfo) {
                if (tokensToPrefix[tokenSymbol]) {
                    if (chainId !== chains.mainnet.id) {
                        name = `${chainInfo?.name} ${tokenSymbol}`;
                    }
                    const prefix = tokenNamePrefixes[chainId];
                    if (prefix) {
                        name = `${prefix} ${tokenSymbol}`;
                    }
                }
            }
        }
        catch (e) {
            console.error("[trails-sdk] Error getting chain info:", e);
        }
    }
    return name;
}
export async function getTokenAddress(chainId, tokenSymbol) {
    const chainInfo = getChainInfo(chainId);
    if (tokenSymbol === chainInfo?.nativeCurrency.symbol) {
        return zeroAddress;
    }
    const tokens = await getSupportedTokens();
    const token = tokens.find((t) => t.symbol === tokenSymbol && t.chainId === chainId);
    if (token?.contractAddress) {
        return token.contractAddress;
    }
    throw new Error(`Unsupported token symbol: ${tokenSymbol} for chainId: ${chainId}`);
}
export function useTokenAddress({ chainId, tokenSymbol, }) {
    const { data: tokenAddress } = useQuery({
        queryKey: ["tokenAddress", chainId, tokenSymbol],
        queryFn: () => chainId && tokenSymbol ? getTokenAddress(chainId, tokenSymbol) : null,
        enabled: !!chainId && !!tokenSymbol,
        staleTime: 60 * 60 * 1000, // 1 hour - token addresses rarely change
        gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache for a full day
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        refetchOnReconnect: false, // Don't refetch on network reconnect
    });
    return tokenAddress || null;
}
export function getTokenImageUrl(chainId, contractAddress) {
    const imageUrl = `https://assets.sequence.info/images/tokens/large/${chainId}/${contractAddress}.webp`;
    return imageUrl;
}
// React hook for token image fetching with caching
export function useTokenImageUrl(chainId, contractAddress) {
    const { data: imageUrl = "", isLoading, error, } = useQuery({
        queryKey: ["tokenImage", chainId, contractAddress],
        queryFn: () => getTokenImageUrlOrFallback(chainId, contractAddress),
        enabled: !!chainId && !!contractAddress,
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
    return {
        imageUrl,
        isLoading,
        error,
        hasImage: !!imageUrl,
    };
}
export function useTokenList() {
    const { supportedTokens: tokens, isLoadingTokens } = useSupportedTokens();
    return {
        tokens,
        isLoadingTokens: isLoadingTokens,
    };
}
export function useTokenInfo({ address, chainId, }) {
    const isAddress = address?.startsWith("0x") ?? false;
    if (!isAddress || !chainId) {
        return {
            tokenInfo: null,
            isLoading: false,
            error: null,
        };
    }
    const contract = {
        address: address,
        abi: erc20Abi,
        chainId,
    };
    const result = useReadContracts({
        contracts: [
            { ...contract, functionName: "name" },
            { ...contract, functionName: "symbol" },
            { ...contract, functionName: "decimals" },
        ],
    });
    const error = result?.error ?? result?.data?.find((r) => r.error)?.error ?? null;
    const [name, symbol, decimals] = result.data ?? [];
    const chainInfo = getChainInfo(chainId);
    const tokenInfo = useMemo(() => {
        if (!symbol?.result || !name?.result || decimals?.result == null) {
            return null;
        }
        return {
            id: symbol.result,
            name: name.result,
            symbol: symbol.result,
            decimals: decimals.result,
            chainId,
            contractAddress: address,
            chainName: chainInfo?.name ?? "",
            imageUrl: "",
        };
    }, [
        address,
        chainId,
        chainInfo?.name,
        name?.result,
        symbol?.result,
        decimals?.result,
    ]);
    return {
        tokenInfo,
        isLoading: result.isLoading,
        error: error,
    };
}
