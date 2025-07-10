import type { SequenceAPIClient, Token, TokenPrice } from "@0xsequence/trails-api";
export declare const getTokenPrices: (apiClient: SequenceAPIClient, tokens: Token[]) => Promise<TokenPrice[]>;
export declare const getTokenPrice: (apiClient: SequenceAPIClient, token: Token) => Promise<TokenPrice | null>;
export declare const useTokenPrices: (tokens: Token[], apiClient: SequenceAPIClient) => import("@tanstack/react-query").UseQueryResult<TokenPrice[], Error>;
export declare const useTokenPrice: (token: Token | null, apiClient: SequenceAPIClient) => import("@tanstack/react-query").UseQueryResult<TokenPrice | null, Error>;
//# sourceMappingURL=prices.d.ts.map