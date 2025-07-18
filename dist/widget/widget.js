import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@0xsequence/design-system/preset";
import { SequenceHooksContext, SequenceHooksProvider } from "@0xsequence/hooks";
import { PrivyProvider, useLogin, usePrivy, useWallets as usePrivyWallets, } from "@privy-io/react-auth";
import { createConfig as createPrivyWagmiConfig, useSetActiveWallet, WagmiProvider, } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef, StrictMode, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState, } from "react";
import { createPortal } from "react-dom";
import { createWalletClient, custom, http } from "viem";
import { mainnet } from "viem/chains";
import { createConfig, useAccount, useConnect, useDisconnect, WagmiContext, } from "wagmi";
import { injected } from "wagmi/connectors";
import { useAPIClient } from "../apiClient.js";
import { getChainInfo } from "../chains.js";
import { useIndexerGatewayClient } from "../indexerClient.js";
import { ConnectWallet } from "./components/ConnectWallet.js";
import Footer from "./components/Footer.js";
import Modal from "./components/Modal.js";
import Receipt from "./components/Receipt.js";
import SendForm from "./components/SendForm.js";
import TokenList from "./components/TokenList.js";
import TransferPending from "./components/TransferPendingVertical.js";
import WalletConfirmation from "./components/WalletConfirmation.js";
import { defaultPrivyAppId, defaultPrivyClientId } from "./config.js";
import { useAmountUsd } from "./hooks/useAmountUsd.js";
import css from "./index.css?inline";
export const defaultWalletOptions = ["injected", "privy"];
const queryClient = new QueryClient();
// Function to get system theme preference
const getSystemTheme = () => {
    if (typeof window === "undefined")
        return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};
