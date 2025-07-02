import { type Address, type Chain, type Hex } from "viem";
type UserOperation = {
    sender: Address;
    nonce: bigint;
    initCode: Hex;
    callData: Hex;
    verificationGasLimit: bigint;
    callGasLimit: bigint;
    maxPriorityFeePerGas: bigint;
    maxFeePerGas: bigint;
    factory: Address;
    factoryData: Hex;
    paymaster: Address;
    paymasterVerificationGasLimit: bigint;
    paymasterPostOpGasLimit: bigint;
    paymasterData: Hex;
    preVerificationGas: bigint;
    signature: Hex;
};
export declare function sendUserOperationDirectly({ userOp, relayerPrivateKey, chain, }: {
    userOp: any;
    relayerPrivateKey: `0x${string}`;
    chain: Chain;
}): Promise<`0x${string}`>;
type PackedUserOperation = {
    sender: `0x${string}`;
    nonce: bigint;
    initCode: `0x${string}`;
    callData: `0x${string}`;
    accountGasLimits: `0x${string}`;
    preVerificationGas: bigint;
    gasFees: `0x${string}`;
    paymasterAndData: `0x${string}`;
    signature: `0x${string}`;
};
type UserOperationV07 = {
    sender: `0x${string}`;
    nonce: bigint;
    initCode: `0x${string}`;
    callData: `0x${string}`;
    verificationGasLimit: bigint;
    callGasLimit: bigint;
    maxPriorityFeePerGas: bigint;
    maxFeePerGas: bigint;
    factory: `0x${string}`;
    factoryData: `0x${string}`;
    paymaster: `0x${string}`;
    paymasterVerificationGasLimit: bigint;
    paymasterPostOpGasLimit: bigint;
    paymasterData: `0x${string}`;
    preVerificationGas: bigint;
    signature: `0x${string}`;
};
export declare function toPackedUserOperation(op: UserOperationV07): PackedUserOperation;
export declare const getNonceKeyAndSequence: (nonce: bigint) => bigint[];
export declare const encodeNonce: ({ nonceKey, nonceSequence, }: {
    nonceKey: bigint;
    nonceSequence: bigint;
}) => bigint;
export declare const getUserOperationHashV07: ({ userOperation, entryPointAddress, chainId, }: {
    userOperation: PackedUserOperation;
    entryPointAddress: Address;
    chainId: number;
}) => `0x${string}`;
export declare const encodeHandleOpsCalldata: ({ userOps, beneficiary, }: {
    userOps: UserOperation[];
    beneficiary: Address;
}) => Hex;
export declare const packUserOps: (userOps: UserOperation[]) => PackedUserOperation[];
export declare function toUnpackedUserOperation(packedUserOperation: PackedUserOperation): any;
export declare function unPackInitCode(initCode: Hex): {
    factory: null;
    factoryData: null;
} | {
    factory: `0x${string}`;
    factoryData: `0x${string}` | null;
};
export declare function unpackAccountGasLimits(accountGasLimits: Hex): {
    verificationGasLimit: bigint;
    callGasLimit: bigint;
};
export declare function unpackGasLimits(gasLimits: Hex): {
    maxPriorityFeePerGas: bigint;
    maxFeePerGas: bigint;
};
export declare function unpackPaymasterAndData(paymasterAndData: Hex): {
    paymaster: null;
    paymasterVerificationGasLimit: null;
    paymasterPostOpGasLimit: null;
    paymasterData: null;
} | {
    paymaster: `0x${string}`;
    paymasterVerificationGasLimit: bigint;
    paymasterPostOpGasLimit: bigint;
    paymasterData: `0x${string}` | null;
};
export {};
//# sourceMappingURL=sendUserOp.d.ts.map