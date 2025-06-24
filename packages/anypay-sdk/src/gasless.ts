import {
  createPublicClient,
  createWalletClient,
  http,
  custom,
  encodeFunctionData,
  parseAbi,
  encodePacked,
  toHex,
  pad,
  parseEther,
  zeroAddress,
  parseGwei,
  type WalletClient,
  type Account,
  type Chain,
  type PublicClient,
} from "viem"
import { baseSepolia } from "viem/chains"
import type { UserOperation } from "viem/account-abstraction"
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts"
import { sendUserOperationDirectly } from "./sendUserOp.js"
import {
  createBundlerClient,
  createPaymasterClient,
  prepareUserOperation,
} from "viem/account-abstraction"
import { toSimpleSmartAccount } from "./toSimpleSmartAccount.js"
import { attemptSwitchChain } from "./chainSwitch.js"
const chain = baseSepolia

// --- Type declarations ---

declare global {
  interface Window {
    ethereum?: any
  }
}

export const ENTRYPOINT_ABI = [
  {
    name: "handleOps",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "ops",
        type: "tuple[]",
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          { name: "verificationGasLimit", type: "uint256" },
          { name: "preVerificationGas", type: "uint256" },
          { name: "maxFeePerGas", type: "uint256" },
          { name: "maxPriorityFeePerGas", type: "uint256" },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" },
        ],
      },
      {
        name: "beneficiary",
        type: "address",
      },
    ],
    outputs: [],
  },
  {
    name: "getUserOpHash",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        name: "userOp",
        type: "tuple",
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "accountGasLimits", type: "bytes32" },
          { name: "preVerificationGas", type: "uint256" },
          { name: "gasFees", type: "bytes32" },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
  },
]

// --- Constants ---

const RELAYER_PRIVATE_KEY = "" // This is for testing only

// --- Interfaces ---

interface PackedCall {
  to: `0x${string}`
  value: bigint
  gasLimit: bigint
  behaviorOnError: number
  data: `0x${string}`
}

interface Payload {
  kind: number
  noChainId: boolean
  space: number
  nonce: number
  parentWallets: string[]
  calls: PackedCall[]
}

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

const ENTRYPOINT_ADDRESS = "0x0000000071727de22e5e9d8baf0edac6f37da032"

// --- Payload packer ---

export function packPayload(payload: Payload): `0x${string}` {
  const globalFlag = 0x00
  const numCalls = payload.calls.length

  const encodedCalls = payload.calls.map((call) => {
    const callFlags = 0x4a // has value + gas limit + revert on error
    return encodePacked(
      ["uint8", "address", "uint256", "uint256", "bytes"],
      [callFlags, call.to, call.value, call.gasLimit, call.data],
    )
  })

  return encodePacked(
    ["uint8", "bytes20", "uint8", ...Array(numCalls).fill("bytes")],
    [
      globalFlag,
      pad(toHex(payload.space), { size: 20 }),
      numCalls,
      ...encodedCalls,
    ],
  )
}

// --- Main logic ---

