import type { AnypayExecutionInfo, GetIntentCallsPayloadsArgs, GetIntentConfigReturn, IntentCallsPayload, IntentPrecondition, SequenceAPIClient } from "@0xsequence/anypay-api";
import type { Relayer } from "@0xsequence/wallet-core";
import type { Hex } from "viem";
import type { Connector } from "wagmi";
import type { AnypayFee, GetIntentCallsPayloadsReturn, OriginCallParams } from "./intents.js";
import { calculateIntentAddress } from "./intents.js";
export type WagmiAccount = {
    address: `0x${string}`;
    isConnected: boolean;
    chainId: number;
    connector?: Connector;
};
export type UseAnyPayConfig = {
    account: WagmiAccount;
    disableAutoExecute?: boolean;
    env: "local" | "cors-anywhere" | "dev" | "prod";
    useV3Relayers?: boolean;
    sequenceProjectAccessKey?: string;
};
export type UseAnyPayReturn = {
    apiClient: SequenceAPIClient;
    metaTxns: GetIntentCallsPayloadsReturn["metaTxns"] | null;
    intentCallsPayloads: GetIntentCallsPayloadsReturn["calls"] | null;
    intentPreconditions: GetIntentCallsPayloadsReturn["preconditions"] | null;
    anypayInfos: GetIntentCallsPayloadsReturn["anypayInfos"] | null;
    anypayFee: AnypayFee | null;
    txnHash: Hex | undefined;
    committedIntentAddress: string | null;
    verificationStatus: {
        success: boolean;
        receivedAddress?: string;
        calculatedAddress?: string;
    } | null;
    getRelayer: (chainId: number) => any;
    estimatedGas: bigint | undefined;
    isEstimateError: boolean;
    estimateError: Error | null;
    calculateIntentAddress: typeof calculateIntentAddress;
    committedIntentConfig: GetIntentConfigReturn | undefined;
    isLoadingCommittedConfig: boolean;
    committedConfigError: Error | null;
    commitIntentConfig: (args: {
        walletAddress: string;
        mainSignerAddress: string;
        calls: IntentCallsPayload[];
        preconditions: IntentPrecondition[];
        anypayInfos: AnypayExecutionInfo[];
        quoteProvider: "lifi" | "relay";
    }) => void;
    commitIntentConfigPending: boolean;
    commitIntentConfigSuccess: boolean;
    commitIntentConfigError: Error | null;
    commitIntentConfigArgs: {
        walletAddress: string;
        mainSignerAddress: string;
        calls: IntentCallsPayload[];
        preconditions: IntentPrecondition[];
        anypayInfos: AnypayExecutionInfo[];
        quoteProvider: "lifi" | "relay";
    } | undefined;
    getIntentCallsPayloads: (args: GetIntentCallsPayloadsArgs) => Promise<GetIntentCallsPayloadsReturn>;
    operationHashes: {
        [key: string]: Hex;
    };
    callIntentCallsPayload: (args: any) => void;
    sendOriginTransaction: () => Promise<void>;
    switchChain: any;
    isSwitchingChain: boolean;
    switchChainError: Error | null;
    isTransactionInProgress: boolean;
    isChainSwitchRequired: boolean;
    sendTransaction: any;
    isSendingTransaction: boolean;
    originCallStatus: {
        txnHash?: string;
        status?: string;
        revertReason?: string | null;
        gasUsed?: number;
        effectiveGasPrice?: string;
    } | null;
    updateOriginCallStatus: (hash: Hex | undefined, status: "success" | "reverted" | "pending" | "sending", gasUsed?: bigint, effectiveGasPrice?: bigint, revertReason?: string | null) => void;
    isEstimatingGas: boolean;
    isAutoExecute: boolean;
    updateAutoExecute: (enabled: boolean) => void;
    receipt: any;
    isWaitingForReceipt: boolean;
    receiptIsSuccess: boolean;
    receiptIsError: boolean;
    receiptError: Error | null;
    hasAutoExecuted: boolean;
    sentMetaTxns: {
        [key: string]: number;
    };
    sendMetaTxn: (selectedId: string | null) => void;
    sendMetaTxnPending: boolean;
    sendMetaTxnSuccess: boolean;
    sendMetaTxnError: Error | null;
    sendMetaTxnArgs: {
        selectedId: string | null;
    } | undefined;
    clearIntent: () => void;
    metaTxnMonitorStatuses: {
        [key: string]: Relayer.OperationStatus;
    };
    createIntent: (args: any) => void;
    createIntentPending: boolean;
    createIntentSuccess: boolean;
    createIntentError: Error | null;
    createIntentArgs: any;
    originCallParams: OriginCallParams | null;
    updateOriginCallParams: (args: {
        originChainId: number;
        tokenAddress: string;
    } | null) => void;
    originBlockTimestamp: number | null;
    metaTxnBlockTimestamps: {
        [key: string]: {
            timestamp: number | null;
            error?: string;
        };
    };
};
export declare function useAnyPay(config: UseAnyPayConfig): UseAnyPayReturn;
//# sourceMappingURL=anypay.d.ts.map