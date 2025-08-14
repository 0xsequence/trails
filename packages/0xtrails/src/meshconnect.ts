/**
 * Mesh Connect Link Token Generator
 * TypeScript implementation based on the createLinkToken.sh script
 */

// API URLs
const SANDBOX_API_URL = "https://sandbox-integration-api.meshconnect.com"
const PRODUCTION_API_URL = "https://integration-api.meshconnect.com"

// API Credentials
const DEFAULT_SANDBOX_API_KEY =
  "sk_sand_krakwwuf.jcwzdo4l36dj4lsmpwnk3dboabiqod2ej1ogk3gli146zak0urxapxu2aopeldll"
const DEFAULT_PRODUCTION_API_KEY =
  "sk_prod_50xt3pf4.dblz97ccukw5n1ovp3fgazhscdhwkslqnstdv8dfth85g6satmeo48yzqw4kvnvg"
const DEFAULT_CLIENT_ID = "018880d9-425c-49fa-b0e5-08ddce68a08d"
const DEFAULT_ENVIRONMENT = "production"

export function getMeshConnectApiKey(
  environment: "sandbox" | "production" = "sandbox",
): string {
  return environment === "production"
    ? DEFAULT_PRODUCTION_API_KEY
    : DEFAULT_SANDBOX_API_KEY
}

export function getMeshConnectApiUrl(
  environment: "sandbox" | "production" = "sandbox",
): string {
  return environment === "production" ? PRODUCTION_API_URL : SANDBOX_API_URL
}

// Types
export interface MeshConnectConfig {
  apiKey: string
  clientId: string
  environment?: "sandbox" | "production"
  userId?: string
}

export interface TransferOptions {
  integrationId?: string
  address?: string
  symbol?: string
  networkId?: string
  transactionId?: string
  amount?: string
  amountInFiat?: number
  clientFee?: number
  restrictMultipleAccounts?: boolean
}

export interface LinkTokenRequest {
  userId: string
  integrationId?: string
  restrictMultipleAccounts?: boolean
  transferOptions?: {
    toAddresses: Array<{
      networkId: string
      symbol: string
      address: string
      amount?: string
    }>
    transactionId?: string
    amount?: string
    amountInFiat?: number
    clientFee?: number
  }
}

export interface LinkTokenResponse {
  content: {
    linkToken: string
  }
  success: boolean
  message?: string
}

export interface MeshConnectError extends Error {
  statusCode?: number
  response?: any
}

/**
 * Generate a random user ID with timestamp
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Build the request payload for link token generation
 */
function buildPayload(
  config: MeshConnectConfig,
  options: TransferOptions = {},
): LinkTokenRequest {
  const payload: LinkTokenRequest = {
    userId: config.userId || generateUserId(),
  }

  // Add integration ID if provided
  if (options.integrationId) {
    payload.integrationId = options.integrationId
  }

  // Add restrict multiple accounts if specified
  if (options.restrictMultipleAccounts) {
    payload.restrictMultipleAccounts = true
  }

  // Add transfer options if address is provided
  if (options.address) {
    payload.transferOptions = {
      toAddresses: [],
    }

    // Build toAddresses array
    if (options.symbol && options.networkId) {
      payload.transferOptions.toAddresses.push({
        networkId: options.networkId,
        symbol: options.symbol,
        address: options.address,
        amount: options.amount,
      })
    }

    // Add transaction ID if provided
    if (options.transactionId) {
      payload.transferOptions.transactionId = options.transactionId
    }

    // Add amount in fiat if provided
    if (options.amountInFiat !== undefined) {
      payload.transferOptions.amountInFiat = options.amountInFiat
    }

    if (options.amount !== undefined) {
      payload.transferOptions.amount = options.amount
    }

    // Add client fee if provided
    if (options.clientFee !== undefined) {
      payload.transferOptions.clientFee = options.clientFee
    }
  }

  return payload
}

/**
 * Make API request to generate link token
 */
