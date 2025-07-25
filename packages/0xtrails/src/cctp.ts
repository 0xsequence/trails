import type { Chain, PublicClient, WalletClient } from "viem"
import {
  createPublicClient,
  encodeFunctionData,
  erc20Abi,
  getAddress,
  http,
  maxUint256,
} from "viem"
import * as chains from "viem/chains"
import { attemptSwitchChain } from "./chainSwitch.js"
import { getIsTestnetChainId } from "./chains.js"

const domains: Record<number, number> = {
  [chains.mainnet.id]: 0,
  [chains.sepolia.id]: 0,
  [chains.avalanche.id]: 1,
  [chains.avalancheFuji.id]: 1,
  [chains.optimism.id]: 2,
  [chains.optimismSepolia.id]: 2,
  [chains.arbitrum.id]: 3,
  [chains.arbitrumSepolia.id]: 3,
  [chains.base.id]: 6,
  [chains.baseSepolia.id]: 6,
  [chains.polygon.id]: 7,
  [chains.polygonAmoy.id]: 7,
  [chains.unichain.id]: 10,
  [chains.unichainSepolia.id]: 10,
  [chains.linea.id]: 11,
  [chains.lineaSepolia.id]: 11,
  [chains.worldchain.id]: 14,
  [chains.worldchainSepolia.id]: 14,
}

