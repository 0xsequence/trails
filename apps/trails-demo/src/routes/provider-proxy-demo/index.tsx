import {
  getAPIClient,
  getHasSufficientBalanceToken,
  getIndexerGatewayClient,
} from "0xtrails"
import {
  TrailsWidget,
  type TrailsWidgetRef,
  createModalController,
} from "0xtrails/widget"
import { formatUnits, zeroAddress } from "viem"
import * as chains from "viem/chains"
import { createConfig, injected, WagmiProvider } from "wagmi"
import { ProviderProxyDemo as _ProviderProxyDemo } from "./ProviderProxyDemo.tsx"
import { useRef } from "react"

let used = false

async function doTrailsTransactionIntrospection(
  transaction: any,
  config: any,
  widgetRef: React.RefObject<TrailsWidgetRef>,
) {
  console.log("['trails-sdk'] [trails-transaction-introspection]", transaction)

  const { from, value, to, data } = transaction
  if (!from || !to) {
    return
  }

  if (used) {
    return true
  }

  const chainId = chains.mainnet.id

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
    chainId: chainId,
    indexerGatewayClient: indexerGatewayClient,
    apiClient: apiClient,
  })

  const modalController = createModalController(widgetRef)
  modalController.setToChainId(chainId)
  modalController.setToAddress(to)
  modalController.setToAmount(formatUnits(BigInt(value), 18))
  modalController.setToToken(zeroAddress)
  modalController.setToCalldata(data)
  if (used) {
    return true
  }
  used = true

  modalController.openModal()
  console.log("11modalController.isModalOpen", modalController.isModalOpen)
  await new Promise((resolve) => setTimeout(resolve, 200))
  while (modalController.isModalOpen) {
    console.log("modalController.isModalOpen", modalController.isModalOpen)
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  console.log("modalController.isModalOpen", modalController.isModalOpen)
  return true

  if (!hasSufficientBalance) {
    throw new Error("Account has insufficient balance")
  }

  console.log(
    "['trails-sdk'] [trails-transaction-introspection] hasSufficientBalance",
    hasSufficientBalance,
  )
}

function customRequest(
  originalRequest: any,
  config: any,
  widgetRef: React.RefObject<TrailsWidgetRef>,
) {
  return async (args: any) => {
    const { method, params } = args
    console.log("['trails-sdk'] [request introspection] args", method, params)

    if (method === "eth_sendTransaction") {
      const transaction = params[0]
      try {
        await doTrailsTransactionIntrospection(transaction, config, widgetRef)
      } catch (error) {
        console.error("['trails-sdk'] [request introspection] error", error)
      }
    }

    return originalRequest(args)
  }
}

const TrailsWagmiConnectorWrapper =
  (connector: any, config: any, widgetRef: React.RefObject<TrailsWidgetRef>) =>
  (...args: any) => {
    console.log("🔍 Injected", args)
    const injectedConnector = connector(...args)
    const originalGetProvider = injectedConnector.getProvider

    injectedConnector.getProvider = async () => {
      console.log("HEre0000000")
      const provider: any = await originalGetProvider()
      console.log("🔍 Injected Provider", provider)
      const originalRequest = provider.request
      const net = await originalRequest({ method: "eth_chainId" })
      console.log("🔍 Network", net)
      provider.request = customRequest(originalRequest, config, widgetRef)
      return provider
    }
    console.log("🔍 Injected Connector", injectedConnector)
    return injectedConnector
  }

const sequenceProjectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY
const apiUrl = import.meta.env.VITE_API_URL
const indexerUrl = import.meta.env.VITE_INDEXER_URL
const env = import.meta.env.VITE_ENV

// Provider wrapper
export function ProviderProxyDemo() {
  const widgetRef = useRef<TrailsWidgetRef>(null)

  // Create Wagmi config with mock connector
  const config = createConfig({
    chains: [chains.arbitrumSepolia],
    connectors: [
      TrailsWagmiConnectorWrapper(
        injected(),
        {
          sequenceProjectAccessKey,
          apiUrl,
          indexerUrl,
          env,
        },
        widgetRef,
      ),
    ],
  })

  return (
    <WagmiProvider config={config}>
      <_ProviderProxyDemo />
      <TrailsWidget
        ref={widgetRef}
        appId={sequenceProjectAccessKey}
        env={env}
        sequenceApiUrl={apiUrl}
        sequenceIndexerUrl={indexerUrl}
        renderInline={false}
        hidden={true}
        onClose={() => {
          console.log("🔍 TrailsWidget closed")
        }}
      />
    </WagmiProvider>
  )
}