export async function runGasless7702Flow(
  chain: Chain,
  tokenAddress: `0x${string}`,
  amount: bigint,
  recipient: `0x${string}`,
  paymasterUrl: string,
) {
  try {
    // Check if window.ethereum exists
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask or other Ethereum provider not found")
    }

    // Initialize clients
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })

    // Connect to MetaMask
    console.log("Connecting to MetaMask...")
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    const connectedAccount = accounts[0] as `0x${string}`
    console.log("Connected account:", connectedAccount)

    // Create delegator account from private key
    const delegatorPrivateKey = generatePrivateKey()
    const delegatorAccount = privateKeyToAccount(delegatorPrivateKey)
    console.log("Delegator account:", delegatorAccount.address)

    // Initialize delegator smart account
    console.log("Creating smart account...")
    const delegatorSmartAccount = await toSimpleSmartAccount({
      client: publicClient,
      entryPoint: {
        address: ENTRYPOINT_ADDRESS,
        version: "0.7",
      },
      owner: privateKeyToAccount(delegatorPrivateKey),
    })

    console.log("Smart account address:", delegatorSmartAccount.address)

    console.log("Transfer amount:", amount.toString())

    const { signature, deadline } = await getPermitSignature(
      publicClient,
      connectedAccount,
      delegatorSmartAccount.address,
      tokenAddress,
      amount,
    )

    console.log("Received signature:", signature)

    // Encode permit call
    const permitCalldata = getPermitCalldata(
      connectedAccount,
      delegatorSmartAccount.address,
      amount,
      deadline,
      signature,
    )

    console.log("delegatorSmartAccount.address", delegatorSmartAccount.address)

    // Create relayer wallet
    //  const relayerAccount = privateKeyToAccount(
    //     RELAYER_PRIVATE_KEY as `0x${string}`,
    //   )
    //   const relayerClient = createWalletClient({
    //     account: relayerAccount,
    //     chain,
    //     transport: http(),
    //   })

    //   console.log("Relayer address:", relayerAccount.address)

    // console.log('Staking on entry point...')
    // await stakeOnEntryPoint(relayerClient, relayerAccount, delegatorAccount.address)

    // const prefundTx = await relayerClient.sendTransaction({
    //   to: delegatorSmartAccount.address,
    //   value: parseEther('0.0005'),
    //   chain: chain
    // });

    // console.log('Prefund tx:', prefundTx);

    // const prefundReceipt = await publicClient.waitForTransactionReceipt({ hash: prefundTx });
    // console.log('Prefund receipt:', prefundReceipt);

    // Encode transferFrom call
    const transferFromCalldata = getTransferFromCalldata(
      connectedAccount,
      delegatorSmartAccount.address,
      amount,
    )

    // Encode transfer call to recipient
    const transferCalldata = getTransferCalldata(recipient, amount)

    console.log("Estimating gas fees...")
    const fees = await publicClient.estimateFeesPerGas()

    const maxPriorityFeePerGas = parseGwei("1") // adjustable
    const maxFeePerGas = fees.maxFeePerGas! + maxPriorityFeePerGas

    const calls = [
      { to: zeroAddress, data: "0x" },
      { to: tokenAddress, data: permitCalldata },
      { to: tokenAddress, data: transferFromCalldata },
      { to: tokenAddress, data: transferCalldata },
    ]

    if (paymasterUrl) {
      // alchemy bundler doesn't support paymaster client
      if (paymasterUrl.includes("alchemy")) {
        const bundlerClient = createBundlerClient({
          chain: chain,
          transport: http(paymasterUrl),
        })

        console.log("preparing user op")

        const userOp1 = await prepareUserOperation(publicClient, {
          account: delegatorSmartAccount,
          calls,
          maxFeePerGas,
          maxPriorityFeePerGas,
          callGasLimit: 500_000n,
          verificationGasLimit: 500_000n,
          preVerificationGas: 500_000n,
        })

        console.log("here0000", userOp1)

        const signedUserOp1 =
          await delegatorSmartAccount.signUserOperation(userOp1)
        ;(userOp1 as any).signature = signedUserOp1

        console.log("Signed user operation:", signedUserOp1)

        console.log("Sending user operation...")
        const hash = await bundlerClient.sendUserOperation(userOp1)
        console.log("User operation sent! Hash:", hash)
        const receipt = await bundlerClient.waitForUserOperationReceipt({
          hash: hash as `0x${string}`,
        })

        console.log("User operation receipt:", receipt)

        return receipt.receipt.transactionHash
      } else {
        // other bundlers: thirdweb, pimlico, zerodev, etc
        const paymasterClient = createPaymasterClient({
          transport: http(paymasterUrl),
        })

        const bundlerClient = createBundlerClient({
          chain: chain,
          paymaster: paymasterClient,
          transport: http(paymasterUrl),
        })

        console.log("preparing user op")

        const userOp0 = await prepareUserOperation(publicClient, {
          account: delegatorSmartAccount,
          calls,
          maxFeePerGas,
          maxPriorityFeePerGas,
          callGasLimit: 500_000n,
          verificationGasLimit: 500_000n,
          preVerificationGas: 500_000n,
        })

        console.log("here0000", userOp0)

        const userOp1 = await bundlerClient.prepareUserOperation({
          ...userOp0,
        })

        console.log("preparedUserOp", userOp1)

        const signedUserOp1 =
          await delegatorSmartAccount.signUserOperation(userOp1)
        ;(userOp1 as any).signature = signedUserOp1

        console.log("Signed user operation:", signedUserOp1)

        console.log("Sending user operation...")
        const hash = await bundlerClient.sendUserOperation(userOp1)
        console.log("User operation sent! Hash:", hash)
        const receipt = await bundlerClient.waitForUserOperationReceipt({
          hash: hash as `0x${string}`,
        })

        console.log("User operation receipt:", receipt)

        return receipt.receipt.transactionHash
      }
    } else {
      console.log("preparing user op")
      const userOp1 = await prepareUserOperation(publicClient, {
        account: delegatorSmartAccount,
        calls,
        maxFeePerGas,
        maxPriorityFeePerGas,
        callGasLimit: 500_000n,
        verificationGasLimit: 500_000n,
        preVerificationGas: 500_000n,
        paymasterAndData: "0x",
      })

      console.log("preparedUserOp", userOp1)

      const requiredPrefund = getRequiredPrefund(userOp1)
      console.log("Required prefund:", requiredPrefund)

      const balance = await publicClient.getBalance({
        address: delegatorSmartAccount.address,
      })
      console.log("Balance:", balance)

      const signedUserOp1 =
        await delegatorSmartAccount.signUserOperation(userOp1)
      ;(userOp1 as any).signature = signedUserOp1

      console.log("Signed user operation:", signedUserOp1)

      const txHash = await sendUserOperationDirectly({
        userOp: userOp1,
        signedUserOp: signedUserOp1,
        relayerPrivateKey: RELAYER_PRIVATE_KEY as `0x${string}`,
        chain: chain,
      })

      console.log("User operation submitted! Hash:", txHash)

      return txHash
    }
  } catch (error) {
    console.error("Gasless flow error:", error)
    throw error
  }
}

