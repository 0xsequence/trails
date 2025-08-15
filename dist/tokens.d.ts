export type SupportedToken = {
    id: string;
    symbol: string;
    name: string;
    contractAddress: string;
    decimals: number;
    chainId: number;
    chainName: string;
    imageUrl: string;
};
export declare function getCachedTokenImageUrl(chainId: number, contractAddress: string, symbol: string): string;
export declare function getTokenImageUrlOrFallback({ chainId, contractAddress, symbol, }: {
    chainId?: number;
    contractAddress?: string;
    symbol?: string;
}): Promise<string>;
export declare function getSupportedTokens(): Promise<SupportedToken[]>;
export declare function useSupportedTokens({ chainId }?: {
    chainId?: number;
}): {
    supportedTokens: SupportedToken[];
    isLoadingTokens: boolean;
};
export declare function getSourceTokenList(): Promise<string[]>;
export declare function useSourceTokenList(): string[];
export declare const tokensToPrefix: Record<string, string>;
export declare const tokenNamePrefixes: Record<string, string>;
export declare function getFormatttedTokenName(currentName: string, tokenSymbol: string, chainId?: number): string;
export declare function getTokenInfo(chainId: number, contractAddress: string): Promise<SupportedToken | null>;
export declare function getTokenAddress(chainId: number, tokenSymbol: string): Promise<string>;
type UseTokenAddressProps = {
    chainId?: number | null;
    tokenSymbol?: string | null;
};
export declare function useTokenAddress({ chainId, tokenSymbol, }: UseTokenAddressProps): string | null;
export declare function getCommonTokenImageUrl({ symbol, contractAddress, chainId, }: {
    symbol?: string | null;
    contractAddress?: string | null;
    chainId?: number | null;
}): string;
export declare function getTokenImageUrl({ chainId, contractAddress, symbol, }: {
    chainId?: number;
    contractAddress?: string;
    symbol?: string;
}): string;
export declare function useTokenImageUrl({ chainId, contractAddress, symbol, }: {
    chainId?: number;
    contractAddress?: string;
    symbol?: string;
}): {
    imageUrl: string;
    isLoading: boolean;
    error: Error | null;
    hasImage: boolean;
};
export declare function useTokenList(): {
    tokens: SupportedToken[];
    isLoadingTokens: boolean;
};
export declare function useTokenInfo({ address, chainId, }: {
    address: string;
    chainId?: number;
}): {
    tokenInfo: Partial<SupportedToken> | null;
    isLoading: boolean;
    error: Error | null;
};
export declare const commonTokenImages: Record<string, string>;
export declare const tokenImageSymbolMap: Record<string, string>;
export declare const commonTokens: SupportedToken[];
export declare const wethAddresses: Record<string, string>;
export declare function getWethAddress(chainId: number): string | null;
export {};
//# sourceMappingURL=tokens.d.ts.map