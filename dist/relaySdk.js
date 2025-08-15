import { convertViemChainToRelayChain, createClient, getClient, MAINNET_RELAY_API, } from "@reservoir0x/relay-sdk";
import * as chains from "viem/chains";
createClient({
    baseApiUrl: MAINNET_RELAY_API,
    source: "Trails",
    chains: Object.values(chains).map((chain) => convertViemChainToRelayChain(chain)),
});
export var RelayTradeType;
(function (RelayTradeType) {
    RelayTradeType["EXACT_INPUT"] = "EXACT_INPUT";
    RelayTradeType["EXACT_OUTPUT"] = "EXACT_OUTPUT";
})(RelayTradeType || (RelayTradeType = {}));
/**
 * Get a quote for a relay transaction
 */
export async function getRelaySDKQuote(options) {
    try {
        const client = getClient();
        if (!client) {
            throw new Error("Relay client not available");
        }
        console.log("[trails-sdk] getRelaySDKQuote", options);
        const quote = await client.actions.getQuote({
            wallet: options.wallet,
            chainId: options.chainId,
            toChainId: options.toChainId || options.chainId,
            amount: options.amount,
            currency: options.currency,
            toCurrency: options.toCurrency || options.currency,
            tradeType: options.tradeType || RelayTradeType.EXACT_OUTPUT,
            txs: options.txs,
            user: options.wallet.account.address,
            recipient: options.recipient || options.wallet.account.address,
            options: {
                slippageTolerance: options.slippageTolerance
                    ? Math.round(Number(options.slippageTolerance) * 100 * 100).toString()
                    : undefined,
            },
        });
        return quote;
    }
    catch (error) {
        console.error("[trails-sdk] Error getting relay quote:", error);
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
        console.log("[trails-sdk] relaysdkclient", client.chains, options.quote);
        const result = await client.actions.execute({
            quote: options.quote,
            wallet: options.wallet,
            onProgress: options.onProgress ||
                ((data) => {
                    console.log("[trails-sdk] Relay progress:", data);
                }),
        });
        return result;
    }
    catch (error) {
        console.error("[trails-sdk] Error executing relay transaction:", error);
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
    let txHash = result?.data?.steps?.[result?.data?.steps.length - 1]?.items?.[0]
        ?.txHashes?.[0]?.txHash;
    if (!txHash) {
        txHash =
            result?.data?.steps?.[result?.data?.steps.length - 1]?.items?.[0]
                ?.internalTxHashes?.[0]?.txHash;
    }
    if (!txHash) {
        throw new Error("No transaction hash found in relay result");
    }
    return txHash;
}
// Source: https://docs.relay.link/resources/supported-chains
export const relaySupportedChains = {
    [chains.abstract.id]: chains.abstract,
    [chains.ancient8.id]: chains.ancient8,
    [chains.apeChain.id]: chains.apeChain,
    [chains.arbitrum.id]: chains.arbitrum,
    [chains.arbitrumNova.id]: chains.arbitrumNova,
    [chains.arenaz.id]: chains.arenaz,
    [chains.avalanche.id]: chains.avalanche,
    [chains.b3.id]: chains.b3,
    [chains.base.id]: chains.base,
    [chains.berachain.id]: chains.berachain,
    [chains.blast.id]: chains.blast,
    [chains.opBNB.id]: chains.opBNB,
    [chains.bob.id]: chains.bob,
    [chains.boba.id]: chains.boba,
    [chains.celo.id]: chains.celo,
    [chains.corn.id]: chains.corn,
    [chains.cronos.id]: chains.cronos,
    [chains.cyber.id]: chains.cyber,
    [chains.degen.id]: chains.degen,
    [chains.mainnet.id]: chains.mainnet,
    [chains.flowMainnet.id]: chains.flowMainnet,
    [chains.forma.id]: chains.forma,
    [chains.funkiMainnet.id]: chains.funkiMainnet,
    [chains.gnosis.id]: chains.gnosis,
    [chains.gravity.id]: chains.gravity,
    [chains.hemi.id]: chains.hemi,
    [chains.hychain.id]: chains.hychain,
    [chains.ink.id]: chains.ink,
    [chains.linea.id]: chains.linea,
    [chains.lisk.id]: chains.lisk,
    [chains.manta.id]: chains.manta,
    [chains.mantle.id]: chains.mantle,
    [chains.metis.id]: chains.metis,
    [chains.mint.id]: chains.mint,
    [chains.mode.id]: chains.mode,
    [chains.morph.id]: chains.morph,
    [chains.optimism.id]: chains.optimism,
    [chains.plume.id]: chains.plume,
    [chains.polygon.id]: chains.polygon,
    [chains.polygonZkEvm.id]: chains.polygonZkEvm,
    [chains.ronin.id]: chains.ronin,
    [chains.redstone.id]: chains.redstone,
    [chains.sanko.id]: chains.sanko,
    [chains.scroll.id]: chains.scroll,
    [chains.sei.id]: chains.sei,
    [chains.shape.id]: chains.shape,
    [chains.soneium.id]: chains.soneium,
    [chains.sonic.id]: chains.sonic,
    [chains.story.id]: chains.story,
    [chains.superposition.id]: chains.superposition,
    [chains.superseed.id]: chains.superseed,
    [chains.swellchain.id]: chains.swellchain,
    [chains.taiko.id]: chains.taiko,
    [chains.tron.id]: chains.tron,
    [chains.unichain.id]: chains.unichain,
    [chains.worldchain.id]: chains.worldchain,
    [chains.xai.id]: chains.xai,
    [chains.zeroG.id]: chains.zeroG,
    [chains.zircuit.id]: chains.zircuit,
    [chains.zksync.id]: chains.zksync,
    [chains.zora.id]: chains.zora,
};
export async function getRelaySupportedChains() {
    return Object.values(relaySupportedChains);
}
export async function isChainSupported(chainId) {
    return Object.keys(relaySupportedChains).includes(chainId.toString());
}
export async function getRelaySupportedTokens() {
    try {
        const chains = await fetchRelayChains();
        const tokens = [];
        chains.forEach((chain) => {
            if (!chain.disabled) {
                // Add native currency
                tokens.push({
                    id: chain.currency.id,
                    symbol: chain.currency.symbol,
                    name: chain.currency.name,
                    contractAddress: chain.currency.address,
                    decimals: chain.currency.decimals,
                    chainId: chain.id,
                    chainName: chain.displayName || chain.name,
                    imageUrl: "", // Native currencies typically don't have logoURI
                });
                // Add featured tokens
                chain.featuredTokens.forEach((token) => {
                    tokens.push({
                        id: token.id,
                        symbol: token.symbol,
                        name: token.name,
                        contractAddress: token.address,
                        decimals: token.decimals,
                        chainId: chain.id,
                        chainName: chain.displayName || chain.name,
                        imageUrl: token.metadata?.logoURI || "",
                    });
                });
                // Add ERC20 currencies
                chain.erc20Currencies.forEach((token) => {
                    tokens.push({
                        id: token.id,
                        symbol: token.symbol,
                        name: token.name,
                        contractAddress: token.address,
                        decimals: token.decimals,
                        chainId: chain.id,
                        chainName: chain.displayName || chain.name,
                        imageUrl: token.metadata?.logoURI || "",
                    });
                });
                // Add solver currencies (fallback for chains that might not have featuredTokens/erc20Currencies)
                chain.solverCurrencies.forEach((token) => {
                    tokens.push({
                        id: token.id,
                        symbol: token.symbol,
                        name: token.name,
                        contractAddress: token.address,
                        decimals: token.decimals,
                        chainId: chain.id,
                        chainName: chain.displayName || chain.name,
                        imageUrl: token.metadata?.logoURI || "",
                    });
                });
            }
        });
        // Remove duplicates by chainId and contractAddress
        const uniqueTokens = tokens.filter((token, index, self) => index ===
            self.findIndex((t) => t.chainId === token.chainId &&
                t.contractAddress.toLowerCase() ===
                    token.contractAddress.toLowerCase()));
        console.log(`[trails-sdk] Fetched ${uniqueTokens.length} unique tokens from Relay API`);
        return uniqueTokens;
    }
    catch (error) {
        console.error("[trails-sdk] Error fetching Relay supported tokens:", error);
        return [];
    }
}
// Cache for chains data
let cachedChains = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
async function fetchRelayChains() {
    const now = Date.now();
    // Return cached data if still valid
    if (cachedChains && now - cacheTimestamp < CACHE_DURATION) {
        return cachedChains;
    }
    try {
        const response = await fetch("https://api.relay.link/chains");
        if (!response.ok) {
            throw new Error(`Failed to fetch chains: ${response.status}`);
        }
        const data = await response.json();
        cachedChains = data.chains;
        cacheTimestamp = now;
        return data.chains;
    }
    catch (error) {
        console.error("[trails-sdk] Error fetching Relay chains:", error);
        // Return cached data if available, even if expired
        if (cachedChains) {
            return cachedChains;
        }
        throw error;
    }
}
export async function getIsRouteSupported({ originChainId, destinationChainId, amount, originToken, destinationToken, }) {
    try {
        // Fetch supported chains from Relay API
        const chains = await fetchRelayChains();
        // Check if both chains are supported and not disabled
        const originChain = chains.find((chain) => chain.id === originChainId);
        const destinationChain = chains.find((chain) => chain.id === destinationChainId);
        if (!originChain ||
            !destinationChain ||
            originChain.disabled ||
            destinationChain.disabled) {
            return false;
        }
        // Check if destination token is supported on destination chain
        const isDestinationTokenSupported = destinationChain.solverCurrencies.some((currency) => currency.address.toLowerCase() === destinationToken.toLowerCase());
        if (!isDestinationTokenSupported) {
            return false;
        }
        // If we have a client available, try to get a quote to verify the route
        const client = getClient();
        if (client) {
            try {
                const sender = "0x1111111111111111111111111111111111111111";
                const quote = await client.actions.getQuote({
                    chainId: originChainId,
                    toChainId: destinationChainId,
                    amount: amount,
                    currency: originToken,
                    toCurrency: destinationToken,
                    tradeType: "EXACT_OUTPUT",
                    txs: [],
                    user: sender,
                    recipient: sender,
                });
                return quote.steps.length > 0;
            }
            catch (error) {
                console.warn("[trails-sdk] Quote check failed, falling back to chain/token validation:", error);
                // If quote fails, we still return true if chains and tokens are supported
                return true;
            }
        }
        // If no client available, return true if chains and tokens are supported
        return true;
    }
    catch (error) {
        console.error("[trails-sdk] Error checking route support:", error);
        return false;
    }
}
/**
 * Fetch the status of a relay request by request ID
 */
export async function fetchRelayRequestStatus(requestId) {
    try {
        const response = await fetch(`https://api.relay.link/intents/status/v2?requestId=${requestId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch relay status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("[trails-sdk] Error fetching relay request status:", error);
        throw error;
    }
}
/**
 * Wait for relay destination transaction to complete and return the last transaction hash
 */
export async function waitForRelayDestinationTx(quoteProviderRequestId) {
    const maxWaitTime = 5 * 60 * 1000; // 5 minutes
    const pollInterval = 5000; // 5 seconds
    const startTime = Date.now();
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    while (Date.now() - startTime < maxWaitTime) {
        try {
            const status = await fetchRelayRequestStatus(quoteProviderRequestId);
            if (!status) {
                throw new Error("No status found");
            }
            if (status.inTxHashes &&
                status.inTxHashes.length > 0 &&
                status.originChainId === status.destinationChainId) {
                return status.inTxHashes[status.inTxHashes.length - 1];
            }
            console.log("[trails-sdk] Relay status check:", {
                requestId: quoteProviderRequestId,
                status: status.status,
                txHashesCount: status.txHashes?.length || 0,
            });
            // Check if we have transaction hashes
            if (status.txHashes && status.txHashes.length > 0) {
                // Return the last transaction hash in the array
                const lastTxHash = status.txHashes[status.txHashes.length - 1];
                if (lastTxHash) {
                    console.log("[trails-sdk] Relay transaction completed:", lastTxHash);
                    return lastTxHash;
                }
            }
            // If status is failed or error, throw an error
            if (status.status === "failed" || status.status === "error") {
                throw new Error(`Relay transaction failed with status: ${status.status}`);
            }
            // Wait before next poll
            await sleep(pollInterval);
        }
        catch (error) {
            // If it's a fetch error (like 404), continue polling as the request might not be indexed yet
            if (error instanceof Error &&
                (error.message.includes("Failed to fetch relay status") ||
                    error.message.includes("No status found"))) {
                console.warn("[trails-sdk] Relay status not yet available, continuing to poll...");
                await sleep(pollInterval);
                continue;
            }
            // For other errors, rethrow
            throw error;
        }
    }
    throw new Error(`Timeout waiting for relay transaction after ${maxWaitTime / 1000} seconds`);
}
