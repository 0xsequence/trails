import { encodeFunctionData } from "viem"
import * as chains from "viem/chains"

const PLACEHOLDER_AMOUNT =
  0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefn

const proxyCallers: Record<string, string> = {
  [chains.base.id]: "0x4F54Dc2C6bCa2D01e066fa36f4CFdA96B544DD20",
  [chains.arbitrum.id]: "0x8c070e800D0e0c33A0A4ceef7A91677410ed9444",
}

export function getProxyCallerAddress(chainId: number) {
  return proxyCallers[chainId]
}

function getAmountOffset(calldata: `0x${string}`, placeholder: bigint): number {
  const hex = placeholder.toString(16).padStart(64, "0")
  const search = hex.toLowerCase()
  const offset = calldata.toLowerCase().indexOf(search)
  if (offset === -1) throw new Error("Placeholder not found")
  const byteOffset = (offset - 2) / 2 // subtract '0x', convert to bytes
  if (byteOffset < 0 || byteOffset % 1 !== 0) throw new Error("Invalid offset")
  return byteOffset
}

const proxyCallerAbi = [
  {
    type: "function",
    name: "sweepAndCall",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "target", type: "address" },
      { name: "callData", type: "bytes" },
      { name: "amountOffset", type: "uint256" },
      { name: "placeholder", type: "bytes32" },
    ],
    outputs: [],
  },
]

export function encodeProxyCallerCalldata({
  token,
  target,
  calldata,
  amountOffset,
}: {
  token: string
  target: string
  calldata: `0x${string}`
  amountOffset: number
}) {
  // Convert BigInt to bytes32 format
  const placeholderBytes32 =
    `0x${PLACEHOLDER_AMOUNT.toString(16).padStart(64, "0")}` as `0x${string}`

  return encodeFunctionData({
    abi: proxyCallerAbi,
    functionName: "sweepAndCall",
    args: [token, target, calldata, amountOffset, placeholderBytes32],
  })
}

export function wrapCalldataWithProxyCallerIfNeeded({
  token,
  target,
  calldata,
  originChainId,
  destinationChainId,
  amount,
  originTokenAddress,
  destinationTokenAddress,
}: {
  token: string
  target: string
  calldata: `0x${string}`
  originChainId: number
  destinationChainId: number
  amount: string
  originTokenAddress: string
  destinationTokenAddress: string
}): { encodedCalldata: `0x${string}`; proxyCallerAddress: string } | null {
  const isSameToken =
    originTokenAddress?.toLowerCase() === destinationTokenAddress?.toLowerCase()
  if (originChainId === destinationChainId && isSameToken) {
    const amountHex = BigInt(amount).toString(16).padStart(64, "0") // 32-byte hex (no 0x)
    const placeholderHex = PLACEHOLDER_AMOUNT.toString(16).padStart(64, "0")

    if (!calldata.includes(placeholderHex)) {
      return null
    }

    const calldataWithAmount = calldata.replace(placeholderHex, amountHex)
    return {
      encodedCalldata: calldataWithAmount as `0x${string}`,
      proxyCallerAddress: target,
    }
  }

  const proxyCallerAddress = getProxyCallerAddress(destinationChainId)
  if (!proxyCallerAddress) {
    return null
  }

  const amountOffset = getAmountOffset(calldata, BigInt(PLACEHOLDER_AMOUNT))
  if (amountOffset === -1) {
    return null
  }

  const encodedCalldata = encodeProxyCallerCalldata({
    token,
    target,
    calldata,
    amountOffset,
  })

  return {
    encodedCalldata,
    proxyCallerAddress,
  }
}
