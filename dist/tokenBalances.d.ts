import type { GetTokenBalancesSummaryReturn, NativeTokenBalance, SequenceIndexerGateway, TokenBalance } from "@0xsequence/indexer";
import type { Page, Price, SequenceAPIClient } from "@0xsequence/trails-api";
import type { Address } from "ox";
export type { NativeTokenBalance, TokenBalance };
export declare function isNativeToken(token: TokenBalance | NativeTokenBalance): token is NativeTokenBalance;
export interface TokenBalanceWithPrice extends TokenBalance {
    price?: Price;
    balanceUsd?: number;
    balanceUsdFormatted?: string;
}
export interface NativeTokenBalanceWithPrice extends NativeTokenBalance {
    price?: Price;
    balanceUsd?: number;
    balanceUsdFormatted?: string;
    symbol?: string;
}
export type TokenBalanceExtended = TokenBalanceWithPrice | NativeTokenBalanceWithPrice;
export declare function sortTokensByPriority(a: TokenBalanceExtended, b: TokenBalanceExtended): number;
export interface GetTokenBalancesWithPrice {
    page: Page;
    nativeBalances: Array<NativeTokenBalance & {
        price?: Price;
        symbol?: string;
        balanceUsd?: number;
        balanceUsdFormatted?: string;
    }>;
    balances: Array<TokenBalance & {
        price?: Price;
        balanceUsd?: number;
        balanceUsdFormatted?: string;
    }>;
}
export declare function useTokenBalances(address: Address.Address, indexerGatewayClient?: SequenceIndexerGateway, sequenceApiClient?: SequenceAPIClient): {
    tokenBalancesData: GetTokenBalancesSummaryReturn | undefined;
    isLoadingBalances: boolean;
    isLoadingPrices: boolean;
    isLoadingSortedTokens: boolean;
    balanceError: Error | null;
    sortedTokens: TokenBalanceExtended[];
};
export declare function formatBalance(balance: string, decimals?: number): string;
export declare function getTokenBalanceUsd(token: TokenBalance | NativeTokenBalance, tokenPrice: Price): number;
export declare function formatValue(value: string | number): string;
export declare function formatUsdValue(value?: number | string): string;
export declare function getTokenBalanceUsdFormatted(token: TokenBalance | NativeTokenBalance, tokenPrice: Price): string;
export declare function useTokenBalanceUsdFormat(token: TokenBalance | NativeTokenBalance, tokenPrice: Price): string;
export type GetTokenBalancesParams = {
    account: string;
    indexerGatewayClient: SequenceIndexerGateway;
};
export declare function fetchGetTokenBalancesSummary({ account, indexerGatewayClient, }: GetTokenBalancesParams): Promise<GetTokenBalancesSummaryReturn>;
export declare function getTokenBalances({ account, indexerGatewayClient, }: GetTokenBalancesParams): Promise<GetTokenBalancesSummaryReturn>;
export declare function invalidateTokenBalancesCache(account?: string): void;
export type GetTokenBalancesFlatArrayParams = {
    account: string;
    indexerGatewayClient: SequenceIndexerGateway;
};
export type GetTokenBalancesFlatArrayReturn = {
    balances: TokenBalance[];
};
export declare function getTokenBalancesFlatArray({ account, indexerGatewayClient, }: GetTokenBalancesFlatArrayParams): Promise<TokenBalance[]>;
export type GetTokenBalancesWithPricesParams = {
    account: string;
    indexerGatewayClient: SequenceIndexerGateway;
    apiClient: SequenceAPIClient;
};
export type GetTokenBalancesWithPriceReturn = {
    balances: TokenBalanceWithPrice[];
};
export declare function getTokenBalancesWithPrices({ account, indexerGatewayClient, apiClient, }: GetTokenBalancesWithPricesParams): Promise<GetTokenBalancesWithPriceReturn>;
export type UseAccountTokenBalanceParams = {
    account?: string;
    token?: string;
    chainId?: number;
    indexerGatewayClient?: SequenceIndexerGateway;
    apiClient?: SequenceAPIClient;
};
export declare function useAccountTokenBalance({ account, token, chainId, indexerGatewayClient, apiClient, }: UseAccountTokenBalanceParams): {
    tokenBalance: TokenBalanceWithPrice | null | undefined;
    isLoadingTokenBalance: boolean;
};
export type HasSufficientBalanceParams = {
    account: string;
    token: string;
    amount: string;
    chainId: number;
    indexerGatewayClient: SequenceIndexerGateway;
    apiClient: SequenceAPIClient;
};
export declare function getHasSufficientBalanceToken({ account, token, amount, chainId, indexerGatewayClient, apiClient, }: HasSufficientBalanceParams): Promise<boolean>;
export declare function useHasSufficientBalanceToken(account: string, token: string, amount: string, chainId: number): {
    hasSufficientBalanceToken: boolean;
    isLoadingHasSufficientBalanceToken: boolean;
};
export type GetHasSufficientBalanceUsdParams = {
    account: string;
    targetAmountUsd: number | string;
    indexerGatewayClient: SequenceIndexerGateway;
    apiClient: SequenceAPIClient;
};
export declare function getHasSufficientBalanceUsd({ account, targetAmountUsd, indexerGatewayClient, apiClient, }: GetHasSufficientBalanceUsdParams): Promise<boolean>;
export declare function useHasSufficientBalanceUsd(account: string, targetAmountUsd?: number | string | null): {
    hasSufficientBalanceUsd: boolean;
    isLoadingHasSufficientBalanceUsd: boolean;
    hasSufficientBalanceUsdError: Error | null;
};
export type GetAccountTotalBalanceUsdParams = {
    account: string;
    indexerGatewayClient: SequenceIndexerGateway;
    apiClient: SequenceAPIClient;
};
export declare function getAccountTotalBalanceUsd({ account, indexerGatewayClient, apiClient, }: GetAccountTotalBalanceUsdParams): Promise<number>;
export declare function useAccountTotalBalanceUsd(account: string): {
    totalBalanceUsd: number;
    isLoadingTotalBalanceUsd: boolean;
    totalBalanceUsdFormatted: string;
};
//# sourceMappingURL=tokenBalances.d.ts.map