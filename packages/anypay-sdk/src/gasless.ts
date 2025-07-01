import type { Chain, PublicClient, WalletClient } from "viem"
import { encodeFunctionData } from "viem"
import { attemptSwitchChain } from "./chainSwitch.js"

// --- ABIs ---

const PERMIT_ABI = {
  name: "permit",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "v", type: "uint8" },
    { name: "r", type: "bytes32" },
    { name: "s", type: "bytes32" },
  ],
  outputs: [],
}

const TRANSFER_FROM_ABI = {
  name: "transferFrom",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "amount", type: "uint256" },
  ],
  outputs: [{ name: "", type: "bool" }],
}

const TRANSFER_ABI = {
  name: "transfer",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [
    { name: "to", type: "address" },
    { name: "amount", type: "uint256" },
  ],
  outputs: [{ name: "", type: "bool" }],
}

export function getPermitCalldata(
  connectedAccount: `0x${string}`,
  spender: `0x${string}`,
  amount: bigint,
  deadline: bigint,
  signature: `0x${string}`,
) {
  // Split signature into v, r, s
  const sig = signature.slice(2)
  const r = `0x${sig.slice(0, 64)}` as `0x${string}`
  const s = `0x${sig.slice(64, 128)}` as `0x${string}`
  const v = parseInt(sig.slice(128, 130), 16)
  console.log("Split signature:", { r, s, v })

  // Encode permit call
  const permitCalldata = encodeFunctionData({
    abi: [PERMIT_ABI],
    functionName: "permit",
    args: [connectedAccount, spender, amount, deadline, v, r, s],
  })

  return permitCalldata
}

export function getTransferFromCalldata(
  connectedAccount: `0x${string}`,
  spender: `0x${string}`,
  amount: bigint,
) {
  // Encode transferFrom call
  const transferFromCalldata = encodeFunctionData({
    abi: [TRANSFER_FROM_ABI],
    functionName: "transferFrom",
    args: [connectedAccount, spender, amount],
  })

  return transferFromCalldata
}

export function getTransferCalldata(recipient: `0x${string}`, amount: bigint) {
  // Encode transfer call to recipient
  const transferCalldata = encodeFunctionData({
    abi: [TRANSFER_ABI],
    functionName: "transfer",
    args: [recipient, amount],
  })

  return transferCalldata
}

export function getPermitCalls(
  connectedAccount: `0x${string}`,
  delegatorSmartAccountAddress: `0x${string}`,
  amount: bigint,
  deadline: bigint,
  signature: `0x${string}`,
  recipient: `0x${string}`,
  tokenAddress: `0x${string}`,
) {
  const permitCalldata = getPermitCalldata(
    connectedAccount,
    delegatorSmartAccountAddress,
    amount,
    deadline,
    signature,
  )
  const transferFromCalldata = getTransferFromCalldata(
    connectedAccount,
    delegatorSmartAccountAddress,
    amount,
  )
  const transferCalldata = getTransferCalldata(recipient, amount)

  return [permitCalldata, transferFromCalldata, transferCalldata].map(
    (call) => ({
      to: tokenAddress,
      data: call,
      value: "0",
    }),
  )
}

export async function getPermitSignature(
  publicClient: PublicClient,
  walletClient: WalletClient,
  connectedAccount: `0x${string}`,
  delegatorSmartAccountAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  amount: bigint,
  chain: Chain,
) {
  if (!walletClient.account) {
    throw new Error("No account found")
  }

  // Get permit signature from connected account
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600) // 1 hour from now
  const nonce = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
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
    args: [connectedAccount],
  })

  console.log("Nonce:", nonce.toString())

  const name = (await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
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
  })) as string

  let version = "1" // fallback default
  try {
    version = (await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
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
    })) as string
  } catch {
    console.warn('Token does not implement version(), defaulting to "1"')
  }

  const domain = {
    name,
    version,
    chainId: chain.id,
    verifyingContract: tokenAddress as `0x${string}`,
  }

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  }

  // Create permit data
  const permitData = {
    owner: connectedAccount,
    spender: delegatorSmartAccountAddress,
    value: amount,
    nonce: nonce,
    deadline: deadline,
  }

  await attemptSwitchChain(walletClient, chain.id)

  console.log("Requesting permit signature...")

  const signature = await walletClient.signTypedData({
    account: walletClient.account,
    domain,
    types,
    primaryType: "Permit",
    message: permitData,
  })

  return { signature, deadline }
}
