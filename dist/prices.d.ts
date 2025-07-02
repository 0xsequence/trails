import type { SequenceAPIClient, Token, TokenPrice } from "@0xsequence/anypay-api";
export declare const getTokenPrices: (apiClient: SequenceAPIClient, tokens: Token[]) => Promise<TokenPrice[]>;
export declare const useTokenPrices: (tokens: Token[], apiClient: SequenceAPIClient) => import("@tanstack/react-query").UseQueryResult<TokenPrice[], Error>;
//# sourceMappingURL=prices.d.ts.map