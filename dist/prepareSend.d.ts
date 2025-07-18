import type { SequenceAPIClient } from "@0xsequence/trails-api";
import type { MetaTxnReceipt } from "@0xsequence/trails-relayer";
import type { Relayer } from "@0xsequence/wallet-core";
import type { Account, Chain, PublicClient, TransactionReceipt, WalletClient } from "viem";
import type { RelayerEnvConfig } from "./relayer.js";
type TransactionStateStatus = "pending" | "failed" | "confirmed";
export type TransactionState = {
    transactionHash: string;
    explorerUrl: string;
    chainId: number;
    state: TransactionStateStatus;
    label: string;
};
export type SendOptions = {
    account: Account;
    originTokenAddress: string;
    originChainId: number;
    originTokenAmount: string;
    destinationChainId: number;
    recipient: string;
    destinationTokenAddress: string;
    destinationTokenAmount: string;
    destinationTokenSymbol: string;
    sequenceProjectAccessKey: string;
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
    relayerConfig: RelayerEnvConfig;
};
export type PrepareSendReturn = {
    intentAddress?: string;
    originSendAmount: string;
    send: (onOriginSend?: () => void) => Promise<SendReturn>;
};
export type SendReturn = {
    originUserTxReceipt: TransactionReceipt | null;
    originMetaTxnReceipt: MetaTxnReceipt | null;
    destinationMetaTxnReceipt: MetaTxnReceipt | null;
};
export declare function getIsToSameChain(originChainId: number, destinationChainId: number): boolean;
export declare function getIsToSameToken(originTokenAddress: string, destinationTokenAddress: string): boolean;
export declare function getIsToSameChainAndToken(originChainId: number, originTokenAddress: string, destinationChainId: number, destinationTokenAddress: string): boolean;
export declare function getUseCctp(originTokenAddress: string, destinationTokenAddress: string, originChainId: number, destinationChainId: number): boolean;
export declare function prepareSend(options: SendOptions): Promise<PrepareSendReturn>;
export declare function attemptNonGaslessUserDeposit({ originTokenAddress, firstPreconditionMin, onOriginSend, publicClient, walletClient, originChainId, chain, account, fee, dryMode, sourceTokenPriceUsd, destinationTokenPriceUsd, destinationTokenAmount, destinationTokenDecimals, sourceTokenDecimals, intentAddress, }: {
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
    destinationTokenAmount: string;
    destinationTokenDecimals: number;
    sourceTokenDecimals: number;
    intentAddress: string;
}): Promise<TransactionReceipt | null>;
export declare function getDoGasless(originTokenAddress: string, gasless: boolean, paymasterUrl?: string): boolean;
export type UseQuoteProps = {
    walletClient?: WalletClient;
    fromTokenAddress?: string;
    fromChainId?: number;
    toTokenAddress?: string;
    toChainId?: number;
    toAmount?: string | bigint;
    toRecipient?: string;
};
export declare function useQuote({ walletClient, fromTokenAddress, fromChainId, toTokenAddress, toChainId, toAmount, toRecipient, }?: UseQuoteProps): {
    quote: {
        fromAmount: string;
    } | null;
    swap: (() => Promise<{
        originTransaction: {
            transactionHash: string | undefined;
            receipt: TransactionReceipt | MetaTxnReceipt | null;
        };
        destinationTransaction: {
            transactionHash: string | undefined;
            receipt: MetaTxnReceipt | null;
        };
    } | null>) | null;
    isLoadingQuote: boolean;
    quoteError: unknown;
};
export {};
//# sourceMappingURL=prepareSend.d.ts.map