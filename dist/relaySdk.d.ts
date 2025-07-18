import type { WalletClient } from "viem";
export type Chain = any;
export type RelayQuote = any;
export type RelayExecuteResult = any;
export type RelayProgressData = any;
export interface RelayQuoteOptions {
    wallet: WalletClient;
    chainId: number;
    toChainId?: number;
    amount: string;
    currency: string;
    toCurrency?: string;
    tradeType?: "EXACT_INPUT" | "EXACT_OUTPUT";
    txs: Array<{
        to: string;
        value: string;
        data: string;
    }>;
    recipient?: string;
}
export interface RelayExecuteOptions {
    quote: RelayQuote;
    wallet: WalletClient;
    onProgress?: (data: RelayProgressData) => void;
}
/**
 * Get a quote for a relay transaction
 */
export declare function getRelaySDKQuote(options: RelayQuoteOptions): Promise<RelayQuote>;
/**
 * Execute a relay transaction
 */
export declare function relaySDKExecute(options: RelayExecuteOptions): Promise<RelayExecuteResult>;
/**
 * Helper function to create a simple relay transaction for a contract call
 */
export declare function createSimpleRelayTransaction(wallet: WalletClient, contractAddress: string, callData: string, value: string, chainId: number, currency?: string): Promise<RelayQuote>;
/**
 * Helper function to execute a simple relay transaction
 */
export declare function executeSimpleRelayTransaction(quote: RelayQuote, wallet: WalletClient, onProgress?: RelayExecuteOptions["onProgress"]): Promise<RelayExecuteResult>;
export declare function getTxHashFromRelayResult(result: RelayExecuteResult): string;
export declare const relaySupportedChains: Record<number, Chain>;
export declare function getRelaySupportedChains(): Promise<Chain[]>;
export declare function isChainSupported(chainId: number): Promise<boolean>;
export interface RelayToken {
    id: string;
    symbol: string;
    name: string;
    contractAddress: string;
    decimals: number;
    chainId: number;
    chainName: string;
    imageUrl: string;
}
export declare function getRelaySupportedTokens(): Promise<RelayToken[]>;
export type GetIsRouteSupportedOptions = {
    originChainId: number;
    destinationChainId: number;
    amount: string;
    originToken: string;
    destinationToken: string;
};
export declare function getIsRouteSupported({ originChainId, destinationChainId, amount, originToken, destinationToken, }: GetIsRouteSupportedOptions): Promise<boolean>;
//# sourceMappingURL=relaySdk.d.ts.map