const tokenAddresses: Record<number, string> = {
  [chains.mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [chains.sepolia.id]: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
  [chains.avalanche.id]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  [chains.avalancheFuji.id]: "0x5425890298aed601595a70AB815c96711a31Bc65",
  [chains.optimism.id]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  [chains.optimismSepolia.id]: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
  [chains.arbitrum.id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  [chains.arbitrumSepolia.id]: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
  [chains.base.id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  [chains.baseSepolia.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  [chains.polygon.id]: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  [chains.polygonAmoy.id]: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
  [chains.unichain.id]: "0x078D782b760474a361dDA0AF3839290b0EF57AD6",
  [chains.unichainSepolia.id]: "0x31d0220469e10c4E71834a79b1f276d740d3768F",
  [chains.linea.id]: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
  [chains.lineaSepolia.id]: "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7",
  [chains.worldchain.id]: "0x79A02482A880bCe3F13E09da970dC34dB4cD24D1",
  [chains.worldchainSepolia.id]: "0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88",
}

const tokenMessengers: Record<number, string> = {
  [chains.mainnet.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.sepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.avalanche.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.avalancheFuji.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.optimism.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.optimismSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.arbitrum.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.arbitrumSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.base.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.baseSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.polygon.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.polygonAmoy.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.unichain.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.unichainSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.linea.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.lineaSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [chains.worldchain.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [chains.worldchainSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
}

const messageTransmitters: Record<number, string> = {
  [chains.mainnet.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.sepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.avalanche.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.avalancheFuji.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.optimism.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.optimismSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.arbitrum.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.arbitrumSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.base.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.baseSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.polygon.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.polygonAmoy.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.unichain.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.unichainSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.linea.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.lineaSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [chains.worldchain.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [chains.worldchainSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
}

const customCctpRelayerAddress: Record<number, string> = {
  //[chains.arbitrumSepolia.id]: "0x58FEFe8A057E736CD361272BA2283DAfD8646198",
  [chains.arbitrumSepolia.id]: "0x05F3AcC7a7BB0e888Bb1bDE014bD61AfAfaC6943",
}

export type Attestation = {
  attestation: `0x${string}`
  message: `0x${string}`
}

export function getDomain(chainId: number): number | null {
  return domains[chainId] ?? null
}

export function getUSDCTokenAddress(chainId: number): string | null {
  return tokenAddresses[chainId] ?? null
}

export function getTokenMessenger(chainId: number): string | null {
  return tokenMessengers[chainId] ?? null
}

export function getMessageTransmitter(chainId: number): string | null {
  return messageTransmitters[chainId] ?? null
}

export async function cctpTransfer({
  walletClient,
  originChain,
  destinationChain,
  amount,
}: {
  walletClient: WalletClient
  originChain: Chain
  destinationChain: Chain
  amount: bigint
}): Promise<{
  waitForAttestation: () => Promise<Attestation>
  txHash: `0x${string}`
}> {
  const originToken = getUSDCTokenAddress(originChain.id)
  const originDomain = getDomain(originChain.id)
  const destinationDomain = getDomain(destinationChain.id)
  const originTokenMessenger = getTokenMessenger(originChain.id)
  const destinationAddress = walletClient.account?.address

  if (
    !originToken ||
    originDomain === null ||
    !originTokenMessenger ||
    destinationDomain === null ||
    !destinationAddress
  ) {
    console.error("[trails-sdk] cctpTransfer: Invalid origin chain config", {
      originToken,
      originDomain,
      originTokenMessenger,
      destinationDomain,
      destinationAddress,
    })
    throw new Error("Invalid origin chain config")
  }

  const originClient = createPublicClient({
    chain: originChain,
    transport: http(),
  })

  await attemptSwitchChain({
    walletClient,
    desiredChainId: originChain.id,
  })

  const account = walletClient.account?.address
  if (!account) {
    throw new Error("No account found")
  }

  const needsApproval = await getNeedsApproval({
    publicClient: originClient,
    token: originToken,
    account,
    spender: originTokenMessenger,
    amount: amount,
  })

  if (needsApproval) {
    const txHash = await approveERC20({
      walletClient,
      tokenAddress: originToken,
      spender: originTokenMessenger,
      amount: maxUint256,
      chain: originChain,
    })

    console.log("waiting for approve", txHash)
    await originClient.waitForTransactionReceipt({
      hash: txHash,
    })
    console.log("approve done")
  }

  const maxFee = getMaxFee()

  const txHash = await burnUSDC({
    walletClient,
    tokenMessenger: originTokenMessenger,
    destinationDomain,
    destinationAddress,
    amount,
    burnToken: originToken,
    maxFee,
    chain: originChain,
  })

  return {
    waitForAttestation: async () => {
      await originClient.waitForTransactionReceipt({
        hash: txHash,
      })

      const testnet = getIsTestnetChainId(originChain.id)

      const attestation = await waitForAttestation({
        domain: originDomain,
        transactionHash: txHash,
        testnet,
      })

      if (!attestation) {
        throw new Error("Failed to retrieve attestation")
      }

      return attestation
    },
    txHash: txHash,
  }
}

export async function cctpDestinationTx({
  relayerClient,
  destinationChain,
  attestation,
}: {
  relayerClient: WalletClient
  destinationChain: Chain
  attestation: Attestation
}): Promise<`0x${string}`> {
  const destinationTokenMessenger = getMessageTransmitter(destinationChain.id)

  if (!destinationTokenMessenger) {
    throw new Error("Invalid destination chain")
  }

  await attemptSwitchChain({
    walletClient: relayerClient,
    desiredChainId: destinationChain.id,
  })

  const txHash = await mintUSDC({
    walletClient: relayerClient,
    tokenMessenger: destinationTokenMessenger,
    attestation,
    chain: destinationChain,
  })

  console.log("[trails-sdk] minted USDC")
  return txHash
}

export function getMaxFee(): bigint {
  return 500n // Set fast transfer max fee in 10^6 subunits (0.0005 USDC; change as needed)
}

export async function getNeedsApproval({
  publicClient,
  token,
  account,
  spender,
  amount,
}: {
  publicClient: PublicClient
  token: string
  account: string
  spender: string
  amount: bigint
}): Promise<boolean> {
  const allowance = await publicClient.readContract({
    address: token as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [getAddress(account), getAddress(spender)],
  })

  return allowance < amount
}

export async function approveERC20({
  walletClient,
  tokenAddress,
  spender,
  amount,
  chain,
}: {
  walletClient: WalletClient
  tokenAddress: string
  spender: string
  amount: bigint
  chain: Chain
}): Promise<`0x${string}`> {
  const approvalData = await getApproveERC20Data({
    tokenAddress,
    spender,
    amount,
  })

  console.log("[trails-sdk] approving ERC20 transfer", approvalData)

  await attemptSwitchChain({
    walletClient,
    desiredChainId: chain.id,
  })

  const account = walletClient.account?.address
  if (!account) {
    throw new Error("No account found")
  }

  return walletClient.sendTransaction({
    ...approvalData,
    account: account as `0x${string}`,
    chain,
  })
}

async function getApproveERC20Data({
  tokenAddress,
  spender,
  amount,
}: {
  tokenAddress: string
  spender: string
  amount: bigint
}): Promise<{ to: `0x${string}`; data: `0x${string}`; value: bigint }> {
  console.log("[trails-sdk] get approve ERC20 transfer data", {
    tokenAddress,
    spender,
    amount,
  })
  return {
    to: tokenAddress as `0x${string}`,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: [
        {
          type: "function",
          name: "approve",
          stateMutability: "nonpayable",
          inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" },
          ],
          outputs: [{ name: "", type: "bool" }],
        },
      ],
      functionName: "approve",
      args: [spender as `0x${string}`, amount],
    }),
  }
}

export async function burnUSDC({
  walletClient,
  tokenMessenger,
  destinationDomain,
  destinationAddress,
  amount,
  burnToken,
  maxFee,
  chain,
}: {
  walletClient: WalletClient
  tokenMessenger: string
  destinationDomain: number
  destinationAddress: string
  amount: bigint
  burnToken: string
  maxFee: bigint
  chain: Chain
}): Promise<`0x${string}`> {
  const burnData = await getBurnUSDCData({
    tokenMessenger,
    destinationDomain,
    destinationAddress,
    amount,
    burnToken,
    maxFee: maxFee,
  })

  await attemptSwitchChain({
    walletClient,
    desiredChainId: chain.id,
  })

  const account = walletClient.account?.address
  if (!account) {
    throw new Error("No account found")
  }

  return walletClient.sendTransaction({
    ...burnData,
    account: account as `0x${string}`,
    chain,
  })
}

export async function getBurnUSDCData({
  tokenMessenger,
  destinationDomain,
  destinationAddress,
  amount,
  burnToken,
  maxFee,
}: {
  tokenMessenger: string
  destinationDomain: number
  destinationAddress: string
  amount: bigint
  burnToken: string
  maxFee: bigint
}): Promise<{ to: `0x${string}`; data: `0x${string}`; value: bigint }> {
  console.log("[trails-sdk] get burn USDC data", {
    tokenMessenger,
    destinationDomain,
    destinationAddress,
    amount,
    burnToken,
    maxFee,
  })
  // Bytes32 Formatted Parameters
  const DESTINATION_ADDRESS_BYTES32 = `0x000000000000000000000000${destinationAddress.slice(2)}` // Destination address in bytes32 format
  const DESTINATION_CALLER_BYTES32 =
    "0x0000000000000000000000000000000000000000000000000000000000000000" // Empty bytes32 allows any address to call MessageTransmitterV2.receiveMessage()

  return {
    to: tokenMessenger as `0x${string}`,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: [
        {
          type: "function",
          name: "depositForBurn",
          stateMutability: "nonpayable",
          inputs: [
            { name: "amount", type: "uint256" },
            { name: "destinationDomain", type: "uint32" },
            { name: "mintRecipient", type: "bytes32" },
            { name: "burnToken", type: "address" },
            { name: "destinationCaller", type: "bytes32" },
            { name: "maxFee", type: "uint256" },
            { name: "minFinalityThreshold", type: "uint32" },
          ],
          outputs: [],
        },
      ],
      functionName: "depositForBurn",
      args: [
        amount,
        destinationDomain,
        DESTINATION_ADDRESS_BYTES32 as `0x${string}`,
        burnToken as `0x${string}`,
        DESTINATION_CALLER_BYTES32 as `0x${string}`,
        maxFee,
        1000, // minFinalityThreshold (1000 or less for Fast Transfer)
      ],
    }),
  }
}

export async function retrieveAttestation({
  domain,
  transactionHash,
  testnet,
}: {
  domain: number
  transactionHash: `0x${string}`
  testnet: boolean
}): Promise<Attestation | null> {
  console.log("[trails-sdk] retrieving attestation", {
    domain,
    transactionHash,
  })
  const url = `https://iris-api${testnet ? "-sandbox" : ""}.circle.com/v2/messages/${domain}?transactionHash=${transactionHash}`
  while (true) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.status === 404) {
        console.log("[trails-sdk] waiting for attestation...")
      }
      if (data?.messages?.[0]?.status === "complete") {
        console.log("[trails-sdk] attestation retrieved successfully!")
        return data.messages[0]
      }
      console.log("[trails-sdk] waiting for attestation...")
      await new Promise((resolve) => setTimeout(resolve, 5000))
    } catch (error: unknown) {
      console.error(
        "[trails-sdk] error fetching attestation:",
        error instanceof Error ? error.message : String(error),
      )
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }
}

export async function mintUSDC({
  walletClient,
  tokenMessenger,
  attestation,
  chain,
}: {
  walletClient: WalletClient
  tokenMessenger: string
  attestation: Attestation
  chain: Chain
}): Promise<`0x${string}`> {
  const mintData = await getMintUSDCData({
    tokenMessenger,
    attestation,
  })

  await attemptSwitchChain({
    walletClient,
    desiredChainId: chain.id,
  })

  const account = walletClient.account?.address
  if (!account) {
    throw new Error("No account found")
  }

  return walletClient.sendTransaction({
    ...mintData,
    account: account as `0x${string}`,
    chain,
  })
}

export async function getMintUSDCData({
  tokenMessenger,
  attestation,
}: {
  tokenMessenger: string
  attestation: Attestation
}): Promise<{ to: `0x${string}`; data: `0x${string}`; value: bigint }> {
  console.log("[trails-sdk] get mint USDC data", {
    tokenMessenger,
    attestation,
  })
  return {
    to: tokenMessenger as `0x${string}`,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: [
        {
          type: "function",
          name: "receiveMessage",
          stateMutability: "nonpayable",
          inputs: [
            { name: "message", type: "bytes" },
            { name: "attestation", type: "bytes" },
          ],
          outputs: [],
        },
      ],
      functionName: "receiveMessage",
      args: [attestation.message, attestation.attestation],
    }),
  }
}

export async function waitForAttestation({
  domain,
  transactionHash,
  testnet,
}: {
  domain: number
  transactionHash: `0x${string}`
  testnet: boolean
}): Promise<Attestation | null> {
  while (true) {
    const attestation = await retrieveAttestation({
      domain,
      transactionHash,
      testnet,
    })
    if (attestation) {
      return attestation
    }
    console.log("[trails-sdk] waiting for attestation...")
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

export function getIsUsdcAddress(address: string, chainId: number): boolean {
  return address?.toLowerCase() === tokenAddresses[chainId]?.toLowerCase()
}

export async function cctpTransferWithCustomCall({
  walletClient,
  originChain,
  destinationChain,
  amount,
}: {
  walletClient: WalletClient
  originChain: Chain
  destinationChain: Chain
  amount: bigint
}): Promise<{
  waitForAttestation: () => Promise<Attestation>
  txHash: `0x${string}`
}> {
  const destinationContract = customCctpRelayerAddress[destinationChain.id]
  if (!destinationContract) {
    console.error(
      "[trails-sdk] cctpTransferWithCustomCall: No custom CCTP relayer address found for this chain",
      {
        originChain,
        destinationChain,
      },
    )
    throw new Error("No custom CCTP relayer address found for this chain")
  }

  const originToken = getUSDCTokenAddress(originChain.id)
  const originDomain = getDomain(originChain.id)
  const destinationDomain = getDomain(destinationChain.id)
  const originTokenMessenger = getTokenMessenger(originChain.id)

  if (
    !originToken ||
    originDomain === null ||
    !originTokenMessenger ||
    destinationDomain === null
  ) {
    console.error(
      "[trails-sdk] cctpTransferWithCustomCall: Invalid origin chain config",
    )
    throw new Error("Invalid origin chain config")
  }

  const originClient = createPublicClient({
    chain: originChain,
    transport: http(),
  })

  await attemptSwitchChain({
    walletClient,
    desiredChainId: originChain.id,
  })

  const account = walletClient.account?.address
  if (!account) {
    throw new Error("No account found")
  }

  const needsApproval = await getNeedsApproval({
    publicClient: originClient,
    token: originToken,
    account,
    spender: originTokenMessenger,
    amount: amount,
  })

  if (needsApproval) {
    const txHash = await approveERC20({
      walletClient,
      tokenAddress: originToken,
      spender: originTokenMessenger,
      amount: maxUint256,
      chain: originChain,
    })

    console.log("waiting for approve", txHash)
    await originClient.waitForTransactionReceipt({
      hash: txHash,
    })
    console.log("approve done")
  }

  const maxFee = getMaxFee()

  // Send USDC to your CCTPRelayer contract instead of user wallet
  const txHash = await burnUSDCToContract({
    walletClient,
    tokenMessenger: originTokenMessenger,
    destinationDomain,
    destinationContract, // CCTPRelayer contract address
    amount,
    burnToken: originToken,
    maxFee,
    chain: originChain,
  })

  return {
    waitForAttestation: async () => {
      await originClient.waitForTransactionReceipt({
        hash: txHash,
      })

      const testnet = getIsTestnetChainId(originChain.id)

      const attestation = await waitForAttestation({
        domain: originDomain,
        transactionHash: txHash,
        testnet,
      })

      if (!attestation) {
        throw new Error("Failed to retrieve attestation")
      }

      return attestation
    },
    txHash: txHash,
  }
}

export async function burnUSDCToContract({
  walletClient,
  tokenMessenger,
  destinationDomain,
  destinationContract,
  amount,
  burnToken,
  maxFee,
  chain,
}: {
  walletClient: WalletClient
  tokenMessenger: string
  destinationDomain: number
  destinationContract: string
  amount: bigint
  burnToken: string
  maxFee: bigint
  chain: Chain
}): Promise<`0x${string}`> {
  const burnData = await getBurnUSDCToContractData({
    tokenMessenger,
    destinationDomain,
    destinationContract,
    amount,
    burnToken,
    maxFee: maxFee,
  })

  await attemptSwitchChain({
    walletClient,
    desiredChainId: chain.id,
  })

  const account = walletClient.account?.address
  if (!account) {
    throw new Error("No account found")
  }

  return walletClient.sendTransaction({
    ...burnData,
    account: account as `0x${string}`,
    chain,
  })
}

export async function getBurnUSDCToContractData({
  tokenMessenger,
  destinationDomain,
  destinationContract,
  amount,
  burnToken,
  maxFee,
}: {
  tokenMessenger: string
  destinationDomain: number
  destinationContract: string
  amount: bigint
  burnToken: string
  maxFee: bigint
}): Promise<{ to: `0x${string}`; data: `0x${string}`; value: bigint }> {
  console.log("[trails-sdk] get burn USDC to contract data", {
    tokenMessenger,
    destinationDomain,
    destinationContract,
    amount,
    burnToken,
    maxFee,
  })

  // Format destination contract address as bytes32
  const DESTINATION_CONTRACT_BYTES32 = `0x000000000000000000000000${destinationContract.slice(2)}`
  const DESTINATION_CALLER_BYTES32 =
    "0x0000000000000000000000000000000000000000000000000000000000000000" // Empty bytes32 allows any address to call

  return {
    to: tokenMessenger as `0x${string}`,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: [
        {
          type: "function",
          name: "depositForBurn",
          stateMutability: "nonpayable",
          inputs: [
            { name: "amount", type: "uint256" },
            { name: "destinationDomain", type: "uint32" },
            { name: "mintRecipient", type: "bytes32" },
            { name: "burnToken", type: "address" },
            { name: "destinationCaller", type: "bytes32" },
            { name: "maxFee", type: "uint256" },
            { name: "minFinalityThreshold", type: "uint32" },
          ],
          outputs: [],
        },
      ],
      functionName: "depositForBurn",
      args: [
        amount,
        destinationDomain,
        DESTINATION_CONTRACT_BYTES32 as `0x${string}`,
        burnToken as `0x${string}`,
        DESTINATION_CALLER_BYTES32 as `0x${string}`,
        maxFee,
        1000, // minFinalityThreshold (1000 or less for Fast Transfer)
      ],
    }),
  }
}

export async function executeCustomCallWithCCTP({
  relayerClient,
  destinationChain,
  attestation,
  targetContract,
  calldata,
  gasLimit = 500000n,
}: {
  relayerClient: WalletClient
  destinationChain: Chain
  attestation: Attestation
  targetContract: string
  calldata: `0x${string}`
  gasLimit?: bigint
}): Promise<`0x${string}`> {
  await attemptSwitchChain({
    walletClient: relayerClient,
    desiredChainId: destinationChain.id,
  })

  const account = relayerClient.account?.address
  if (!account) {
    throw new Error("No account found")
  }

  const cctpRelayerAddress = customCctpRelayerAddress[destinationChain.id]
  if (!cctpRelayerAddress) {
    throw new Error("No custom CCTP relayer address found for this chain")
  }

  const relayData = encodeFunctionData({
    abi: [
      {
        type: "function",
        name: "relayWithCustomCall",
        inputs: [
          {
            type: "tuple",
            name: "request",
            components: [
              { name: "message", type: "bytes" },
              { name: "attestation", type: "bytes" },
              { name: "targetContract", type: "address" },
              { name: "data", type: "bytes" },
              { name: "gasLimit", type: "uint256" },
            ],
          },
        ],
      },
    ],
    functionName: "relayWithCustomCall",
    args: [
      {
        message: attestation.message,
        attestation: attestation.attestation,
        targetContract: targetContract as `0x${string}`,
        data: calldata,
        gasLimit,
      },
    ],
  })

  return relayerClient.sendTransaction({
    to: cctpRelayerAddress as `0x${string}`,
    data: relayData,
    account: account as `0x${string}`,
    chain: destinationChain,
  })
}

// Complete flow function
export async function cctpTransferCaller({
  walletClient,
  relayerClient, // Can be same as walletClient or different
  originChain,
  destinationChain,
  amount,
  targetContract, // The contract you want to call
  calldata, // The function call data
  gasLimit = 500000n,
}: {
  walletClient: WalletClient
  relayerClient?: WalletClient
  originChain: Chain
  destinationChain: Chain
  amount: bigint
  targetContract: string
  calldata: `0x${string}`
  gasLimit?: bigint
}): Promise<{
  burnTxHash: `0x${string}`
  executeTxHash: `0x${string}`
}> {
  // Use walletClient as relayerClient if not provided
  const actualRelayerClient = relayerClient || walletClient

  console.log("[trails-sdk] Starting CCTP transfer with custom call")

  // Step 1: Burn USDC on origin chain (send to CCTPRelayer)
  const { waitForAttestation, txHash: burnTxHash } =
    await cctpTransferWithCustomCall({
      walletClient,
      originChain,
      destinationChain,
      amount,
    })

  console.log("[trails-sdk] Burn transaction sent:", burnTxHash)

  // Step 2: Wait for attestation
  console.log("[trails-sdk] Waiting for attestation...")
  const attestation = await waitForAttestation()

  console.log("[trails-sdk] Attestation received, executing custom call")

  // Step 3: Execute the relayed call on destination chain
  const executeTxHash = await executeCustomCallWithCCTP({
    relayerClient: actualRelayerClient,
    destinationChain,
    attestation,
    targetContract,
    calldata,
    gasLimit,
  })

  console.log("[trails-sdk] Custom call executed:", executeTxHash)

  return {
    burnTxHash,
    executeTxHash,
  }
}

export async function getCCTPRelayerCallData({
  attestation,
  targetContract,
  calldata,
  gasLimit = 500000n,
  destinationChain,
}: {
  attestation: Attestation
  targetContract: string
  calldata: `0x${string}`
  gasLimit?: bigint
  destinationChain: Chain
}): Promise<{ to: `0x${string}`; data: `0x${string}`; value: bigint }> {
  const cctpRelayerAddress = customCctpRelayerAddress[destinationChain.id]
  if (!cctpRelayerAddress) {
    throw new Error("No custom CCTP relayer address found for this chain")
  }

  console.log("[trails-sdk] get CCTP relayer call data", {
    cctpRelayerAddress,
    targetContract,
    gasLimit,
  })

  const relayData = encodeFunctionData({
    abi: [
      {
        type: "function",
        name: "relayWithCustomCall",
        inputs: [
          {
            type: "tuple",
            name: "request",
            components: [
              { name: "message", type: "bytes" },
              { name: "attestation", type: "bytes" },
              { name: "targetContract", type: "address" },
              { name: "data", type: "bytes" },
              { name: "gasLimit", type: "uint256" },
            ],
          },
        ],
      },
    ],
    functionName: "relayWithCustomCall",
    args: [
      {
        message: attestation.message,
        attestation: attestation.attestation,
        targetContract: targetContract as `0x${string}`,
        data: calldata,
        gasLimit,
      },
    ],
  })

  return {
    to: cctpRelayerAddress as `0x${string}`,
    data: relayData,
    value: BigInt(0),
  }
}
