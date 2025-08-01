import { createPublicClient, http } from "viem";
import { getChainInfo } from "./chains.js";
// Standalone function to calculate time difference between two transactions
export async function getTxTimeDiff(firstTx, lastTx) {
    if (!firstTx?.chainId || !lastTx?.chainId || !firstTx || !lastTx) {
        return 0;
    }
    if (!(firstTx.blockNumber || firstTx.transactionHash) ||
        !(lastTx.blockNumber || lastTx.transactionHash)) {
        return 0;
    }
    if (firstTx.blockNumber === lastTx.blockNumber &&
        firstTx.transactionHash === lastTx.transactionHash) {
        return 0;
    }
    const firstChainInfo = getChainInfo(firstTx.chainId);
    const lastChainInfo = getChainInfo(lastTx.chainId);
    if (!firstChainInfo || !lastChainInfo)
        return 0;
    const firstClient = createPublicClient({
        chain: firstChainInfo,
        transport: http(),
    });
    const lastClient = createPublicClient({
        chain: lastChainInfo,
        transport: http(),
    });
    async function getBlockNumber(client, tx) {
        if (tx.blockNumber)
            return BigInt(tx.blockNumber);
        const receipt = await client.getTransactionReceipt({
            hash: tx.transactionHash,
        });
        return receipt.blockNumber;
    }
    async function getTimestamp(client, blockNumber) {
        const block = await client.getBlock({ blockNumber });
        return typeof block.timestamp === "bigint"
            ? Number(block.timestamp)
            : block.timestamp;
    }
    try {
        const [firstBlockNumber, lastBlockNumber] = await Promise.all([
            getBlockNumber(firstClient, firstTx),
            getBlockNumber(lastClient, lastTx),
        ]);
        const [firstTs, lastTs] = await Promise.all([
            getTimestamp(firstClient, firstBlockNumber),
            getTimestamp(lastClient, lastBlockNumber),
        ]);
        const diff = lastTs - firstTs;
        if (diff < 1) {
            return 1; // round up to 1 second
        }
        return diff;
    }
    catch (error) {
        console.error("[trails-sdk] Error calculating transaction time difference:", error);
        return 0;
    }
}
