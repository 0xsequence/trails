import { useConfig } from "@0xsequence/hooks"
import { SequenceIndexerGateway } from "@0xsequence/indexer"
import { useMemo } from "react"
import { getSequenceIndexerUrl, getSequenceProjectAccessKey } from "./config.js"

export type IndexerGatewayConfig = {
  indexerGatewayUrl?: string
  projectAccessKey?: string
  jwt?: string
}

export function getIndexerGatewayClient({
  indexerGatewayUrl = getSequenceIndexerUrl(),
  projectAccessKey = getSequenceProjectAccessKey(),
  jwt,
}: IndexerGatewayConfig): SequenceIndexerGateway {
  return new SequenceIndexerGateway(
    indexerGatewayUrl as string,
    projectAccessKey,
    jwt,
  )
}

export const useIndexerGatewayClient = (config?: IndexerGatewayConfig) => {
  const { projectAccessKey, jwt, env } = useConfig()

  const indexerGatewayClient = useMemo(() => {
    return getIndexerGatewayClient({
      indexerGatewayUrl: config?.indexerGatewayUrl ?? env.indexerGatewayUrl,
      projectAccessKey: config?.projectAccessKey ?? projectAccessKey,
      jwt: config?.jwt ?? jwt,
    })
  }, [projectAccessKey, jwt, env.indexerGatewayUrl, config])

  return indexerGatewayClient
}
