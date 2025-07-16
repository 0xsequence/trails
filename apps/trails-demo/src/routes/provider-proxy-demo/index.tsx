import {
  getAPIClient,
  getHasSufficientBalanceToken,
  getIndexerGatewayClient,
} from "@0xsequence/trails-sdk"
import { formatUnits, zeroAddress } from "viem"
import { mainnet } from "viem/chains"
import { createConfig, injected, WagmiProvider } from "wagmi"
import { ProviderProxyDemo as _ProviderProxyDemo } from "./ProviderProxyDemo.tsx"

async function doTrailsTransactionIntrospection(transaction: any, config: any) {
  console.log("['trails-sdk'] [trails-transaction-introspection]", transaction)

  const { from, value } = transaction
  if (!from) {
    return
  }

  const indexerGatewayClient = getIndexerGatewayClient({
    indexerGatewayUrl: config.indexerUrl,
    projectAccessKey: config.sequenceProjectAccessKey,
  })
  const apiClient = getAPIClient({
    apiUrl: config.apiUrl,
    projectAccessKey: config.sequenceProjectAccessKey,
  })

  const hasSufficientBalance = await getHasSufficientBalanceToken({
    account: from,
    amount: formatUnits(BigInt(value), 18),
    token: zeroAddress,
    chainId: mainnet.id,
    indexerGatewayClient: indexerGatewayClient,
    apiClient: apiClient,
  })

  if (!hasSufficientBalance) {
    throw new Error("Account has insufficient balance")
  }

  console.log(
    "['trails-sdk'] [trails-transaction-introspection] hasSufficientBalance",
    hasSufficientBalance,
  )
}

function customRequest(originalRequest: any, config: any) {
  return async (args: any) => {
    const { method, params } = args
    console.log("['trails-sdk'] [request introspection] args", method, params)

    if (method === "eth_sendTransaction") {
      const transaction = params[0]
      try {
        await doTrailsTransactionIntrospection(transaction, config)
      } catch (error) {
        console.error("['trails-sdk'] [request introspection] error", error)
      }
    }

    return originalRequest(args)
  }
}

const TrailsWagmiConnectorWrapper =
  (connector: any, config: any) =>
  (...args: any) => {
    console.log("🔍 Injected", args)
    const injectedConnector = connector(...args)
    const originalGetProvider = injectedConnector.getProvider
    injectedConnector.getProvider = async () => {
      const provider: any = await originalGetProvider()
      console.log("🔍 Injected Provider", provider)
      const originalRequest = provider.request
      provider.request = customRequest(originalRequest, config)
      return provider
    }
    console.log("🔍 Injected Connector", injectedConnector)
    return injectedConnector
  }

const sequenceProjectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY
const apiUrl = import.meta.env.VITE_API_URL
const indexerUrl = import.meta.env.VITE_INDEXER_URL
const env = import.meta.env.VITE_ENV

// Create Wagmi config with mock connector
const config = createConfig({
  chains: [mainnet],
  connectors: [
    TrailsWagmiConnectorWrapper(injected(), {
      sequenceProjectAccessKey,
      apiUrl,
      indexerUrl,
      env,
    }),
  ],
})

// Provider wrapper
export function ProviderProxyDemo() {
  return (
    <WagmiProvider config={config}>
      <_ProviderProxyDemo />
    </WagmiProvider>
  )
}
