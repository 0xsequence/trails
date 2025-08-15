import type { Chain, PublicClient, WalletClient } from "viem";
export type Attestation = {
    attestation: `0x${string}`;
    message: `0x${string}`;
};
export declare function getDomain(chainId: number): number | null;
export declare function getUSDCTokenAddress(chainId: number): string | null;
export declare function getTokenMessenger(chainId: number): string | null;
export declare function getMessageTransmitter(chainId: number): string | null;
export declare function cctpTransfer({ walletClient, originChain, destinationChain, amount, }: {
    walletClient: WalletClient;
    originChain: Chain;
    destinationChain: Chain;
    amount: bigint;
}): Promise<{
    waitForAttestation: () => Promise<Attestation>;
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
export declare function approveERC20({ walletClient, tokenAddress, spender, amount, chain, }: {
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
export declare function retrieveAttestation({ domain, transactionHash, testnet, }: {
    domain: number;
    transactionHash: `0x${string}`;
    testnet: boolean;
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
export declare function waitForAttestation({ domain, transactionHash, testnet, }: {
    domain: number;
    transactionHash: `0x${string}`;
    testnet: boolean;
}): Promise<Attestation | null>;
export declare function getIsUsdcAddress(address: string, chainId: number): boolean;
export declare function cctpTransferWithCustomCall({ walletClient, originChain, destinationChain, amount, }: {
    walletClient: WalletClient;
    originChain: Chain;
    destinationChain: Chain;
    amount: bigint;
}): Promise<{
    waitForAttestation: () => Promise<Attestation>;
    txHash: `0x${string}`;
}>;
export declare function burnUSDCToContract({ walletClient, tokenMessenger, destinationDomain, destinationContract, amount, burnToken, maxFee, chain, }: {
    walletClient: WalletClient;
    tokenMessenger: string;
    destinationDomain: number;
    destinationContract: string;
    amount: bigint;
    burnToken: string;
    maxFee: bigint;
    chain: Chain;
}): Promise<`0x${string}`>;
export declare function getBurnUSDCToContractData({ tokenMessenger, destinationDomain, destinationContract, amount, burnToken, maxFee, }: {
    tokenMessenger: string;
    destinationDomain: number;
    destinationContract: string;
    amount: bigint;
    burnToken: string;
    maxFee: bigint;
}): Promise<{
    to: `0x${string}`;
    data: `0x${string}`;
    value: bigint;
}>;
export declare function executeCustomCallWithCCTP({ relayerClient, destinationChain, attestation, targetContract, calldata, gasLimit, }: {
    relayerClient: WalletClient;
    destinationChain: Chain;
    attestation: Attestation;
    targetContract: string;
    calldata: `0x${string}`;
    gasLimit?: bigint;
}): Promise<`0x${string}`>;
export declare function cctpTransferCaller({ walletClient, relayerClient, // Can be same as walletClient or different
originChain, destinationChain, amount, targetContract, // The contract you want to call
calldata, // The function call data
gasLimit, }: {
    walletClient: WalletClient;
    relayerClient?: WalletClient;
    originChain: Chain;
    destinationChain: Chain;
    amount: bigint;
    targetContract: string;
    calldata: `0x${string}`;
    gasLimit?: bigint;
}): Promise<{
    burnTxHash: `0x${string}`;
    executeTxHash: `0x${string}`;
}>;
export declare function getCCTPRelayerCallData({ attestation, targetContract, calldata, gasLimit, destinationChain, }: {
    attestation: Attestation;
    targetContract: string;
    calldata: `0x${string}`;
    gasLimit?: bigint;
    destinationChain: Chain;
}): Promise<{
    to: `0x${string}`;
    data: `0x${string}`;
    value: bigint;
}>;
//# sourceMappingURL=cctp.d.ts.map