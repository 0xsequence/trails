import type { SequenceAPIClient } from "@0xsequence/trails-api";
type CctpQueueCapable = {
    queueCCTPTransfer: (args: {
        sourceTxHash?: string;
        metaTxHash?: string;
        sourceChainId: number;
        destinationChainId: number;
    }, headers?: object, signal?: AbortSignal) => Promise<unknown>;
};
export declare function hasCctpQueue(client: unknown): client is CctpQueueCapable;
export declare function queueCCTPTransfer({ apiClient, sourceTxHash, sourceChainId, destinationChainId, }: {
    apiClient: SequenceAPIClient;
    sourceTxHash: string;
    sourceChainId: number;
    destinationChainId: number;
}): Promise<void>;
export {};
//# sourceMappingURL=cctpqueue.d.ts.map