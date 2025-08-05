import { useConfig } from "@0xsequence/hooks"
import { SequenceAPIClient } from "@0xsequence/trails-api"
import { useMemo } from "react"
import { getSequenceApiUrl, getSequenceProjectAccessKey } from "./config.js"

export type APIClientConfig = {
  apiUrl?: string
  projectAccessKey?: string
  jwt?: string
}

export function getAPIClient({
  apiUrl = getSequenceApiUrl(),
  projectAccessKey = getSequenceProjectAccessKey(),
  jwt,
}: APIClientConfig): SequenceAPIClient {
  return new SequenceAPIClient(apiUrl as string, projectAccessKey, jwt)
}

export const useAPIClient = (config?: APIClientConfig) => {
  const { projectAccessKey, jwt, env } = useConfig()

  const apiClient = useMemo(() => {
    return getAPIClient({
      apiUrl: config?.apiUrl ?? env.apiUrl,
      projectAccessKey: config?.projectAccessKey ?? projectAccessKey,
      jwt: config?.jwt ?? jwt,
    })
  }, [projectAccessKey, jwt, env.apiUrl, config])

  return apiClient
}
