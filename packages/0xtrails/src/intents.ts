import type {
  CommitIntentConfigArgs,
  CommitIntentConfigReturn,
  GetIntentCallsPayloadsArgs,
  GetIntentCallsPayloadsReturn as GetIntentCallsPayloadsReturnFromAPI,
  IntentCallsPayload,
  IntentPrecondition,
  SequenceAPIClient,
} from "@0xsequence/trails-api"

export type {
  IntentCallsPayload,
  IntentPrecondition,
} from "@0xsequence/trails-api"

import type { Context as ContextLike } from "@0xsequence/wallet-primitives"
import { Config, type Context, Payload } from "@0xsequence/wallet-primitives"
import {
  AbiParameters,
  Address,
  Bytes,
  ContractAddress,
  Hash,
  type Hex,
} from "ox"
import {
  type Account,
  type Chain,
  isAddressEqual,
  type WalletClient,
  http,
  createPublicClient,
} from "viem"
import { ATTESATION_SIGNER_ADDRESS } from "./constants.js"
import { findPreconditionAddresses } from "./preconditions.js"
import { getChainInfo } from "./chains.js"
import {
  trackTransactionStarted,
  trackTransactionSubmitted,
  trackTransactionError,
  trackIntentQuoteRequested,
  trackIntentQuoteReceived,
  trackIntentQuoteError,
  trackIntentCommitStarted,
  trackIntentCommitCompleted,
  trackIntentCommitError,
} from "./analytics.js"

export interface MetaTxnFeeDetail {
  metaTxnID: string
  estimatedGasLimit: string
  feeNative: string
}

export interface ChainExecuteQuote {
  chainId: string
  totalGasLimit: string
  gasPrice: string
  totalFeeAmount: string
  nativeTokenSymbol: string
  nativeTokenPrice?: string
  metaTxnFeeDetails: Array<MetaTxnFeeDetail>
  totalFeeUSD?: string
}

export interface ExecuteQuote {
  chainQuotes: Array<ChainExecuteQuote>
}

export interface CrossChainFee {
  providerFee: string
  trailsSwapFee: string
  providerFeeUSD: number
  trailsSwapFeeUSD: number
  totalFeeAmount: string
  totalFeeUSD: number
}

export interface TrailsFee {
  executeQuote: ExecuteQuote
  crossChainFee?: CrossChainFee
  trailsFixedFeeUSD?: number
  feeToken?: string
  originTokenTotalAmount?: string
  totalFeeAmount?: string
  totalFeeUSD?: string
  quoteProvider?: string
}

// QuoteProvider defines the possible liquidity providers.
export type QuoteProvider = "lifi" | "relay" | "cctp"

export type GetIntentCallsPayloadsReturn = GetIntentCallsPayloadsReturnFromAPI

export type OriginCallParams = {
  to: `0x${string}` | null
  data: Hex.Hex | null
  value: bigint | null
  chainId: number | null
  error?: string
}

export type SendOriginCallTxArgs = {
  to: string
  data: Hex.Hex
  value: bigint
  chain: Chain
}

export async function getIntentCallsPayloads(
  apiClient: SequenceAPIClient,
  args: GetIntentCallsPayloadsArgs,
): Promise<GetIntentCallsPayloadsReturn> {
  // Track intent quote request
  trackIntentQuoteRequested({
    originChainId: args.originChainId || 0,
    destinationChainId: args.destinationChainId || 0,
    originTokenAddress: args.originTokenAddress,
    destinationTokenAddress: args.destinationTokenAddress,
    userAddress: args.userAddress,
  })

  try {
    const result = await apiClient.getIntentCallsPayloads(args)

    if (!result) {
      throw new Error("No result from getIntentCallsPayloads")
    }

    // Track successful intent quote received
    trackIntentQuoteReceived({
      quoteId: result.originIntentAddress || "unknown",
      totalFeeUSD: result.trailsFee?.totalFeeUSD,
      trailsFixedFeeUSD: result.trailsFee?.trailsFixedFeeUSD,
      crossChainFeeTotalUSD: result.trailsFee?.crossChainFee?.totalFeeUSD,
      takerFeeUSD: result.trailsFee?.crossChainFee?.providerFeeUSD,
      providerFeeUSD: result.trailsFee?.crossChainFee?.providerFeeUSD,
      trailsSwapFeeUSD: result.trailsFee?.crossChainFee?.trailsSwapFeeUSD,
      gasFeesPerChainUSD:
        result.trailsFee?.executeQuote?.chainQuotes?.map((quote: any) =>
          parseFloat(quote.totalFeeUSD || "0"),
        ) || [],
      originTokenTotalAmount: result.trailsFee?.originTokenTotalAmount,
      destinationTokenAmount: result.trailsFee?.totalFeeAmount, // Using available property
      provider: result.trailsFee?.quoteProvider,
      feeToken: result.trailsFee?.feeToken,
      userAddress: args.userAddress,
      intentAddress: result.originIntentAddress,
    })

    return result
  } catch (error) {
    // Track intent quote error
    trackIntentQuoteError({
      error: error instanceof Error ? error.message : "Unknown error",
      userAddress: args.userAddress,
      originChainId: args.originChainId || 0,
      destinationChainId: args.destinationChainId || 0,
      originTokenAddress: args.originTokenAddress,
      destinationTokenAddress: args.destinationTokenAddress,
    })
    throw error
  }
}

