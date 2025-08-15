import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useCallback, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { QrCode } from "./QrCode.js";
import { TruncatedAddress } from "./TruncatedAddress.js";
import { getWalletConnectProjectId } from "../../config.js";
// Local singleton to avoid multiple Core initializations from this screen
let wcConnectorSingleton = null;
function getWalletConnectConnector(projectId) {
    if (!wcConnectorSingleton) {
        console.log("[WalletConnect] Creating new connector with projectId:", projectId || getWalletConnectProjectId());
        wcConnectorSingleton = walletConnect({
            projectId: projectId || getWalletConnectProjectId(),
            showQrModal: false,
        });
    }
    return wcConnectorSingleton;
}
export const WalletConnectScreen = ({ onBack, onContinue, projectId, onReconnectPreviousWallet, }) => {
    const { connect, connectors, status } = useConnect();
    const { disconnect } = useDisconnect();
    const { isConnected, address, connector } = useAccount();
    const [wcUri, setWcUri] = React.useState(null);
    const [showUri, setShowUri] = React.useState(false);
    const listenerRef = React.useRef(null);
    const debounceTimeoutRef = useRef(null);
    // Debounced setWcUri to prevent rapid QR code changes
    const debouncedSetWcUri = useCallback((uri) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
            setWcUri(uri);
        }, 500); // 300ms debounce delay
    }, []);
    const isWalletConnectConnector = React.useMemo(() => {
        return connector?.name === "WalletConnect" && isConnected;
    }, [connector, isConnected]);
    // Track if we were connected when the component mounted
    const wasConnectedOnMount = React.useRef(isConnected);
    const wcConnectorFromConfig = connectors.find((c) => (c.id || "").toLowerCase().includes("walletconnect"));
    // Only auto-navigate back if we successfully connect a new wallet
    // Don't auto-navigate if user was already connected when they entered this screen
    useEffect(() => {
        if (isConnected && status === "success" && !wasConnectedOnMount.current) {
            onBack();
        }
    }, [isConnected, status, onBack]);
    const handleConnect = useCallback(async (force = false) => {
        console.log("[WalletConnect] handleConnect", {
            status,
            wcUri,
            isWalletConnectConnector,
        });
        if ((status === "pending" || status === "success") && !force)
            return;
        const makeConnector = () => getWalletConnectConnector(projectId);
        const connector = wcConnectorFromConfig || makeConnector();
        try {
            console.log("[WalletConnect] Starting connection...");
            // Set up message listener for display_uri events (like ConnectKit does)
            const handleMessage = (message) => {
                const { type, data } = message;
                console.log("[WalletConnect] Message received:", type, data);
                if (type === "display_uri") {
                    console.log("[WalletConnect] Setting URI from display_uri event:", data);
                    debouncedSetWcUri(data);
                }
            };
            // Set up disconnect handler to regenerate QR code
            const handleDisconnect = async () => {
                console.log("[WalletConnect] Disconnected, regenerating QR code");
                debouncedSetWcUri(null);
                // Try to reconnect
                try {
                    await connect({ connector });
                }
                catch (error) {
                    console.error("[WalletConnect] Reconnection error:", error);
                }
            };
            // Add listeners to connector emitter
            if (connector.emitter) {
                console.log("[WalletConnect] Adding listeners to connector emitter");
                connector.emitter.on("message", handleMessage);
                connector.emitter.on("disconnect", handleDisconnect);
                // Store listeners for cleanup
                listenerRef.current = () => {
                    ;
                    connector.emitter.off("message", handleMessage);
                    connector.emitter.off("disconnect", handleDisconnect);
                };
            }
            await connect({ connector });
        }
        catch (err) {
            console.error("[WalletConnect] connect error", err);
            // If user rejected, try to regenerate QR code
            if (err.code === 4001) {
                console.log("[WalletConnect] User rejected, regenerating QR code");
                debouncedSetWcUri(null);
                // Try to reconnect after a short delay
                setTimeout(() => {
                    handleConnect();
                }, 0);
            }
        }
    }, [
        connect,
        wcConnectorFromConfig,
        projectId,
        status,
        wcUri,
        isWalletConnectConnector,
        debouncedSetWcUri,
    ]);
    // Auto-start WalletConnect connection when component mounts (if not already connected via WalletConnect)
    useEffect(() => {
        if (!isWalletConnectConnector && !wcUri && status !== "pending") {
            console.log("[WalletConnect] Auto-starting connection on mount");
            handleConnect();
        }
    }, [isWalletConnectConnector, wcUri, status, handleConnect]);
    // Force QR code regeneration when wcUri is cleared
    useEffect(() => {
        if (!wcUri && !isWalletConnectConnector && status !== "pending") {
            console.log("[WalletConnect] URI cleared, regenerating QR code");
            handleConnect();
        }
    }, [wcUri, isWalletConnectConnector, status, handleConnect]);
    useEffect(() => {
        return () => {
            try {
                // Clean up the listener function if it exists
                if (listenerRef.current) {
                    listenerRef.current();
                }
                // Clean up debounce timeout
                if (debounceTimeoutRef.current) {
                    clearTimeout(debounceTimeoutRef.current);
                }
            }
            catch { }
        };
    }, []);
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("button", { type: "button", onClick: onBack, className: "p-2 rounded-full transition-colors cursor-pointer hover:trails-hover-bg text-gray-400", children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }), _jsx("h2", { className: "text-lg font-semibold", children: "Connect with WalletConnect" }), _jsx("div", { className: "w-9" })] }), _jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsx("div", { className: "text-center p-6 w-full max-w-sm trails-border-radius-container trails-bg-secondary", children: isWalletConnectConnector ? (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4", children: _jsx("svg", { className: "w-8 h-8 text-green-600 dark:text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2", children: "Wallet Connected" }), _jsx("div", { className: "mb-4", children: _jsx(TruncatedAddress, { address: address || "", chainId: 1, className: "text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline" }) }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: () => onContinue(), className: "px-4 py-2 text-sm transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-sm hover:shadow-md trails-border-radius-button font-medium trails-primary-button-bg trails-primary-button-text bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white", children: "Continue" }), _jsx("button", { type: "button", onClick: () => {
                                            disconnect();
                                            debouncedSetWcUri(null);
                                            setShowUri(false);
                                            setTimeout(() => {
                                                if (onReconnectPreviousWallet) {
                                                    onReconnectPreviousWallet();
                                                }
                                            }, 0);
                                            setTimeout(() => {
                                                handleConnect(true);
                                            }, 1000);
                                        }, className: "px-4 py-2 text-sm transition-all duration-200 cursor-pointer hover:scale-[1.02] shadow-sm hover:shadow-md trails-border-radius-button font-medium trails-bg-secondary trails-text-secondary trails-border-color", children: "Disconnect" })] })] })) : (_jsxs(_Fragment, { children: [wcUri ? (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(QrCode, { url: wcUri, size: 220 }), _jsxs("button", { onClick: () => setShowUri(!showUri), className: "mt-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline cursor-pointer flex items-center gap-1", children: [showUri ? "Hide URI" : "Show URI", _jsx("svg", { className: `w-3 h-3 transition-transform ${showUri ? "rotate-180" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), showUri && (_jsx("p", { className: "mt-2 text-xs text-gray-600 dark:text-gray-400 break-all", children: wcUri }))] })) : (_jsx("div", { className: "flex flex-col items-center", children: _jsx("div", { className: "w-[220px] h-[220px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center trails-border-radius-container", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Generating QR code..." })] }) }) })), _jsx("div", { className: "mt-3 text-xs text-gray-600 dark:text-gray-400", children: status === "pending" && _jsx("span", { children: "Waiting for confirmation\u2026" }) })] })) }) })] }));
};
export default WalletConnectScreen;
