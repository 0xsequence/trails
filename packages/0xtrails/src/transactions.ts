import { createPublicClient, http } from "viem"
import { getChainInfo } from "./chains.js"
import { getRpcSequenceProjectAccessKey } from "./config.js"

export type TransactionStateStatus = "pending" | "failed" | "confirmed"

export type TransactionState = {
  transactionHash: string
  explorerUrl: string
  blockNumber?: number
  chainId: number
  state: TransactionStateStatus
  label: string
}

export type TransferType = "SEND" | "RECEIVE"
export type ContractType = "ERC20" | "ERC721" | "ERC1155" | "NATIVE"

export type ContractInfo = {
  chainId: number
  address: string
  source: string
  name: string
  type: ContractType
  symbol: string
  decimals: number
  logoURI: string
  deployed: boolean
  bytecodeHash: string
  extensions: {
    link: string
    description: string
    ogImage: string
    ogName: string
    originChainId: number
    originAddress: string
    verified: boolean
    verifiedBy: string
  }
  updatedAt: string
  queuedAt: string
  status: string
}

export type Transfer = {
  transferType: TransferType
  contractAddress: string
  contractType: ContractType
  from: string
  to: string
  tokenIds: string[]
  amounts: string[]
  logIndex: number
  contractInfo: ContractInfo
}

export type TransactionHistoryItem = {
  txnHash: string
  blockNumber: number
  blockHash: string
  chainId: number
  metaTxnID: string | null
  transfers: Transfer[]
  timestamp: string
}

export type TransactionHistoryResponse = {
  page: {
    column: string
    pageSize: number
    more: boolean
  }
  transactions: TransactionHistoryItem[]
}

export type GetAccountTransactionHistoryParams = {
  chainId: number
  accountAddress: string
  pageSize?: number
  includeMetadata?: boolean
}

// Standalone function to calculate time difference between two transactions
export async function getTxTimeDiff(
  firstTx?: TransactionState,
  lastTx?: TransactionState,
): Promise<number> {
  if (!firstTx?.chainId || !lastTx?.chainId || !firstTx || !lastTx) {
    return 0
  }

  if (
    !(firstTx.blockNumber || firstTx.transactionHash) ||
    !(lastTx.blockNumber || lastTx.transactionHash)
  ) {
    return 0
  }

  if (
    firstTx.blockNumber === lastTx.blockNumber &&
    firstTx.transactionHash === lastTx.transactionHash
  ) {
    return 0
  }

  const firstChainInfo = getChainInfo(firstTx.chainId)
  const lastChainInfo = getChainInfo(lastTx.chainId)
  if (!firstChainInfo || !lastChainInfo) return 0

  const firstClient = createPublicClient({
    chain: firstChainInfo,
    transport: http(),
  })
  const lastClient = createPublicClient({
    chain: lastChainInfo,
    transport: http(),
  })

  async function getBlockNumber(
    client: ReturnType<typeof createPublicClient>,
    tx: TransactionState,
  ) {
    if (tx.blockNumber) return BigInt(tx.blockNumber)
    const receipt = await client.getTransactionReceipt({
      hash: tx.transactionHash as `0x${string}`,
    })
    return receipt.blockNumber
  }

  async function getTimestamp(
    client: ReturnType<typeof createPublicClient>,
    blockNumber: bigint,
  ) {
    const block = await client.getBlock({ blockNumber })
    return typeof block.timestamp === "bigint"
      ? Number(block.timestamp)
      : block.timestamp
  }

  try {
    const [firstBlockNumber, lastBlockNumber] = await Promise.all([
      getBlockNumber(firstClient, firstTx),
      getBlockNumber(lastClient, lastTx),
    ])

    const [firstTs, lastTs] = await Promise.all([
      getTimestamp(firstClient, firstBlockNumber),
      getTimestamp(lastClient, lastBlockNumber),
    ])

    const diff = lastTs - firstTs
    if (diff < 1) {
      return 1 // round up to 1 second
    }

    return diff
  } catch (error) {
    console.error(
      "[trails-sdk] Error calculating transaction time difference:",
      error,
    )
    return 0
  }
}

const chainIdToIndexerUrl = {
  42161: "https://arbitrum-indexer.sequence.app",
  8453: "https://base-indexer.sequence.app",
  84532: "https://base-sepolia-indexer.sequence.app",
  10: "https://optimism-indexer.sequence.app",
  137: "https://polygon-indexer.sequence.app",
  1: "https://mainnet-indexer.sequence.app",
  33139: "https://apechain-indexer.sequence.app",
  42170: "https://arbitrum-nova-indexer.sequence.app",
  43114: "https://avalanche-indexer.sequence.app",
  8333: "https://b3-indexer.sequence.app",
  81457: "https://blast-indexer.sequence.app",
  100: "https://gnosis-indexer.sequence.app",
  1868: "https://soneium-indexer.sequence.app",
  660279: "https://xai-indexer.sequence.app",
  56: "https://bsc-indexer.sequence.app",
  421613: "https://arbitrum-nova-sepolia-indexer.sequence.app",
}

export async function getAccountTransactionHistory({
  chainId,
  accountAddress,
  pageSize = 10,
  includeMetadata = true,
}: GetAccountTransactionHistoryParams): Promise<TransactionHistoryResponse> {
  const accessKey = getRpcSequenceProjectAccessKey()

  if (!accessKey) {
    throw new Error("Sequence project access key is required")
  }

  // Get the chain-specific indexer URL
  const chainIndexerUrl =
    chainIdToIndexerUrl[chainId as keyof typeof chainIdToIndexerUrl]
  if (!chainIndexerUrl) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }

  const endpoint = `${chainIndexerUrl}/rpc/Indexer/GetTransactionHistory`

  const requestBody = {
    filter: {
      accountAddress: accountAddress.toLowerCase(),
    },
    includeMetadata,
    page: {
      pageSize,
    },
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": accessKey,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TransactionHistoryResponse = await response.json()
    return data
  } catch (error) {
    console.error("[trails-sdk] Error fetching transaction history:", error)
    throw error
  }
}
