import {
  DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
  DEFAULT_RPC_SEQUENCE_PROJECT_ACCESS_KEY,
} from "./constants.js"

const globalConfig = {
  sequenceProjectAccessKey: DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
  rpcSequenceProjectAccessKey: DEFAULT_RPC_SEQUENCE_PROJECT_ACCESS_KEY,
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
