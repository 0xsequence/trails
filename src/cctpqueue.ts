import { getSequenceApiUrl, getSequenceProjectAccessKey } from "./config.js"
import type { SequenceAPIClient } from "@0xsequence/trails-api"

// Narrow API client to one that supports queueing CCTP transfers without using 'any'
type CctpQueueCapable = {
  queueCCTPTransfer: (
    args: {
      sourceTxHash?: string
      metaTxHash?: string
      sourceChainId: number
      destinationChainId: number
    },
    headers?: object,
    signal?: AbortSignal,
  ) => Promise<unknown>
}

const fallbackQueueCCTPTransfer = async (args: {
  sourceTxHash?: string
  metaTxHash?: string
  sourceChainId: number
  destinationChainId: number
}): Promise<void> => {
  const apiUrl = getSequenceApiUrl()
  const accessKey = getSequenceProjectAccessKey()
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  }
  if (accessKey) headers["X-Access-Key"] = accessKey
  await fetch(`${apiUrl.replace(/\/*$/, "")}/rpc/API/QueueCCTPTransfer`, {
    method: "POST",
    headers,
    body: JSON.stringify(args),
  })
}

export function hasCctpQueue(client: unknown): client is CctpQueueCapable {
  const maybe = client as { queueCCTPTransfer?: unknown } | null | undefined
  return typeof maybe?.queueCCTPTransfer === "function"
}

export async function queueCCTPTransfer({
  apiClient,
  sourceTxHash,
  sourceChainId,
  destinationChainId,
}: {
  apiClient: SequenceAPIClient
  sourceTxHash: string
  sourceChainId: number
  destinationChainId: number
}): Promise<void> {
  if (hasCctpQueue(apiClient)) {
    await apiClient.queueCCTPTransfer({
      sourceTxHash,
      sourceChainId,
      destinationChainId,
    })
  } else {
    await fallbackQueueCCTPTransfer({
      sourceTxHash,
      sourceChainId,
      destinationChainId,
    })
  }
}
