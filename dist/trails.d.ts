import type { AddressOverrides, GetIntentCallsPayloadsArgs, GetIntentConfigReturn, IntentCallsPayload, IntentPrecondition } from "@0xsequence/trails-api";
import type { SequenceAPIClient } from "@0xsequence/trails-api";
import type { Relayer } from "@0xsequence/wallet-core";
import type { Hex } from "viem";
import type { Connector } from "wagmi";
import type { GetIntentCallsPayloadsReturn, OriginCallParams, TrailsFee } from "./intents.js";
import { calculateIntentAddress, calculateOriginAndDestinationIntentAddresses } from "./intents.js";
export type WagmiAccount = {
    address: `0x${string}`;
    isConnected: boolean;
    chainId: number;
    connector?: Connector;
};
export type UseTrailsConfig = {
    account: WagmiAccount;
    disableAutoExecute?: boolean;
    env: "local" | "cors-anywhere" | "dev" | "prod";
    useV3Relayers?: boolean;
    sequenceProjectAccessKey?: string;
};
export type UseTrailsReturn = {
    apiClient: SequenceAPIClient;
    metaTxns: GetIntentCallsPayloadsReturn["metaTxns"] | null;
    intentCallsPayloads: GetIntentCallsPayloadsReturn["calls"] | null;
    intentPreconditions: GetIntentCallsPayloadsReturn["preconditions"] | null;
    trailsFee: TrailsFee | null;
    txnHash: Hex | undefined;
    committedOriginIntentAddress: string | null;
    committedDestinationIntentAddress: string | null;
    verificationStatus: {
        success: boolean;
        calculatedOriginAddress?: string;
        calculatedDestinationAddress?: string;
        receivedOriginAddress?: string;
        receivedDestinationAddress?: string;
    } | null;
    getRelayer: (chainId: number) => any;
    estimatedGas: bigint | undefined;
    isEstimateError: boolean;
    estimateError: Error | null;
    calculateIntentAddress: typeof calculateIntentAddress;
    calculateOriginAndDestinationIntentAddresses: typeof calculateOriginAndDestinationIntentAddresses;
    committedIntentConfig: GetIntentConfigReturn | undefined;
    isLoadingCommittedConfig: boolean;
    committedConfigError: Error | null;
    commitIntentConfig: (args: {
        mainSignerAddress: string;
        calls: IntentCallsPayload[];
        preconditions: IntentPrecondition[];
        quoteProvider: "lifi" | "relay" | "cctp";
        addressOverrides?: AddressOverrides;
    }) => void;
    commitIntentConfigPending: boolean;
    commitIntentConfigSuccess: boolean;
    commitIntentConfigError: Error | null;
    commitIntentConfigArgs: {
        mainSignerAddress: string;
        calls: IntentCallsPayload[];
        preconditions: IntentPrecondition[];
        quoteProvider: "lifi" | "relay" | "cctp";
        addressOverrides?: AddressOverrides;
    } | undefined;
    getIntentCallsPayloads: (args: GetIntentCallsPayloadsArgs) => Promise<GetIntentCallsPayloadsReturn>;
    operationHashes: {
        [key: string]: Hex;
    };
    callIntentCallsPayload: (args: GetIntentCallsPayloadsArgs) => void;
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
    originCallSuccess: boolean;
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
    createIntent: (args: GetIntentCallsPayloadsArgs) => void;
    createIntentPending: boolean;
    createIntentSuccess: boolean;
    createIntentError: Error | null;
    createIntentArgs: GetIntentCallsPayloadsArgs | undefined;
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
    originIntentAddress: string | null;
    destinationIntentAddress: string | null;
};
export declare function useTrails(config: UseTrailsConfig): UseTrailsReturn;
//# sourceMappingURL=trails.d.ts.map