export function calculateIntentAddress(
  mainSigner: string,
  calls: Array<IntentCallsPayload>,
): `0x${string}` {
  console.log("[trails-sdk] calculateIntentAddress inputs:", {
    mainSigner,
    calls: JSON.stringify(calls, null, 2),
  })

  const context: ContextLike.Context = {
    factory: "0xBd0F8abD58B4449B39C57Ac9D5C67433239aC447" as `0x${string}`,
    stage1: "0x53bA242E7C2501839DF2972c75075dc693176Cd0" as `0x${string}`,
    stage2: "0xa29874c88b8Fd557e42219B04b0CeC693e1712f5" as `0x${string}`,
    creationCode:
      "0x603e600e3d39601e805130553df33d3d34601c57363d3d373d363d30545af43d82803e903d91601c57fd5bf3" as `0x${string}`,
  }

  const coreCalls = calls.map((call) => ({
    type: "call" as const,
    chainId: call.chainId.toString(),
    space: call.space ? call.space.toString() : "0",
    nonce: call.nonce ? call.nonce.toString() : "0",
    calls: call.calls.map((call) => ({
      to: Address.from(call.to) as `0x${string}`,
      value: call.value?.toString() || "0",
      data: Bytes.toHex(Bytes.from((call.data as Hex.Hex) || "0x")),
      gasLimit: call.gasLimit?.toString() || "0",
      delegateCall: !!call.delegateCall,
      onlyFallback: !!call.onlyFallback,
      behaviorOnError: call.behaviorOnError,
    })),
  }))

  const calculatedAddress = calculateIntentConfigurationAddress(
    Address.from(mainSigner),
    coreCalls,
    context,
  )

  console.log(
    "[trails-sdk] Final calculated address:",
    calculatedAddress.toString(),
  )
  return calculatedAddress
}

export function calculateOriginAndDestinationIntentAddresses(
  mainSigner: string,
  calls: Array<IntentCallsPayload>,
) {
  const originChainId = calls[0]?.chainId
  const destinationChainId = calls[1]?.chainId

  console.log("[trails-sdk] originChainId:", originChainId)
  console.log("[trails-sdk] destinationChainId:", destinationChainId)

  // Different origin and destination chains: cross-chain execution.
  const originCalls = calls.filter((c) => c.chainId === originChainId)
  const destinationCalls = calls.filter((c) => c.chainId === destinationChainId)

  console.log("[trails-sdk] originCalls:", originCalls)
  console.log("[trails-sdk] destinationCalls:", destinationCalls)

  const originIntentAddress = calculateIntentAddress(mainSigner, originCalls)
  const destinationIntentAddress = calculateIntentAddress(
    mainSigner,
    destinationCalls,
  )

  console.log("[trails-sdk] originIntentAddress:", originIntentAddress)
  console.log(
    "[trails-sdk] destinationIntentAddress:",
    destinationIntentAddress,
  )

  return { originIntentAddress, destinationIntentAddress }
}

