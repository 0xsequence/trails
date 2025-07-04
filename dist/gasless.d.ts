import type { Account, Address, Chain, Hex, PublicClient, WalletClient } from "viem";
export declare function splitSignature(signature: `0x${string}`): {
    r: `0x${string}`;
    s: `0x${string}`;
    v: number;
};
export declare function getPermitCalldata(connectedAccount: `0x${string}`, spender: `0x${string}`, amount: bigint, deadline: bigint, signature: `0x${string}`): `0x${string}`;
export declare function getTransferFromCalldata(connectedAccount: `0x${string}`, spender: `0x${string}`, amount: bigint): `0x${string}`;
export declare function getTransferCalldata(recipient: `0x${string}`, amount: bigint): `0x${string}`;
export declare function getPermitCalls(connectedAccount: `0x${string}`, delegatorSmartAccountAddress: `0x${string}`, amount: bigint, deadline: bigint, signature: `0x${string}`, recipient: `0x${string}`, tokenAddress: `0x${string}`): {
    to: `0x${string}`;
    data: `0x${string}`;
    value: string;
}[];
export declare function getPermitSignature(publicClient: PublicClient, walletClient: WalletClient, connectedAccount: `0x${string}`, delegatorSmartAccountAddress: `0x${string}`, tokenAddress: `0x${string}`, amount: bigint, chain: Chain, deadline?: bigint): Promise<{
    signature: `0x${string}`;
    deadline: bigint;
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
}>;
export declare function getDepositToIntentWithPermitCalldata(params: {
    user: `0x${string}`;
    token: `0x${string}`;
    amount: bigint;
    intentAddress: `0x${string}`;
    deadline: bigint;
    permitAmount: bigint;
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
    sigV: number;
    sigR: `0x${string}`;
    sigS: `0x${string}`;
}): Hex;
export declare function getDepositToIntentWithoutPermitCalldata(params: {
    user: `0x${string}`;
    token: `0x${string}`;
    amount: bigint;
    intentAddress: `0x${string}`;
    deadline: bigint;
    sigV: number;
    sigR: `0x${string}`;
    sigS: `0x${string}`;
}): Hex;
export declare function getDepositToIntentCalls({ publicClient, walletClient, account, intentEntrypoint, depositTokenAddress, depositTokenAmount, depositRecipient, chain, }: {
    publicClient: PublicClient;
    walletClient: WalletClient;
    account: Account;
    intentEntrypoint: `0x${string}`;
    depositTokenAddress: `0x${string}`;
    depositTokenAmount: bigint;
    depositRecipient: `0x${string}`;
    chain: Chain;
}): Promise<Array<{
    to: `0x${string}`;
    data: `0x${string}`;
    value: `0x${string}`;
}>>;
export declare function getNeedsIntentEntrypointApproval({ client, token, account, entrypoint, amount, }: {
    client: PublicClient;
    token: Address;
    account: Address;
    entrypoint: Address;
    amount: bigint;
}): Promise<boolean>;
export declare function signIntent(client: WalletClient, { user, token, amount, intentAddress, deadline, chainId, contractAddress, }: {
    user: `0x${string}`;
    token: `0x${string}`;
    amount: bigint;
    intentAddress: `0x${string}`;
    deadline: bigint;
    chainId: number;
    contractAddress: `0x${string}`;
}): Promise<{
    signature: `0x${string}`;
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
}>;
//# sourceMappingURL=gasless.d.ts.map