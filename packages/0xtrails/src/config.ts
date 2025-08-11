import {
  DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
  DEFAULT_RPC_SEQUENCE_PROJECT_ACCESS_KEY,
  DEFAULT_USE_V3_RELAYERS,
  DEFAULT_SEQUENCE_INDEXER_URL,
  DEFAULT_SEQUENCE_API_URL,
  DEFAULT_SEQUENCE_ENV,
  DEFAULT_WALLETCONNECT_PROJECT_ID,
  DEFAULT_PRIVY_APP_ID,
  DEFAULT_PRIVY_CLIENT_ID,
} from "./constants.js"

const globalConfig: {
  sequenceProjectAccessKey: string
  rpcSequenceProjectAccessKey: string
  sequenceUseV3Relayers: boolean
  sequenceIndexerUrl: string
  sequenceApiUrl: string
  sequenceEnv: string
  walletConnectProjectId: string
  privyAppId: string
  privyClientId: string
} = {
  sequenceProjectAccessKey: DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
  rpcSequenceProjectAccessKey: DEFAULT_RPC_SEQUENCE_PROJECT_ACCESS_KEY,
  sequenceUseV3Relayers: DEFAULT_USE_V3_RELAYERS,
  sequenceIndexerUrl: DEFAULT_SEQUENCE_INDEXER_URL,
  sequenceApiUrl: DEFAULT_SEQUENCE_API_URL,
  sequenceEnv: DEFAULT_SEQUENCE_ENV,
  walletConnectProjectId: DEFAULT_WALLETCONNECT_PROJECT_ID,
  privyAppId: DEFAULT_PRIVY_APP_ID,
  privyClientId: DEFAULT_PRIVY_CLIENT_ID,
}

export function getSequenceProjectAccessKey() {
  return globalConfig.sequenceProjectAccessKey
}

export function setSequenceProjectAccessKey(sequenceProjectAccessKey: string) {
  globalConfig.sequenceProjectAccessKey = sequenceProjectAccessKey
}

export function getRpcSequenceProjectAccessKey() {
  return globalConfig.rpcSequenceProjectAccessKey
}

export function setRpcSequenceProjectAccessKey(
  rpcSequenceProjectAccessKey: string,
) {
  globalConfig.rpcSequenceProjectAccessKey = rpcSequenceProjectAccessKey
}

export function setSequenceUseV3Relayers(sequenceUseV3Relayers: boolean) {
  globalConfig.sequenceUseV3Relayers = sequenceUseV3Relayers
}

export function getSequenceUseV3Relayers() {
  return globalConfig.sequenceUseV3Relayers
}

export function setSequenceIndexerUrl(sequenceIndexerUrl: string) {
  globalConfig.sequenceIndexerUrl = sequenceIndexerUrl
}

export function getSequenceIndexerUrl() {
  return globalConfig.sequenceIndexerUrl
}

export function setSequenceApiUrl(sequenceApiUrl: string) {
  globalConfig.sequenceApiUrl = sequenceApiUrl
}

export function getSequenceApiUrl() {
  return globalConfig.sequenceApiUrl
}

export function setSequenceEnv(sequenceEnv: string) {
  globalConfig.sequenceEnv = sequenceEnv
}

export function getSequenceEnv() {
  return globalConfig.sequenceEnv
}

export function setWalletConnectProjectId(walletConnectProjectId: string) {
  globalConfig.walletConnectProjectId = walletConnectProjectId
}

export function getWalletConnectProjectId() {
  return globalConfig.walletConnectProjectId
}

export function setPrivyAppId(privyAppId: string) {
  globalConfig.privyAppId = privyAppId
}

export function getPrivyAppId() {
  return globalConfig.privyAppId
}

export function setPrivyClientId(privyClientId: string) {
  globalConfig.privyClientId = privyClientId
}

export function getPrivyClientId() {
  return globalConfig.privyClientId
}