export async function commitIntentConfig(
  apiClient: SequenceAPIClient,
  mainSignerAddress: string,
  calls: Array<IntentCallsPayload>,
  preconditions: Array<IntentPrecondition>,
): Promise<CommitIntentConfigReturn> {
  console.log("[trails-sdk] commitIntentConfig inputs:", {
    mainSignerAddress,
    calls: JSON.stringify(calls, null, 2),
    preconditions: JSON.stringify(preconditions, null, 2),
  })

  const { originIntentAddress, destinationIntentAddress } =
    calculateOriginAndDestinationIntentAddresses(mainSignerAddress, calls)

  console.log(
    "[trails-sdk] originIntentAddress:",
    originIntentAddress.toString(),
  )
  console.log(
    "[trails-sdk] destinationIntentAddress:",
    destinationIntentAddress.toString(),
  )

  const originChainIdStr = calls[0]?.chainId
  const destinationChainIdStr = calls[1]?.chainId

  // The executionInfos could be empty, so we need to handle the undefined case.
  const { originAddress: receivedAddress } =
    originChainIdStr && destinationChainIdStr
      ? findPreconditionAddresses(
          preconditions,
          Number(originChainIdStr),
          Number(destinationChainIdStr),
        )
      : { originAddress: undefined }

  console.log("[trails-sdk] Address comparison:", {
    receivedAddress,
    calculatedAddress: originIntentAddress.toString(),
    match:
      receivedAddress &&
      isAddressEqual(Address.from(receivedAddress), originIntentAddress),
  })

  const args: CommitIntentConfigArgs = {
    originIntentAddress: originIntentAddress.toString(),
    destinationIntentAddress: destinationIntentAddress.toString(),
    mainSigner: mainSignerAddress,
    calls: calls,
    preconditions: preconditions,
  }

  try {
    // Track successful intent commit
    trackIntentCommitStarted({
      intentAddress: originIntentAddress.toString(),
      userAddress: mainSignerAddress,
      originChainId: originChainIdStr ? Number(originChainIdStr) : undefined,
      destinationChainId: destinationChainIdStr
        ? Number(destinationChainIdStr)
        : undefined,
    })

    const result = await apiClient.commitIntentConfig(args)

    // Track successful intent commit
    trackIntentCommitCompleted({
      intentAddress: originIntentAddress.toString(),
      userAddress: mainSignerAddress,
      originChainId: originChainIdStr ? Number(originChainIdStr) : undefined,
      destinationChainId: destinationChainIdStr
        ? Number(destinationChainIdStr)
        : undefined,
    })

    return result
  } catch (error) {
    // Track intent commit error
    trackIntentCommitError({
      error: error instanceof Error ? error.message : "Unknown error",
      userAddress: mainSignerAddress,
      intentAddress: originIntentAddress.toString(),
      originChainId: originChainIdStr ? Number(originChainIdStr) : undefined,
      destinationChainId: destinationChainIdStr
        ? Number(destinationChainIdStr)
        : undefined,
    })
    throw error
  }
}

export async function sendOriginTransaction(
  account: Account,
  walletClient: WalletClient,
  originParams: SendOriginCallTxArgs,
): Promise<`0x${string}`> {
  const chainId = await walletClient.getChainId()
  if (chainId.toString() !== originParams.chain.id.toString()) {
    console.log(
      "[trails-sdk] sendOriginTransaction: switching chain",
      "want:",
      originParams.chain.id,
      "current:",
      chainId,
    )
    await walletClient.switchChain({ id: originParams.chain.id })
    console.log(
      "[trails-sdk] sendOriginTransaction: switched chain to",
      originParams.chain.id,
    )
  }

  // Track transaction start
  trackTransactionStarted({
    transactionType: "origin_call",
    chainId: originParams.chain.id,
    userAddress: account.address,
  })

  const publicClient = createPublicClient({
    chain: getChainInfo(originParams.chain.id)!,
    transport: http(),
  })

  const gasLimit = await publicClient.estimateGas({
    account: account,
    to: originParams.to as `0x${string}`,
    data: originParams.data as `0x${string}`,
    value: BigInt(originParams.value),
  })

  console.log("[trails-sdk] estimated gasLimit:", gasLimit)

  console.log(
    "[trails-sdk] sending origin tx with walletClient.sendTransaction()",
  )
  const id = Date.now()
  console.time(`[trails-sdk] walletClient.sendTransaction-${id}`)

  try {
    const hash = await walletClient.sendTransaction({
      account: account,
      to: originParams.to as `0x${string}`,
      data: originParams.data as `0x${string}`,
      value: BigInt(originParams.value),
      chain: originParams.chain,
      gas: gasLimit,
    })
    console.timeEnd(`[trails-sdk] walletClient.sendTransaction-${id}`)
    console.log("[trails-sdk] done sending, origin tx hash", hash)

    // Track successful transaction submission (pseudonymize() is called inside analytics)
    trackTransactionSubmitted({
      transactionHash: hash,
      chainId: originParams.chain.id,
      userAddress: account.address,
    })

    return hash
  } catch (error) {
    console.timeEnd(`[trails-sdk] walletClient.sendTransaction-${id}`)

    // Track failed transaction
    trackTransactionError({
      transactionHash: "",
      error: error instanceof Error ? error.message : "Unknown error",
      userAddress: account.address,
    })

    throw error
  }
}

