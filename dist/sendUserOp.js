import { concat, createPublicClient, createWalletClient, encodeAbiParameters, encodeFunctionData, getAddress, http, keccak256, pad, size, slice, toHex, } from "viem";
import { privateKeyToAccount } from "viem/accounts";
// Minimal EntryPoint ABI for handleOps
export const ENTRYPOINT_ABI = [
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "initCode",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "callData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes32",
                        name: "accountGasLimits",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "preVerificationGas",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "gasFees",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes",
                        name: "paymasterAndData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct PackedUserOperation",
                name: "userOp",
                type: "tuple",
            },
            {
                internalType: "bytes32",
                name: "userOpHash",
                type: "bytes32",
            },
        ],
        name: "executeUserOp",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "initCode",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "callData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes32",
                        name: "accountGasLimits",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "preVerificationGas",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "gasFees",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes",
                        name: "paymasterAndData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                ],
                internalType: "struct PackedUserOperation[]",
                name: "ops",
                type: "tuple[]",
            },
            {
                internalType: "address payable",
                name: "beneficiary",
                type: "address",
            },
        ],
        name: "handleOps",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
export const ENTRYPOINT_ADDRESS = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
export async function sendUserOperationDirectly({ userOp, relayerPrivateKey, chain, }) {
    console.log("[trails-sdk] userOp", userOp);
    const relayerAccount = privateKeyToAccount(relayerPrivateKey);
    const walletClient = createWalletClient({
        chain: chain,
        transport: http(),
        account: relayerAccount,
    });
    const publicClient = createPublicClient({
        chain: chain,
        transport: http(),
    });
    const packedOp = toPackedUserOperation(userOp); // converts to PackedUserOperation
    //   const paymasterAddress = "0x73749B2BBE88abFFfe48BA81b3B7899CE7733e36"
    //   packedOp.paymasterAndData = encodePacked(['address'], [paymasterAddress])
    const opHash = await getUserOperationHashV07({
        userOperation: packedOp,
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chainId: chain.id,
    });
    console.log("[trails-sdk] opHash", opHash);
    console.log("[trails-sdk] packedOp", packedOp);
    console.log("[trails-sdk] relayerAccount", relayerAccount);
    const handleOpsData = encodeHandleOpsCalldata({
        userOps: [userOp],
        beneficiary: relayerAccount.address,
    });
    console.log("[trails-sdk] handleOpsData", handleOpsData);
    const txHash = await walletClient.sendTransaction({
        to: ENTRYPOINT_ADDRESS,
        data: handleOpsData,
        value: BigInt(0),
        gasLimit: 1000000,
        chain: chain,
    });
    console.log("[trails-sdk] Sent handleOps tx:", txHash);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    console.log("[trails-sdk] Confirmed handleOps tx:", receipt.transactionHash);
    return receipt.transactionHash;
}
// Helper to encode account gas limits as bytes32
export function getAccountGasLimits(op) {
    if (!op.verificationGasLimit) {
        throw new Error("verificationGasLimit is required");
    }
    if (!op.callGasLimit) {
        throw new Error("callGasLimit is required");
    }
    return concat([
        pad(toHex(op.verificationGasLimit), { size: 16 }),
        pad(toHex(op.callGasLimit), { size: 16 }),
    ]);
}
// Helper to encode fee parameters as bytes32
export function getGasFees(op) {
    if (!op.maxPriorityFeePerGas) {
        throw new Error("maxPriorityFeePerGas is required");
    }
    if (!op.maxFeePerGas) {
        throw new Error("maxFeePerGas is required");
    }
    return concat([
        pad(toHex(op.maxPriorityFeePerGas), { size: 16 }),
        pad(toHex(op.maxFeePerGas), { size: 16 }),
    ]);
}
// Helper to encode initCode
export function getInitCode(op) {
    if (!op.factory)
        return "0x";
    return concat([
        op.factory === "0x7702"
            ? pad(op.factory, { dir: "right", size: 20 })
            : op.factory,
        op.factoryData || "0x",
    ]);
}
// Helper to encode paymasterAndData field
export function getPaymasterAndData(op) {
    if (!op.paymaster)
        return "0x";
    if (!op.paymasterVerificationGasLimit) {
        throw new Error("paymasterVerificationGasLimit is required");
    }
    if (!op.paymasterPostOpGasLimit) {
        throw new Error("paymasterPostOpGasLimit is required");
    }
    return concat([
        op.paymaster,
        pad(toHex(op.paymasterVerificationGasLimit || 0n), { size: 16 }),
        pad(toHex(op.paymasterPostOpGasLimit || 0n), { size: 16 }),
        op.paymasterData || "0x",
    ]);
}
// Final conversion function
export function toPackedUserOperation(op) {
    return {
        sender: op.sender,
        nonce: op.nonce,
        initCode: getInitCode(op),
        callData: op.callData,
        accountGasLimits: getAccountGasLimits(op),
        preVerificationGas: op.preVerificationGas,
        gasFees: getGasFees(op),
        paymasterAndData: getPaymasterAndData(op),
        signature: op.signature,
    };
}
export const getNonceKeyAndSequence = (nonce) => {
    const nonceKey = nonce >> 64n; // first 192 bits of nonce
    const nonceSequence = nonce & 0xffffffffffffffffn; // last 64 bits of nonce
    return [nonceKey, nonceSequence];
};
export const encodeNonce = ({ nonceKey, nonceSequence, }) => {
    return (nonceKey << 64n) | nonceSequence;
};
export const getUserOperationHashV07 = ({ userOperation, entryPointAddress, chainId, }) => {
    const hash = keccak256(encodeAbiParameters([
        {
            name: "sender",
            type: "address",
        },
        {
            name: "nonce",
            type: "uint256",
        },
        {
            name: "initCodeHash",
            type: "bytes32",
        },
        {
            name: "callDataHash",
            type: "bytes32",
        },
        {
            name: "accountGasLimits",
            type: "bytes32",
        },
        {
            name: "preVerificationGas",
            type: "uint256",
        },
        {
            name: "gasFees",
            type: "bytes32",
        },
        {
            name: "paymasterAndDataHash",
            type: "bytes32",
        },
    ], [
        userOperation.sender,
        userOperation.nonce,
        keccak256(userOperation.initCode),
        keccak256(userOperation.callData),
        userOperation.accountGasLimits,
        userOperation.preVerificationGas,
        userOperation.gasFees,
        keccak256(userOperation.paymasterAndData),
    ]));
    return keccak256(encodeAbiParameters([
        {
            name: "userOpHash",
            type: "bytes32",
        },
        {
            name: "entryPointAddress",
            type: "address",
        },
        {
            name: "chainId",
            type: "uint256",
        },
    ], [hash, entryPointAddress, BigInt(chainId)]));
};
export const encodeHandleOpsCalldata = ({ userOps, beneficiary, }) => {
    const packedUserOps = packUserOps(userOps);
    console.log("[trails-sdk] encodeHandleOpsCalldata packedUserOps", packedUserOps);
    return encodeFunctionData({
        abi: ENTRYPOINT_ABI,
        functionName: "handleOps",
        args: [packedUserOps, beneficiary],
    });
};
export const packUserOps = (userOps) => {
    const packedUserOps = userOps.map((op) => toPackedUserOperation(op));
    return packedUserOps;
};
export function toUnpackedUserOperation(packedUserOperation) {
    const { factory, factoryData } = unPackInitCode(packedUserOperation.initCode);
    const { callGasLimit, verificationGasLimit } = unpackAccountGasLimits(packedUserOperation.accountGasLimits);
    const { maxFeePerGas, maxPriorityFeePerGas } = unpackGasLimits(packedUserOperation.gasFees);
    const { paymaster, paymasterVerificationGasLimit, paymasterPostOpGasLimit, paymasterData, } = unpackPaymasterAndData(packedUserOperation.paymasterAndData);
    return {
        sender: packedUserOperation.sender,
        nonce: packedUserOperation.nonce,
        factory: factory,
        factoryData: factoryData,
        callData: packedUserOperation.callData,
        callGasLimit: callGasLimit,
        verificationGasLimit: verificationGasLimit,
        preVerificationGas: packedUserOperation.preVerificationGas,
        maxFeePerGas: maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        paymaster: paymaster,
        paymasterVerificationGasLimit: paymasterVerificationGasLimit,
        paymasterPostOpGasLimit: paymasterPostOpGasLimit,
        paymasterData: paymasterData,
        signature: packedUserOperation.signature,
    };
}
export function unPackInitCode(initCode) {
    if (initCode === "0x") {
        return {
            factory: null,
            factoryData: null,
        };
    }
    return {
        factory: getAddress(slice(initCode, 0, 20)),
        factoryData: size(initCode) > 20 ? slice(initCode, 20) : null,
    };
}
export function unpackAccountGasLimits(accountGasLimits) {
    return {
        verificationGasLimit: BigInt(slice(accountGasLimits, 0, 16)),
        callGasLimit: BigInt(slice(accountGasLimits, 16)),
    };
}
export function unpackGasLimits(gasLimits) {
    return {
        maxPriorityFeePerGas: BigInt(slice(gasLimits, 0, 16)),
        maxFeePerGas: BigInt(slice(gasLimits, 16)),
    };
}
export function unpackPaymasterAndData(paymasterAndData) {
    if (paymasterAndData === "0x") {
        return {
            paymaster: null,
            paymasterVerificationGasLimit: null,
            paymasterPostOpGasLimit: null,
            paymasterData: null,
        };
    }
    const paymasterAndDataSize = size(paymasterAndData);
    return {
        paymaster: getAddress(slice(paymasterAndData, 0, 20)),
        paymasterVerificationGasLimit: BigInt(slice(paymasterAndData, 20, 36)),
        paymasterPostOpGasLimit: BigInt(slice(paymasterAndData, 36, 52)),
        paymasterData: paymasterAndDataSize > 52 ? slice(paymasterAndData, 52) : null,
    };
}
