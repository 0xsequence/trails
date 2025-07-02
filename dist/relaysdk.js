import { convertViemChainToRelayChain, createClient, getClient, MAINNET_RELAY_API, } from "@reservoir0x/relay-sdk";
import * as chains from "viem/chains";
createClient({
    baseApiUrl: MAINNET_RELAY_API,
    source: "AnyPay",
    chains: Object.values(chains).map((chain) => convertViemChainToRelayChain(chain)),
});
/**
 * Get a quote for a relay transaction
 */
export async function getRelaySDKQuote(options) {
    try {
        const client = getClient();
        if (!client) {
            throw new Error("Relay client not available");
        }
        console.log("getRelaySDKQuote", options);
        const quote = await client.actions.getQuote({
            wallet: options.wallet,
            chainId: options.chainId,
            toChainId: options.toChainId || options.chainId,
            amount: options.amount,
            currency: options.currency,
            toCurrency: options.toCurrency || options.currency,
            tradeType: options.tradeType || "EXACT_OUTPUT",
            txs: options.txs,
            user: options.wallet.account.address,
            recipient: options.recipient || options.wallet.account.address,
        });
        return quote;
    }
    catch (error) {
        console.error("Error getting relay quote:", error);
        throw error;
    }
}
/**
 * Execute a relay transaction
 */
export async function relaySDKExecute(options) {
    try {
        const client = getClient();
        if (!client) {
            throw new Error("Relay client not available");
        }
        console.log("relaysdkclient", client.chains, options.quote);
        const result = await client.actions.execute({
            quote: options.quote,
            wallet: options.wallet,
            onProgress: options.onProgress ||
                ((data) => {
                    console.log("Relay progress:", data);
                }),
        });
        return result;
    }
    catch (error) {
        console.error("Error executing relay transaction:", error);
        throw error;
    }
}
/**
 * Helper function to create a simple relay transaction for a contract call
 */
export async function createSimpleRelayTransaction(wallet, contractAddress, callData, value, chainId, currency = "0x0000000000000000000000000000000000000000") {
    const options = {
        wallet,
        chainId,
        amount: value,
        currency,
        txs: [
            {
                to: contractAddress,
                value,
                data: callData,
            },
        ],
    };
    return await getRelaySDKQuote(options);
}
/**
 * Helper function to execute a simple relay transaction
 */
export async function executeSimpleRelayTransaction(quote, wallet, onProgress) {
    return await relaySDKExecute({
        quote,
        wallet,
        onProgress,
    });
}
export function getTxHashFromRelayResult(result) {
    return result?.data?.steps?.[result?.data?.steps.length - 1]?.items?.[0]
        ?.txHashes?.[0]?.txHash;
}