export interface OriginTokenParam {
  address: Address.Address
  chainId: bigint
}

export interface DestinationTokenParam {
  address: Address.Address
  chainId: bigint
  amount: bigint
}

export function hashIntentParams({
  userAddress,
  nonce,
  originTokens,
  destinationCalls,
  destinationTokens,
}: {
  userAddress: Address.Address
  nonce: bigint
  originTokens: OriginTokenParam[]
  destinationCalls: Array<IntentCallsPayload>
  destinationTokens: DestinationTokenParam[]
}): string {
  if (
    !userAddress ||
    userAddress === "0x0000000000000000000000000000000000000000"
  )
    throw new Error("UserAddress is zero")
  if (typeof nonce !== "bigint") throw new Error("Nonce is not a bigint")
  if (!originTokens || originTokens.length === 0)
    throw new Error("OriginTokens is empty")
  if (!destinationCalls || destinationCalls.length === 0)
    throw new Error("DestinationCalls is empty")
  if (!destinationTokens || destinationTokens.length === 0)
    throw new Error("DestinationTokens is empty")
  for (let i = 0; i < destinationCalls.length; i++) {
    const currentCall = destinationCalls[i]
    if (!currentCall) throw new Error(`DestinationCalls[${i}] is nil`)
    if (!currentCall.calls || currentCall.calls.length === 0) {
      throw new Error(`DestinationCalls[${i}] has no calls`)
    }
  }

  const originTokensForAbi = originTokens.map((token) => ({
    address: token.address,
    chainId: token.chainId,
  }))

  let cumulativeCallsHashBytes: Bytes.Bytes = Bytes.from(new Uint8Array(32))

  for (let i = 0; i < destinationCalls.length; i++) {
    const callPayload = destinationCalls[i]
    if (!callPayload) throw new Error(`DestinationCalls[${i}] is nil`)

    const currentDestCallPayloadHashBytes = Payload.hash(
      ATTESATION_SIGNER_ADDRESS,
      BigInt(callPayload.chainId),
      {
        type: "call",
        space: callPayload.space ? BigInt(callPayload.space) : 0n,
        nonce: callPayload.nonce ? BigInt(callPayload.nonce) : 0n,
        calls: callPayload.calls.map((call) => ({
          type: "call",
          to: call.to as `0x${string}`,
          value: BigInt(call.value?.toString() || "0"),
          data: Bytes.toHex(Bytes.from((call.data as Hex.Hex) || "0x")),
          gasLimit: BigInt(call.gasLimit?.toString() || "0"),
          delegateCall: !!call.delegateCall,
          onlyFallback: !!call.onlyFallback,
          behaviorOnError:
            call.behaviorOnError === 0
              ? "ignore"
              : call.behaviorOnError === 1
                ? "revert"
                : "abort",
        })),
      },
    )

    cumulativeCallsHashBytes = Hash.keccak256(
      Bytes.concat(cumulativeCallsHashBytes, currentDestCallPayloadHashBytes),
      {
        as: "Bytes",
      },
    )
  }
  const cumulativeCallsHashHex = Bytes.toHex(cumulativeCallsHashBytes)

  const destinationTokensForAbi = destinationTokens.map((token) => ({
    address: token.address,
    chainId: token.chainId,
    amount: token.amount,
  }))

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
  ]

  const encodedHex = AbiParameters.encode(abiSchema, [
    userAddress,
    nonce,
    originTokensForAbi,
    destinationTokensForAbi,
    cumulativeCallsHashHex,
  ]) as Hex.Hex

  const encodedBytes = Bytes.fromHex(encodedHex)
  const hashBytes = Hash.keccak256(encodedBytes)
  const hashHex = Bytes.toHex(hashBytes)

  return hashHex
}

