import type { GetIntentCallsPayloadsReturn, SequenceAPIClient } from "@0xsequence/trails-api";
import type { MetaTxnReceipt } from "@0xsequence/trails-relayer";
import type { Relayer } from "@0xsequence/wallet-core";
import type { Account, Chain, PublicClient, TransactionReceipt, WalletClient } from "viem";
import { type RelayQuote } from "./relaySdk.js";
import { type SupportedToken } from "./tokens.js";
import type { TransactionState } from "./transactions.js";
export declare enum TradeType {
    EXACT_INPUT = "EXACT_INPUT",
    EXACT_OUTPUT = "EXACT_OUTPUT"
}
export type PrepareSendOptions = {
    account: Account;
    originTokenAddress: string;
    originChainId: number;
    originTokenBalance: string;
    destinationChainId: number;
    recipient: string;
    destinationTokenAddress: string;
    swapAmount: string;
    tradeType?: TradeType;
    destinationTokenSymbol: string;
    sequenceProjectAccessKey?: string;
    fee: string;
    client?: WalletClient;
    dryMode: boolean;
    apiClient: SequenceAPIClient;
    originRelayer: Relayer.Standard.Rpc.RpcRelayer;
    destinationRelayer: Relayer.Standard.Rpc.RpcRelayer;
    destinationCalldata?: string;
    onTransactionStateChange: (transactionStates: TransactionState[]) => void;
    sourceTokenPriceUsd?: number | null;
    destinationTokenPriceUsd?: number | null;
    sourceTokenDecimals: number;
    destinationTokenDecimals: number;
    paymasterUrl?: string;
    gasless?: boolean;
    slippageTolerance?: string;
    originNativeTokenPriceUsd?: number | null;
    quoteProvider?: string | null;
    fundMethod?: string | null;
};
export type PrepareSendFees = {
    feeTokenAddress: string | null;
    totalFeeAmount: string | null;
    totalFeeAmountUsd: string | null;
    totalFeeAmountUsdDisplay: string | null;
};
export type PrepareSendQuote = {
    originAddress: string;
    destinationAddress: string;
    destinationCalldata: string;
    originChain: Chain;
    destinationChain: Chain;
    originAmount: string;
    originAmountDisplay: string;
    originAmountMin: string;
    originAmountMinDisplay: string;
    originAmountMinUsdFormatted: string;
    originAmountMinUsdDisplay: string;
    destinationAmount: string;
    destinationAmountDisplay: string;
    destinationAmountMin: string;
    destinationAmountMinDisplay: string;
    destinationAmountMinUsdFormatted: string;
    destinationAmountMinUsdDisplay: string;
    originAmountFormatted: string;
    originAmountUsdFormatted: string;
    originAmountUsdDisplay: string;
    destinationAmountFormatted: string;
    destinationAmountUsdFormatted: string;
    destinationAmountUsdDisplay: string;
    originToken: SupportedToken;
    destinationToken: SupportedToken;
    fees: PrepareSendFees;
    slippageTolerance: string;
    priceImpact: string;
    priceImpactUsdDisplay: string;
    completionEstimateSeconds: number;
    transactionStates: TransactionState[];
    gasCostUsd: number;
    gasCostUsdDisplay: string;
    originTokenRate: string;
    destinationTokenRate: string;
    quoteProvider: QuoteProviderInfo | null;
};
export type PrepareSendReturn = {
    quote: PrepareSendQuote;
    send: (onOriginSend?: () => void) => Promise<SendReturn>;
};
export type SendReturn = {
    originUserTxReceipt: TransactionReceipt | null;
    originMetaTxnReceipt: MetaTxnReceipt | null;
    destinationMetaTxnReceipt: MetaTxnReceipt | null;
    totalCompletionSeconds?: number;
};
export declare function getIsToSameChain(originChainId: number, destinationChainId: number): boolean;
export declare function getIsToSameToken(originTokenAddress: string, destinationTokenAddress: string): boolean;
export declare function getIsToSameChainAndToken(originChainId: number, originTokenAddress: string, destinationChainId: number, destinationTokenAddress: string): boolean;
export declare function getUseCctp(originTokenAddress: string, destinationTokenAddress: string, originChainId: number, destinationChainId: number): boolean;
export declare function prepareSend(options: PrepareSendOptions): Promise<PrepareSendReturn>;
export declare function attemptNonGaslessUserDeposit({ originTokenAddress, firstPreconditionMin, onOriginSend, publicClient, walletClient, originChainId, chain, account, fee, dryMode, sourceTokenPriceUsd, destinationTokenPriceUsd, swapAmount, destinationTokenDecimals, sourceTokenDecimals, intentAddress, onTransactionStateChange, transactionStates, }: {
    originTokenAddress: string;
    firstPreconditionMin: string;
    onOriginSend?: () => void;
    publicClient: PublicClient;
    walletClient: WalletClient;
    originChainId: number;
    chain: Chain;
    account: Account;
    fee: string;
    dryMode: boolean;
    sourceTokenPriceUsd?: number | null;
    destinationTokenPriceUsd?: number | null;
    swapAmount: string;
    destinationTokenDecimals: number;
    sourceTokenDecimals: number;
    intentAddress: string;
    onTransactionStateChange: (transactionStates: TransactionState[]) => void;
    transactionStates: TransactionState[];
}): Promise<TransactionReceipt | null>;
export declare function getDoGasless(originTokenAddress: string, gasless: boolean, paymasterUrl?: string): boolean;
export type UseQuoteProps = {
    walletClient?: any;
    fromTokenAddress?: string | null;
    fromChainId?: number | null;
    toTokenAddress?: string | null;
    toChainId?: number | null;
    swapAmount?: string | bigint;
    toRecipient?: string | null;
    tradeType?: TradeType | null;
    slippageTolerance?: string | number | null;
    onStatusUpdate?: ((transactionStates: TransactionState[]) => void) | null;
};
export type SwapReturn = {
    originTransaction: {
        transactionHash?: string | null;
        explorerUrl?: string | null;
        receipt: TransactionReceipt | MetaTxnReceipt | null;
    };
    destinationTransaction: {
        transactionHash?: string | null;
        explorerUrl?: string | null;
        receipt: MetaTxnReceipt | null;
    };
    totalCompletionSeconds?: number;
};
export type QuoteProviderInfo = {
    id: string;
    name: string;
    url: string;
};
export type UseQuoteReturn = {
    quote: {
        fromAmount: string;
        fromAmountMin: string;
        toAmount: string;
        toAmountMin: string;
        originToken: SupportedToken;
        destinationToken: SupportedToken;
        originChain: Chain;
        destinationChain: Chain;
        fees: PrepareSendFees;
        slippageTolerance: string;
        priceImpact: string;
        completionEstimateSeconds: number;
        transactionStates?: TransactionState[];
        originTokenRate?: string;
        quoteProvider?: QuoteProviderInfo | null;
        destinationTokenRate?: string;
    } | null;
    swap: (() => Promise<SwapReturn | null>) | null;
    isLoadingQuote: boolean;
    quoteError: unknown;
};
export declare function useQuote({ walletClient, fromTokenAddress, fromChainId, toTokenAddress, toChainId, swapAmount, tradeType, toRecipient, slippageTolerance, onStatusUpdate, }?: Partial<UseQuoteProps>): UseQuoteReturn;
export declare function getFeesFromIntent(intent: GetIntentCallsPayloadsReturn, { tradeType, fromAmountUsd, toAmountUsd, }: {
    tradeType: TradeType;
    fromAmountUsd: number;
    toAmountUsd: number;
}): PrepareSendFees;
export declare function getSlippageToleranceFromIntent(intent: GetIntentCallsPayloadsReturn): string;
export declare function getPriceImpactFromIntent(intent: GetIntentCallsPayloadsReturn): string;
export declare function getPriceImpactUsdFromIntent(intent: GetIntentCallsPayloadsReturn): string;
export declare function getFeesFromRelaySdkQuote(quote: RelayQuote): PrepareSendFees;
export declare function getSlippageToleranceFromRelaySdkQuote(quote: RelayQuote): string;
export declare function getPriceImpactFromRelaySdkQuote(quote: RelayQuote): string;
export declare function getPriceImpactUsdFromRelaySdkQuote(quote: RelayQuote): string;
export declare function getZeroFees(): PrepareSendFees;
export declare function getCompletionEstimateSeconds({ originChainId, destinationChainId, }: {
    originChainId: number;
    destinationChainId: number;
}): number;
export declare function getIsCustomCalldata(calldata: string | undefined): boolean;
export declare function getNormalizedQuoteObject({ originAddress, destinationAddress, destinationCalldata, originChainId, destinationChainId, originAmount, originAmountMin, destinationAmount, destinationAmountMin, originTokenAddress, destinationTokenAddress, originTokenPriceUsd, destinationTokenPriceUsd, transactionStates, fees, slippageTolerance, priceImpact, priceImpactUsd, originNativeTokenPriceUsd, quoteProvider, }: {
    originAddress?: string;
    destinationAddress?: string;
    destinationCalldata?: string;
    originChainId: number;
    destinationChainId?: number;
    originAmount: string;
    originAmountMin?: string;
    destinationAmount: string;
    destinationAmountMin?: string;
    originTokenAddress: string;
    destinationTokenAddress?: string;
    originTokenPriceUsd?: string | null;
    destinationTokenPriceUsd?: string | null;
    transactionStates?: TransactionState[];
    fees?: PrepareSendFees;
    slippageTolerance?: string;
    priceImpact?: string;
    priceImpactUsd?: string;
    originNativeTokenPriceUsd?: number | null;
    quoteProvider?: string;
}): Promise<PrepareSendQuote>;
//# sourceMappingURL=prepareSend.d.ts.map