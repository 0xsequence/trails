import type { Chain, PublicClient, WalletClient } from "viem";
export declare function getPermitCalldata(connectedAccount: `0x${string}`, spender: `0x${string}`, amount: bigint, deadline: bigint, signature: `0x${string}`): `0x${string}`;
export declare function getTransferFromCalldata(connectedAccount: `0x${string}`, spender: `0x${string}`, amount: bigint): `0x${string}`;
export declare function getTransferCalldata(recipient: `0x${string}`, amount: bigint): `0x${string}`;
export declare function getPermitCalls(connectedAccount: `0x${string}`, delegatorSmartAccountAddress: `0x${string}`, amount: bigint, deadline: bigint, signature: `0x${string}`, recipient: `0x${string}`, tokenAddress: `0x${string}`): {
    to: `0x${string}`;
    data: `0x${string}`;
    value: string;
}[];
export declare function getPermitSignature(publicClient: PublicClient, walletClient: WalletClient, connectedAccount: `0x${string}`, delegatorSmartAccountAddress: `0x${string}`, tokenAddress: `0x${string}`, amount: bigint, chain: Chain): Promise<{
    signature: `0x${string}`;
    deadline: bigint;
}>;
//# sourceMappingURL=gasless.d.ts.map