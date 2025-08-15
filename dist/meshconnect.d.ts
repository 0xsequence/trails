/**
 * Mesh Connect Link Token Generator
 * TypeScript implementation based on the createLinkToken.sh script
 */
export declare function getMeshConnectApiKey(environment?: "sandbox" | "production"): string;
export declare function getMeshConnectApiUrl(environment?: "sandbox" | "production"): string;
export interface MeshConnectConfig {
    apiKey: string;
    clientId: string;
    environment?: "sandbox" | "production";
    userId?: string;
}
export interface TransferOptions {
    integrationId?: string;
    address?: string;
    symbol?: string;
    networkId?: string;
    transactionId?: string;
    amount?: string;
    amountInFiat?: number;
    clientFee?: number;
    restrictMultipleAccounts?: boolean;
}
export interface LinkTokenRequest {
    userId: string;
    integrationId?: string;
    restrictMultipleAccounts?: boolean;
    transferOptions?: {
        toAddresses: Array<{
            networkId: string;
            symbol: string;
            address: string;
            amount?: string;
        }>;
        transactionId?: string;
        amount?: string;
        amountInFiat?: number;
        clientFee?: number;
    };
}
export interface LinkTokenResponse {
    content: {
        linkToken: string;
    };
    success: boolean;
    message?: string;
}
export interface MeshConnectError extends Error {
    statusCode?: number;
    response?: any;
}
/**
 * Check API health status
 */
export declare function checkApiHealth(config: MeshConnectConfig): Promise<boolean>;
/**
 * Generate a new link token using default credentials
 * Convenience function that uses the pre-configured API key and client ID
 */
export declare function createDefaultLinkToken(options?: Omit<TransferOptions, "userId"> & {
    environment?: "sandbox" | "production";
}): Promise<LinkTokenResponse>;
/**
 * Generate a new link token with random user ID
 * This is the main function equivalent to createLinkNew.sh
 */
export declare function createNewLinkToken(apiKey: string, clientId: string, options?: Omit<TransferOptions, "userId"> & {
    environment?: "sandbox" | "production";
}): Promise<LinkTokenResponse>;
/**
 * Generate a link token with specific user ID and transfer options
 * This provides more control over the link token generation
 */
export declare function createLinkToken(config: MeshConnectConfig, options?: TransferOptions): Promise<LinkTokenResponse>;
/**
 * Common Network IDs (based on Mesh Connect API)
 */
export declare const MESH_NETWORK_IDS: {
    readonly ETHEREUM: "e3c7fdd8-b1fc-4e51-85ae-bb276e075611";
    readonly POLYGON: "7436e9d0-ba42-4d2b-b4c0-8e4e606b2c12";
    readonly ARBITRUM: "a34f2431-0ddd-4de4-bc22-4a8143287aeb";
    readonly BASE: "aa883b03-120d-477c-a588-37c2afd3ca71";
    readonly AVALANCHE: "bad16371-c22a-4bf4-a311-274d046cd760";
    readonly BSC: "3b8c1557-4f06-4f56-8e4e-8c4c8c4c8c4c";
};
/**
 * Get Mesh Connect network ID from chain ID by fetching from API
 * @param chainId - The EVM chain ID (e.g., 1 for Ethereum, 8453 for Base)
 * @returns The corresponding Mesh Connect network ID, or undefined if not supported
 */
export declare function getMeshNetworkIdFromChainId(chainId: number | string, environment?: "sandbox" | "production"): Promise<string | undefined>;
/**
 * Common Integration IDs (based on Mesh Connect API)
 */
export declare const MESH_INTEGRATION_IDS: {
    readonly COINBASE: "9226e5c2-ebc3-4fdd-94f6-ed52cdce1420";
    readonly BINANCE: "34aeb688-decb-485f-9d80-b66466783394";
    readonly METAMASK: "45bfc688-decb-485f-9d80-b66466783395";
};
/**
 * Utility function to extract just the link token from the response
 */
export declare function extractLinkToken(response: LinkTokenResponse): string;
declare const _default: {
    createNewLinkToken: typeof createNewLinkToken;
    createDefaultLinkToken: typeof createDefaultLinkToken;
    createLinkToken: typeof createLinkToken;
    checkApiHealth: typeof checkApiHealth;
    extractLinkToken: typeof extractLinkToken;
};
export default _default;
export declare function getMeshConnectClientId(): string;
export declare function getMeshConnectEnvironment(): "sandbox" | "production";
export declare function getMeshConnectNetworkId(chainId: string): string;
//# sourceMappingURL=meshconnect.d.ts.map