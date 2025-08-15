import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@0xsequence/design-system/preset";
import { SequenceHooksContext, SequenceHooksProvider } from "@0xsequence/hooks";
import { PrivyProvider, useLogin, usePrivy, useWallets as usePrivyWallets, } from "@privy-io/react-auth";
import { createConfig as createPrivyWagmiConfig, useSetActiveWallet, WagmiProvider, } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef, StrictMode, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState, } from "react";
import { createPortal } from "react-dom";
import { createWalletClient, custom, http, parseUnits } from "viem";
import * as viemChains from "viem/chains";
import { createConfig, useAccount, useConnect, useDisconnect, WagmiContext, } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
// import { walletConnect } from "./walletconnectConnector.js"
import { useAPIClient } from "../apiClient.js";
import { getChainInfo } from "../chains.js";
import { useIndexerGatewayClient } from "../indexerClient.js";
import { ConnectWallet } from "./components/ConnectWallet.js";
import Footer from "./components/Footer.js";
import Modal from "./components/Modal.js";
import Receipt from "./components/Receipt.js";
import { PaySendForm } from "./components/PaySendForm.js";
import TokenList from "./components/TokenList.js";
import TransferPending from "./components/TransferPendingVertical.js";
import WalletConfirmation from "./components/WalletConfirmation.js";
import QRCodeDeposit from "./components/QRCodeDeposit.js";
import { ThemeProvider } from "./components/ThemeProvider.js";
import { getPrivyAppId, getPrivyClientId, getWalletConnectProjectId, setPrivyAppId, setPrivyClientId, setWalletConnectProjectId, } from "../config.js";
import { useAmountUsd } from "./hooks/useAmountUsd.js";
import { useRecentTokens } from "./hooks/useRecentTokens.js";
import { getWethAddress } from "../tokens.js";
import css from "./compiled.css?inline";
import { trackWalletConnected, trackWidgetScreen } from "../analytics.js";
import { getNormalizedQuoteObject } from "../prepareSend.js";
import { getErrorString, getIsWalletRejectedError, getIsBalanceTooLowError, } from "../error.js";
import { setSequenceIndexerUrl, setSequenceApiUrl, setSequenceProjectAccessKey, setSequenceUseV3Relayers, getSequenceIndexerUrl, getSequenceApiUrl, setSequenceEnv, setSlippageTolerance, } from "../config.js";
import { FundSendForm } from "./components/FundSendForm.js";
import { MeshConnect } from "./components/MeshConnect.js";
import WalletConnectScreen from "./components/WalletConnect.js";
import FundMethods from "./components/FundMethods.js";
import EarnPools from "./components/EarnPools.js";
import { usePools } from "../pools.js";
import { AaveProvider, AaveClient } from "@aave/react";
import { encodeFunctionData } from "viem";
export const aaveClient = AaveClient.create();
export const defaultWalletOptions = ["injected", "privy"];
const queryClient = new QueryClient();
// WalletConnect connector singleton to avoid multiple Core initializations
let wcConnectorSingleton = null;
function getWalletConnectConnectorSingleton() {
    if (!wcConnectorSingleton) {
        wcConnectorSingleton = walletConnect({
            projectId: getWalletConnectProjectId(),
            showQrModal: false,
        });
    }
    return wcConnectorSingleton;
}
const WALLET_CONFIGS = {
    injected: {
        id: "injected",
        name: "Injected Web3",
        connector: injected,
    },
    walletconnect: {
        id: "walletconnect",
        name: "WalletConnect",
        connector: () => getWalletConnectConnectorSingleton(),
    },
    privy: {
        id: "privy",
        name: "Privy",
        connector: () => { },
    },
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
const useTransactionState = (onOriginConfirmation, onDestinationConfirmation, onComplete) => {
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
    // Monitor transaction states for completion - this runs regardless of which screen is active
    useEffect(() => {
        if (!transactionStates || transactionStates.length === 0)
            return;
        const allConfirmed = transactionStates.every((tx) => tx.state === "confirmed");
        const hasFailures = transactionStates.some((tx) => tx.state === "failed");
        console.log("[trails-sdk] Transaction state monitoring:", "allConfirmed:", allConfirmed, "hasFailures:", hasFailures, "states:", transactionStates.map((tx) => tx.state));
        if (allConfirmed && !hasFailures && onComplete) {
            console.log("[trails-sdk] All transactions confirmed, triggering completion");
            // All transactions are confirmed, trigger completion
            onComplete({
                transactionStates: transactionStates,
            });
        }
    }, [transactionStates, onComplete]);
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
const WidgetInner = forwardRef(({ appId: sequenceProjectAccessKey, sequenceIndexerUrl, sequenceApiUrl, toAddress, toAmount, toChainId, toToken, toCalldata, children, renderInline = false, mode = "pay", walletOptions, onOriginConfirmation, onDestinationConfirmation, paymasterUrls, gasless, buttonText, quoteProvider, }, ref) => {
    const { address, isConnected, chainId, connector } = useAccount();
    const { disconnectAsync } = useDisconnect();
    const { recentTokens, addRecentToken } = useRecentTokens(address);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState(isConnected ? "tokens" : "connect");
    const [selectedToken, setSelectedToken] = useState(null);
    const [selectedFundMethod, setSelectedFundMethod] = useState(null);
    const [selectedPool, setSelectedPool] = useState(null);
    const [generatedCalldata, setGeneratedCalldata] = useState(undefined);
    const [error, setError] = useState(null);
    const [prepareSendQuote, setPrepareSendQuote] = useState(null);
    const [previousConnector, setPreviousConnector] = useState(null);
    const [showWalletConfirmRetry, setShowWalletConfirmRetry] = useState(false);
    const [walletConfirmRetryHandler, setWalletConfirmRetryHandler] = useState(null);
    const [totalCompletionSeconds, setTotalCompletionSeconds] = useState(null);
    const { connect } = useConnect();
    const { connectWallet: privyConnectWallet, ready: privyReady, logout: privyLogout, } = usePrivy();
    const { login: loginPrivy } = useLogin();
    const { wallets: privyWallets } = usePrivyWallets();
    const { setActiveWallet: setPrivyActiveWallet } = useSetActiveWallet();
    const usePrivyLogin = true; // Set to true to use Privy email login options
    const walletClient = useWalletManager(address, chainId, connector);
    const [meshConnectProps, setMeshConnectProps] = useState(null);
    // Hook to auto-select pool when mode is "earn" and toAddress is specified
    const useAutoSelectPool = (mode, toAddress, toChainId, toToken) => {
        const { data: pools, loading: poolsLoading } = usePools();
        useEffect(() => {
            if (mode === "earn" &&
                toAddress &&
                toChainId &&
                toToken &&
                pools &&
                pools.length > 0 &&
                (!selectedPool ||
                    selectedPool.chainId !== toChainId ||
                    (selectedPool.token.address.toLowerCase() !==
                        toToken.toLowerCase() &&
                        selectedPool.token.symbol.toLowerCase() !==
                            toToken.toLowerCase()))) {
                const targetChainId = typeof toChainId === "string" ? parseInt(toChainId) : toChainId;
                // Find pool that matches the toAddress, toChainId, and toToken (underlying asset)
                const matchingPool = pools.find((pool) => {
                    let addressMatch = pool.depositAddress.toLowerCase() === toAddress.toLowerCase();
                    const chainMatch = pool.chainId === targetChainId;
                    // Check if toToken is an address (starts with 0x) or a symbol
                    let tokenMatch = toToken.startsWith("0x")
                        ? pool.token.address.toLowerCase() === toToken.toLowerCase()
                        : pool.token.symbol.toLowerCase() === toToken.toLowerCase();
                    // Special handling for Aave pools: ETH can be represented as WETH
                    if (!tokenMatch && pool.protocol === "Aave") {
                        const isEthToken = toToken === "0x0000000000000000000000000000000000000000" ||
                            toToken === "ETH";
                        if (isEthToken) {
                            // Check if pool token is WETH (either by address or symbol)
                            const isWethPool = pool.token.symbol === "WETH" ||
                                pool.token.address.toLowerCase() ===
                                    getWethAddress(targetChainId)?.toLowerCase();
                            tokenMatch = isWethPool;
                            if (!addressMatch) {
                                addressMatch =
                                    pool.wrappedTokenGatewayAddress?.toLowerCase() ===
                                        toAddress.toLowerCase();
                            }
                        }
                    }
                    return addressMatch && chainMatch && tokenMatch;
                });
                if (matchingPool) {
                    console.log("[trails-sdk] Auto-selected pool for toAddress:", toAddress, "toChainId:", targetChainId, "toToken:", toToken, matchingPool);
                    setSelectedPool(matchingPool);
                }
                else {
                    console.log("[trails-sdk] No matching pool found for toAddress:", toAddress, "toChainId:", targetChainId, "toToken:", toToken);
                }
            }
        }, [mode, toAddress, toChainId, toToken, pools]);
        return { poolsLoading };
    };
    useAutoSelectPool(mode, toAddress, toChainId, toToken);
    const { setOriginTxHash, setDestinationTxHash, setDestinationChainId, setOriginChainId, transactionStates, setTransactionStates, } = useTransactionState(onOriginConfirmation, onDestinationConfirmation, handleTransferComplete);
    // Update screen based on connection state and mode
    useEffect(() => {
        if (isConnected) {
            if (currentScreen === "connect") {
                setCurrentScreen("tokens");
            }
        }
        else {
            if (currentScreen !== "connect" && currentScreen !== "wallet-connect") {
                setTimeout(() => {
                    setCurrentScreen("connect");
                }, 0);
            }
        }
    }, [isConnected, currentScreen]);
    // Auto-detect mode changes and switch screens accordingly
    useEffect(() => {
        if (selectedToken &&
            (currentScreen === "send-form" || currentScreen === "fund-form")) {
            const targetScreen = mode === "fund" ? "fund-form" : "send-form";
            if (currentScreen !== targetScreen) {
                setCurrentScreen(targetScreen);
            }
        }
    }, [mode, currentScreen, selectedToken]);
    useEffect(() => {
        trackWidgetScreen({
            screen: currentScreen,
            userAddress: address || undefined,
        });
    }, [currentScreen, address]);
    useEffect(() => {
        if (!address || !chainId || !connector?.name) {
            return;
        }
        trackWalletConnected({
            walletType: connector?.name || "",
            address,
            chainId,
        });
    }, [address, chainId, connector?.name]);
    // Update generated calldata when amount changes in earn mode
    useEffect(() => {
        if (selectedPool && mode === "earn" && generatedCalldata) {
            // The calldata will be updated via the onAmountUpdate callback
            // This effect ensures we have the initial calldata set up
            console.log("Earn mode: Pool selected, calldata ready for amount updates");
        }
    }, [selectedPool, mode, generatedCalldata]);
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
            console.log("[trails-sdk] Connecting to wallet", walletId);
            if (walletId === "injected") {
                await connect({ connector: config.connector() });
            }
            else if (walletId === "walletconnect") {
                // Store the current connector as previous before switching to WalletConnect
                if (connector && connector.name !== "WalletConnect") {
                    setPreviousConnector(connector);
                }
                // Route to dedicated WalletConnect screen where we show our own QR
                setCurrentScreen("wallet-connect");
                return;
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
            // For earn mode, check if we have toAddress and toChainId specified
            if (mode === "earn") {
                if (toAddress && toChainId) {
                    // Skip earn-pools and go directly to send-form when toAddress and toChainId are specified
                    setCurrentScreen("send-form");
                }
                else if (selectedPool) {
                    // If a pool is already selected (auto-selected or manually), go to send-form
                    setCurrentScreen("send-form");
                }
                else {
                    // Go to earn-pools for pool selection when no specific destination is set
                    setCurrentScreen("earn-pools");
                }
            }
            else {
                setCurrentScreen(mode === "fund" ? "fund-form" : "send-form");
            }
            // Track the token in recent tokens
            const chainInfo = getChainInfo(token.chainId);
            const supportedToken = {
                id: `${token.symbol}-${chainInfo?.name || token.chainId}`,
                symbol: token.symbol,
                name: token.name,
                contractAddress: token.contractAddress,
                decimals: token.contractInfo?.decimals || 18,
                chainId: token.chainId,
                chainName: chainInfo?.name || `Chain ${token.chainId}`,
                imageUrl: token.imageUrl,
            };
            addRecentToken(supportedToken);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    };
    const handleRecentTokenSelect = (supportedToken) => {
        // Convert SupportedToken back to Token format for consistency
        const token = {
            id: Math.random(), // Temporary ID
            name: supportedToken.name,
            symbol: supportedToken.symbol,
            balance: "0", // We don't have balance info for recent tokens
            imageUrl: supportedToken.imageUrl,
            chainId: supportedToken.chainId,
            contractAddress: supportedToken.contractAddress,
            contractInfo: {
                decimals: supportedToken.decimals,
                symbol: supportedToken.symbol,
                name: supportedToken.name,
            },
        };
        handleTokenSelect(token);
    };
    const handleOnSend = async (amount, recipient) => {
        console.log("[trails-sdk] handleOnSend", amount, recipient);
    };
    const handleSendAnother = () => {
        setCurrentScreen("tokens");
        resetState();
    };
    const resetState = useCallback(() => {
        setSelectedFundMethod(null);
        setCurrentScreen("connect");
        setSelectedToken(null);
        setSelectedPool(null);
        setGeneratedCalldata(undefined);
        setOriginTxHash("");
        setOriginChainId(null);
        setDestinationTxHash("");
        setDestinationChainId(null);
        setTransactionStates([]);
        setPrepareSendQuote(null);
        setTotalCompletionSeconds(null);
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
            case "fund-methods":
                setCurrentScreen("tokens");
                break;
            case "tokens":
                setCurrentScreen("fund-methods");
                break;
            case "earn-pools":
                setCurrentScreen("tokens");
                setSelectedToken(null);
                break;
            case "send-form":
                if (mode === "earn" && !toAddress && !toChainId) {
                    setCurrentScreen("earn-pools");
                }
                else {
                    setCurrentScreen("tokens");
                    setSelectedToken(null);
                }
                break;
            case "fund-form":
                setCurrentScreen("tokens");
                setSelectedToken(null);
                break;
            case "wallet-confirmation":
                setCurrentScreen(mode === "fund" ? "fund-form" : "send-form");
                break;
            case "receipt":
                setCurrentScreen("tokens");
                setSelectedToken(null);
                setDestinationTxHash("");
                setDestinationChainId(null);
                setOriginTxHash("");
                setOriginChainId(null);
                break;
            case "mesh-connect":
                setCurrentScreen("fund-methods");
                break;
            case "wallet-connect":
                setCurrentScreen("fund-methods");
                break;
            default:
                break;
        }
    };
    function handleWalletConfirmComplete() {
        setCurrentScreen("pending");
    }
    function handleElapsedTime(totalCompletionSeconds = 0) {
        setTotalCompletionSeconds(totalCompletionSeconds);
    }
    function handleTransferComplete({ transactionStates }) {
        const firstTransactionState = transactionStates[0];
        const lastTransactionState = transactionStates[transactionStates.length - 1];
        if (firstTransactionState?.transactionHash &&
            firstTransactionState?.chainId) {
            setOriginTxHash(firstTransactionState.transactionHash);
            setOriginChainId(firstTransactionState.chainId);
        }
        if (lastTransactionState?.transactionHash ||
            (lastTransactionState?.txnHash &&
                lastTransactionState?.chainId)) {
            setDestinationTxHash(lastTransactionState?.transactionHash ||
                lastTransactionState?.txnHash);
            setDestinationChainId(lastTransactionState?.chainId);
        }
        else {
            setError("No destination transaction hash found");
            return;
        }
        setCurrentScreen("receipt");
    }
    function handleMeshConnectComplete(transferData) {
        console.log("[trails-sdk] Mesh Connect transfer completed:", transferData);
        console.log("[trails-sdk] Using real transaction states from prepareSendQuote");
        if (prepareSendQuote) {
            setTransactionStates(prepareSendQuote.transactionStates);
        }
        setCurrentScreen("pending");
    }
    function handleTransactionStateChange(_transactionStates) {
        console.log("[trails-sdk] transactionStates from widget", _transactionStates);
        setTransactionStates([..._transactionStates]);
    }
    const handleDebugScreenSelect = async (screen) => {
        // Reset necessary state based on the target screen
        setError(null);
        const dummySelectedToken = {
            id: 1,
            name: "USD Coin",
            symbol: "USDC",
            balance: parseUnits("1.99", 6)?.toString(),
            imageUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
            chainId: 1,
            contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            contractInfo: {
                decimals: 6,
                symbol: "USDC",
                name: "USD Coin",
            },
        };
        const dummyQuote = await getNormalizedQuoteObject({
            originAddress: "0x5A0fb747531bC369367CB031472b89ea4D5c6Df7",
            originAmount: parseUnits("1", 6)?.toString(),
            originTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            originChainId: 1,
            originTokenPriceUsd: "1",
            destinationChainId: 137,
            destinationTokenAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
            destinationAmount: parseUnits("0.97", 6)?.toString(),
            destinationTokenPriceUsd: "1",
        });
        switch (screen) {
            case "connect":
                setSelectedToken(null);
                setTransactionStates([]);
                setCurrentScreen("connect");
                break;
            case "tokens":
                if (isConnected) {
                    setSelectedToken(null);
                    setTransactionStates([]);
                    setCurrentScreen("tokens");
                }
                break;
            case "send-form":
                // Set dummy USDC token for debug mode
                setSelectedToken(dummySelectedToken);
                setTransactionStates([]);
                setCurrentScreen("send-form");
                break;
            case "fund-form":
                // Set dummy USDC token for debug mode
                setSelectedToken(dummySelectedToken);
                setTransactionStates([]);
                setCurrentScreen("fund-form");
                break;
            case "wallet-confirmation":
                // Set dummy USDC token for debug mode
                setSelectedToken(dummySelectedToken);
                setPrepareSendQuote(dummyQuote);
                setTransactionStates([]);
                setShowWalletConfirmRetry(false);
                setCurrentScreen("wallet-confirmation");
                break;
            case "wallet-confirmation-retry":
                // Set dummy USDC token for debug mode
                setSelectedToken(dummySelectedToken);
                setPrepareSendQuote(dummyQuote);
                setTransactionStates([]);
                setShowWalletConfirmRetry(true);
                setCurrentScreen("wallet-confirmation");
                break;
            case "pending-1-item-0-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-1-item-1-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-2-item-0-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-2-item-1-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-2-item-2-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-3-item-0-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-3-item-1-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-3-item-2-confirmed":
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
                setPrepareSendQuote(dummyQuote);
                setCurrentScreen("pending");
                break;
            case "pending-3-item-3-confirmed":
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
                setPrepareSendQuote(dummyQuote);
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
            case "receipt-failed":
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
                        transactionHash: "",
                        explorerUrl: "",
                        chainId: 42161,
                        state: "failed",
                        label: "Execute",
                    },
                ]);
                setCurrentScreen("receipt");
                break;
            case "mesh-connect":
                setCurrentScreen("mesh-connect");
                break;
            case "wallet-connect":
                setCurrentScreen("wallet-connect");
                break;
            case "fund-methods":
                setCurrentScreen("fund-methods");
                break;
            case "earn-pools":
                setCurrentScreen("earn-pools");
                break;
        }
    };
    const handleSelectWalletConnect = () => {
        // Store the current connector as previous before switching to WalletConnect
        if (connector && connector.name !== "WalletConnect") {
            setPreviousConnector(connector);
        }
        setCurrentScreen("wallet-connect");
    };
    const handleReconnectPreviousWallet = async () => {
        if (previousConnector) {
            try {
                console.log("[trails-sdk] Reconnecting to previous wallet:", previousConnector.name);
                // First disconnect from current connector to avoid "already connected" error
                // await disconnectAsync()
                // Then connect to the previous connector
                try {
                    await connect({ connector: previousConnector });
                }
                catch (error) {
                    console.error("[trails-sdk] Failed to reconnect to previous wallet:", error);
                }
                setPreviousConnector(null); // Clear the stored connector
            }
            catch (error) {
                console.error("[trails-sdk] Failed to reconnect to previous wallet:", error);
                // If reconnection fails, go back to fund methods
                setCurrentScreen("fund-methods");
            }
        }
        else {
            // If no previous connector, go back to fund methods
            setCurrentScreen("fund-methods");
        }
    };
    // Generate deposit calldata for Aave pool
    const generateDepositCalldata = (pool, amount) => {
        try {
            const userAddress = walletClient?.account?.address || walletClient?.account;
            if (!userAddress) {
                throw new Error("User address not found");
            }
            // Validate amount
            if (!amount ||
                amount === "" ||
                Number.isNaN(Number(amount)) ||
                Number(amount) <= 0) {
                throw new Error("Invalid amount");
            }
            // Aave V3 Pool contract deposit function
            // function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)
            const calldata = encodeFunctionData({
                abi: [
                    {
                        name: "supply",
                        type: "function",
                        inputs: [
                            { name: "asset", type: "address" },
                            { name: "amount", type: "uint256" },
                            { name: "onBehalfOf", type: "address" },
                            { name: "referralCode", type: "uint16" },
                        ],
                        outputs: [],
                        stateMutability: "nonpayable",
                    },
                ],
                args: [
                    pool.token.address, // asset address
                    BigInt(amount), // amount to deposit
                    userAddress, // onBehalfOf (user's address)
                    0, // referralCode (0 for no referral)
                ],
            });
            return calldata;
        }
        catch (error) {
            console.error("Error generating deposit calldata:", error);
            return undefined;
        }
    };
    const handleSelectExchange = () => {
        setSelectedFundMethod("exchange");
        setCurrentScreen("tokens");
    };
    const handleNavigateToMeshConnect = (props, quote) => {
        setPrepareSendQuote(quote ?? null);
        setMeshConnectProps(props);
        setCurrentScreen("mesh-connect");
    };
    const handleSendError = (error) => {
        if (error) {
            console.error("[trails-sdk] Error sending transaction", error);
        }
        const errorMessage = getErrorString(error);
        const isRejected = getIsWalletRejectedError(error);
        const isBalanceTooLow = getIsBalanceTooLowError(error);
        if (isRejected) {
            setShowWalletConfirmRetry(true);
        }
        else if (isBalanceTooLow) {
            setShowWalletConfirmRetry(true);
            setError(errorMessage);
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
    const handleWaitingForWalletConfirm = (quote) => {
        setShowWalletConfirmRetry(false);
        // Navigate to QR code deposit screen if fund method is qr-code, otherwise to wallet confirmation
        if (selectedFundMethod === "qr-code") {
            setCurrentScreen("qr-code-deposit");
        }
        else {
            setCurrentScreen("wallet-confirmation");
        }
        setPrepareSendQuote(quote ?? null);
    };
    async function handleWalletConfirmRetry() {
        if (!walletConfirmRetryHandler) {
            return;
        }
        try {
            setError(null);
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
                return (_jsx(ConnectWallet, { onConnect: handleWalletConnect, onDisconnect: handleWalletDisconnect, onContinue: handleContinue, walletOptions: getAvailableWallets(), onError: handleConnectError }));
            case "fund-methods":
                return (_jsx(FundMethods, { onBack: handleBack, onSelectWalletConnect: handleSelectWalletConnect, onSelectExchange: handleSelectExchange, onSelectConnectedAccount: () => {
                        setSelectedFundMethod("connected-account");
                        setCurrentScreen("tokens");
                    }, onSelectQrCode: () => {
                        setSelectedFundMethod("qr-code");
                        setCurrentScreen("tokens");
                    } }));
            case "tokens":
                return (_jsx(TokenList, { onContinue: handleTokenSelect, onBack: handleBack, indexerGatewayClient: indexerGatewayClient, targetAmountUsd: targetAmountUsd, targetAmountUsdFormatted: targetAmountUsdFormatted, onError: handleTokenListError, mode: mode, recentTokens: recentTokens, onRecentTokenSelect: handleRecentTokenSelect, fundMethod: selectedFundMethod, renderInline: renderInline, onNavigateToFundMethods: () => setCurrentScreen("fund-methods") }));
            case "send-form":
                return selectedToken && walletClient?.account ? (_jsx(PaySendForm, { onSend: handleOnSend, onBack: handleBack, onWaitingForWalletConfirm: handleWaitingForWalletConfirm, onConfirm: () => setCurrentScreen("pending"), onComplete: handleTransferComplete, selectedToken: selectedToken, account: walletClient.account, toRecipient: selectedPool
                        ? selectedPool.depositAddress
                        : toAddress || undefined, toAmount: toAmount || undefined, toChainId: selectedPool
                        ? selectedPool.chainId
                        : toChainId
                            ? Number(toChainId)
                            : undefined, toToken: selectedPool ? selectedPool.token.address : toToken || undefined, toCalldata: selectedPool ? generatedCalldata : toCalldata || undefined, walletClient: walletClient, onTransactionStateChange: handleTransactionStateChange, onError: handleSendError, paymasterUrls: paymasterUrls, gasless: gasless, setWalletConfirmRetryHandler: setWalletConfirmRetryHandler, quoteProvider: quoteProvider, fundMethod: selectedFundMethod, onNavigateToMeshConnect: handleNavigateToMeshConnect, onAmountUpdate: (amount) => {
                        if (selectedPool &&
                            mode === "earn" &&
                            amount &&
                            amount !== "") {
                            try {
                                const updatedCalldata = generateDepositCalldata(selectedPool, amount);
                                console.log("Updated calldata:", updatedCalldata, amount);
                                setGeneratedCalldata(updatedCalldata);
                            }
                            catch (error) {
                                console.error("Error updating calldata:", error);
                                setGeneratedCalldata(undefined);
                            }
                        }
                        else {
                            setGeneratedCalldata(undefined);
                        }
                    }, mode: mode, selectedPool: selectedPool })) : (_jsx("div", { className: "text-center p-4 rounded-lg text-gray-600 bg-gray-50 dark:text-gray-300 dark:bg-gray-800", children: "Please connect wallet" }));
            case "fund-form":
                return selectedToken && walletClient?.account ? (_jsx(FundSendForm, { onSend: handleOnSend, onBack: handleBack, onWaitingForWalletConfirm: handleWaitingForWalletConfirm, onConfirm: () => setCurrentScreen("pending"), onComplete: handleTransferComplete, selectedToken: selectedToken, account: walletClient.account, toAmount: toAmount || undefined, toRecipient: toAddress || undefined, toChainId: toChainId ? Number(toChainId) : undefined, toToken: toToken || undefined, walletClient: walletClient, onTransactionStateChange: handleTransactionStateChange, onError: handleSendError, paymasterUrls: paymasterUrls, gasless: gasless, setWalletConfirmRetryHandler: setWalletConfirmRetryHandler, toCalldata: toCalldata || undefined, quoteProvider: quoteProvider, fundMethod: selectedFundMethod, onNavigateToMeshConnect: handleNavigateToMeshConnect })) : (_jsx("div", { className: "text-center p-4 rounded-lg text-gray-600 bg-gray-50 dark:text-gray-300 dark:bg-gray-800", children: "Please connect wallet" }));
            case "wallet-confirmation":
                return (_jsx(WalletConfirmation, { onBack: handleBack, onComplete: handleWalletConfirmComplete, retryEnabled: showWalletConfirmRetry, onRetry: handleWalletConfirmRetry, quote: prepareSendQuote }));
            case "qr-code-deposit":
                return _jsx(QRCodeDeposit, { onBack: handleBack, quote: prepareSendQuote });
            case "pending":
                return (_jsx(TransferPending, { onElapsedTime: handleElapsedTime, transactionStates: transactionStates, quote: prepareSendQuote }));
            case "receipt":
                return (_jsx(Receipt, { onSendAnother: handleSendAnother, onClose: handleCloseModal, renderInline: renderInline, transactionStates: transactionStates, totalCompletionSeconds: totalCompletionSeconds ?? undefined, quote: prepareSendQuote }));
            case "mesh-connect":
                return (_jsx(MeshConnect, { onBack: handleBack, onComplete: handleMeshConnectComplete, quote: prepareSendQuote, ...meshConnectProps }));
            case "wallet-connect":
                return (_jsx(WalletConnectScreen, { onBack: handleBack, onContinue: handleContinue, onReconnectPreviousWallet: handleReconnectPreviousWallet }));
            case "earn-pools":
                return (_jsx(EarnPools, { onBack: handleBack, onPoolSelect: (pool) => {
                        console.log("Selected pool:", pool);
                        setSelectedPool(pool);
                        setCurrentScreen("send-form");
                    } }));
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
            }, className: "flex flex-col min-h-[400px] shadow-xl p-4 sm:p-6 relative w-full sm:w-[400px] mx-auto custom-scrollbar trails-bg-primary trails-text-primary trails-font trails-border-radius-widget trails-widget-border", layout: true, layoutId: "modal-container", onClick: (e) => e.stopPropagation(), children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            mass: 0.6,
                        }, className: "flex-1 flex flex-col w-full", layout: true, children: [renderScreenContent(), error && (_jsx("div", { className: "border rounded-lg p-4 mt-4 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800", children: _jsx("p", { className: "text-sm break-words text-red-600 dark:text-red-200", children: error }) }))] }, currentScreen) }), _jsx(Footer, { onDebugScreenSelect: handleDebugScreenSelect })] }));
    };
    if (renderInline) {
        return renderScreen();
    }
    return (_jsxs("div", { className: "flex flex-col items-center justify-center space-y-8 py-12", children: [!children ? (_jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => setIsModalOpen(true), className: "trails-modal-button cursor-pointer font-semibold py-3 px-6 trails-font", children: buttonText || (mode === "fund" ? "Fund" : "Pay") })) : (_jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "flex flex-col items-center justify-center", onClick: () => setIsModalOpen(true), children: children })), _jsx(AnimatePresence, { children: isModalOpen && (_jsx(Modal, { isOpen: isModalOpen, onClose: handleCloseModal, children: renderScreen() })) })] }));
});
export const TrailsWidget = forwardRef((props, ref) => {
    const wagmiContext = useContext(WagmiContext);
    const sequenceHooksContext = useContext(SequenceHooksContext);
    useEffect(() => {
        if (props.appId) {
            setSequenceProjectAccessKey(props.appId);
        }
        if (typeof props.sequenceUseV3Relayers === "boolean") {
            setSequenceUseV3Relayers(props.sequenceUseV3Relayers);
        }
        if (props.sequenceIndexerUrl) {
            setSequenceIndexerUrl(props.sequenceIndexerUrl);
        }
        if (props.sequenceApiUrl) {
            setSequenceApiUrl(props.sequenceApiUrl);
        }
        if (props.sequenceEnv) {
            setSequenceEnv(props.sequenceEnv);
        }
        if (props.privyAppId) {
            setPrivyAppId(props.privyAppId);
        }
        if (props.privyClientId) {
            setPrivyClientId(props.privyClientId);
        }
        if (props.walletConnectProjectId) {
            setWalletConnectProjectId(props.walletConnectProjectId);
        }
        if (props.slippageTolerance !== undefined) {
            setSlippageTolerance(String(props.slippageTolerance));
        }
    }, [
        props.appId,
        props.sequenceUseV3Relayers,
        props.sequenceIndexerUrl,
        props.sequenceApiUrl,
        props.sequenceEnv,
        props.privyAppId,
        props.privyClientId,
        props.walletConnectProjectId,
        props.slippageTolerance,
    ]);
    // Check if privy is in walletOptions
    // const walletOptions = props.walletOptions || defaultWalletOptions
    const shouldUsePrivy = true; // walletOptions.includes('privy') // TODO: need to disable all privy hooks if walletOptions.includes('privy') is false
    const wagmiConfig = React.useMemo(() => {
        const chains = [...Object.values(viemChains)];
        const baseConfig = {
            chains,
            transports: chains.reduce((acc, chain) => ({
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
                connectors: [
                    injected(),
                    walletConnect({
                        projectId: getWalletConnectProjectId(),
                        showQrModal: false,
                    }),
                ],
            });
        }
    }, []);
    // Create content with only the providers that don't exist in parent
    const content = (() => {
        const widgetContent = (_jsx(ThemeProvider, { initialTheme: props.theme, children: _jsx(WidgetInner, { ...props, ref: ref }) }));
        const baseContent = (_jsx(AaveProvider, { client: aaveClient, children: _jsx(QueryClientProvider, { client: queryClient, children: sequenceHooksContext ? (
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
                            indexerUrl: props.sequenceIndexerUrl || getSequenceIndexerUrl(),
                            indexerGatewayUrl: props.sequenceIndexerUrl || getSequenceIndexerUrl(),
                            apiUrl: props.sequenceApiUrl || getSequenceApiUrl(),
                        },
                    }, children: wagmiContext ? (
                    // WagmiProvider exists in parent, don't wrap
                    widgetContent) : (
                    // WagmiProvider missing, wrap with it
                    _jsx(WagmiProvider, { config: wagmiConfig, children: widgetContent })) })) }) }));
        // Only wrap with PrivyProvider if privy is in walletOptions
        if (shouldUsePrivy) {
            return (_jsx(PrivyProvider, { appId: props.privyAppId || getPrivyAppId(), clientId: props.privyClientId || getPrivyClientId(), config: {
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
    return (_jsx(ShadowPortal, { customCss: props.customCss, children: _jsx(StrictMode, { children: content }) }));
});
export function ShadowPortal({ children, customCss, }) {
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
    // Update custom CSS when it changes
    useEffect(() => {
        if (shadowRoot) {
            // Remove any existing custom CSS
            const existingCustomStyles = shadowRoot.querySelectorAll('style[id="custom-css"]');
            existingCustomStyles.forEach((style) => style.remove());
            // Inject new custom CSS if provided
            if (customCss) {
                const customStyleTag = document.createElement("style");
                customStyleTag.id = "custom-css";
                customStyleTag.textContent = `:root, [data-theme="light"], [data-theme="dark"] { ${customCss} }`;
                shadowRoot.appendChild(customStyleTag);
            }
        }
    }, [customCss, shadowRoot]);
    return (_jsx("div", { ref: hostRef, children: shadowRoot ? createPortal(children, shadowRoot) : null }));
}
// Export standalone functions for modal control
export const createModalController = (ref) => ({
    openModal: () => ref.current?.openModal?.(),
    closeModal: () => ref.current?.closeModal?.(),
    isModalOpen: ref.current?.isModalOpen ?? false,
});
export default TrailsWidget;
