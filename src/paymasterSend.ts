import type { Account, Chain, WalletClient } from "viem"
import {
  createPublicClient,
  encodeFunctionData,
  encodePacked,
  http,
  pad,
  parseAbi,
  parseEther,
  parseGwei,
  toHex,
  zeroAddress,
} from "viem"
import type { UserOperation } from "viem/account-abstraction"
import {
  createBundlerClient,
  createPaymasterClient,
  prepareUserOperation,
} from "viem/account-abstraction"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import {
  getPermitCalldata,
  getPermitSignature,
  getTransferCalldata,
  getTransferFromCalldata,
} from "./gasless.js"
import { sendUserOperationDirectly } from "./sendUserOp.js"
import { toSimpleSmartAccount } from "./toSimpleSmartAccount.js"

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

type UserOpWithSignature = UserOperation & { signature: `0x${string}` }

// --- ABIs ---

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

export async function sendPaymasterGaslessTransaction(
  walletClient: WalletClient,
  chain: Chain,
  tokenAddress: `0x${string}`,
  amount: bigint,
  recipient: `0x${string}`,
  paymasterUrl: string,
) {
  try {
    // Initialize clients
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })

    if (!walletClient.account) {
      throw new Error("No account found")
    }

    const connectedAccount = walletClient.account.address as `0x${string}`

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
      walletClient,
      connectedAccount,
      delegatorSmartAccount.address,
      tokenAddress,
      amount,
      chain,
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

        const userOp = await prepareUserOperation(publicClient, {
          account: delegatorSmartAccount,
          calls,
          maxFeePerGas,
          maxPriorityFeePerGas,
          callGasLimit: 500_000n,
          verificationGasLimit: 500_000n,
          preVerificationGas: 500_000n,
        })

        const signedUserOp =
          await delegatorSmartAccount.signUserOperation(userOp)
        ;(userOp as UserOpWithSignature).signature = signedUserOp

        console.log("Signed user operation:", signedUserOp)

        console.log("Sending user operation...")
        const hash = await bundlerClient.sendUserOperation(userOp)
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

        let userOp = await prepareUserOperation(publicClient, {
          account: delegatorSmartAccount,
          calls,
          maxFeePerGas,
          maxPriorityFeePerGas,
          callGasLimit: 500_000n,
          verificationGasLimit: 500_000n,
          preVerificationGas: 500_000n,
        })

        // Add paymaster data
        userOp = await bundlerClient.prepareUserOperation({
          ...userOp,
        })

        console.log("preparedUserOp", userOp)

        const signedUserOp =
          await delegatorSmartAccount.signUserOperation(userOp)
        ;(userOp as UserOpWithSignature).signature = signedUserOp

        console.log("Signed user operation:", signedUserOp)

        console.log("Sending user operation...")
        const hash = await bundlerClient.sendUserOperation(userOp)
        console.log("User operation sent! Hash:", hash)
        const receipt = await bundlerClient.waitForUserOperationReceipt({
          hash: hash as `0x${string}`,
        })

        console.log("User operation receipt:", receipt)

        return receipt.receipt.transactionHash
      }
    } else {
      // --- Send user operation directly ---
      const RELAYER_PRIVATE_KEY = "" // This is for testing only

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
      ;(userOp1 as UserOpWithSignature).signature = signedUserOp1

      console.log("Signed user operation:", signedUserOp1)

      const txHash = await sendUserOperationDirectly({
        userOp: userOp1,
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

export async function stakeOnEntryPoint(
  relayerClient: WalletClient,
  relayerAccount: Account,
  delegatorAddress: `0x${string}`,
  chain: Chain,
) {
  const STAKE_AMOUNT = parseEther("0.01")

  const addStakeAbi = parseAbi([
    "function addStake(uint32 unstakeDelaySec) public payable",
    "function depositTo(address to) public payable",
  ])

  const shouldStake = false
  if (shouldStake) {
    const addStakeData = encodeFunctionData({
      abi: addStakeAbi,
      functionName: "addStake",
      args: [95000], // unstakeDelaySec needs to be 1 day minimum
    })

    const txHash = await relayerClient.sendTransaction({
      account: relayerAccount,
      to: ENTRYPOINT_ADDRESS,
      data: addStakeData,
      value: STAKE_AMOUNT,
      chain: chain,
    })

    console.log(`[Stake] Transaction sent: ${txHash}`)

    // const receipt = await relayerClient.waitForTransactionReceipt({ hash: txHash })
    // console.log(`[Stake] Transaction receipt: ${receipt}`)
  }

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