// Function to get initial theme based on mode
const getInitialTheme = (mode) => {
    if (mode === "auto") {
        return getSystemTheme();
    }
    return mode;
};
const WALLET_CONFIGS = {
    injected: {
        id: "injected",
        name: "Injected Web3",
        connector: injected,
    },
    privy: {
        id: "privy",
        name: "Privy",
        connector: () => { },
    },
};
// Create a custom hook for theme management
const useThemeManager = (initialTheme) => {
    const [theme, setTheme] = useState(getInitialTheme(initialTheme));
    const [themeMode, setThemeMode] = useState(initialTheme);
    useEffect(() => {
        if (themeMode !== "auto")
            return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            setTheme(e.matches ? "dark" : "light");
        };
        setTheme(mediaQuery.matches ? "dark" : "light");
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [themeMode]);
    useEffect(() => {
        setThemeMode(initialTheme);
        setTheme(getInitialTheme(initialTheme));
    }, [initialTheme]);
    return { theme, themeMode };
};
// Create a custom hook for wallet management
const useWalletManager = (address, chainId, connector) => {
    const [walletClient, setWalletClient] = useState(null);
    useEffect(() => {
        const connect = async () => {
            try {
                if (!connector) {
                    return;
                }
                const activeProvider = await connector.getProvider?.();
                if (activeProvider && address && chainId) {
                    const chain = getChainInfo(chainId);
                    if (!chain) {
                        return;
                    }
                    const client = createWalletClient({
                        account: address,
                        chain,
                        transport: custom(activeProvider),
                    });
                    setWalletClient(client);
                }
            }
            catch (error) {
                console.error("[trails-sdk] Failed to connect wallet", error);
            }
        };
        connect().catch(console.error);
    }, [address, chainId, connector]);
    return walletClient;
};
// Create a custom hook for transaction state management
const useTransactionState = (onOriginConfirmation, onDestinationConfirmation) => {
    const [originTxHash, setOriginTxHash] = useState("");
    const [originChainId, setOriginChainId] = useState(null);
    const [destinationTxHash, setDestinationTxHash] = useState("");
    const [destinationChainId, setDestinationChainId] = useState(null);
    const [transactionStates, setTransactionStates] = useState([]);
    useEffect(() => {
        if (onOriginConfirmation && originTxHash && originChainId) {
            onOriginConfirmation(originTxHash, originChainId);
        }
    }, [originTxHash, onOriginConfirmation, originChainId]);
    useEffect(() => {
        if (onDestinationConfirmation && destinationTxHash && destinationChainId) {
            onDestinationConfirmation(destinationTxHash, destinationChainId);
        }
    }, [destinationTxHash, onDestinationConfirmation, destinationChainId]);
    return {
        originTxHash,
        setOriginTxHash,
        originChainId,
        setOriginChainId,
        destinationTxHash,
        setDestinationTxHash,
        destinationChainId,
        setDestinationChainId,
        transactionStates,
        setTransactionStates,
    };
};
const WidgetInner = forwardRef(({ appId: sequenceProjectAccessKey, sequenceIndexerUrl, sequenceApiUrl, sequenceEnv, toAddress, toAmount, toChainId, toToken, toCalldata, children, renderInline = true, theme: initialTheme = "auto", walletOptions, onOriginConfirmation, onDestinationConfirmation, useSourceTokenForButtonText, paymasterUrls, gasless, buttonText, }, ref) => {
    const { address, isConnected, chainId, connector } = useAccount();
    const { disconnectAsync } = useDisconnect();
    const { theme } = useThemeManager(initialTheme);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState(isConnected ? "tokens" : "connect");
    const [selectedToken, setSelectedToken] = useState(null);
    const [error, setError] = useState(null);
    const [intentAddress, setIntentAddress] = useState(null);
    const [originTokenInfo, setOriginTokenInfo] = useState(null);
    const [showWalletConfirmRetry, setShowWalletConfirmRetry] = useState(false);
    const [walletConfirmRetryHandler, setWalletConfirmRetryHandler] = useState(null);
    const { connect } = useConnect();
    const { connectWallet: privyConnectWallet, ready: privyReady, logout: privyLogout, } = usePrivy();
    const { login: loginPrivy } = useLogin();
    const { wallets: privyWallets } = usePrivyWallets();
    const { setActiveWallet: setPrivyActiveWallet } = useSetActiveWallet();
    const usePrivyLogin = true; // Set to true to use Privy email login options
    const walletClient = useWalletManager(address, chainId, connector);
    const { setOriginTxHash, setDestinationTxHash, setDestinationChainId, setOriginChainId, transactionStates, setTransactionStates, } = useTransactionState(onOriginConfirmation, onDestinationConfirmation);
    // Update screen based on connection state
    useEffect(() => {
        if (isConnected) {
            if (currentScreen === "connect") {
                setCurrentScreen("tokens");
            }
        }
        else {
            if (currentScreen !== "connect") {
                setTimeout(() => {
                    setCurrentScreen("connect");
                }, 0);
            }
        }
    }, [isConnected, currentScreen]);
    const indexerGatewayClient = useIndexerGatewayClient({
        indexerGatewayUrl: sequenceIndexerUrl || undefined,
        projectAccessKey: sequenceProjectAccessKey,
    });
    const apiClient = useAPIClient({
        apiUrl: sequenceApiUrl || undefined,
        projectAccessKey: sequenceProjectAccessKey,
    });
    const handleWalletConnect = async (walletId) => {
        try {
            setError(null);
            const config = WALLET_CONFIGS[walletId];
            if (!config) {
                setError(`No configuration found for wallet: ${walletId}`);
                return;
            }
            if (walletId === "injected") {
                await connect({ connector: config.connector() });
            }
            else if (walletId === "privy") {
                console.log("[trails-sdk] Privy ready", privyReady);
                if (!privyReady) {
                    return;
                }
                try {
                    await disconnectAsync();
                }
                catch (error) {
                    console.error("[trails-sdk] Failed to disconnect", error);
                }
                if (usePrivyLogin) {
                    try {
                        await privyLogout();
                    }
                    catch (error) {
                        console.error("[trails-sdk] Failed to logout Privy", error);
                    }
                    try {
                        await loginPrivy();
                    }
                    catch (error) {
                        console.error("[trails-sdk] Failed to login Privy", error);
                    }
                }
                else {
                    await privyConnectWallet();
                }
            }
            console.log(`[trails-sdk] Connected to ${config.name}`);
        }
        catch (error) {
            console.error("[trails-sdk] Failed to connect:", error);
            setError(error instanceof Error ? error.message : "Failed to connect wallet");
        }
    };
    useEffect(() => {
        if (privyWallets?.length === 0 || !walletOptions?.includes("privy")) {
            return;
        }
        const latestWallet = privyWallets?.sort((a, b) => a.connectedAt - b.connectedAt)?.[0];
        if (latestWallet) {
            console.log("[trails-sdk] Setting Privy active wallet", latestWallet);
            setPrivyActiveWallet(latestWallet);
        }
    }, [privyWallets, setPrivyActiveWallet, walletOptions]);
    const handleWalletDisconnect = () => {
        setError(null);
        if (connector?.name?.toLowerCase()?.includes("privy")) {
            Promise.resolve()
                .then(async () => {
                try {
                    await disconnectAsync();
                }
                catch (error) {
                    console.error("[trails-sdk] Failed to disconnect", error);
                }
            })
                .then(async () => {
                try {
                    await privyLogout();
                }
                catch (error) {
                    console.error("[trails-sdk] Failed to logout Privy", error);
                }
            })
                .then(async () => {
                setPrivyActiveWallet(null);
            })
                .finally(() => {
                setCurrentScreen("connect");
            });
        }
        else {
            setCurrentScreen("connect");
        }
    };
    const handleContinue = () => {
        setCurrentScreen("tokens");
    };
    const getAvailableWallets = () => {
        const requestedWallets = walletOptions || defaultWalletOptions;
        const availableWallets = requestedWallets
            .filter((id) => WALLET_CONFIGS[id])
            .map((id) => {
            const config = WALLET_CONFIGS[id];
            if (!config)
                return null;
            return {
                id: config.id,
                name: config.name,
            };
        })
            .filter(Boolean);
        return availableWallets;
    };
    const handleTokenSelect = (token) => {
        try {
            setError(null);
            setSelectedToken(token);
            setCurrentScreen("send");
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    };
    const handleOnSend = async (amount, recipient) => {
        console.log("[trails-sdk] handleOnSend", amount, recipient);
    };
    const handleSendAnother = () => {
        setCurrentScreen("tokens");
        resetState();
    };
    const resetState = useCallback(() => {
        setCurrentScreen("connect");
        setSelectedToken(null);
        setOriginTxHash("");
        setOriginChainId(null);
        setDestinationTxHash("");
        setDestinationChainId(null);
        setTransactionStates([]);
        setIntentAddress(null);
        setOriginTokenInfo(null);
    }, [
        setDestinationTxHash,
        setDestinationChainId,
        setTransactionStates,
        setOriginTxHash,
        setOriginChainId,
    ]);
    // Expose modal control methods via ref
    useImperativeHandle(ref, () => ({
        openModal: () => {
            setIsModalOpen(true);
        },
        closeModal: () => {
            setIsModalOpen(false);
            resetState();
        },
        isModalOpen,
    }), [isModalOpen, resetState]);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetState();
    };
    const handleBack = () => {
        setError(null);
        switch (currentScreen) {
            case "tokens":
                setCurrentScreen("connect");
                break;
            case "send":
                setCurrentScreen("tokens");
                setSelectedToken(null);
                break;
            case "wallet-confirmation":
                setCurrentScreen("send");
                break;
            case "receipt":
                setCurrentScreen("tokens");
                setSelectedToken(null);
                setDestinationTxHash("");
                setDestinationChainId(null);
                setOriginTxHash("");
                setOriginChainId(null);
                break;
            default:
                break;
        }
    };
    function handleTransferComplete(data) {
        if (data) {
            if (data.originUserTxReceipt) {
                setOriginTxHash(data.originUserTxReceipt.transactionHash);
            }
            if (data.originChainId) {
                setOriginChainId(data.originChainId);
            }
            if (data.destinationMetaTxnReceipt || data.originUserTxReceipt) {
                setDestinationTxHash(data.destinationMetaTxnReceipt?.txnHash ||
                    data.originUserTxReceipt?.transactionHash);
            }
            if (data.destinationChainId) {
                setDestinationChainId(data.destinationChainId);
            }
            setCurrentScreen("receipt");
        }
    }
    function handleTransactionStateChange(_transactionStates) {
        console.log("[trails-sdk] transactionStates from widget", _transactionStates);
        setTransactionStates([..._transactionStates]);
    }
    const handleDebugScreenSelect = (screen) => {
        // Reset necessary state based on the target screen
        setError(null);
        switch (screen.toLowerCase()) {
            case "connect":
                setCurrentScreen("connect");
                setSelectedToken(null);
                setTransactionStates([]);
                break;
            case "tokens":
                if (isConnected) {
                    setCurrentScreen("tokens");
                    setSelectedToken(null);
                    setTransactionStates([]);
                }
                break;
            case "send":
                // Set dummy USDC token for debug mode
                setSelectedToken({
                    id: 1,
                    name: "USD Coin",
                    symbol: "USDC",
                    balance: "1000000000",
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                    chainId: 1,
                    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                    contractInfo: {
                        decimals: 6,
                        symbol: "USDC",
                        name: "USD Coin",
                    },
                });
                setCurrentScreen("send");
                setTransactionStates([]);
                break;
            case "wallet confirmation":
                // Set dummy USDC token for debug mode
                setSelectedToken({
                    id: 1,
                    name: "USD Coin",
                    symbol: "USDC",
                    balance: "1000000000",
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                    chainId: 1,
                    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                    contractInfo: {
                        decimals: 6,
                        symbol: "USDC",
                        name: "USD Coin",
                    },
                });
                setCurrentScreen("wallet-confirmation");
                setIntentAddress("0x5A0fb747531bC369367CB031472b89ea4D5c6Df7");
                setOriginTokenInfo({
                    amount: "1",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setTransactionStates([]);
                break;
            case "pending 1-item-0-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "pending",
                        label: "Swap",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 1-item-1-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "confirmed",
                        label: "Swap",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 2-item-0-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "pending",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "pending",
                        label: "Swap",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 2-item-1-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "confirmed",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "pending",
                        label: "Swap",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 2-item-2-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "confirmed",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "confirmed",
                        label: "Swap",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 3-item-0-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "pending",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "pending",
                        label: "Swap & Bridge",
                    },
                    {
                        transactionHash: "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        explorerUrl: "https://arbiscan.io/tx/0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        chainId: 42161,
                        state: "pending",
                        label: "Execute",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 3-item-1-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "confirmed",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "pending",
                        label: "Swap & Bridge",
                    },
                    {
                        transactionHash: "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        explorerUrl: "https://arbiscan.io/tx/0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        chainId: 42161,
                        state: "pending",
                        label: "Execute",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 3-item-2-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "confirmed",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "confirmed",
                        label: "Swap & Bridge",
                    },
                    {
                        transactionHash: "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        explorerUrl: "https://arbiscan.io/tx/0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        chainId: 42161,
                        state: "pending",
                        label: "Execute",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "pending 3-item-3-confirmed":
                // Set dummy transaction states for debug mode - showing all steps
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "confirmed",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "confirmed",
                        label: "Swap & Bridge",
                    },
                    {
                        transactionHash: "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        explorerUrl: "https://arbiscan.io/tx/0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        chainId: 42161,
                        state: "confirmed",
                        label: "Execute",
                    },
                ]);
                setOriginTokenInfo({
                    amount: "10000",
                    amountUsd: "$0.01",
                    tokenSymbol: "USDC",
                    tokenName: "USD Coin",
                    chainId: 137,
                    imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
                });
                setCurrentScreen("pending");
                break;
            case "receipt":
                // Set dummy transaction states data for debug mode
                setTransactionStates([
                    {
                        transactionHash: "0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        explorerUrl: "https://polygonscan.com/tx/0x45bb2259631e73f32841a6058b0a4008c75bca296942bec6326d188978d5353d",
                        chainId: 137,
                        state: "confirmed",
                        label: "Transfer",
                    },
                    {
                        transactionHash: "0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        explorerUrl: "https://polygonscan.com/tx/0x6ff30196ca0d4998cc6928bca2ec282766eb3c3997535e0a61e0d69c9c9b16b8",
                        chainId: 137,
                        state: "confirmed",
                        label: "Swap & Bridge",
                    },
                    {
                        transactionHash: "0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        explorerUrl: "https://arbiscan.io/tx/0xf3b172111d2e64e9d4940d91097f04a0bbd0acc816e2cf49eec664c6f8fcaf76",
                        chainId: 42161,
                        state: "confirmed",
                        label: "Execute",
                    },
                ]);
                setCurrentScreen("receipt");
                break;
        }
    };
    const handleSendError = (error) => {
        if (error) {
            console.error("[trails-sdk] Error sending transaction", error);
        }
        const errorMessage = error instanceof Error ? error.message : error;
        if (errorMessage?.toLowerCase().includes("rejected")) {
            console.log("[trails-sdk] currentScreen", currentScreen);
            setShowWalletConfirmRetry(true);
        }
        else {
            setError(errorMessage);
        }
    };
    const handleConnectError = (error) => {
        if (error) {
            console.error("[trails-sdk] Error connecting wallet", error);
        }
        setError(error instanceof Error ? error.message : error);
    };
    const handleTokenListError = (error) => {
        if (error) {
            console.error("[trails-sdk] Error selecting token", error);
        }
        setError(error instanceof Error ? error.message : error);
    };
    const handleWaitingForWalletConfirm = (intentAddress, details) => {
        setShowWalletConfirmRetry(false);
        setCurrentScreen("wallet-confirmation");
        setIntentAddress(intentAddress ?? null);
        setOriginTokenInfo(details ?? null);
    };
    async function handleWalletConfirmRetry() {
        if (!walletConfirmRetryHandler) {
            return;
        }
        try {
            setShowWalletConfirmRetry(false);
            await walletConfirmRetryHandler();
        }
        catch (error) {
            console.error("[trails-sdk] Error retrying wallet confirmation", error);
        }
    }
    const { amountUsd: targetAmountUsd, amountUsdFormatted: targetAmountUsdFormatted, } = useAmountUsd({
        amount: toAmount,
        token: toToken,
        chainId: Number(toChainId),
        apiClient: apiClient,
    });
    const renderScreenContent = () => {
        switch (currentScreen) {
            case "connect":
                return (_jsx(ConnectWallet, { onConnect: handleWalletConnect, onDisconnect: handleWalletDisconnect, onContinue: handleContinue, theme: theme, walletOptions: getAvailableWallets(), onError: handleConnectError }));
            case "tokens":
                return (_jsx(TokenList, { onContinue: handleTokenSelect, onBack: handleBack, indexerGatewayClient: indexerGatewayClient, theme: theme, targetAmountUsd: targetAmountUsd, targetAmountUsdFormatted: targetAmountUsdFormatted, onError: handleTokenListError }));
            case "send":
                return selectedToken && walletClient?.account ? (_jsx(SendForm, { onSend: handleOnSend, onBack: handleBack, onWaitingForWalletConfirm: handleWaitingForWalletConfirm, onConfirm: () => setCurrentScreen("pending"), onComplete: handleTransferComplete, selectedToken: selectedToken, account: walletClient.account, sequenceProjectAccessKey: sequenceProjectAccessKey, apiUrl: sequenceApiUrl || undefined, env: sequenceEnv, toRecipient: toAddress || undefined, toAmount: toAmount || undefined, toChainId: toChainId ? Number(toChainId) : undefined, toToken: toToken || undefined, toCalldata: toCalldata || undefined, walletClient: walletClient, theme: theme, onTransactionStateChange: handleTransactionStateChange, useSourceTokenForButtonText: useSourceTokenForButtonText, onError: handleSendError, paymasterUrls: paymasterUrls, gasless: gasless, setWalletConfirmRetryHandler: setWalletConfirmRetryHandler })) : (_jsx("div", { className: `text-center p-4 rounded-lg ${theme === "dark"
                        ? "text-gray-300 bg-gray-800"
                        : "text-gray-600 bg-gray-50"}`, children: "Please connect wallet" }));
            case "wallet-confirmation":
                return (_jsx(WalletConfirmation, { onBack: handleBack, onComplete: () => setCurrentScreen("pending"), theme: theme, amount: originTokenInfo?.amount ?? undefined, recipient: intentAddress ?? "", tokenSymbol: selectedToken?.symbol, retryEnabled: showWalletConfirmRetry, onRetry: handleWalletConfirmRetry, fromTokenSymbol: originTokenInfo?.tokenSymbol || "", fromChainId: originTokenInfo?.chainId || 0, fromTokenImageUrl: originTokenInfo?.imageUrl || "" }));
            case "pending":
                return (_jsx(TransferPending, { onComplete: handleTransferComplete, theme: theme, transactionStates: transactionStates, fromAmount: originTokenInfo?.amount || "", fromAmountUsd: originTokenInfo?.amountUsd || "", fromTokenSymbol: originTokenInfo?.tokenSymbol || "", fromTokenName: originTokenInfo?.tokenName || "", fromChainId: originTokenInfo?.chainId || 0, fromTokenImageUrl: originTokenInfo?.imageUrl || "" }));
            case "receipt":
                return (_jsx(Receipt, { onSendAnother: handleSendAnother, onClose: handleCloseModal, theme: theme, renderInline: renderInline, transactionStates: transactionStates }));
            default:
                return null;
        }
    };
    const renderScreen = () => {
        return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: {
                type: "spring",
                stiffness: 200,
                damping: 30,
                mass: 1,
            }, className: `flex flex-col min-h-[400px] rounded-[32px] shadow-xl p-4 sm:p-6 relative w-full sm:w-[400px] mx-auto ${theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"}`, layout: true, layoutId: "modal-container", onClick: (e) => e.stopPropagation(), children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            mass: 0.6,
                        }, className: "flex-1 flex flex-col w-full", layout: true, children: [renderScreenContent(), error && (_jsx("div", { className: `border rounded-lg p-4 mt-4 ${theme === "dark"
                                    ? "bg-red-900/20 border-red-800"
                                    : "bg-red-50 border-red-200"}`, children: _jsx("p", { className: `text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`, children: error }) }))] }, currentScreen) }), _jsx(Footer, { theme: theme, onDebugScreenSelect: handleDebugScreenSelect })] }));
    };
    if (renderInline) {
        return renderScreen();
    }
    return (_jsxs("div", { className: "flex flex-col items-center justify-center space-y-8 py-12", children: [!children ? (_jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => setIsModalOpen(true), className: `${theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"} text-white cursor-pointer font-semibold py-3 px-6 rounded-[24px] shadow-sm transition-colors`, children: buttonText || "Pay" })) : (_jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "flex flex-col items-center justify-center", onClick: () => setIsModalOpen(true), children: children })), _jsx(AnimatePresence, { children: isModalOpen && (_jsx(Modal, { isOpen: isModalOpen, onClose: handleCloseModal, theme: theme, children: renderScreen() })) })] }));
});
export const TrailsWidget = forwardRef((props, ref) => {
    const wagmiContext = useContext(WagmiContext);
    const sequenceHooksContext = useContext(SequenceHooksContext);
    // Check if privy is in walletOptions
    // const walletOptions = props.walletOptions || defaultWalletOptions
    const shouldUsePrivy = true; // walletOptions.includes('privy') // TODO: need to disable all privy hooks if walletOptions.includes('privy') is false
    const wagmiConfig = React.useMemo(() => {
        const chains = [mainnet];
        const baseConfig = {
            chains,
            transports: Object.values(chains).reduce((acc, chain) => ({
                ...acc,
                [chain.id]: http(),
            }), {}),
        };
        if (shouldUsePrivy) {
            return createPrivyWagmiConfig(baseConfig);
        }
        else {
            return createConfig({
                ...baseConfig,
                connectors: [injected()],
            });
        }
    }, []);
    // Create content with only the providers that don't exist in parent
    const content = (() => {
        const widgetContent = _jsx(WidgetInner, { ...props, ref: ref });
        const baseContent = (_jsx(QueryClientProvider, { client: queryClient, children: sequenceHooksContext ? (
            // SequenceHooksProvider exists in parent, don't wrap
            wagmiContext ? (
            // Both providers exist in parent, just render widget
            widgetContent) : (
            // Only WagmiProvider missing, wrap with it
            _jsx(WagmiProvider, { config: wagmiConfig, children: widgetContent }))) : (
            // SequenceHooksProvider missing, wrap with it
            _jsx(SequenceHooksProvider, { config: {
                    projectAccessKey: props.appId,
                    env: {
                        indexerUrl: props.sequenceIndexerUrl || undefined,
                        indexerGatewayUrl: props.sequenceIndexerUrl || undefined,
                        apiUrl: props.sequenceApiUrl || undefined,
                    },
                }, children: wagmiContext ? (
                // WagmiProvider exists in parent, don't wrap
                widgetContent) : (
                // WagmiProvider missing, wrap with it
                _jsx(WagmiProvider, { config: wagmiConfig, children: widgetContent })) })) }));
        // Only wrap with PrivyProvider if privy is in walletOptions
        if (shouldUsePrivy) {
            return (_jsx(PrivyProvider, { appId: props.privyAppId || defaultPrivyAppId, clientId: props.privyClientId || defaultPrivyClientId, config: {
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
                }, children: baseContent }));
        }
        return baseContent;
    })();
    return (_jsx(ShadowPortal, { children: _jsx(StrictMode, { children: content }) }));
});
export function ShadowPortal({ children }) {
    const hostRef = useRef(null);
    const [shadowRoot, setShadowRoot] = useState(null);
    useEffect(() => {
        if (hostRef.current && !hostRef.current.shadowRoot) {
            const shadow = hostRef.current.attachShadow({ mode: "open" });
            setShadowRoot(shadow);
            // Inject <style> tag with your widget's CSS
            const styleTag = document.createElement("style");
            styleTag.textContent = css;
            shadow.appendChild(styleTag);
        }
    }, []);
    return (_jsx("div", { ref: hostRef, children: shadowRoot ? createPortal(children, shadowRoot) : null }));
}
// Export standalone functions for modal control
export const createModalController = (ref) => ({
    openModal: () => ref.current?.openModal?.(),
    closeModal: () => ref.current?.closeModal?.(),
    isModalOpen: ref.current?.isModalOpen ?? false,
});
export default TrailsWidget;
