import type { WalletClient } from "viem";
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
    quote: any;
    wallet: WalletClient;
    onProgress?: (data: any) => void;
}
/**
 * Get a quote for a relay transaction
 */
export declare function getRelaySDKQuote(options: RelayQuoteOptions): Promise<import("@reservoir0x/relay-sdk").Execute>;
/**
 * Execute a relay transaction
 */
export declare function relaySDKExecute(options: RelayExecuteOptions): Promise<{
    data: import("@reservoir0x/relay-sdk").Execute;
    abortController: AbortController;
}>;
/**
 * Helper function to create a simple relay transaction for a contract call
 */
export declare function createSimpleRelayTransaction(wallet: WalletClient, contractAddress: string, callData: string, value: string, chainId: number, currency?: string): Promise<import("@reservoir0x/relay-sdk").Execute>;
/**
 * Helper function to execute a simple relay transaction
 */
export declare function executeSimpleRelayTransaction(quote: any, wallet: WalletClient, onProgress?: RelayExecuteOptions["onProgress"]): Promise<{
    data: import("@reservoir0x/relay-sdk").Execute;
    abortController: AbortController;
}>;
export declare function getTxHashFromRelayResult(result: any): any;
//# sourceMappingURL=relaysdk.d.ts.map