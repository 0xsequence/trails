import type { Chain, WalletClient } from "viem"
import {
  createPublicClient,
  encodeFunctionData,
  erc20Abi,
  getAddress,
  http,
} from "viem"
import * as chains from "viem/chains"
import { attemptSwitchChain } from "./chainSwitch.js"

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

export async function cctpTransfer({
  walletClient,
  relayerClient,
  originChain,
  destinationChain,
  amount,
}: {
  walletClient: WalletClient
  relayerClient: WalletClient
  originChain: Chain
  destinationChain: Chain
  amount: bigint
}) {
  const originToken = tokenAddresses[originChain.id]
  const originDomain = domains[originChain.id]
  const destinationDomain = domains[destinationChain.id]
  const originTokenMessenger = tokenMessengers[originChain.id]
  const destinationTokenMessenger = messageTransmitters[destinationChain.id]
  const destinationAddress = walletClient.account?.address

  const originClient = createPublicClient({
    chain: originChain,
    transport: http(),
  })

  const destinationClient = createPublicClient({
    chain: destinationChain,
    transport: http(),
  })

  await attemptSwitchChain({
    walletClient,
    desiredChainId: originChain.id,
  })

  const needsApproval = await getNeedsApproval({
    publicClient: originClient,
    token: originToken,
    account: walletClient.account?.address,
    spender: originTokenMessenger,
    amount: amount,
  })

  if (needsApproval) {
    const txHash0 = await approveUSDC({
      walletClient,
      tokenAddress: originToken,
      spender: originTokenMessenger,
      amount: amount,
      chain: originChain,
    })

    console.log("waiting for tx0", txHash0)
    await originClient.waitForTransactionReceipt({
      hash: txHash0,
    })
    console.log("tx0 done")
  }

  const txHash1 = await burnUSDC({
    walletClient,
    tokenMessenger: originTokenMessenger,
    destinationDomain,
    destinationAddress,
    amount,
    burnToken: originToken,
    maxFee: 500n, // Set fast transfer max fee in 10^6 subunits (0.0005 USDC; change as needed)
    chain: originChain,
  })

  await originClient.waitForTransactionReceipt({
    hash: txHash1,
  })

  const attestation = await waitForAttestation({
    domain: originDomain,
    transactionHash: txHash1,
  })

  await attemptSwitchChain({
    walletClient: relayerClient,
    desiredChainId: destinationChain.id,
  })

  const txHash2 = await mintUSDC({
    walletClient: relayerClient,
    tokenMessenger: destinationTokenMessenger,
    attestation,
    chain: destinationChain,
  })

  await destinationClient.waitForTransactionReceipt({
    hash: txHash2,
  })

  console.log("Minted USDC!")
  return txHash1
}

export async function getNeedsApproval({
  publicClient,
  token,
  account,
  spender,
  amount,
}: any): Promise<boolean> {
  const allowance = await publicClient.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: [getAddress(account), getAddress(spender)],
  })

  return allowance < amount
}

export async function approveUSDC({
  walletClient,
  tokenAddress,
  spender,
  amount,
  chain,
}: any) {
  const approvalData = await getApproveUSDCData({
    tokenAddress,
    spender,
    amount,
  })

  console.log("Approving USDC transfer...", approvalData)

  await attemptSwitchChain({
    walletClient,
    desiredChainId: chain.id,
  })

  return walletClient.sendTransaction(approvalData)
}

async function getApproveUSDCData({ tokenAddress, spender, amount }: any) {
  console.log("Approving USDC transfer...", {
    tokenAddress,
    spender,
    amount,
  })
  return {
    to: tokenAddress,
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
      args: [spender, amount], // Set max allowance in 10^6 subunits (10,000 USDC; change as needed)
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
}: any) {
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

  return walletClient.sendTransaction(burnData)
}

export async function getBurnUSDCData({
  tokenMessenger,
  destinationDomain,
  destinationAddress,
  amount,
  burnToken,
  maxFee,
}: any) {
  console.log("Burning USDC...", {
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
    to: tokenMessenger,
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
        burnToken,
        DESTINATION_CALLER_BYTES32 as `0x${string}`,
        maxFee,
        1000, // minFinalityThreshold (1000 or less for Fast Transfer)
      ],
    }),
  }
}

export async function retrieveAttestation({ domain, transactionHash }: any) {
  console.log("Retrieving attestation...")
  const url = `https://iris-api-sandbox.circle.com/v2/messages/${domain}?transactionHash=${transactionHash}`
  while (true) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.status === 404) {
        console.log("Waiting for attestation...")
      }
      if (data?.messages?.[0]?.status === "complete") {
        console.log("Attestation retrieved successfully!")
        return data.messages[0]
      }
      console.log("Waiting for attestation...")
      await new Promise((resolve) => setTimeout(resolve, 5000))
    } catch (error: any) {
      console.error("Error fetching attestation:", error.message)
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }
}

export async function mintUSDC({
  walletClient,
  tokenMessenger,
  attestation,
  chain,
}: any) {
  const mintData = await getMintUSDCData({
    tokenMessenger,
    attestation,
  })

  await attemptSwitchChain({
    walletClient,
    desiredChainId: chain.id,
  })

  return walletClient.sendTransaction(mintData)
}

async function getMintUSDCData({ tokenMessenger, attestation }: any) {
  console.log("Minting USDC...")
  return {
    to: tokenMessenger,
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

export async function waitForAttestation({ domain, transactionHash }: any) {
  while (true) {
    const attestation = await retrieveAttestation({
      domain,
      transactionHash,
    })
    if (attestation) {
      return attestation
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
