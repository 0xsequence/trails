import { encodeFunctionData, erc20Abi, getAddress, maxUint256, parseAbi, } from "viem";
import { PERMIT_ABI, TRANSFER_ABI, TRANSFER_FROM_ABI } from "./abi.js";
import { attemptSwitchChain } from "./chainSwitch.js";
export function splitSignature(signature) {
    const sig = signature.slice(2);
    const r = `0x${sig.slice(0, 64)}`;
    const s = `0x${sig.slice(64, 128)}`;
    const v = parseInt(sig.slice(128, 130), 16);
    return { r, s, v };
}
export function getPermitCalldata({ signer, spender, amount, deadline, signature, }) {
    const { r, s, v } = splitSignature(signature);
    // Encode permit call
    const permitCalldata = encodeFunctionData({
        abi: [PERMIT_ABI],
        functionName: "permit",
        args: [signer, spender, amount, deadline, v, r, s],
    });
    return permitCalldata;
}
export function getTransferFromCalldata({ signer, spender, amount, }) {
    // Encode transferFrom call
    const transferFromCalldata = encodeFunctionData({
        abi: [TRANSFER_FROM_ABI],
        functionName: "transferFrom",
        args: [signer, spender, amount],
    });
    return transferFromCalldata;
}
export function getTransferCalldata({ recipient, amount, }) {
    // Encode transfer call to recipient
    const transferCalldata = encodeFunctionData({
        abi: [TRANSFER_ABI],
        functionName: "transfer",
        args: [recipient, amount],
    });
    return transferCalldata;
}
export function getPermitCalls(connectedAccount, delegatorSmartAccountAddress, amount, deadline, signature, recipient, tokenAddress) {
    const permitCalldata = getPermitCalldata({
        signer: connectedAccount,
        spender: delegatorSmartAccountAddress,
        amount,
        deadline,
        signature,
    });
    const transferFromCalldata = getTransferFromCalldata({
        signer: connectedAccount,
        spender: delegatorSmartAccountAddress,
        amount,
    });
    const transferCalldata = getTransferCalldata({ recipient, amount });
    return [permitCalldata, transferFromCalldata, transferCalldata].map((call) => ({
        to: tokenAddress,
        data: call,
        value: "0",
    }));
}
export async function getPermitSignature({ publicClient, walletClient, signer, spender, tokenAddress, amount, chain, deadline = BigInt(Math.floor(Date.now() / 1000) + 3600), // 1 hour from now
 }) {
    if (!walletClient.account) {
        throw new Error("No account found");
    }
    // Get permit signature from connected account
    const nonce = await publicClient.readContract({
        address: tokenAddress,
        abi: [
            {
                name: "nonces",
                type: "function",
                stateMutability: "view",
                inputs: [{ name: "owner", type: "address" }],
                outputs: [{ name: "", type: "uint256" }],
            },
        ],
        functionName: "nonces",
        args: [signer],
    });
    const name = (await publicClient.readContract({
        address: tokenAddress,
        abi: [
            {
                name: "name",
                type: "function",
                stateMutability: "view",
                inputs: [],
                outputs: [{ name: "", type: "string" }],
            },
        ],
        functionName: "name",
    }));
    let version = "1"; // fallback default
    try {
        version = (await publicClient.readContract({
            address: tokenAddress,
            abi: [
                {
                    name: "version",
                    type: "function",
                    stateMutability: "view",
                    inputs: [],
                    outputs: [{ name: "", type: "string" }],
                },
            ],
            functionName: "version",
        }));
    }
    catch {
        console.warn("[trails-sdk] Token does not implement version(), defaulting to '1'");
    }
    const domain = {
        name,
        version,
        chainId: chain.id,
        verifyingContract: tokenAddress,
    };
    const types = {
        Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
        ],
    };
    // Create permit data
    const permitData = {
        owner: signer,
        spender: spender,
        value: amount,
        nonce: nonce,
        deadline: deadline,
    };
    await attemptSwitchChain({
        walletClient,
        desiredChainId: chain.id,
    });
    console.log("[trails-sdk] Requesting permit signature...");
    const signature = await walletClient.signTypedData({
        account: walletClient.account,
        domain,
        types,
        primaryType: "Permit",
        message: permitData,
    });
    const { v, r, s } = splitSignature(signature);
    return { signature, deadline, v, r, s };
}
export function getDepositToIntentWithPermitCalldata({ user, token, amount, intentAddress, deadline, permitAmount, v, r, s, sigV, sigR, sigS, }) {
    const abi = parseAbi([
        "function depositToIntentWithPermit(address user, address token, uint256 amount, uint256 permitAmount, address intentAddress, uint256 deadline, uint8 v, bytes32 r, bytes32 s, uint8 sigV, bytes32 sigR, bytes32 sigS)",
    ]);
    return encodeFunctionData({
        abi,
        functionName: "depositToIntentWithPermit",
        args: [
            user,
            token,
            amount,
            permitAmount,
            intentAddress,
            deadline,
            v,
            r,
            s,
            sigV,
            sigR,
            sigS,
        ],
    });
}
export function getDepositToIntentWithoutPermitCalldata({ user, token, amount, intentAddress, deadline, sigV, sigR, sigS, }) {
    const abi = parseAbi([
        "function depositToIntent(address user, address token, uint256 amount, address intentAddress, uint256 deadline, uint8 sigV, bytes32 sigR, bytes32 sigS)",
    ]);
    return encodeFunctionData({
        abi,
        functionName: "depositToIntent",
        args: [user, token, amount, intentAddress, deadline, sigV, sigR, sigS],
    });
}
export async function getDepositToIntentCalls({ publicClient, walletClient, account, intentEntrypoint, depositTokenAddress, depositTokenAmount, depositRecipient, chain, }) {
    const permitAmount = maxUint256;
    const needsApproval = await getNeedsIntentEntrypointApproval({
        client: publicClient,
        token: depositTokenAddress,
        account: account.address,
        entrypoint: intentEntrypoint,
        amount: BigInt(depositTokenAmount),
    });
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hour from now
    let approvalSignature = null;
    if (needsApproval) {
        approvalSignature = await getPermitSignature({
            publicClient,
            walletClient,
            signer: account.address,
            spender: intentEntrypoint,
            tokenAddress: depositTokenAddress,
            amount: permitAmount,
            chain,
            deadline,
        });
    }
    const { v: signedIntentV, r: signedIntentR, s: signedIntentS, } = await signIntent({
        client: walletClient,
        intentParams: {
            user: account.address,
            token: depositTokenAddress,
            amount: BigInt(depositTokenAmount),
            intentAddress: depositRecipient,
            deadline,
            chainId: chain.id,
            contractAddress: intentEntrypoint,
        },
    });
    let calldata = null;
    if (approvalSignature) {
        calldata = getDepositToIntentWithPermitCalldata({
            user: account.address,
            token: depositTokenAddress,
            amount: BigInt(depositTokenAmount),
            permitAmount,
            intentAddress: depositRecipient,
            deadline,
            v: approvalSignature.v,
            r: approvalSignature.r,
            s: approvalSignature.s,
            sigV: signedIntentV,
            sigR: signedIntentR,
            sigS: signedIntentS,
        });
    }
    else {
        calldata = getDepositToIntentWithoutPermitCalldata({
            user: account.address,
            token: depositTokenAddress,
            amount: BigInt(depositTokenAmount),
            intentAddress: depositRecipient,
            deadline,
            sigV: signedIntentV,
            sigR: signedIntentR,
            sigS: signedIntentS,
        });
    }
    const calls = [
        {
            to: intentEntrypoint,
            data: calldata,
            value: "0",
        },
    ];
    return calls;
}
export async function getNeedsIntentEntrypointApproval({ client, token, account, entrypoint, amount, }) {
    const allowance = await client.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "allowance",
        args: [getAddress(account), getAddress(entrypoint)],
    });
    return allowance < amount;
}
export async function signIntent({ client, intentParams, }) {
    const { user, token, amount, intentAddress, deadline, chainId, contractAddress, } = intentParams;
    const domain = {
        name: "IntentEntrypoint",
        version: "1",
        chainId,
        verifyingContract: contractAddress, // ✅ This fixes the signature mismatch
    };
    const types = {
        Intent: [
            { name: "user", type: "address" },
            { name: "token", type: "address" },
            { name: "amount", type: "uint256" },
            { name: "intentAddress", type: "address" },
            { name: "deadline", type: "uint256" },
        ],
    };
    const message = {
        user: getAddress(user),
        token: getAddress(token),
        amount: BigInt(amount),
        intentAddress: getAddress(intentAddress),
        deadline: BigInt(deadline),
    };
    const signature = await client.signTypedData({
        account: client.account,
        domain,
        types,
        primaryType: "Intent",
        message,
    });
    const { v, r, s } = splitSignature(signature);
    return { signature, v, r, s };
}
