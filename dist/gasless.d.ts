import type { Account, Address, Chain, Hex, PublicClient, WalletClient } from "viem";
export declare function splitSignature(signature: `0x${string}`): {
    r: `0x${string}`;
    s: `0x${string}`;
    v: number;
};
export type PermitCalldataParams = {
    signer: `0x${string}`;
    spender: `0x${string}`;
    amount: bigint;
    deadline: bigint;
    signature: `0x${string}`;
};
export declare function getPermitCalldata({ signer, spender, amount, deadline, signature, }: PermitCalldataParams): Hex;
export type TransferFromCalldataParams = {
    signer: `0x${string}`;
    spender: `0x${string}`;
    amount: bigint;
};
export declare function getTransferFromCalldata({ signer, spender, amount, }: TransferFromCalldataParams): Hex;
export type TransferCalldataParams = {
    recipient: `0x${string}`;
    amount: bigint;
};
export declare function getTransferCalldata({ recipient, amount, }: TransferCalldataParams): Hex;
export declare function getPermitCalls(connectedAccount: `0x${string}`, delegatorSmartAccountAddress: `0x${string}`, amount: bigint, deadline: bigint, signature: `0x${string}`, recipient: `0x${string}`, tokenAddress: `0x${string}`): {
    to: `0x${string}`;
    data: `0x${string}`;
    value: string;
}[];
export type GetPermitSignatureParams = {
    publicClient: PublicClient;
    walletClient: WalletClient;
    signer: `0x${string}`;
    spender: `0x${string}`;
    tokenAddress: `0x${string}`;
    amount: bigint;
    chain: Chain;
    deadline?: bigint;
};
export declare function getPermitSignature({ publicClient, walletClient, signer, spender, tokenAddress, amount, chain, deadline, }: GetPermitSignatureParams): Promise<{
    signature: `0x${string}`;
    deadline: bigint;
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
}>;
export type GetDepositToIntentWithPermitCalldataParams = {
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
};
export declare function getDepositToIntentWithPermitCalldata({ user, token, amount, intentAddress, deadline, permitAmount, v, r, s, sigV, sigR, sigS, }: GetDepositToIntentWithPermitCalldataParams): Hex;
export type GetDepositToIntentWithoutPermitCalldataParams = {
    user: `0x${string}`;
    token: `0x${string}`;
    amount: bigint;
    intentAddress: `0x${string}`;
    deadline: bigint;
    sigV: number;
    sigR: `0x${string}`;
    sigS: `0x${string}`;
};
export declare function getDepositToIntentWithoutPermitCalldata({ user, token, amount, intentAddress, deadline, sigV, sigR, sigS, }: GetDepositToIntentWithoutPermitCalldataParams): Hex;
export type GetDepositToIntentCallsParams = {
    publicClient: PublicClient;
    walletClient: WalletClient;
    account: Account;
    intentEntrypoint: `0x${string}`;
    depositTokenAddress: `0x${string}`;
    depositTokenAmount: bigint;
    depositRecipient: `0x${string}`;
    chain: Chain;
};
export declare function getDepositToIntentCalls({ publicClient, walletClient, account, intentEntrypoint, depositTokenAddress, depositTokenAmount, depositRecipient, chain, }: GetDepositToIntentCallsParams): Promise<Array<{
    to: `0x${string}`;
    data: `0x${string}`;
    value: `0x${string}`;
}>>;
export type GetNeedsIntentEntrypointApprovalParams = {
    client: PublicClient;
    token: Address;
    account: Address;
    entrypoint: Address;
    amount: bigint;
};
export declare function getNeedsIntentEntrypointApproval({ client, token, account, entrypoint, amount, }: GetNeedsIntentEntrypointApprovalParams): Promise<boolean>;
export type IntentParams = {
    user: `0x${string}`;
    token: `0x${string}`;
    amount: bigint;
    intentAddress: `0x${string}`;
    deadline: bigint;
    chainId: number;
    contractAddress: `0x${string}`;
};
export type SignIntentParams = {
    client: WalletClient;
    intentParams: IntentParams;
};
export declare function signIntent({ client, intentParams, }: SignIntentParams): Promise<{
    signature: `0x${string}`;
    v: number;
    r: `0x${string}`;
    s: `0x${string}`;
}>;
//# sourceMappingURL=gasless.d.ts.map