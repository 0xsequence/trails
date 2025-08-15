import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// biome-ignore lint/style/useImportType: Need to use React
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import MetaMaskFox from "../assets/MetaMask-icon-fox.svg";
import MetaMaskLogoWhite from "../assets/MetaMask-logo-white.svg";
import WalletConnectLogo from "../assets/WalletConnect-logo.svg";
import PrivyLogoBlack from "../assets/Privy_Brandmark_Black.svg";
import PrivyLogoWhite from "../assets/Privy_Brandmark_White.svg";
export const ConnectWallet = ({ onConnect, onDisconnect, onContinue, onError, walletOptions, }) => {
    const { isConnected, address, connector } = useAccount();
    const { disconnect } = useDisconnect();
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error) {
            if (onError) {
                onError(new Error(error));
            }
        }
    }, [error, onError]);
    const handleDisconnect = () => {
        try {
            setError(null);
            disconnect();
            onDisconnect();
        }
        catch (error) {
            console.error("[trails-sdk] Failed to disconnect:", error);
            setError(error instanceof Error ? error.message : "Failed to disconnect wallet");
        }
    };
    const getWalletButtonStyle = (walletId) => {
        let isMetaMask = false;
        try {
            if (walletId === "injected") {
                isMetaMask =
                    typeof window !== "undefined" && !!window.ethereum?.isMetaMask;
            }
        }
        catch (error) {
            console.error("[trails-sdk] Failed to check if MetaMask is installed:", error);
        }
        if (isMetaMask) {
            return "bg-[#FF5C16] hover:bg-[#FF5C16]/90 text-white";
        }
        switch (walletId) {
            case "privy":
                return "bg-black hover:bg-black/90 text-white dark:bg-white dark:hover:bg-white/90 dark:text-black";
            case "walletconnect":
                return "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-white dark:hover:bg-gray-100";
            default:
                return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700";
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center relative", children: _jsx("h2", { className: "text-lg font-semibold w-full text-center text-gray-900 dark:text-white", children: "Connect a Wallet" }) }), isConnected ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 trails-border-radius-container trails-bg-secondary", children: [_jsxs("p", { className: "text-gray-500 dark:text-gray-400", children: ["Connected with ", connector?.name || ""] }), _jsx("p", { className: "text-gray-900 dark:text-white", style: { wordBreak: "break-all" }, children: address })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [error && (_jsx("div", { className: "border rounded-lg p-4 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800", children: _jsx("p", { className: "text-sm break-words text-red-600 dark:text-red-200", children: error }) })), _jsx("button", { type: "button", onClick: onContinue, className: "w-full cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 text-white", children: "Continue" }), _jsx("button", { type: "button", onClick: handleDisconnect, className: "w-full cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors border trails-bg-card trails-hover-bg trails-text-primary trails-border-primary", children: "Disconnect" })] })] })) : (_jsx("div", { className: "flex flex-col gap-3", children: walletOptions.length > 0 ? (walletOptions.map((wallet) => (_jsx("button", { type: "button", onClick: () => onConnect(wallet.id), className: `w-full flex items-center justify-center space-x-2 cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors ${getWalletButtonStyle(wallet.id)}`, children: wallet.id === "privy" ? (_jsxs(_Fragment, { children: [_jsx("img", { src: PrivyLogoWhite, alt: "Privy", className: "h-6 dark:hidden" }), _jsx("img", { src: PrivyLogoBlack, alt: "Privy", className: "h-6 hidden dark:block" })] })) : wallet.id === "injected" && window.ethereum?.isMetaMask ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("img", { src: MetaMaskFox, alt: "MetaMask Fox", className: "h-6 w-6" }), _jsx("img", { src: MetaMaskLogoWhite, alt: "MetaMask", className: "h-6" })] })) : wallet.id === "walletconnect" ? (_jsx("div", { className: "flex items-center space-x-2", children: _jsx("img", { src: WalletConnectLogo, alt: "WalletConnect", className: "h-6" }) })) : (_jsx("span", { children: wallet.name })) }, wallet.id)))) : (_jsx("div", { className: "space-y-6", children: _jsx("div", { className: "text-center p-4 trails-border-radius-container trails-text-tertiary trails-bg-secondary", children: "Please connect wallet in dapp" }) })) }))] }));
};
export default ConnectWallet;
