import type { Account, Chain, PublicClient, WalletClient } from "viem";
import type { UserOperation } from "viem/account-abstraction";
import type { ToSimpleSmartAccountReturnType } from "./toSimpleSmartAccount.js";
interface PackedCall {
    to: `0x${string}`;
    value: bigint;
    gasLimit: bigint;
    behaviorOnError: number;
    data: `0x${string}`;
}
interface Payload {
    kind: number;
    noChainId: boolean;
    space: number;
    nonce: number;
    parentWallets: string[];
    calls: PackedCall[];
}
export declare const ENTRYPOINT_ABI: ({
    name: string;
    type: string;
    stateMutability: string;
    inputs: ({
        name: string;
        type: string;
        components: {
            name: string;
            type: string;
        }[];
    } | {
        name: string;
        type: string;
        components?: undefined;
    })[];
    outputs: never[];
} | {
    name: string;
    type: string;
    stateMutability: string;
    inputs: {
        name: string;
        type: string;
        components: {
            name: string;
            type: string;
        }[];
    }[];
    outputs: {
        name: string;
        type: string;
    }[];
})[];
export declare function packPayload(payload: Payload): `0x${string}`;
export declare function getDelegatorSmartAccount({ publicClient, }: {
    publicClient: PublicClient;
}): Promise<ToSimpleSmartAccountReturnType>;
export declare function getPaymasterGaslessTransaction({ walletClient, chain, tokenAddress, amount, recipient, delegatorSmartAccount, }: {
    walletClient: WalletClient;
    chain: Chain;
    tokenAddress: `0x${string}`;
    amount: bigint;
    recipient: `0x${string}`;
    delegatorSmartAccount: ToSimpleSmartAccountReturnType;
}): Promise<{
    to: string;
    data: string;
    value: string;
}[]>;
export declare function sendPaymasterGaslessTransaction({ walletClient, publicClient, chain, paymasterUrl, delegatorSmartAccount, calls, }: {
    walletClient: WalletClient;
    publicClient: PublicClient;
    chain: Chain;
    paymasterUrl: string;
    delegatorSmartAccount: ToSimpleSmartAccountReturnType;
    calls: {
        to: string;
        data: string;
        value: string;
    }[];
}): Promise<string>;
export type stakeOnEntryPointParams = {
    relayerClient: WalletClient;
    relayerAccount: Account;
    delegatorAddress: `0x${string}`;
    chain: Chain;
};
export declare function stakeOnEntryPoint({ relayerClient, relayerAccount, delegatorAddress, chain, }: stakeOnEntryPointParams): Promise<`0x${string}`>;
export declare const getRequiredPrefund: (userOperation: UserOperation) => bigint;
export {};
//# sourceMappingURL=paymasterSend.d.ts.map