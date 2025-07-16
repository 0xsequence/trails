import type {
  CommitIntentConfigArgs,
  CommitIntentConfigReturn,
  GetIntentCallsPayloadsArgs,
  GetIntentCallsPayloadsReturn as GetIntentCallsPayloadsReturnFromAPI,
  IntentCallsPayload,
  IntentPrecondition,
  SequenceAPIClient,
  TrailsExecutionInfo,
} from "@0xsequence/trails-api"

export type {
  IntentCallsPayload,
  IntentPrecondition,
  TrailsExecutionInfo,
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
} from "viem"
import {
  ATTESATION_SIGNER_ADDRESS,
  TRAILS_CCTP_SAPIENT_SIGNER_ADDRESS,
  TRAILS_LIFI_SAPIENT_SIGNER_ADDRESS,
  TRAILS_RELAY_SAPIENT_SIGNER_ADDRESS,
} from "./constants.js"
import { findPreconditionAddress } from "./preconditions.js"

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
  return apiClient.getIntentCallsPayloads(args)
}

export function calculateIntentAddress(
  mainSigner: string,
  calls: Array<IntentCallsPayload>,
  executionInfosArg: Array<TrailsExecutionInfo> | null | undefined,
  sapientType: QuoteProvider = "relay",
): `0x${string}` {
  console.log("[trails-sdk] calculateIntentAddress inputs:", {
    mainSigner,
    calls: JSON.stringify(calls, null, 2),
    executionInfosArg: JSON.stringify(executionInfosArg, null, 2),
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

  //console.log('Transformed coreCalls:', JSON.stringify(coreCalls, null, 2))

  const coreExecutionInfos = executionInfosArg?.map(
    (info: TrailsExecutionInfo) => ({
      originToken: Address.from(info.originToken),
      amount: info.amount,
      originChainId: info.originChainId,
      destinationChainId: info.destinationChainId,
    }),
  )

  console.log(
    "[trails-sdk] Transformed coreExecutionInfos:",
    JSON.stringify(
      coreExecutionInfos,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2,
    ),
  )

  const calculatedAddress = calculateIntentConfigurationAddress(
    Address.from(mainSigner),
    coreCalls,
    context,
    ATTESATION_SIGNER_ADDRESS,
    coreExecutionInfos,
    sapientType,
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
  executionInfos: Array<TrailsExecutionInfo> | null | undefined,
  sapientType: QuoteProvider = "relay",
) {
  if (!executionInfos || executionInfos.length === 0) {
    // No cross-chain execution.
    const address = calculateIntentAddress(mainSigner, calls, null, sapientType)
    return {
      originIntentAddress: address,
      destinationIntentAddress: address,
    }
  }

  const originChainId = executionInfos[0]?.originChainId
  const destinationChainId = executionInfos[0]?.destinationChainId

  if (originChainId === destinationChainId) {
    // Same-chain execution, but with a bridge/swap (e.g. Uniswap on Polygon).
    // The executionInfos are still relevant for the sapient signer, but there's conceptually only one intent.
    const address = calculateIntentAddress(
      mainSigner,
      calls,
      executionInfos,
      sapientType,
    )
    return {
      originIntentAddress: address,
      destinationIntentAddress: address,
    }
  }

  // Different origin and destination chains: cross-chain execution.
  const originCalls = calls.filter((c) => c.chainId === originChainId)
  const destinationCalls = calls.filter((c) => c.chainId === destinationChainId)

  const originIntentAddress = calculateIntentAddress(
    mainSigner,
    originCalls,
    executionInfos,
    sapientType,
  )
  const destinationIntentAddress = calculateIntentAddress(
    mainSigner,
    destinationCalls,
    null,
    sapientType,
  )

  return { originIntentAddress, destinationIntentAddress }
}

export function commitIntentConfig(
  apiClient: SequenceAPIClient,
  mainSignerAddress: string,
  calls: Array<IntentCallsPayload>,
  preconditions: Array<IntentPrecondition>,
  executionInfos: Array<TrailsExecutionInfo>,
  sapientType: QuoteProvider = "relay",
): Promise<CommitIntentConfigReturn> {
  console.log("[trails-sdk] commitIntentConfig inputs:", {
    mainSignerAddress,
    calls: JSON.stringify(calls, null, 2),
    preconditions: JSON.stringify(preconditions, null, 2),
    executionInfos: JSON.stringify(executionInfos, null, 2),
  })

  const { originIntentAddress, destinationIntentAddress } =
    calculateOriginAndDestinationIntentAddresses(
      mainSignerAddress,
      calls,
      executionInfos,
      sapientType,
    )

  console.log(
    "[trails-sdk] originIntentAddress:",
    originIntentAddress.toString(),
  )
  console.log(
    "[trails-sdk] destinationIntentAddress:",
    destinationIntentAddress.toString(),
  )

  const receivedAddress = findPreconditionAddress(preconditions)
  console.log("[trails-sdk] Address comparison:", {
    receivedAddress,
    calculatedAddress: originIntentAddress.toString(),
    match: isAddressEqual(Address.from(receivedAddress), originIntentAddress),
  })

  const args: CommitIntentConfigArgs = {
    originIntentAddress: originIntentAddress.toString(),
    destinationIntentAddress: destinationIntentAddress.toString(),
    mainSigner: mainSignerAddress,
    calls: calls,
    preconditions: preconditions,
    trailsInfos: executionInfos,
    sapientType: sapientType,
  }

  return apiClient.commitIntentConfig(args)
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

  console.log("[trails-sdk] sending origin tx")
  console.time("[trails-sdk] sendTx")
  const hash = await walletClient.sendTransaction({
    account: account,
    to: originParams.to as `0x${string}`,
    data: originParams.data as `0x${string}`,
    value: BigInt(originParams.value),
    chain: originParams.chain,
  })
  console.timeEnd("[trails-sdk] sendTx")

  return hash
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

export function getTrailsExecutionInfoHash(
  executionInfos: TrailsExecutionInfo[],
  attestationAddress: Address.Address,
): Hex.Hex {
  if (!executionInfos || executionInfos.length === 0) {
    throw new Error("executionInfos is empty")
  }
  if (
    !attestationAddress ||
    attestationAddress === "0x0000000000000000000000000000000000000000"
  ) {
    throw new Error("attestationAddress is zero")
  }

  const TrailsExecutionInfoComponents = [
    { name: "originToken", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "originChainId", type: "uint256" },
    { name: "destinationChainId", type: "uint256" },
  ]

  const executionInfosForAbi = executionInfos.map((info) => ({
    originToken: info.originToken,
    amount: info.amount,
    originChainId: info.originChainId,
    destinationChainId: info.destinationChainId,
  }))

  const abiSchema = [
    {
      type: "tuple[]",
      name: "executionInfos",
      components: TrailsExecutionInfoComponents,
    },
    { type: "address", name: "attestationAddress" },
  ]

  const encodedHex = AbiParameters.encode(abiSchema, [
    executionInfosForAbi,
    attestationAddress,
  ]) as Hex.Hex
  const encodedBytes = Bytes.fromHex(encodedHex)
  const hashBytes = Hash.keccak256(encodedBytes)
  return Bytes.toHex(hashBytes)
}

export function calculateIntentConfigurationAddress(
  mainSigner: Address.Address,
  calls: Array<IntentCallsPayload>,
  context: Context.Context,
  attestationSigner?: Address.Address,
  executionInfos?: Array<TrailsExecutionInfo>,
  sapientType: QuoteProvider = "relay",
): Address.Address {
  const config = createIntentConfiguration(
    mainSigner,
    calls,
    attestationSigner,
    executionInfos,
    sapientType,
  )

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
  attestationSigner?: Address.Address,
  executionInfos?: TrailsExecutionInfo[],
  sapientType: QuoteProvider = "relay",
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

  if (executionInfos && executionInfos.length > 0) {
    if (attestationSigner) {
      const sapientSignerLeaf: Config.SapientSignerLeaf = {
        type: "sapient-signer",
        address:
          sapientType === "lifi"
            ? TRAILS_LIFI_SAPIENT_SIGNER_ADDRESS
            : sapientType === "cctp"
              ? TRAILS_CCTP_SAPIENT_SIGNER_ADDRESS
              : TRAILS_RELAY_SAPIENT_SIGNER_ADDRESS,
        weight: 1n,
        imageHash: getTrailsExecutionInfoHash(
          executionInfos,
          attestationSigner,
        ),
      }
      otherLeaves.push(sapientSignerLeaf)
    }
  }

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
