export type ExplorerUrlParams = {
    txHash: string;
    chainId: number;
};
export type ExplorerUrlForAddressParams = {
    address: string;
    chainId: number;
};
export declare function getBaseExplorerUrl(chainId: number): string;
export declare function getExplorerUrl({ txHash, chainId }: ExplorerUrlParams): string;
export declare function getExplorerUrlForAddress({ address, chainId, }: ExplorerUrlForAddressParams): string;
//# sourceMappingURL=explorer.d.ts.map