// TODO: Add proper type
export function bigintReplacer(_key: string, value: any) {
  return typeof value === "bigint" ? value.toString() : value
}

export function calculateIntentConfigurationAddress(
  mainSigner: Address.Address,
  calls: Array<IntentCallsPayload>,
  context: Context.Context,
): Address.Address {
  const config = createIntentConfiguration(mainSigner, calls)

  // Calculate the image hash of the configuration
  const imageHash = Config.hashConfiguration(config)

  // Calculate the counterfactual address using the image hash and context
  return ContractAddress.fromCreate2({
    from: context.factory,
    bytecodeHash: Hash.keccak256(
      Bytes.concat(
        Bytes.from(context.creationCode),
        Bytes.padLeft(Bytes.from(context.stage1), 32),
      ),
      { as: "Bytes" },
    ),
    salt: imageHash,
  })
}

function createIntentConfiguration(
  mainSigner: Address.Address,
  calls: IntentCallsPayload[],
): Config.Config {
  const mainSignerLeaf: Config.SignerLeaf = {
    type: "signer",
    address: mainSigner,
    weight: 1n,
  }

  console.log("[trails-sdk] mainSignerLeaf:", mainSignerLeaf)

  const subdigestLeaves: Config.AnyAddressSubdigestLeaf[] = calls.map(
    (call) => {
      const digest = Payload.hash(
        Address.from("0x0000000000000000000000000000000000000000"),
        BigInt(call.chainId),
        {
          type: "call",
          space: BigInt(call.space || 0),
          nonce: BigInt(call.nonce || 0),
          calls: call.calls.map((call) => ({
            type: "call",
            to: call.to as `0x${string}`,
            value: BigInt(call.value?.toString() || "0"),
            data: Bytes.toHex(Bytes.from((call.data as Hex.Hex) || "0x")),
            gasLimit: BigInt(call.gasLimit?.toString() || "0"),
            delegateCall: !!call.delegateCall,
            onlyFallback: !!call.onlyFallback,
            behaviorOnError:
              call.behaviorOnError === 0
                ? "ignore"
                : call.behaviorOnError === 1
                  ? "revert"
                  : "abort",
          })),
        },
      )
      console.log("[trails-sdk] digest:", Bytes.toHex(digest))
      return {
        type: "any-address-subdigest",
        digest: Bytes.toHex(digest),
      } as Config.AnyAddressSubdigestLeaf
    },
  )

  console.log("[trails-sdk] calls:", calls)
  console.log("[trails-sdk] subdigestLeaves:", subdigestLeaves)

  const otherLeaves: Config.Topology[] = [...subdigestLeaves]

  if (otherLeaves.length === 0) {
    throw new Error(
      "Intent configuration must have at least one call or LiFi information.",
    )
  }

  let secondaryTopologyNode: Config.Topology

  if (otherLeaves.length === 1) {
    secondaryTopologyNode = otherLeaves[0]!
  } else {
    secondaryTopologyNode = buildMerkleTreeFromMembers(otherLeaves)
  }

  // Print the topology
  console.log(
    "[trails-sdk] Topology:",
    JSON.stringify([mainSignerLeaf, secondaryTopologyNode], bigintReplacer, 2),
  )

  return {
    threshold: 1n,
    checkpoint: 0n,
    topology: [mainSignerLeaf, secondaryTopologyNode] as Config.Node,
  }
}

// Renamed and generalized from createSubdigestTree
function buildMerkleTreeFromMembers(
  members: Config.Topology[],
): Config.Topology {
  if (members.length === 0) {
    throw new Error("Cannot create a tree from empty members")
  }
  if (members.length === 1) {
    return members[0]! // Returns a single Leaf or a Node
  }

  let currentLevel = [...members]
  while (currentLevel.length > 1) {
    const nextLevel: Config.Topology[] = []
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i]!
      if (i + 1 < currentLevel.length) {
        const right = currentLevel[i + 1]!
        nextLevel.push([left, right] as Config.Node)
      } else {
        // Odd one out, carries over to the next level
        nextLevel.push(left)
      }
    }
    currentLevel = nextLevel
  }
  return currentLevel[0]!
}
