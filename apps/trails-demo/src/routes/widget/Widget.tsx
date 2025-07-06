import { TrailsWidget } from "@0xsequence/trails-sdk/widget"
import { useCallback, useEffect, useState } from "react"
import { CodeSnippet } from "./components/CodeSnippet"
import { AppKitProvider, ConnectButton } from "./components/ConnectWallet"
import { CustomizationForm, STORAGE_KEYS } from "./components/CustomizationForm"

export const Widget = () => {
  const defaultSequenceProjectAccessKey = import.meta.env
    .VITE_PROJECT_ACCESS_KEY
  const apiUrl = import.meta.env.VITE_API_URL
  const indexerUrl = import.meta.env.VITE_INDEXER_URL
  const env = import.meta.env.VITE_ENV
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID
  const privyClientId = import.meta.env.VITE_PRIVY_CLIENT_ID

  const [sequenceProjectAccessKey, setSequenceProjectAccessKey] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [toChainId, setToChainId] = useState<number | undefined>()
  const [toToken, setToToken] = useState<string | undefined>()
  const [toCalldata, setToCalldata] = useState("")
  const [renderInline, setRenderInline] = useState<boolean | null>(null)
  const [useCustomButton, setUseCustomButton] = useState<boolean | null>(null)
  const [provider, setProvider] = useState<any>(null)
  const [theme, setTheme] = useState<string | null>(null)
  const [walletOptions, setWalletOptions] = useState<string[] | null>(null)
  const [paymasterUrls, setPaymasterUrls] = useState<
    Array<{ chainId: number; url: string }>
  >([])
  const [gasless, setGasless] = useState<boolean | null>(null)

  const handleConnect = useCallback((provider: any) => {
    console.log("provider", provider)
    setProvider(provider)
  }, [])

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.RENDER_INLINE)) {
      setRenderInline(true)
    }
    if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
      setTheme("auto")
    }
    if (!localStorage.getItem(STORAGE_KEYS.WALLET_OPTIONS)) {
      setWalletOptions([])
    }
  }, [])

  const content = (
    <div className="flex flex-col items-center justify-center space-y-6 py-8 px-4 sm:py-12 sm:px-6">
      <div className="text-center space-y-4 max-w-6xl w-full">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          Trails Widget Demo
        </h1>
        <p className="text-sm text-white leading-relaxed max-w-3xl mx-auto font-light px-4">
          This demo showcases a multi-step transfer flow using the{" "}
          <span className="font-medium">Trails SDK</span>. Connect your wallet,
          select a token, specify the amount and recipient, and see the
          transaction confirmation process in action.
        </p>

        <ConnectButton onConnect={handleConnect} />
      </div>

      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Config Form */}
          <div className="w-full lg:w-1/2">
            <CustomizationForm
              sequenceProjectAccessKey={sequenceProjectAccessKey}
              setSequenceProjectAccessKey={setSequenceProjectAccessKey}
              toAddress={toAddress}
              setToAddress={setToAddress}
              toAmount={toAmount}
              setToAmount={setToAmount}
              toChainId={toChainId}
              setToChainId={setToChainId}
              toToken={toToken}
              setToToken={setToToken}
              toCalldata={toCalldata}
              setToCalldata={setToCalldata}
              useCustomButton={useCustomButton}
              setUseCustomButton={setUseCustomButton}
              setRenderInline={setRenderInline}
              renderInline={renderInline}
              theme={theme}
              setTheme={setTheme}
              walletOptions={walletOptions}
              setWalletOptions={setWalletOptions}
              paymasterUrls={paymasterUrls}
              setPaymasterUrls={setPaymasterUrls}
              gasless={gasless}
              setGasless={setGasless}
            />
          </div>

          {/* Right Column - Code Snippet */}
          <div className="w-full lg:w-1/2">
            <CodeSnippet
              sequenceProjectAccessKey={sequenceProjectAccessKey}
              toAddress={toAddress}
              toAmount={toAmount}
              toChainId={toChainId}
              toToken={toToken}
              toCalldata={toCalldata}
              useCustomButton={useCustomButton}
              renderInline={renderInline}
              theme={theme}
              walletOptions={walletOptions}
              paymasterUrls={paymasterUrls}
              gasless={gasless}
            >
              <div className="mt-6 w-full max-w-md mx-auto px-4">
                <TrailsWidget
                  sequenceProjectAccessKey={
                    sequenceProjectAccessKey || defaultSequenceProjectAccessKey
                  }
                  sequenceApiUrl={apiUrl}
                  sequenceIndexerUrl={indexerUrl}
                  sequenceEnv={env}
                  toAddress={toAddress || undefined}
                  toAmount={toAmount || undefined}
                  toChainId={toChainId}
                  toToken={toToken}
                  toCalldata={toCalldata || undefined}
                  provider={provider}
                  renderInline={renderInline}
                  theme={theme}
                  walletOptions={walletOptions}
                  useSourceTokenForButtonText={true}
                  privyAppId={privyAppId}
                  privyClientId={privyClientId}
                  paymasterUrls={paymasterUrls}
                  gasless={gasless}
                >
                  {useCustomButton ? (
                    <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-600 cursor-pointer transition duration-300">
                      Pay with Trails
                    </button>
                  ) : null}
                </TrailsWidget>
              </div>
            </CodeSnippet>
          </div>
        </div>
      </div>
    </div>
  )

  return <AppKitProvider>{content}</AppKitProvider>
}
