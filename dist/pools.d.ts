export declare function getAaveV3WrappedTokenGatewayAddress(chainId: number): string | null;
export interface Pool {
    id: string;
    name: string;
    protocol: string;
    chainId: number;
    apy: number;
    tvl: number;
    token: {
        symbol: string;
        name: string;
        address: string;
        decimals: number;
        logoUrl?: string;
    };
    depositAddress: string;
    isActive: boolean;
    poolUrl?: string;
    protocolUrl?: string;
    wrappedTokenGatewayAddress?: string;
}
export declare function usePools(): {
    data: Pool[];
    loading: boolean;
    error: undefined;
};
//# sourceMappingURL=pools.d.ts.map