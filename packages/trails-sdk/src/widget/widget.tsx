import type { MetaTxnReceipt } from "@0xsequence/trails-relayer"
import "@0xsequence/design-system/preset"
import { SequenceHooksContext, SequenceHooksProvider } from "@0xsequence/hooks"
import {
  PrivyProvider,
  useLogin,
  usePrivy,
  useWallets as usePrivyWallets,
} from "@privy-io/react-auth"
import {
  createConfig,
  useSetActiveWallet,
  WagmiProvider,
} from "@privy-io/wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AnimatePresence, motion } from "motion/react"
import React, {
  StrictMode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import type { Chain, TransactionReceipt, WalletClient } from "viem"
import { createWalletClient, custom, http } from "viem"
import * as chains from "viem/chains"
import { mainnet } from "viem/chains"
import type { Connector } from "wagmi"
import { useAccount, useConnect, useDisconnect, WagmiContext } from "wagmi"
import { injected } from "wagmi/connectors"
import { getChainInfo } from "../chains.js"
import { useIndexerGatewayClient } from "../indexerClient.js"
import type { TransactionState } from "../prepareSend.js"
import type { RelayerEnv } from "../relayer.js"
import type { ActiveTheme, Theme } from "../theme.js"
import type { WalletOption } from "./components/ConnectWallet.js"
import { ConnectWallet } from "./components/ConnectWallet.js"
import Footer from "./components/Footer.js"
import Modal from "./components/Modal.js"
import Receipt from "./components/Receipt.js"
import SendForm from "./components/SendForm.js"
import TokenList from "./components/TokenList.js"
import TransferPending from "./components/TransferPending.js"
import WalletConfirmation from "./components/WalletConfirmation.js"
import { defaultPrivyAppId, defaultPrivyClientId } from "./config.js"
import css from "./index.css?inline"

type Screen =
  | "connect"
  | "tokens"
  | "send"
  | "wallet-confirmation"
  | "pending"
  | "receipt"

export const defaultWalletOptions = ["injected", "privy"]

interface Token {
  id: number
  name: string
  symbol: string
  balance: string
  imageUrl: string
  chainId: number
  contractAddress: string
  contractInfo?: {
    decimals: number
    symbol: string
    name: string
  }
}

export type TrailsWidgetProps = {
  sequenceProjectAccessKey: string
  sequenceIndexerUrl?: string
  sequenceApiUrl?: string
  sequenceEnv?: RelayerEnv
  toAddress?: string
  toAmount?: string
  toChainId?: number | string
  toToken?: string
  toCalldata?: string
  provider?: any
  children?: React.ReactNode
  renderInline?: boolean
  theme?: Theme
  walletOptions?: string[]
  onOriginConfirmation?: (txHash: string) => void
  onDestinationConfirmation?: (txHash: string) => void
  privyAppId?: string
  privyClientId?: string
  useSourceTokenForButtonText?: boolean
  paymasterUrls?: Array<{ chainId: number; url: string }>
  gasless?: boolean
}

const queryClient = new QueryClient()

// Function to get system theme preference
const getSystemTheme = (): ActiveTheme => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

// Function to get initial theme based on mode
const getInitialTheme = (mode: Theme): ActiveTheme => {
  if (mode === "auto") {
    return getSystemTheme()
  }
  return mode as ActiveTheme
}

const WALLET_CONFIGS: Record<
  string,
  { id: string; name: string; connector: () => any }
> = {
  injected: {
    id: "injected",
    name: "Injected Web3",
    connector: injected,
  },
  privy: {
    id: "privy",
    name: "Privy",
    connector: () => {},
  },
} as const

// Create a custom hook for theme management
const useThemeManager = (initialTheme: Theme) => {
  const [theme, setTheme] = useState<ActiveTheme>(getInitialTheme(initialTheme))
  const [themeMode, setThemeMode] = useState<Theme>(initialTheme)

  useEffect(() => {
    if (themeMode !== "auto") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }

    setTheme(mediaQuery.matches ? "dark" : "light")
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [themeMode])

  useEffect(() => {
    setThemeMode(initialTheme)
    setTheme(getInitialTheme(initialTheme))
  }, [initialTheme])

  return { theme, themeMode }
}

// Create a custom hook for wallet management
const useWalletManager = (
  provider: any,
  address: string | undefined,
  chainId: number | undefined,
  connector: Connector | undefined,
) => {
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)

  useEffect(() => {
    const connect = async () => {
      const activeProvider = provider || (await connector?.getProvider())

      if (activeProvider && address && chainId) {
        const chain = getChainInfo(chainId)
        if (!chain) {
          return
        }

        const client = createWalletClient({
          account: address as `0x${string}`,
          chain,
          transport: custom(activeProvider),
        })

        setWalletClient(client)
      }
    }
    connect().catch(console.error)
  }, [provider, address, chainId, connector])

  return walletClient
}