async function makeApiRequest(
  payload: LinkTokenRequest,
  config: MeshConnectConfig,
): Promise<LinkTokenResponse> {
  const apiUrl = getMeshConnectApiUrl(config.environment)
  const endpoint = `${apiUrl}/api/v1/linktoken`

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": config.clientId,
        "X-Client-Secret": config.apiKey,
      },
      body: JSON.stringify(payload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(
        `API request failed with status ${response.status}`,
      ) as MeshConnectError
      error.statusCode = response.status
      error.response = responseData
      throw error
    }

    return responseData as LinkTokenResponse
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error
    }

    const meshError = new Error(`Network error: ${error}`) as MeshConnectError
    throw meshError
  }
}

/**
 * Check API health status
 */
export async function checkApiHealth(
  config: MeshConnectConfig,
): Promise<boolean> {
  const apiUrl = getMeshConnectApiUrl(config.environment)
  const endpoint = `${apiUrl}/api/v1/health`

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "X-Client-Id": config.clientId,
        "X-Client-Secret": config.apiKey,
      },
    })

    return response.ok
  } catch (error) {
    console.warn("API health check failed:", error)
    return false
  }
}

/**
 * Generate a new link token using default credentials
 * Convenience function that uses the pre-configured API key and client ID
 */
export async function createDefaultLinkToken(
  options: Omit<TransferOptions, "userId"> & {
    environment?: "sandbox" | "production"
  } = {
    environment: "sandbox",
  },
): Promise<LinkTokenResponse> {
  const apiKey = getMeshConnectApiKey(options.environment)
  const clientId = getMeshConnectClientId()
  return createNewLinkToken(apiKey, clientId, options)
}

/**
 * Generate a new link token with random user ID
 * This is the main function equivalent to createLinkNew.sh
 */
export async function createNewLinkToken(
  apiKey: string = DEFAULT_SANDBOX_API_KEY,
  clientId: string = DEFAULT_CLIENT_ID,
  options: Omit<TransferOptions, "userId"> & {
    environment?: "sandbox" | "production"
  } = {
    environment: "sandbox",
  },
): Promise<LinkTokenResponse> {
  apiKey = getMeshConnectApiKey(options.environment)
  const config: MeshConnectConfig = {
    apiKey,
    clientId,
    environment: options.environment,
    userId: generateUserId(),
  }

  // Validate required parameters
  if (!apiKey || apiKey.length < 10) {
    throw new Error("API key (client secret) is required and must be valid")
  }

  if (!clientId || clientId.length < 10) {
    throw new Error("Client ID is required and must be valid")
  }

  // Build payload
  const payload = buildPayload(config, options)

  // Make API request
  return await makeApiRequest(payload, config)
}

/**
 * Generate a link token with specific user ID and transfer options
 * This provides more control over the link token generation
 */
export async function createLinkToken(
  config: MeshConnectConfig,
  options: TransferOptions = {},
): Promise<LinkTokenResponse> {
  // Validate required parameters
  if (!config.apiKey || config.apiKey.length < 10) {
    throw new Error("API key (client secret) is required and must be valid")
  }

  if (!config.clientId || config.clientId.length < 10) {
    throw new Error("Client ID is required and must be valid")
  }

  // Build payload
  const payload = buildPayload(config, options)

  // Make API request
  return await makeApiRequest(payload, config)
}

/**
 * Common Network IDs (based on Mesh Connect API)
 */
export const MESH_NETWORK_IDS = {
  ETHEREUM: "e3c7fdd8-b1fc-4e51-85ae-bb276e075611",
  POLYGON: "7436e9d0-ba42-4d2b-b4c0-8e4e606b2c12",
  ARBITRUM: "a34f2431-0ddd-4de4-bc22-4a8143287aeb",
  BASE: "aa883b03-120d-477c-a588-37c2afd3ca71",
  AVALANCHE: "bad16371-c22a-4bf4-a311-274d046cd760",
  BSC: "3b8c1557-4f06-4f56-8e4e-8c4c8c4c8c4c",
} as const

