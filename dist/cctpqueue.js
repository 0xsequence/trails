import { getSequenceApiUrl, getSequenceProjectAccessKey } from "./config.js";
const fallbackQueueCCTPTransfer = async (args) => {
    const apiUrl = getSequenceApiUrl();
    const accessKey = getSequenceProjectAccessKey();
    const headers = {
        "Content-Type": "application/json",
    };
    if (accessKey)
        headers["X-Access-Key"] = accessKey;
    await fetch(`${apiUrl.replace(/\/*$/, "")}/rpc/API/QueueCCTPTransfer`, {
        method: "POST",
        headers,
        body: JSON.stringify(args),
    });
};
export function hasCctpQueue(client) {
    const maybe = client;
    return typeof maybe?.queueCCTPTransfer === "function";
}
export async function queueCCTPTransfer({ apiClient, sourceTxHash, sourceChainId, destinationChainId, }) {
    if (hasCctpQueue(apiClient)) {
        await apiClient.queueCCTPTransfer({
            sourceTxHash,
            sourceChainId,
            destinationChainId,
        });
    }
    else {
        await fallbackQueueCCTPTransfer({
            sourceTxHash,
            sourceChainId,
            destinationChainId,
        });
    }
}
