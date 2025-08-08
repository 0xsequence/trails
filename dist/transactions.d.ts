export type TransactionStateStatus = "pending" | "failed" | "confirmed";
export type TransactionState = {
    transactionHash: string;
    explorerUrl: string;
    blockNumber?: number;
    chainId: number;
    state: TransactionStateStatus;
    label: string;
};
export type TransferType = "SEND" | "RECEIVE";
export type ContractType = "ERC20" | "ERC721" | "ERC1155" | "NATIVE";
export type ContractInfo = {
    chainId: number;
    address: string;
    source: string;
    name: string;
    type: ContractType;
    symbol: string;
    decimals: number;
    logoURI: string;
    deployed: boolean;
    bytecodeHash: string;
    extensions: {
        link: string;
        description: string;
        ogImage: string;
        ogName: string;
        originChainId: number;
        originAddress: string;
        verified: boolean;
        verifiedBy: string;
    };
    updatedAt: string;
    queuedAt: string;
    status: string;
};
export type Transfer = {
    transferType: TransferType;
    contractAddress: string;
    contractType: ContractType;
    from: string;
    to: string;
    tokenIds: string[];
    amounts: string[];
    logIndex: number;
    contractInfo: ContractInfo;
};
export type TransactionHistoryItem = {
    txnHash: string;
    blockNumber: number;
    blockHash: string;
    chainId: number;
    metaTxnID: string | null;
    transfers: Transfer[];
    timestamp: string;
};
export type TransactionHistoryResponse = {
    page: {
        column: string;
        pageSize: number;
        more: boolean;
    };
    transactions: TransactionHistoryItem[];
};
export type GetAccountTransactionHistoryParams = {
    chainId: number;
    accountAddress: string;
    pageSize?: number;
    includeMetadata?: boolean;
};
export declare function getTxTimeDiff(firstTx?: TransactionState, lastTx?: TransactionState): Promise<number>;
export declare function getAccountTransactionHistory({ chainId, accountAddress, pageSize, includeMetadata, }: GetAccountTransactionHistoryParams): Promise<TransactionHistoryResponse>;
//# sourceMappingURL=transactions.d.ts.map