/**
 * Get Mesh Connect network ID from chain ID by fetching from API
 * @param chainId - The EVM chain ID (e.g., 1 for Ethereum, 8453 for Base)
 * @returns The corresponding Mesh Connect network ID, or undefined if not supported
 */
export async function getMeshNetworkIdFromChainId(
  chainId: number | string,
  environment: "sandbox" | "production" = "sandbox",
): Promise<string | undefined> {
  try {
    const apiUrl = getMeshConnectApiUrl(environment)
    const apiKey = getMeshConnectApiKey(environment)
    const clientId = getMeshConnectClientId()
    const endpoint = `${apiUrl}/api/v1/transfers/managed/networks`

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "X-Client-Id": clientId,
        "X-Client-Secret": apiKey,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch networks: ${response.status} ${response.statusText}`,
      )
    }

    const data = await response.json()
    const networks = data.content?.networks || []

    // Find network by chain ID
    const targetChainId = chainId.toString()
    const network = networks.find((net: any) => net.chainId === targetChainId)

    return network?.id
  } catch (error) {
    console.error(
      "[meshconnect] Failed to fetch network ID for chain ID:",
      chainId,
      error,
    )
    return undefined
  }
}

/**
 * Common Integration IDs (based on Mesh Connect API)
 */
export const MESH_INTEGRATION_IDS = {
  COINBASE: "9226e5c2-ebc3-4fdd-94f6-ed52cdce1420",
  BINANCE: "34aeb688-decb-485f-9d80-b66466783394",
  METAMASK: "45bfc688-decb-485f-9d80-b66466783395",
} as const

/**
 * Utility function to extract just the link token from the response
 */
export function extractLinkToken(response: LinkTokenResponse): string {
  return response.content.linkToken
}

// Default export for convenience
export default {
  createNewLinkToken,
  createDefaultLinkToken,
  createLinkToken,
  checkApiHealth,
  extractLinkToken,
}

export function getMeshConnectClientId(): string {
  return DEFAULT_CLIENT_ID
}

export function getMeshConnectEnvironment(): "sandbox" | "production" {
  return DEFAULT_ENVIRONMENT
}

const networkIdMap: Record<string, string> = {
  "1": "e3c7fdd8-b1fc-4e51-85ae-bb276e075611",
  "137": "7436e9d0-ba42-4d2b-b4c0-8e4e606b2c12",
  "42161": "2a9c1557-4f06-4f56-8e4e-8c4c8c4c8c4c",
  "56": "3b8c1557-4f06-4f56-8e4e-8c4c8c4c8c4c",
}

export function getMeshConnectNetworkId(chainId: string): string {
  return networkIdMap[chainId] || "e3c7fdd8-b1fc-4e51-85ae-bb276e075611"
}

/*
import { createNewLinkToken, MESH_NETWORK_IDS } from './meshconnect'

// Basic usage - just authentication
const response = await createNewLinkToken(
  'sk_sand_krakwwuf.jcwzdo4l36dj4lsmpwnk3dboabiqod2ej1ogk3gli146zak0urxapxu2aopeldll',
  '018880d9-425c-49fa-b0e5-08ddce68a08d'
)
console.log(response.content.linkToken)

// With transfer options
const responseWithTransfer = await createNewLinkToken(
  'sk_sand_krakwwuf.jcwzdo4l36dj4lsmpwnk3dboabiqod2ej1ogk3gli146zak0urxapxu2aopeldll',
  '018880d9-425c-49fa-b0e5-08ddce68a08d',
  {
    address: '0xef180EDd4B6303a4CeBaF9b6e3a38CC39f381A99',
    symbol: 'USDC',
    networkId: MESH_NETWORK_IDS.POLYGON,
    amountInFiat: 2,
    transactionId: `deposit_${Date.now()}`
  }
)
  */
