import type { Account, Chain, WalletClient } from "viem";
import type { UserOperation } from "viem/account-abstraction";
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
export declare function sendPaymasterGaslessTransaction(walletClient: WalletClient, chain: Chain, tokenAddress: `0x${string}`, amount: bigint, recipient: `0x${string}`, paymasterUrl: string): Promise<`0x${string}`>;
export declare function stakeOnEntryPoint(relayerClient: WalletClient, relayerAccount: Account, delegatorAddress: `0x${string}`, chain: Chain): Promise<`0x${string}`>;
export declare const getRequiredPrefund: (userOperation: UserOperation) => bigint;
export {};
//# sourceMappingURL=paymasterSend.d.ts.map