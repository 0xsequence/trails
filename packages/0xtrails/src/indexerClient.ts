import { useConfig } from "@0xsequence/hooks"
import { SequenceIndexerGateway } from "@0xsequence/indexer"
import { useMemo } from "react"
import {
  DEFAULT_INDEXER_GATEWAY_URL,
  DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
} from "./constants.js"

export type IndexerGatewayConfig = {
  indexerGatewayUrl?: string
  projectAccessKey?: string
  jwt?: string
}

export function getIndexerGatewayClient({
  indexerGatewayUrl = DEFAULT_INDEXER_GATEWAY_URL,
  projectAccessKey = DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
  jwt,
}: IndexerGatewayConfig): SequenceIndexerGateway {
  return new SequenceIndexerGateway(
    indexerGatewayUrl as string,
    projectAccessKey,
    jwt,
  )
}

export const useIndexerGatewayClient = (config?: IndexerGatewayConfig) => {
  const {
    projectAccessKey = DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
    jwt,
    env,
  } = useConfig()

  const indexerGatewayClient = useMemo(() => {
    return getIndexerGatewayClient({
      indexerGatewayUrl: config?.indexerGatewayUrl ?? env.indexerGatewayUrl,
      projectAccessKey: config?.projectAccessKey ?? projectAccessKey,
      jwt: config?.jwt ?? jwt,
    })
  }, [projectAccessKey, jwt, env.indexerGatewayUrl, config])

  return indexerGatewayClient
}