async function stakeOnEntryPoint(
  relayerClient: WalletClient,
  relayerAccount: Account,
  delegatorAddress: `0x${string}`,
) {
  const STAKE_AMOUNT = parseEther("0.01")

  const addStakeAbi = parseAbi([
    "function addStake(uint32 unstakeDelaySec) public payable",
    "function depositTo(address to) public payable",
  ])

  // const addStakeData = encodeFunctionData({
  //   abi: addStakeAbi,
  //   functionName: "addStake",
  //   args: [95000] // unstakeDelaySec needs to be 1 day minimum
  // })

  // const txHash = await relayerClient.sendTransaction({
  //     account: relayerAccount,
  //     to: ENTRYPOINT_ADDRESS,
  //     data: addStakeData,
  //     value: STAKE_AMOUNT,
  //     chain: chain,
  // })

  // console.log(`[Stake] Transaction sent: ${txHash}`)

  // const receipt = await relayerClient.waitForTransactionReceipt({ hash: txHash })
  // console.log(`[Stake] Transaction receipt: ${receipt}`)

  const depositData = encodeFunctionData({
    abi: addStakeAbi,
    functionName: "depositTo",
    args: [delegatorAddress],
  })

  const txHash2 = await relayerClient.sendTransaction({
    account: relayerAccount,
    to: ENTRYPOINT_ADDRESS,
    value: STAKE_AMOUNT,
    data: depositData,
    chain: chain,
  })

  console.log(`[Stake] Transaction sent: ${txHash2}`)

  return txHash2
}

export const getRequiredPrefund = (userOperation: UserOperation) => {
  const op = userOperation

  const requiredGas =
    op.verificationGasLimit +
    op.callGasLimit +
    (op.paymasterVerificationGasLimit || 0n) +
    (op.paymasterPostOpGasLimit || 0n) +
    op.preVerificationGas

  return requiredGas * op.maxFeePerGas
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
  connectedAccount: `0x${string}`,
  delegatorSmartAccountAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  amount: bigint,
) {
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

  const walletClient = createWalletClient({
    account: connectedAccount,
    chain,
    transport: custom(window.ethereum),
  })

  await attemptSwitchChain(walletClient, chain.id)

  console.log("Requesting permit signature...")

  const signature = await walletClient.signTypedData({
    domain,
    types,
    primaryType: "Permit",
    message: permitData,
  })

  return { signature, deadline }
}
