import type {
  Account,
  Address,
  Chain,
  Hex,
  PublicClient,
  WalletClient,
} from "viem"
import {
  encodeFunctionData,
  erc20Abi,
  getAddress,
  maxUint256,
  parseAbi,
} from "viem"
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

export function splitSignature(signature: `0x${string}`) {
  const sig = signature.slice(2)
  const r = `0x${sig.slice(0, 64)}` as `0x${string}`
  const s = `0x${sig.slice(64, 128)}` as `0x${string}`
  const v = parseInt(sig.slice(128, 130), 16)
  return { r, s, v }
}

export function getPermitCalldata(
  connectedAccount: `0x${string}`,
  spender: `0x${string}`,
  amount: bigint,
  deadline: bigint,
  signature: `0x${string}`,
) {
  const { r, s, v } = splitSignature(signature)
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
  deadline: bigint = BigInt(Math.floor(Date.now() / 1000) + 3600), // 1 hour from now
) {
  if (!walletClient.account) {
    throw new Error("No account found")
  }

  // Get permit signature from connected account
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

  const { v, r, s } = splitSignature(signature)

  return { signature, deadline, v, r, s }
}

export function getDepositToIntentWithPermitCalldata(params: {
  user: `0x${string}`
  token: `0x${string}`
  amount: bigint
  intentAddress: `0x${string}`
  deadline: bigint
  permitAmount: bigint
  // permit signature
  v: number
  r: `0x${string}`
  s: `0x${string}`
  // intent signature
  sigV: number
  sigR: `0x${string}`
  sigS: `0x${string}`
}): Hex {
  const abi = parseAbi([
    "function depositToIntentWithPermit(address user, address token, uint256 amount, uint256 permitAmount, address intentAddress, uint256 deadline, uint8 v, bytes32 r, bytes32 s, uint8 sigV, bytes32 sigR, bytes32 sigS)",
  ])

  const {
    user,
    token,
    amount,
    permitAmount,
    intentAddress,
    deadline,
    v,
    r,
    s, // permit signature
    sigV,
    sigR,
    sigS, // intent signature
  } = params

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
  })
}

export function getDepositToIntentWithoutPermitCalldata(params: {
  user: `0x${string}`
  token: `0x${string}`
  amount: bigint
  intentAddress: `0x${string}`
  deadline: bigint
  sigV: number
  sigR: `0x${string}`
  sigS: `0x${string}`
}): Hex {
  const abi = parseAbi([
    "function depositToIntent(address user, address token, uint256 amount, address intentAddress, uint256 deadline, uint8 sigV, bytes32 sigR, bytes32 sigS)",
  ])

  const { user, token, amount, intentAddress, deadline, sigV, sigR, sigS } =
    params

  return encodeFunctionData({
    abi,
    functionName: "depositToIntent",
    args: [user, token, amount, intentAddress, deadline, sigV, sigR, sigS],
  })
}

export async function getDepositToIntentCalls({
  publicClient,
  walletClient,
  account,
  intentEntrypoint,
  depositTokenAddress,
  depositTokenAmount,
  depositRecipient,
  chain,
}: {
  publicClient: PublicClient
  walletClient: WalletClient
  account: Account
  intentEntrypoint: `0x${string}`
  depositTokenAddress: `0x${string}`
  depositTokenAmount: bigint
  depositRecipient: `0x${string}`
  chain: Chain
}): Promise<
  Array<{ to: `0x${string}`; data: `0x${string}`; value: `0x${string}` }>
> {
  const permitAmount = maxUint256
  const needsApproval = await getNeedsIntentEntrypointApproval({
    client: publicClient,
    token: depositTokenAddress,
    account: account.address,
    entrypoint: intentEntrypoint,
    amount: BigInt(depositTokenAmount),
  })

  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600) // 1 hour from now

  let approvalSignature = null
  if (needsApproval) {
    approvalSignature = await getPermitSignature(
      publicClient as PublicClient,
      walletClient,
      account.address,
      intentEntrypoint,
      depositTokenAddress as `0x${string}`,
      permitAmount,
      chain,
      deadline,
    )
  }

  const {
    v: signedIntentV,
    r: signedIntentR,
    s: signedIntentS,
  } = await signIntent(walletClient, {
    user: account.address,
    token: depositTokenAddress as `0x${string}`,
    amount: BigInt(depositTokenAmount),
    intentAddress: depositRecipient as `0x${string}`,
    deadline,
    chainId: chain.id,
    contractAddress: intentEntrypoint,
  })

  let calldata = null
  if (approvalSignature) {
    calldata = getDepositToIntentWithPermitCalldata({
      user: account.address,
      token: depositTokenAddress as `0x${string}`,
      amount: BigInt(depositTokenAmount),
      permitAmount,
      intentAddress: depositRecipient as `0x${string}`,
      deadline,
      v: approvalSignature.v,
      r: approvalSignature.r,
      s: approvalSignature.s,
      sigV: signedIntentV,
      sigR: signedIntentR,
      sigS: signedIntentS,
    })
  } else {
    calldata = getDepositToIntentWithoutPermitCalldata({
      user: account.address,
      token: depositTokenAddress as `0x${string}`,
      amount: BigInt(depositTokenAmount),
      intentAddress: depositRecipient as `0x${string}`,
      deadline,
      sigV: signedIntentV,
      sigR: signedIntentR,
      sigS: signedIntentS,
    })
  }

  const calls = [
    {
      to: intentEntrypoint as `0x${string}`,
      data: calldata as `0x${string}`,
      value: "0" as `0x${string}`,
    },
  ]

  return calls
}

export async function getNeedsIntentEntrypointApproval({
  client,
  token,
  account,
  entrypoint,
  amount,
}: {
  client: PublicClient
  token: Address
  account: Address
  entrypoint: Address
  amount: bigint
}): Promise<boolean> {
  console.log(client.chain)
  const allowance = await client.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: [getAddress(account), getAddress(entrypoint)],
  })

  return allowance < amount
}

export async function signIntent(
  client: WalletClient,
  {
    user,
    token,
    amount,
    intentAddress,
    deadline,
    chainId,
    contractAddress,
  }: {
    user: `0x${string}`
    token: `0x${string}`
    amount: bigint
    intentAddress: `0x${string}`
    deadline: bigint
    chainId: number
    contractAddress: `0x${string}`
  },
): Promise<{
  signature: `0x${string}`
  v: number
  r: `0x${string}`
  s: `0x${string}`
}> {
  const domain = {
    name: "IntentEntrypoint",
    version: "1",
    chainId,
    verifyingContract: contractAddress, // ✅ This fixes the signature mismatch
  }

  const types = {
    Intent: [
      { name: "user", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "intentAddress", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
  }

  const message = {
    user: getAddress(user),
    token: getAddress(token),
    amount: BigInt(amount),
    intentAddress: getAddress(intentAddress),
    deadline: BigInt(deadline),
  }

  const signature = await client.signTypedData({
    account: client.account as Account,
    domain,
    types,
    primaryType: "Intent",
    message,
  })

  const { v, r, s } = splitSignature(signature)

  return { signature, v, r, s }
}
