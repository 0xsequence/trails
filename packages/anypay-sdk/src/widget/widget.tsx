import { SequenceHooksProvider } from "@0xsequence/hooks"
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
import React, { StrictMode, useContext, useEffect, useState } from "react"
import {
  createWalletClient,
  custom,
  http,
  type TransactionReceipt,
  type WalletClient,
} from "viem"
import * as chains from "viem/chains"
import { mainnet } from "viem/chains"
import { useAccount, useConnect, useDisconnect, WagmiContext } from "wagmi"
import { injected } from "wagmi/connectors"
import type { TransactionState } from "../anypay.js"
import { useIndexerGatewayClient } from "../indexerClient.js"
import { ConnectWallet, type WalletOption } from "./components/ConnectWallet.js"
import DebugScreensDropdown from "./components/DebugScreensDropdown.js"
import Modal from "./components/Modal.js"
import Receipt from "./components/Receipt.js"
import SendForm from "./components/SendForm.js"
import TokenList from "./components/TokenList.js"
import TransferPending from "./components/TransferPending.js"
import "@0xsequence/design-system/preset"
import "./index.css"

type Screen = "connect" | "tokens" | "send" | "pending" | "receipt"
export type Theme = "light" | "dark" | "auto"
type ActiveTheme = "light" | "dark"

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

const getChainConfig = (chainId: number) => {
  for (const chain of Object.values(chains) as any[]) {
    // TODO: add proper types
    if (chain.id === chainId) {
      return chain
    }
  }
  throw new Error(`Unsupported chain ID: ${chainId}`)
}

export type AnyPayWidgetProps = {
  sequenceApiKey: string
  sequenceIndexerUrl?: string
  sequenceApiUrl?: string
  sequenceEnv?: "local" | "cors-anywhere" | "dev" | "prod"
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
  connector: any,
) => {
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)

  useEffect(() => {
    const connect = async () => {
      const activeProvider = provider || (await connector?.getProvider())

      if (activeProvider && address && chainId) {
        const chain = getChainConfig(chainId)
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

const WidgetInner: React.FC<AnyPayWidgetProps> = ({
  sequenceApiKey,
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
  const { connect } = useConnect()
  const {
    connectWallet: privyConnectWallet,
    ready: privyReady,
    logout: privyLogout,
  } = usePrivy()
  const { login: loginPrivy } = useLogin()
  const { wallets: privyWallets, ready: privyWalletsReady } = usePrivyWallets()
  const { setActiveWallet: setPrivyActiveWallet } = useSetActiveWallet()
  const usePrivyLogin = true // Set to true to use Privy email login options

  console.log("privyWallets", privyWallets, isConnected, address)

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

  console.log("isConnected", isConnected, "address", address)

  // Update screen based on connection state
  useEffect(() => {
    if (isConnected) {
      setCurrentScreen("tokens")
    }
  }, [isConnected])

  const indexerGatewayClient = useIndexerGatewayClient({
    indexerGatewayUrl: sequenceIndexerUrl,
    projectAccessKey: sequenceApiKey,
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
        console.log("Privy ready", privyReady, privyWalletsReady)
        if (!privyReady || !privyWalletsReady) {
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
    return requestedWallets
      .filter((id) => WALLET_CONFIGS[id as keyof typeof WALLET_CONFIGS])
      .map((id) => {
        const config = WALLET_CONFIGS[id as keyof typeof WALLET_CONFIGS]
        if (!config) return null as any
        return {
          id: config.id,
          name: config.name,
        }
      })
      .filter(Boolean)
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
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetState()
  }

  const handleBack = () => {
    switch (currentScreen) {
      case "tokens":
        setCurrentScreen("connect")
        break
      case "send":
        setCurrentScreen("tokens")
        setSelectedToken(null)
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
    originUserTxReceipt: TransactionReceipt
    originMetaTxnReceipt: any
    destinationMetaTxnReceipt: any
  }) {
    if (data) {
      if (data.originUserTxReceipt) {
        setOriginTxHash(data.originUserTxReceipt.transactionHash)
      }

      if (data.destinationMetaTxnReceipt || data.originUserTxReceipt) {
        setDestinationTxHash(
          data.destinationMetaTxnReceipt?.txnHash ||
            data.originUserTxReceipt.transactionHash,
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
            onConfirm={() => setCurrentScreen("pending")}
            onComplete={handleTransferComplete}
            selectedToken={selectedToken}
            account={walletClient.account}
            sequenceApiKey={sequenceApiKey}
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
        className={`flex flex-col min-h-[400px] rounded-[32px] shadow-xl p-6 relative w-[400px] mx-auto ${
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className={`mt-auto pt-4 text-center text-sm relative flex items-center justify-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          layout
        >
          <div className="absolute right-0 flex items-center h-full">
            <DebugScreensDropdown
              onScreenSelect={handleDebugScreenSelect}
              theme={theme}
            />
          </div>
          Powered by&nbsp;
          <a
            href="https://anypay.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium transition-colors hover:underline ${
              theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-black"
            }`}
          >
            AnyPay
          </a>
        </motion.div>
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

export const AnyPayWidget = (props: AnyPayWidgetProps) => {
  const wagmiContext = useContext(WagmiContext)
  const wagmiConfig = React.useMemo(
    () =>
      createConfig({
        chains: [mainnet],
        transports: Object.values(chains as unknown as any[]).reduce(
          (acc, chain) => ({
            ...acc,
            [chain.id]: http(),
          }),
          {},
        ) as Record<number, ReturnType<typeof http>>,
      }),
    [],
  )

  const content = (
    <PrivyProvider
      appId={props.privyAppId || ""}
      clientId={props.privyClientId}
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
      <QueryClientProvider client={queryClient}>
        <SequenceHooksProvider
          config={{
            projectAccessKey: props.sequenceApiKey,
            env: {
              indexerUrl: props.sequenceIndexerUrl,
              indexerGatewayUrl: props.sequenceIndexerUrl,
              apiUrl: props.sequenceApiUrl,
            },
          }}
        >
          <WagmiProvider config={wagmiConfig}>
            <WidgetInner {...props} />
          </WagmiProvider>
        </SequenceHooksProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )

  // If no parent Wagmi context, provide our own
  if (!wagmiContext) {
    // TODO
    // return <StrictMode>{content}</StrictMode>
  }

  // Otherwise use parent context
  return <StrictMode>{content}</StrictMode>
}

export default AnyPayWidget
