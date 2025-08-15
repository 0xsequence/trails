import { QueryClient, useQuery } from "@tanstack/react-query";
import { zeroAddress, erc20Abi } from "viem";
import * as chains from "viem/chains";
import { getChainInfo, getSupportedChains } from "./chains.js";
import { getRelaySupportedTokens } from "./relaySdk.js";
import { useReadContracts } from "wagmi";
import { useMemo } from "react";
const cacheVersion = "01";
// LocalStorage cache utilities for token images
const TOKEN_IMAGE_CACHE_KEY = `trails-sdk:token-image-cache:${cacheVersion}`;
const TOKEN_IMAGE_CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
// Token info cache utilities
const TOKEN_INFO_CACHE_KEY = `trails-sdk:token-info-cache:${cacheVersion}`;
const TOKEN_INFO_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
// In-memory token info cache
const tokenInfoCache = new Map();
function getTokenInfoCache() {
    if (typeof window === "undefined")
        return {};
    try {
        const cached = localStorage.getItem(TOKEN_INFO_CACHE_KEY);
        if (!cached)
            return {};
        const parsed = JSON.parse(cached);
        const now = Date.now();
        // Clean up expired entries
        const validEntries = Object.entries(parsed).filter(([_, entry]) => {
            return now - entry.timestamp < TOKEN_INFO_CACHE_EXPIRY;
        });
        return Object.fromEntries(validEntries);
    }
    catch {
        return {};
    }
}
function setTokenInfoCache(key, tokenInfo) {
    if (typeof window === "undefined")
        return;
    try {
        const cache = getTokenInfoCache();
        cache[key] = {
            ...tokenInfo,
            timestamp: Date.now(),
        };
        localStorage.setItem(TOKEN_INFO_CACHE_KEY, JSON.stringify(cache));
        // Also update in-memory cache
        tokenInfoCache.set(key, cache[key]);
    }
    catch (error) {
        console.warn("[trails-sdk] Failed to cache token info:", error);
    }
}
function getCachedTokenInfo(chainId, contractAddress) {
    const key = `${chainId}:${contractAddress.toLowerCase()}`;
    // Check in-memory cache first
    const memoryEntry = tokenInfoCache.get(key);
    if (memoryEntry) {
        return memoryEntry;
    }
    // Check localStorage cache
    const cache = getTokenInfoCache();
    const cachedEntry = cache[key];
    if (cachedEntry) {
        // Update in-memory cache
        tokenInfoCache.set(key, cachedEntry);
        return cachedEntry;
    }
    return null;
}
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
        const symbolComparison = a.symbol.localeCompare(b.symbol);
        if (symbolComparison !== 0) {
            return symbolComparison;
        }
        // 4. If symbols are the same, sort by chainName
        return a.chainName.localeCompare(b.chainName);
    });
}
export function getCachedTokenImageUrl(chainId, contractAddress, symbol) {
    const cacheKey = `${chainId}:${contractAddress}:${symbol}`;
    const cache = getTokenImageCache();
    const cachedEntry = cache[cacheKey];
    return cachedEntry?.imageUrl || "";
}
export async function getTokenImageUrlOrFallback({ chainId, contractAddress, symbol, }) {
    const cacheKey = `${chainId}:${contractAddress}:${symbol}`;
    const imageUrl = getTokenImageUrl({ chainId, contractAddress, symbol });
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
            token.imageUrl = getTokenImageUrl({
                chainId: token.chainId,
                contractAddress: token.contractAddress,
                symbol: token.symbol,
            });
        }
        getTokenImageUrlOrFallback({
            chainId: token.chainId,
            contractAddress: token.contractAddress,
            symbol: token.symbol,
        })
            .then((imageUrl) => {
            token.imageUrl = imageUrl;
        })
            .catch((error) => {
            console.error("[trails-sdk] Error getting token image url:", error);
        });
    }
    const additionalTokens = [];
    for (const commonToken of commonTokens) {
        const contractAddress = commonToken.contractAddress;
        const exists = tokens.some((t) => t.chainId === commonToken.chainId &&
            t.contractAddress.toLowerCase() === contractAddress.toLowerCase());
        if (!exists) {
            additionalTokens.push(commonToken);
        }
    }
    const supportedChains = await getSupportedChains();
    const allTokens = [...tokens, ...additionalTokens];
    const supportedChainTokens = allTokens.filter((token) => supportedChains.some((chain) => chain.id === token.chainId));
    const uniqueTokens = supportedChainTokens.filter((token, index, self) => index ===
        self.findIndex((t) => t.chainId === token.chainId &&
            t.contractAddress.toLowerCase() ===
                token.contractAddress.toLowerCase()));
    // Sort tokens according to priority order
    return sortTokens(uniqueTokens);
}
export function useSupportedTokens({ chainId } = {}) {
    const { data: supportedTokens = [], isLoading: isLoadingTokens } = useQuery({
        queryKey: ["supportedTokens"],
        queryFn: getSupportedTokens,
        staleTime: 60 * 60 * 1000, // 1 hour - tokens rarely change
        gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache for a full day
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        refetchOnReconnect: false, // Don't refetch on network reconnect
    });
    const filteredTokens = useMemo(() => {
        if (!chainId) {
            return supportedTokens;
        }
        return supportedTokens.filter((token) => token.chainId === chainId);
    }, [supportedTokens, chainId]);
    return {
        supportedTokens: filteredTokens || [],
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
export async function getTokenInfo(chainId, contractAddress) {
    const normalizedAddress = contractAddress.toLowerCase();
    // Check cache first
    const cachedInfo = getCachedTokenInfo(chainId, normalizedAddress);
    if (cachedInfo) {
        return {
            id: cachedInfo.id,
            symbol: cachedInfo.symbol,
            name: cachedInfo.name,
            contractAddress: cachedInfo.contractAddress,
            decimals: cachedInfo.decimals,
            chainId: cachedInfo.chainId,
            chainName: cachedInfo.chainName,
            imageUrl: cachedInfo.imageUrl,
        };
    }
    // Check if it's a native token
    const chainInfo = getChainInfo(chainId);
    if (normalizedAddress === zeroAddress.toLowerCase()) {
        const nativeInfo = {
            id: `${chainInfo?.nativeCurrency.symbol || "ETH"}-${chainInfo?.name || "ethereum"}`,
            symbol: chainInfo?.nativeCurrency.symbol || "ETH",
            name: chainInfo?.nativeCurrency.name || "Ethereum",
            contractAddress: zeroAddress,
            decimals: chainInfo?.nativeCurrency.decimals || 18,
            chainId,
            chainName: chainInfo?.name || "Ethereum",
            imageUrl: getTokenImageUrl({
                chainId,
                contractAddress: zeroAddress,
                symbol: chainInfo?.nativeCurrency.symbol || "ETH",
            }),
        };
        // Cache the native token info
        setTokenInfoCache(`${chainId}:${normalizedAddress}`, nativeInfo);
        return nativeInfo;
    }
    // Look in supported tokens
    const tokens = await getSupportedTokens();
    const token = tokens.find((t) => t.chainId === chainId &&
        t.contractAddress.toLowerCase() === normalizedAddress);
    if (token) {
        // Cache the token info
        setTokenInfoCache(`${chainId}:${normalizedAddress}`, token);
        return token;
    }
    // If not found in supported tokens, return null
    return null;
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
export function getCommonTokenImageUrl({ symbol, contractAddress, chainId, }) {
    if (!symbol || !contractAddress || !chainId) {
        return "";
    }
    if (!symbol) {
        const token = commonTokens.find((t) => t.chainId === chainId &&
            t.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
        if (token) {
            symbol = token.symbol;
        }
    }
    if (!symbol) {
        return "";
    }
    const symbolKey = tokenImageSymbolMap[symbol] ?? symbol;
    if (commonTokenImages[symbolKey]) {
        return commonTokenImages[symbolKey];
    }
    return "";
}
export function getTokenImageUrl({ chainId, contractAddress, symbol, }) {
    if (!chainId || !contractAddress || !symbol) {
        return "";
    }
    const cachedImageUrl = getCachedTokenImageUrl(chainId, contractAddress, symbol);
    if (cachedImageUrl) {
        return cachedImageUrl;
    }
    if (symbol) {
        const commonImageUrl = getCommonTokenImageUrl({
            symbol,
            contractAddress,
            chainId,
        });
        if (commonImageUrl) {
            return commonImageUrl;
        }
    }
    const imageUrl = `https://assets.sequence.info/images/tokens/large/${chainId}/${contractAddress.toLowerCase()}.webp`;
    return imageUrl;
}
// React hook for token image fetching with caching
export function useTokenImageUrl({ chainId, contractAddress, symbol, }) {
    const { data: imageUrl = "", isLoading, error, } = useQuery({
        queryKey: ["tokenImage", chainId, contractAddress, symbol],
        queryFn: () => getTokenImageUrlOrFallback({ chainId, contractAddress, symbol }),
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
    // Always call hooks unconditionally
    const isAddress = address?.startsWith("0x") ?? false;
    // Check cache first
    const cachedInfo = useMemo(() => {
        if (!isAddress || !chainId)
            return null;
        return getCachedTokenInfo(chainId, address);
    }, [isAddress, chainId, address]);
    const contract = {
        address: address,
        abi: erc20Abi,
        chainId,
    };
    const result = useReadContracts({
        contracts: !!isAddress && !!chainId && !cachedInfo
            ? [
                { ...contract, functionName: "name" },
                { ...contract, functionName: "symbol" },
                { ...contract, functionName: "decimals" },
            ]
            : [],
    });
    const error = result?.error ?? result?.data?.find((r) => r.error)?.error ?? null;
    const [name, symbol, decimals] = result.data ?? [];
    const chainInfo = getChainInfo(chainId);
    const tokenInfo = useMemo(() => {
        // If we have cached info, use it
        if (cachedInfo) {
            return {
                id: cachedInfo.id,
                name: cachedInfo.name,
                symbol: cachedInfo.symbol,
                decimals: cachedInfo.decimals,
                chainId: cachedInfo.chainId,
                contractAddress: cachedInfo.contractAddress,
                chainName: cachedInfo.chainName,
                imageUrl: cachedInfo.imageUrl,
            };
        }
        // If we have blockchain data, use it and cache it
        if (symbol?.result && name?.result && decimals?.result != null) {
            const tokenInfo = {
                id: symbol.result,
                name: name.result,
                symbol: symbol.result,
                decimals: decimals.result,
                chainId: chainId,
                contractAddress: address,
                chainName: chainInfo?.name ?? "",
                imageUrl: getTokenImageUrl({
                    chainId,
                    contractAddress: address,
                    symbol: symbol.result,
                }),
            };
            // Cache the result
            setTokenInfoCache(`${chainId}:${address.toLowerCase()}`, tokenInfo);
            return tokenInfo;
        }
        return null;
    }, [
        cachedInfo,
        address,
        chainId,
        chainInfo?.name,
        name?.result,
        symbol?.result,
        decimals?.result,
    ]);
    // Early return if not a valid address or chainId
    if (!isAddress || !chainId) {
        return {
            tokenInfo: null,
            isLoading: false,
            error: null,
        };
    }
    return {
        tokenInfo,
        isLoading: !cachedInfo && result.isLoading,
        error: error,
    };
}
export const commonTokenImages = {
    ETH: "https://assets.sequence.info/images/tokens/large/1/0x0000000000000000000000000000000000000000.webp",
    POL: "https://assets.sequence.info/images/tokens/large/137/0x0000000000000000000000000000000000000000.webp",
    USDC: "https://assets.sequence.info/images/tokens/large/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.webp",
    USDT: "https://assets.sequence.info/images/tokens/large/1/0xdac17f958d2ee523a2206206994597c13d831ec7.webp",
    DAI: "https://assets.sequence.info/images/tokens/large/1/0x6b175474e89094c44da98b954eedeac495271d0f.webp",
    WBTC: "https://assets.sequence.info/images/tokens/large/1/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.webp",
    BAT: "https://assets.sequence.info/images/tokens/large/1/0x0d8775f648430679a709e98d2b0cb6250d2887ef.webp",
    ARB: "https://assets.sequence.info/images/tokens/large/42161/0x912ce59144191c1204e64559fe8253a0e49e6548.webp",
    LINK: "https://assets.sequence.info/images/tokens/large/1/0x514910771af9ca656af840dff83e8264ecf986ca.webp",
};
export const tokenImageSymbolMap = {
    ETH: "ETH",
    WETH: "ETH",
    cbETH: "ETH",
    POL: "POL",
    WPOL: "POL",
    USDC: "USDC",
    "USDC.e": "USDC",
    USDT: "USDT",
    DAI: "DAI",
    xDAI: "DAI",
    WBTC: "WBTC",
    cbBTC: "WBTC",
    BAT: "BAT",
    ARB: "ARB",
    LINK: "LINK",
};
export const commonTokens = [
    // Native tokens
    {
        id: "ETH-ethereum",
        symbol: "ETH",
        name: "Ethereum",
        contractAddress: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        chainId: chains.mainnet.id,
        chainName: chains.mainnet.name,
        imageUrl: commonTokenImages.ETH,
    },
    {
        id: "ETH-arbitrum",
        symbol: "ETH",
        name: "ETH Arbitrum",
        contractAddress: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        chainId: chains.arbitrum.id,
        chainName: chains.arbitrum.name,
        imageUrl: commonTokenImages.ETH,
    },
    {
        id: "ETH-optimism",
        symbol: "ETH",
        name: "ETH Optimism",
        contractAddress: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        chainId: chains.optimism.id,
        chainName: chains.optimism.name,
        imageUrl: commonTokenImages.ETH,
    },
    {
        id: "ETH-base",
        symbol: "ETH",
        name: "ETH Base",
        contractAddress: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        chainId: chains.base.id,
        chainName: chains.base.name,
        imageUrl: commonTokenImages.ETH,
    },
    {
        id: "POL-polygon",
        symbol: "POL",
        name: "Polygon",
        contractAddress: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        chainId: chains.polygon.id,
        chainName: chains.polygon.name,
        imageUrl: commonTokenImages.POL,
    },
    // USDC
    {
        id: "USDC-ethereum",
        symbol: "USDC",
        name: "USDC",
        contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
        chainId: chains.mainnet.id,
        chainName: chains.mainnet.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-arbitrum",
        symbol: "USDC",
        name: "USDC Arbitrum",
        contractAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        decimals: 6,
        chainId: chains.arbitrum.id,
        chainName: chains.arbitrum.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-avalanche",
        symbol: "USDC",
        name: "USDC Avalanche",
        contractAddress: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        decimals: 6,
        chainId: chains.avalanche.id,
        chainName: chains.avalanche.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-base",
        symbol: "USDC",
        name: "USDC Base",
        contractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        decimals: 6,
        chainId: chains.base.id,
        chainName: chains.base.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-linea",
        symbol: "USDC",
        name: "USDC Linea",
        contractAddress: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
        decimals: 6,
        chainId: chains.linea.id,
        chainName: chains.linea.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-optimism",
        symbol: "USDC",
        name: "USDC Optimism",
        contractAddress: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        decimals: 6,
        chainId: chains.optimism.id,
        chainName: chains.optimism.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-polygon",
        symbol: "USDC",
        name: "USDC Polygon",
        contractAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        decimals: 6,
        chainId: chains.polygon.id,
        chainName: chains.polygon.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-unichain",
        symbol: "USDC",
        name: "USDC Unichain",
        contractAddress: "0x078D782b760474a361dDA0AF3839290b0EF57AD6",
        decimals: 6,
        chainId: chains.unichain.id,
        chainName: chains.unichain.name,
        imageUrl: commonTokenImages.USDC,
    },
    {
        id: "USDC-worldchain",
        symbol: "USDC",
        name: "USDC WorldChain",
        contractAddress: "0x79A02482A880bCe3F13E09da970dC34dB4cD24D1",
        decimals: 6,
        chainId: chains.worldchain.id,
        chainName: chains.worldchain.name,
        imageUrl: commonTokenImages.USDC,
    },
    // Basic Attention Token
    {
        id: "BAT-ethereum",
        symbol: "BAT",
        name: "Basic Attention Token",
        contractAddress: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
        decimals: 18,
        chainId: chains.mainnet.id,
        chainName: chains.mainnet.name,
        imageUrl: commonTokenImages.BAT,
    },
    {
        id: "BAT-polygon",
        symbol: "BAT",
        name: "Basic Attention Token",
        contractAddress: "0x3Cef98bb43d732E2F285eE605a8158cDE967D219",
        decimals: 18,
        chainId: chains.polygon.id,
        chainName: chains.polygon.name,
        imageUrl: commonTokenImages.BAT,
    },
    {
        id: "BAT-avalanche",
        symbol: "BAT",
        name: "Basic Attention Token",
        contractAddress: "0x98443B96EA4b0858FDF3219Cd13e98C7A4690588",
        decimals: 18,
        chainId: chains.avalanche.id,
        chainName: chains.avalanche.name,
        imageUrl: commonTokenImages.BAT,
    },
    // ARB
    {
        id: "ARB-arbitrum",
        symbol: "ARB",
        name: "Arbitrum",
        contractAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
        decimals: 18,
        chainId: chains.arbitrum.id,
        chainName: chains.arbitrum.name,
        imageUrl: commonTokenImages.ARB,
    },
    // Chainlink
    {
        id: "LINK-ethereum",
        symbol: "LINK",
        name: "Chainlink",
        contractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        decimals: 18,
        chainId: chains.mainnet.id,
        chainName: chains.mainnet.name,
        imageUrl: commonTokenImages.LINK,
    },
];
export const wethAddresses = {
    1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    10: "0x4200000000000000000000000000000000000006",
    8453: "0x4200000000000000000000000000000000000006",
    42161: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    137: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    100: "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1",
};
export function getWethAddress(chainId) {
    return wethAddresses[chainId] ?? null;
}
