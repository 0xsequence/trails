export type TransactionStateStatus = "pending" | "failed" | "confirmed";
export type TransactionState = {
    transactionHash: string;
    explorerUrl: string;
    blockNumber?: number;
    chainId: number;
    state: TransactionStateStatus;
    label: string;
};
export declare function getTxTimeDiff(firstTx?: TransactionState, lastTx?: TransactionState): Promise<number>;
//# sourceMappingURL=transactions.d.ts.map