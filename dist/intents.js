import { Config, Payload } from "@0xsequence/wallet-primitives";
import { AbiParameters, Address, Bytes, ContractAddress, Hash, } from "ox";
import { isAddressEqual, } from "viem";
import { ATTESATION_SIGNER_ADDRESS } from "./constants.js";
import { findPreconditionAddresses } from "./preconditions.js";
export async function getIntentCallsPayloads(apiClient, args) {
    return apiClient.getIntentCallsPayloads(args);
}
export function calculateIntentAddress(mainSigner, calls) {
    console.log("[trails-sdk] calculateIntentAddress inputs:", {
        mainSigner,
        calls: JSON.stringify(calls, null, 2),
    });
    const context = {
        factory: "0xBd0F8abD58B4449B39C57Ac9D5C67433239aC447",
        stage1: "0x53bA242E7C2501839DF2972c75075dc693176Cd0",
        stage2: "0xa29874c88b8Fd557e42219B04b0CeC693e1712f5",
        creationCode: "0x603e600e3d39601e805130553df33d3d34601c57363d3d373d363d30545af43d82803e903d91601c57fd5bf3",
    };
    const coreCalls = calls.map((call) => ({
        type: "call",
        chainId: call.chainId.toString(),
        space: call.space ? call.space.toString() : "0",
        nonce: call.nonce ? call.nonce.toString() : "0",
        calls: call.calls.map((call) => ({
            to: Address.from(call.to),
            value: call.value?.toString() || "0",
            data: Bytes.toHex(Bytes.from(call.data || "0x")),
            gasLimit: call.gasLimit?.toString() || "0",
            delegateCall: !!call.delegateCall,
            onlyFallback: !!call.onlyFallback,
            behaviorOnError: call.behaviorOnError,
        })),
    }));
    const calculatedAddress = calculateIntentConfigurationAddress(Address.from(mainSigner), coreCalls, context);
    console.log("[trails-sdk] Final calculated address:", calculatedAddress.toString());
    return calculatedAddress;
}
export function calculateOriginAndDestinationIntentAddresses(mainSigner, calls) {
    const originChainId = calls[0]?.chainId;
    const destinationChainId = calls[1]?.chainId;
    console.log("[trails-sdk] originChainId:", originChainId);
    console.log("[trails-sdk] destinationChainId:", destinationChainId);
    // Different origin and destination chains: cross-chain execution.
    const originCalls = calls.filter((c) => c.chainId === originChainId);
    const destinationCalls = calls.filter((c) => c.chainId === destinationChainId);
    console.log("[trails-sdk] originCalls:", originCalls);
    console.log("[trails-sdk] destinationCalls:", destinationCalls);
    const originIntentAddress = calculateIntentAddress(mainSigner, originCalls);
    const destinationIntentAddress = calculateIntentAddress(mainSigner, destinationCalls);
    console.log("[trails-sdk] originIntentAddress:", originIntentAddress);
    console.log("[trails-sdk] destinationIntentAddress:", destinationIntentAddress);
    return { originIntentAddress, destinationIntentAddress };
}
export function commitIntentConfig(apiClient, mainSignerAddress, calls, preconditions) {
    console.log("[trails-sdk] commitIntentConfig inputs:", {
        mainSignerAddress,
        calls: JSON.stringify(calls, null, 2),
        preconditions: JSON.stringify(preconditions, null, 2),
    });
    const { originIntentAddress, destinationIntentAddress } = calculateOriginAndDestinationIntentAddresses(mainSignerAddress, calls);
    console.log("[trails-sdk] originIntentAddress:", originIntentAddress.toString());
    console.log("[trails-sdk] destinationIntentAddress:", destinationIntentAddress.toString());
    const originChainIdStr = calls[0]?.chainId;
    const destinationChainIdStr = calls[1]?.chainId;
    // The executionInfos could be empty, so we need to handle the undefined case.
    const { originAddress: receivedAddress } = originChainIdStr && destinationChainIdStr
        ? findPreconditionAddresses(preconditions, Number(originChainIdStr), Number(destinationChainIdStr))
        : { originAddress: undefined };
    console.log("[trails-sdk] Address comparison:", {
        receivedAddress,
        calculatedAddress: originIntentAddress.toString(),
        match: receivedAddress &&
            isAddressEqual(Address.from(receivedAddress), originIntentAddress),
    });
    const args = {
        originIntentAddress: originIntentAddress.toString(),
        destinationIntentAddress: destinationIntentAddress.toString(),
        mainSigner: mainSignerAddress,
        calls: calls,
        preconditions: preconditions,
    };
    return apiClient.commitIntentConfig(args);
}
export async function sendOriginTransaction(account, walletClient, originParams) {
    const chainId = await walletClient.getChainId();
    if (chainId.toString() !== originParams.chain.id.toString()) {
        console.log("[trails-sdk] sendOriginTransaction: switching chain", "want:", originParams.chain.id, "current:", chainId);
        await walletClient.switchChain({ id: originParams.chain.id });
        console.log("[trails-sdk] sendOriginTransaction: switched chain to", originParams.chain.id);
    }
    console.log("[trails-sdk] sending origin tx");
    console.time("[trails-sdk] sendTx");
    const hash = await walletClient.sendTransaction({
        account: account,
        to: originParams.to,
        data: originParams.data,
        value: BigInt(originParams.value),
        chain: originParams.chain,
    });
    console.timeEnd("[trails-sdk] sendTx");
    return hash;
}
export function hashIntentParams({ userAddress, nonce, originTokens, destinationCalls, destinationTokens, }) {
    if (!userAddress ||
        userAddress === "0x0000000000000000000000000000000000000000")
        throw new Error("UserAddress is zero");
    if (typeof nonce !== "bigint")
        throw new Error("Nonce is not a bigint");
    if (!originTokens || originTokens.length === 0)
        throw new Error("OriginTokens is empty");
    if (!destinationCalls || destinationCalls.length === 0)
        throw new Error("DestinationCalls is empty");
    if (!destinationTokens || destinationTokens.length === 0)
        throw new Error("DestinationTokens is empty");
    for (let i = 0; i < destinationCalls.length; i++) {
        const currentCall = destinationCalls[i];
        if (!currentCall)
            throw new Error(`DestinationCalls[${i}] is nil`);
        if (!currentCall.calls || currentCall.calls.length === 0) {
            throw new Error(`DestinationCalls[${i}] has no calls`);
        }
    }
    const originTokensForAbi = originTokens.map((token) => ({
        address: token.address,
        chainId: token.chainId,
    }));
    let cumulativeCallsHashBytes = Bytes.from(new Uint8Array(32));
    for (let i = 0; i < destinationCalls.length; i++) {
        const callPayload = destinationCalls[i];
        if (!callPayload)
            throw new Error(`DestinationCalls[${i}] is nil`);
        const currentDestCallPayloadHashBytes = Payload.hash(ATTESATION_SIGNER_ADDRESS, BigInt(callPayload.chainId), {
            type: "call",
            space: callPayload.space ? BigInt(callPayload.space) : 0n,
            nonce: callPayload.nonce ? BigInt(callPayload.nonce) : 0n,
            calls: callPayload.calls.map((call) => ({
                type: "call",
                to: call.to,
                value: BigInt(call.value?.toString() || "0"),
                data: Bytes.toHex(Bytes.from(call.data || "0x")),
                gasLimit: BigInt(call.gasLimit?.toString() || "0"),
                delegateCall: !!call.delegateCall,
                onlyFallback: !!call.onlyFallback,
                behaviorOnError: call.behaviorOnError === 0
                    ? "ignore"
                    : call.behaviorOnError === 1
                        ? "revert"
                        : "abort",
            })),
        });
        cumulativeCallsHashBytes = Hash.keccak256(Bytes.concat(cumulativeCallsHashBytes, currentDestCallPayloadHashBytes), {
            as: "Bytes",
        });
    }
    const cumulativeCallsHashHex = Bytes.toHex(cumulativeCallsHashBytes);
    const destinationTokensForAbi = destinationTokens.map((token) => ({
        address: token.address,
        chainId: token.chainId,
        amount: token.amount,
    }));
    const abiSchema = [
        { type: "address" },
        { type: "uint256" },
        {
            type: "tuple[]",
            components: [
                { name: "address", type: "address" },
                { name: "chainId", type: "uint256" },
            ],
        },
        {
            type: "tuple[]",
            components: [
                { name: "address", type: "address" },
                { name: "chainId", type: "uint256" },
                { name: "amount", type: "uint256" },
            ],
        },
        { type: "bytes32" },
    ];
    const encodedHex = AbiParameters.encode(abiSchema, [
        userAddress,
        nonce,
        originTokensForAbi,
        destinationTokensForAbi,
        cumulativeCallsHashHex,
    ]);
    const encodedBytes = Bytes.fromHex(encodedHex);
    const hashBytes = Hash.keccak256(encodedBytes);
    const hashHex = Bytes.toHex(hashBytes);
    return hashHex;
}
// TODO: Add proper type
export function bigintReplacer(_key, value) {
    return typeof value === "bigint" ? value.toString() : value;
}
export function calculateIntentConfigurationAddress(mainSigner, calls, context) {
    const config = createIntentConfiguration(mainSigner, calls);
    // Calculate the image hash of the configuration
    const imageHash = Config.hashConfiguration(config);
    // Calculate the counterfactual address using the image hash and context
    return ContractAddress.fromCreate2({
        from: context.factory,
        bytecodeHash: Hash.keccak256(Bytes.concat(Bytes.from(context.creationCode), Bytes.padLeft(Bytes.from(context.stage1), 32)), { as: "Bytes" }),
        salt: imageHash,
    });
}
function createIntentConfiguration(mainSigner, calls) {
    const mainSignerLeaf = {
        type: "signer",
        address: mainSigner,
        weight: 1n,
    };
    console.log("[trails-sdk] mainSignerLeaf:", mainSignerLeaf);
    const subdigestLeaves = calls.map((call) => {
        const digest = Payload.hash(Address.from("0x0000000000000000000000000000000000000000"), BigInt(call.chainId), {
            type: "call",
            space: BigInt(call.space || 0),
            nonce: BigInt(call.nonce || 0),
            calls: call.calls.map((call) => ({
                type: "call",
                to: call.to,
                value: BigInt(call.value?.toString() || "0"),
                data: Bytes.toHex(Bytes.from(call.data || "0x")),
                gasLimit: BigInt(call.gasLimit?.toString() || "0"),
                delegateCall: !!call.delegateCall,
                onlyFallback: !!call.onlyFallback,
                behaviorOnError: call.behaviorOnError === 0
                    ? "ignore"
                    : call.behaviorOnError === 1
                        ? "revert"
                        : "abort",
            })),
        });
        console.log("[trails-sdk] digest:", Bytes.toHex(digest));
        return {
            type: "any-address-subdigest",
            digest: Bytes.toHex(digest),
        };
    });
    console.log("[trails-sdk] calls:", calls);
    console.log("[trails-sdk] subdigestLeaves:", subdigestLeaves);
    const otherLeaves = [...subdigestLeaves];
    if (otherLeaves.length === 0) {
        throw new Error("Intent configuration must have at least one call or LiFi information.");
    }
    let secondaryTopologyNode;
    if (otherLeaves.length === 1) {
        secondaryTopologyNode = otherLeaves[0];
    }
    else {
        secondaryTopologyNode = buildMerkleTreeFromMembers(otherLeaves);
    }
    // Print the topology
    console.log("[trails-sdk] Topology:", JSON.stringify([mainSignerLeaf, secondaryTopologyNode], bigintReplacer, 2));
    return {
        threshold: 1n,
        checkpoint: 0n,
        topology: [mainSignerLeaf, secondaryTopologyNode],
    };
}
// Renamed and generalized from createSubdigestTree
function buildMerkleTreeFromMembers(members) {
    if (members.length === 0) {
        throw new Error("Cannot create a tree from empty members");
    }
    if (members.length === 1) {
        return members[0]; // Returns a single Leaf or a Node
    }
    let currentLevel = [...members];
    while (currentLevel.length > 1) {
        const nextLevel = [];
        for (let i = 0; i < currentLevel.length; i += 2) {
            const left = currentLevel[i];
            if (i + 1 < currentLevel.length) {
                const right = currentLevel[i + 1];
                nextLevel.push([left, right]);
            }
            else {
                // Odd one out, carries over to the next level
                nextLevel.push(left);
            }
        }
        currentLevel = nextLevel;
    }
    return currentLevel[0];
}