// Create a custom hook for transaction state management
const useTransactionState = (
  onOriginConfirmation?: (txHash: string) => void,
  onDestinationConfirmation?: (txHash: string) => void,
) => {
  const [originTxHash, setOriginTxHash] = useState("")
  const [destinationTxHash, setDestinationTxHash] = useState("")
  const [destinationChainId, setDestinationChainId] = useState<number | null>(
    null,
  )
  const [transactionStates, setTransactionStates] = useState<
    TransactionState[]
  >([])

  useEffect(() => {
    if (onOriginConfirmation && originTxHash) {
      onOriginConfirmation(originTxHash)
    }
  }, [originTxHash, onOriginConfirmation])

  useEffect(() => {
    if (onDestinationConfirmation && destinationTxHash) {
      onDestinationConfirmation(destinationTxHash)
    }
  }, [destinationTxHash, onDestinationConfirmation])

  return {
    originTxHash,
    setOriginTxHash,
    destinationTxHash,
    setDestinationTxHash,
    destinationChainId,
    setDestinationChainId,
    transactionStates,
    setTransactionStates,
  }
}

const WidgetInner: React.FC<TrailsWidgetProps> = ({
  sequenceProjectAccessKey,
  sequenceIndexerUrl,
  sequenceApiUrl,
  sequenceEnv,
  toAddress,
  toAmount,
  toChainId,
  toToken,
  toCalldata,
  children,
  renderInline = true,
  theme: initialTheme = "auto",
  walletOptions,
  onOriginConfirmation,
  onDestinationConfirmation,
  useSourceTokenForButtonText,
  paymasterUrls,
  gasless,
}) => {
  const { address, isConnected, chainId, connector } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const { theme } = useThemeManager(initialTheme)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    isConnected ? "tokens" : "connect",
  )
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [intentAddress, setIntentAddress] = useState<string | null>(null)
  const [fromAmount, setFromAmount] = useState<string | null>(null)
  const [showWalletConfirmRetry, setShowWalletConfirmRetry] = useState(false)
  const [walletConfirmRetryHandler, setWalletConfirmRetryHandler] = useState<
    (() => Promise<void>) | null
  >(null)
  const { connect } = useConnect()

  const {
    connectWallet: privyConnectWallet,
    ready: privyReady,
    logout: privyLogout,
  } = usePrivy()

  const { login: loginPrivy } = useLogin()
  const { wallets: privyWallets } = usePrivyWallets()
  const { setActiveWallet: setPrivyActiveWallet } = useSetActiveWallet()
  const usePrivyLogin = true // Set to true to use Privy email login options

  const walletClient = useWalletManager(undefined, address, chainId, connector)

  const {
    setOriginTxHash,
    destinationTxHash,
    setDestinationTxHash,
    destinationChainId,
    setDestinationChainId,
    transactionStates,
    setTransactionStates,
  } = useTransactionState(onOriginConfirmation, onDestinationConfirmation)

  // Update screen based on connection state
  useEffect(() => {
    if (isConnected) {
      setError(null)
      setCurrentScreen("tokens")
    }
  }, [isConnected])

  const indexerGatewayClient = useIndexerGatewayClient({
    indexerGatewayUrl: sequenceIndexerUrl,
    projectAccessKey: sequenceProjectAccessKey,
  })

  const handleWalletConnect = async (walletId: string) => {
    try {
      setError(null)
      const config = WALLET_CONFIGS[walletId as keyof typeof WALLET_CONFIGS]
      if (!config) {
        setError(`No configuration found for wallet: ${walletId}`)
        return
      }
      if (walletId === "injected") {
        await connect({ connector: config.connector() })
      } else if (walletId === "privy") {
        console.log("Privy ready", privyReady)
        if (!privyReady) {
          return
        }
        try {
          await disconnectAsync()
        } catch (error) {
          console.error("Failed to disconnect", error)
        }
        if (usePrivyLogin) {
          try {
            await privyLogout()
          } catch (error) {
            console.error("Failed to logout Privy", error)
          }
          try {
            await loginPrivy()
          } catch (error) {
            console.error("Failed to login Privy", error)
          }
        } else {
          await privyConnectWallet()
        }
      }
      console.log(`Connected to ${config.name}`)
    } catch (error) {
      console.error("Failed to connect:", error)
      setError(
        error instanceof Error ? error.message : "Failed to connect wallet",
      )
    }
  }

  useEffect(() => {
    console.log("Privy wallets change", privyWallets)
    const latestWallet = privyWallets?.sort(
      (a, b) => a.connectedAt - b.connectedAt,
    )?.[0]
    if (latestWallet) {
      console.log("Setting Privy active wallet", latestWallet)
      setPrivyActiveWallet(latestWallet)
    }
  }, [privyWallets, setPrivyActiveWallet])

  const handleWalletDisconnect = () => {
    setError(null)

    if (connector?.name?.toLowerCase()?.includes("privy")) {
      Promise.resolve()
        .then(async () => {
          try {
            await disconnectAsync()
          } catch (error) {
            console.error("Failed to disconnect", error)
          }
        })
        .then(async () => {
          try {
            await privyLogout()
          } catch (error) {
            console.error("Failed to logout Privy", error)
          }
        })
        .then(async () => {
          setPrivyActiveWallet(null as any)
        })
        .finally(() => {
          setCurrentScreen("connect")
        })
    } else {
      setCurrentScreen("connect")
    }
  }

  const handleContinue = () => {
    setCurrentScreen("tokens")
  }

  const getAvailableWallets = (): WalletOption[] => {
    const requestedWallets = walletOptions || defaultWalletOptions
    const availableWallets = requestedWallets
      .filter((id) => WALLET_CONFIGS[id as keyof typeof WALLET_CONFIGS])
      .map((id) => {
        const config = WALLET_CONFIGS[id as keyof typeof WALLET_CONFIGS]
        if (!config) return null
        return {
          id: config.id,
          name: config.name,
        }
      })
      .filter(Boolean)

    return availableWallets as WalletOption[]
  }

  const handleTokenSelect = (token: Token) => {
    try {
      setError(null)
      setSelectedToken(token)
      setCurrentScreen("send")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    }
  }

  const handleOnSend = async (amount: string, recipient: string) => {
    console.log("handleOnSend", amount, recipient)
  }

  const handleSendAnother = () => {
    setCurrentScreen("tokens")
    resetState()
  }

  function resetState() {
    setCurrentScreen("connect")
    setSelectedToken(null)
    setDestinationTxHash("")
    setDestinationChainId(null)
    setTransactionStates([])
    setIntentAddress(null)
    setFromAmount(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetState()
  }

  const handleBack = () => {
    setError(null)
    switch (currentScreen) {
      case "tokens":
        setCurrentScreen("connect")
        break
      case "send":
        setCurrentScreen("tokens")
        setSelectedToken(null)
        break
      case "wallet-confirmation":
        setCurrentScreen("send")
        break
      case "receipt":
        setCurrentScreen("tokens")
        setSelectedToken(null)
        setDestinationTxHash("")
        setDestinationChainId(null)
        break
      default:
        break
    }
  }

  function handleTransferComplete(data?: {
    originChainId: number
    destinationChainId: number
    originUserTxReceipt: TransactionReceipt | null
    originMetaTxnReceipt: MetaTxnReceipt | null
    destinationMetaTxnReceipt: MetaTxnReceipt | null
  }) {
    if (data) {
      if (data.originUserTxReceipt) {
        setOriginTxHash(data.originUserTxReceipt.transactionHash)
      }

      if (data.destinationMetaTxnReceipt || data.originUserTxReceipt) {
        setDestinationTxHash(
          (data.destinationMetaTxnReceipt as MetaTxnReceipt)?.txnHash ||
            (data.originUserTxReceipt as TransactionReceipt)?.transactionHash,
        )
      }

      if (data.destinationChainId) {
        setDestinationChainId(data.destinationChainId)
      }

      setCurrentScreen("receipt")
    }
  }

  function handleTransactionStateChange(
    _transactionStates: TransactionState[],
  ) {
    console.log("transactionStates from widget", _transactionStates)
    setTransactionStates([..._transactionStates])
  }

  const handleDebugScreenSelect = (screen: string) => {
    // Reset necessary state based on the target screen
    setError(null)

    switch (screen.toLowerCase()) {
      case "connect":
        setCurrentScreen("connect")
        setSelectedToken(null)
        setTransactionStates([])
        break
      case "tokens":
        if (isConnected) {
          setCurrentScreen("tokens")
          setSelectedToken(null)
          setTransactionStates([])
        }
        break
      case "send":
        // Set dummy USDC token for debug mode
        setSelectedToken({
          id: 1,
          name: "USD Coin",
          symbol: "USDC",
          balance: "1000000000",
          imageUrl:
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
          chainId: 1,
          contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          contractInfo: {
            decimals: 6,
            symbol: "USDC",
            name: "USD Coin",
          },
        })

        setCurrentScreen("send")
        setTransactionStates([])

        break
      case "wallet confirmation":
        // Set dummy USDC token for debug mode
        setSelectedToken({
          id: 1,
          name: "USD Coin",
          symbol: "USDC",
          balance: "1000000000",
          imageUrl:
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
          chainId: 1,
          contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          contractInfo: {
            decimals: 6,
            symbol: "USDC",
            name: "USD Coin",
          },
        })

        setCurrentScreen("wallet-confirmation")
        setIntentAddress("0x5A0fb747531bC369367CB031472b89ea4D5c6Df7")
        setFromAmount("1")
        setTransactionStates([])
        break
      case "pending":
        // Set dummy transaction states for debug mode - showing all steps
        setTransactionStates([
          {
            transactionHash:
              "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
            explorerUrl:
              "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
            chainId: 137,
            state: "confirmed",
          },
          {
            transactionHash:
              "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
            explorerUrl:
              "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
            chainId: 137,
            state: "confirmed",
          },
          {
            transactionHash:
              "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
            explorerUrl:
              "https://arbiscan.io/tx/0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
            chainId: 42161,
            state: "pending",
          },
        ])
        setCurrentScreen("pending")
        break
      case "receipt":
        // Set dummy final transaction data for debug mode
        setDestinationTxHash(
          "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
        )
        setDestinationChainId(42161)

        // Set dummy transaction states data for debug mode
        setTransactionStates([
          {
            transactionHash:
              "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
            explorerUrl:
              "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
            chainId: 137,
            state: "confirmed",
          },
          {
            transactionHash:
              "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
            explorerUrl:
              "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
            chainId: 137,
            state: "confirmed",
          },
          {
            transactionHash:
              "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
            explorerUrl:
              "https://arbiscan.io/tx/0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
            chainId: 42161,
            state: "confirmed",
          },
        ])

        setCurrentScreen("receipt")
        break
    }
  }

  const handleSendError = (error: Error) => {
    console.error("Error sending transaction", error)
    console.log("currentScreen", currentScreen)
    if (error.message?.toLowerCase().includes("rejected")) {
      setShowWalletConfirmRetry(true)
    } else {
      setError(error.message)
    }
  }

  const handleWaitingForWalletConfirm = (
    intentAddress?: string,
    originAmount?: string,
  ) => {
    setShowWalletConfirmRetry(false)
    setCurrentScreen("wallet-confirmation")
    setIntentAddress(intentAddress ?? null)
    setFromAmount(originAmount ?? null)
  }

  async function handleWalletConfirmRetry() {
    if (!walletConfirmRetryHandler) {
      return
    }

    try {
      setShowWalletConfirmRetry(false)
      await walletConfirmRetryHandler()
    } catch (error) {
      console.error("Error retrying wallet confirmation", error)
    }
  }

  const renderScreenContent = () => {
    switch (currentScreen) {
      case "connect":
        return (
          <ConnectWallet
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            onContinue={handleContinue}
            theme={theme}
            walletOptions={getAvailableWallets()}
          />
        )
      case "tokens":
        return (
          <TokenList
            onContinue={handleTokenSelect}
            onBack={handleBack}
            indexerGatewayClient={indexerGatewayClient}
            theme={theme}
          />
        )
      case "send":
        return selectedToken && walletClient?.account ? (
          <SendForm
            onSend={handleOnSend}
            onBack={handleBack}
            onWaitingForWalletConfirm={handleWaitingForWalletConfirm}
            onConfirm={() => setCurrentScreen("pending")}
            onComplete={handleTransferComplete}
            selectedToken={selectedToken}
            account={walletClient.account}
            sequenceProjectAccessKey={sequenceProjectAccessKey}
            apiUrl={sequenceApiUrl}
            env={sequenceEnv}
            toRecipient={toAddress}
            toAmount={toAmount}
            toChainId={toChainId ? Number(toChainId) : undefined}
            toToken={toToken}
            toCalldata={toCalldata}
            walletClient={walletClient}
            theme={theme}
            onTransactionStateChange={handleTransactionStateChange}
            useSourceTokenForButtonText={useSourceTokenForButtonText}
            onError={handleSendError}
            paymasterUrls={paymasterUrls}
            gasless={gasless}
            setWalletConfirmRetryHandler={setWalletConfirmRetryHandler}
          />
        ) : (
          <div
            className={`text-center p-4 rounded-lg ${
              theme === "dark"
                ? "text-gray-300 bg-gray-800"
                : "text-gray-600 bg-gray-50"
            }`}
          >
            Please connect wallet
          </div>
        )
      case "wallet-confirmation":
        return (
          <WalletConfirmation
            onBack={handleBack}
            error={error as string}
            onComplete={() => setCurrentScreen("pending")}
            theme={theme}
            amount={fromAmount ?? undefined}
            recipient={intentAddress ?? ""}
            tokenSymbol={selectedToken?.symbol}
            retryEnabled={showWalletConfirmRetry}
            onRetry={handleWalletConfirmRetry}
          />
        )
      case "pending":
        return (
          <TransferPending
            onComplete={handleTransferComplete}
            theme={theme}
            transactionStates={transactionStates}
          />
        )
      case "receipt":
        return (
          <Receipt
            onSendAnother={handleSendAnother}
            onClose={handleCloseModal}
            txHash={destinationTxHash}
            chainId={destinationChainId!}
            theme={theme}
            renderInline={renderInline}
            transactionStates={transactionStates}
          />
        )
      default:
        return null
    }
  }

  const renderScreen = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          mass: 1,
        }}
        className={`flex flex-col min-h-[400px] rounded-[32px] shadow-xl p-4 sm:p-6 relative w-full sm:w-[400px] mx-auto ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        layout
        layoutId="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.6,
            }}
            className="flex-1 flex flex-col w-full"
            layout
          >
            {renderScreenContent()}
            {error && (
              <div
                className={`border rounded-lg p-4 mt-4 ${
                  theme === "dark"
                    ? "bg-red-900/20 border-red-800"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p
                  className={`text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`}
                >
                  {error}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <Footer theme={theme} onDebugScreenSelect={handleDebugScreenSelect} />
      </motion.div>
    )
  }

  if (renderInline) {
    return renderScreen()
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      {!children ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className={`${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white cursor-pointer font-semibold py-3 px-6 rounded-[24px] shadow-sm transition-colors`}
        >
          Pay
        </motion.button>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          {children}
        </motion.div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} theme={theme}>
            {renderScreen()}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export const TrailsWidget = (props: TrailsWidgetProps) => {
  const wagmiContext = useContext(WagmiContext)
  const sequenceHooksContext = useContext(SequenceHooksContext)

  const wagmiConfig = React.useMemo(
    () =>
      createConfig({
        chains: [mainnet],
        transports: (Object.values(chains) as Array<Chain>).reduce(
          (acc, chain) => ({
            ...acc,
            [chain.id]: http(),
          }),
          {},
        ) as Record<number, ReturnType<typeof http>>,
      }),
    [],
  )

  // Create the widget content without providers
  const widgetContent = <WidgetInner {...props} />

  // Create content with only the providers that don't exist in parent
  const content = (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={props.privyAppId || defaultPrivyAppId}
        clientId={props.privyClientId || defaultPrivyClientId}
        config={{
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
            requireUserPasswordOnCreate: true,
            showWalletUIs: true,
          },
          loginMethods: ["google", "wallet", "email", "sms"],
          appearance: {
            showWalletLoginFirst: false,
            walletList: [
              "detected_wallets",
              "metamask",
              "coinbase_wallet",
              "rainbow",
              "zerion",
              "uniswap",
              "wallet_connect",
            ],
          },
        }}
      >
        {sequenceHooksContext ? (
          // SequenceHooksProvider exists in parent, don't wrap
          wagmiContext ? (
            // Both providers exist in parent, just render widget
            widgetContent
          ) : (
            // Only WagmiProvider missing, wrap with it
            <WagmiProvider config={wagmiConfig}>{widgetContent}</WagmiProvider>
          )
        ) : (
          // SequenceHooksProvider missing, wrap with it
          <SequenceHooksProvider
            config={{
              projectAccessKey: props.sequenceProjectAccessKey,
              env: {
                indexerUrl: props.sequenceIndexerUrl,
                indexerGatewayUrl: props.sequenceIndexerUrl,
                apiUrl: props.sequenceApiUrl,
              },
            }}
          >
            {wagmiContext ? (
              // WagmiProvider exists in parent, don't wrap
              widgetContent
            ) : (
              // WagmiProvider missing, wrap with it
              <WagmiProvider config={wagmiConfig}>
                {widgetContent}
              </WagmiProvider>
            )}
          </SequenceHooksProvider>
        )}
      </PrivyProvider>
    </QueryClientProvider>
  )

  return (
    <ShadowPortal>
      <StrictMode>{content}</StrictMode>
    </ShadowPortal>
  )
}

export function ShadowPortal({ children }: { children: React.ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)

  useEffect(() => {
    if (hostRef.current && !hostRef.current.shadowRoot) {
      const shadow = hostRef.current.attachShadow({ mode: "open" })
      setShadowRoot(shadow)

      // Inject <style> tag with your widget's CSS
      const styleTag = document.createElement("style")
      styleTag.textContent = css
      shadow.appendChild(styleTag)
    }
  }, [])

  return (
    <div ref={hostRef}>
      {shadowRoot ? createPortal(children, shadowRoot) : null}
    </div>
  )
}

export default TrailsWidget
