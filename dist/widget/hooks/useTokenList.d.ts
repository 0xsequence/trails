import type { SequenceIndexerGateway } from "@0xsequence/indexer";
import type { TokenBalanceExtended } from "../../tokenBalances.js";
export interface Token {
    id: number;
    name: string;
    symbol: string;
    balance: string;
    imageUrl: string;
    chainId: number;
    contractAddress: string;
    balanceUsdFormatted: string;
    tokenPriceUsd: number;
    contractInfo?: {
        decimals: number;
        symbol: string;
        name: string;
    };
}
export type TokenFormatted = Token & TokenBalanceExtended & {
    balanceFormatted: string;
    tokenPriceUsd: number;
    balanceUsdFormatted: string;
    isNative: boolean;
    tokenName: string;
    priceUsd: number;
    isSufficientBalance: boolean;
    chainName: string;
};
export type UseTokenListProps = {
    onContinue: (selectedToken: Token) => void;
    targetAmountUsd?: number | null;
    indexerGatewayClient: SequenceIndexerGateway;
    onError: (error: Error | string | null) => void;
};
export type UseTokenListReturn = {
    selectedToken: Token | null;
    searchQuery: string;
    handleTokenSelect: (token: TokenFormatted) => void;
    filteredTokens: TokenBalanceExtended[];
    isLoadingSortedTokens: boolean;
    balanceError: Error | null;
    showContinueButton: boolean;
    isTokenSelected: (token: TokenBalanceExtended) => boolean;
    setSearchQuery: (query: string) => void;
    filteredTokensFormatted: TokenFormatted[];
    totalBalanceUsd: number;
    totalBalanceUsdFormatted: string;
    isLoadingTotalBalanceUsd: boolean;
    showInsufficientBalance: boolean;
};
export declare function useTokenList({ onContinue, targetAmountUsd, indexerGatewayClient, onError, }: UseTokenListProps): UseTokenListReturn;
//# sourceMappingURL=useTokenList.d.ts.map