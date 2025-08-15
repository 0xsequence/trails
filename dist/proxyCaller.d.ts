export declare const TRAILS_CONTRACT_PLACEHOLDER_AMOUNT = 100720434726375746010458024839911619878118703404436202866098422983289408962287n;
export declare function getProxyCallerAddress(chainId: number): string | undefined;
export declare function encodeProxyCallerCalldata({ token, target, calldata, amountOffset, }: {
    token: string;
    target: string;
    calldata: `0x${string}`;
    amountOffset: number;
}): `0x${string}`;
export declare function wrapCalldataWithProxyCallerIfNeeded({ token, target, calldata, originChainId, destinationChainId, amount, originTokenAddress, destinationTokenAddress, }: {
    token: string;
    target: string;
    calldata: `0x${string}`;
    originChainId: number;
    destinationChainId: number;
    amount: string;
    originTokenAddress: string;
    destinationTokenAddress: string;
}): {
    encodedCalldata: `0x${string}`;
    proxyCallerAddress: string;
} | null;
//# sourceMappingURL=proxyCaller.d.ts.map