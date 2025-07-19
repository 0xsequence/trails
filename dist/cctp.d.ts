import type { Chain, PublicClient, WalletClient } from "viem";
export type Attestation = {
    attestation: `0x${string}`;
    message: `0x${string}`;
};
export declare function getDomain(chainId: number): number | null;
export declare function getTokenAddress(chainId: number): string | null;
export declare function getTokenMessenger(chainId: number): string | null;
export declare function getMessageTransmitter(chainId: number): string | null;
export declare function cctpTransfer({ walletClient, originChain, destinationChain, amount, }: {
    walletClient: WalletClient;
    originChain: Chain;
    destinationChain: Chain;
    amount: bigint;
}): Promise<{
    attestation: Attestation;
    txHash: `0x${string}`;
}>;
export declare function cctpDestinationTx({ relayerClient, destinationChain, attestation, }: {
    relayerClient: WalletClient;
    destinationChain: Chain;
    attestation: Attestation;
}): Promise<`0x${string}`>;
export declare function getMaxFee(): bigint;
export declare function getNeedsApproval({ publicClient, token, account, spender, amount, }: {
    publicClient: PublicClient;
    token: string;
    account: string;
    spender: string;
    amount: bigint;
}): Promise<boolean>;
export declare function approveUSDC({ walletClient, tokenAddress, spender, amount, chain, }: {
    walletClient: WalletClient;
    tokenAddress: string;
    spender: string;
    amount: bigint;
    chain: Chain;
}): Promise<`0x${string}`>;
export declare function burnUSDC({ walletClient, tokenMessenger, destinationDomain, destinationAddress, amount, burnToken, maxFee, chain, }: {
    walletClient: WalletClient;
    tokenMessenger: string;
    destinationDomain: number;
    destinationAddress: string;
    amount: bigint;
    burnToken: string;
    maxFee: bigint;
    chain: Chain;
}): Promise<`0x${string}`>;
export declare function getBurnUSDCData({ tokenMessenger, destinationDomain, destinationAddress, amount, burnToken, maxFee, }: {
    tokenMessenger: string;
    destinationDomain: number;
    destinationAddress: string;
    amount: bigint;
    burnToken: string;
    maxFee: bigint;
}): Promise<{
    to: `0x${string}`;
    data: `0x${string}`;
    value: bigint;
}>;
export declare function retrieveAttestation({ domain, transactionHash, }: {
    domain: number;
    transactionHash: `0x${string}`;
}): Promise<Attestation | null>;
export declare function mintUSDC({ walletClient, tokenMessenger, attestation, chain, }: {
    walletClient: WalletClient;
    tokenMessenger: string;
    attestation: Attestation;
    chain: Chain;
}): Promise<`0x${string}`>;
export declare function getMintUSDCData({ tokenMessenger, attestation, }: {
    tokenMessenger: string;
    attestation: Attestation;
}): Promise<{
    to: `0x${string}`;
    data: `0x${string}`;
    value: bigint;
}>;
export declare function waitForAttestation({ domain, transactionHash, }: {
    domain: number;
    transactionHash: `0x${string}`;
}): Promise<Attestation | null>;
export declare function getIsUsdcAddress(address: string, chainId: number): boolean;
//# sourceMappingURL=cctp.d.ts.map