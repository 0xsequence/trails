import { DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY, DEFAULT_RPC_SEQUENCE_PROJECT_ACCESS_KEY, DEFAULT_USE_V3_RELAYERS, DEFAULT_SEQUENCE_INDEXER_URL, DEFAULT_SEQUENCE_API_URL, DEFAULT_SEQUENCE_ENV, } from "./constants.js";
const globalConfig = {
    sequenceProjectAccessKey: DEFAULT_SEQUENCE_PROJECT_ACCESS_KEY,
    rpcSequenceProjectAccessKey: DEFAULT_RPC_SEQUENCE_PROJECT_ACCESS_KEY,
    sequenceUseV3Relayers: DEFAULT_USE_V3_RELAYERS,
    sequenceIndexerUrl: DEFAULT_SEQUENCE_INDEXER_URL,
    sequenceApiUrl: DEFAULT_SEQUENCE_API_URL,
    sequenceEnv: DEFAULT_SEQUENCE_ENV,
};
export function getSequenceProjectAccessKey() {
    return globalConfig.sequenceProjectAccessKey;
}
export function setSequenceProjectAccessKey(sequenceProjectAccessKey) {
    globalConfig.sequenceProjectAccessKey = sequenceProjectAccessKey;
}
export function getRpcSequenceProjectAccessKey() {
    return globalConfig.rpcSequenceProjectAccessKey;
}
export function setRpcSequenceProjectAccessKey(rpcSequenceProjectAccessKey) {
    globalConfig.rpcSequenceProjectAccessKey = rpcSequenceProjectAccessKey;
}
export function setSequenceUseV3Relayers(sequenceUseV3Relayers) {
    globalConfig.sequenceUseV3Relayers = sequenceUseV3Relayers;
}
export function getSequenceUseV3Relayers() {
    return globalConfig.sequenceUseV3Relayers;
}
export function setSequenceIndexerUrl(sequenceIndexerUrl) {
    globalConfig.sequenceIndexerUrl = sequenceIndexerUrl;
}
export function getSequenceIndexerUrl() {
    return globalConfig.sequenceIndexerUrl;
}
export function setSequenceApiUrl(sequenceApiUrl) {
    globalConfig.sequenceApiUrl = sequenceApiUrl;
}
export function getSequenceApiUrl() {
    return globalConfig.sequenceApiUrl;
}
export function setSequenceEnv(sequenceEnv) {
    globalConfig.sequenceEnv = sequenceEnv;
}
export function getSequenceEnv() {
    return globalConfig.sequenceEnv;
}
