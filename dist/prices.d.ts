import type { SequenceAPIClient, Token, TokenPrice } from "@0xsequence/trails-api";
export declare const fetchGetTokenPrices: (apiClient: SequenceAPIClient, tokens: Token[]) => Promise<TokenPrice[]>;
export declare function normalizeToken(token: Token & {
    tokenID?: string;
    symbol?: string;
}): Token;
export declare const getTokenPrices: (apiClient: SequenceAPIClient, tokens: Token[]) => Promise<TokenPrice[]>;
export declare const getTokenPrice: (apiClient: SequenceAPIClient, token: Token) => Promise<TokenPrice | null>;
export declare const useTokenPrices: (tokens: Token[], apiClient: SequenceAPIClient) => {
    tokenPrices: TokenPrice[] | undefined;
    isLoadingTokenPrices: boolean;
};
export declare const useTokenPrice: (token?: Token | null, apiClient?: SequenceAPIClient) => {
    tokenPrice: TokenPrice | null | undefined;
    isLoadingTokenPrice: boolean;
};
export declare function invalidateTokenPricesCache(token?: Token): void;
export declare function calcAmountUsdPrice({ amount, usdPrice, }: {
    amount: number | string;
    usdPrice: string | number | null | undefined;
}): number;
export declare function normalizeNumber(number: number | string | null | undefined): number;
export declare function formatTvl(tvl: number): string;
//# sourceMappingURL=prices.d.ts.map