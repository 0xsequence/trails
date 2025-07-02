import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// biome-ignore lint/style/useImportType: Need to use React
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import MetaMaskFox from "../assets/MetaMask-icon-fox.svg";
import MetaMaskLogoWhite from "../assets/MetaMask-logo-white.svg";
import PrivyLogoBlack from "../assets/Privy_Brandmark_Black.svg";
import PrivyLogoWhite from "../assets/Privy_Brandmark_White.svg";
export const ConnectWallet = ({ onConnect, onDisconnect, onContinue, theme = "light", walletOptions, }) => {
    const { isConnected, address, connector } = useAccount();
    const { disconnect } = useDisconnect();
    const [error, setError] = useState(null);
    const handleDisconnect = () => {
        try {
            setError(null);
            disconnect();
            onDisconnect();
        }
        catch (error) {
            console.error("Failed to disconnect:", error);
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
            console.error("Failed to check if MetaMask is installed:", error);
        }
        if (isMetaMask) {
            return "bg-[#FF5C16] hover:bg-[#FF5C16]/90 text-white";
        }
        switch (walletId) {
            case "privy":
                return theme === "dark"
                    ? "bg-white hover:bg-white/90 text-black"
                    : "bg-black hover:bg-black/90 text-white";
            default:
                return theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600";
        }
    };
    // If no valid wallet options are available, show a simple message
    if (!walletOptions.length) {
        return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center relative", children: _jsx("h2", { className: `text-lg font-semibold w-full text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "Connect a Wallet" }) }), _jsx("div", { className: `text-center p-4 rounded-lg ${theme === "dark"
                        ? "text-gray-300 bg-gray-800"
                        : "text-gray-600 bg-gray-50"}`, children: "Please connect wallet in dapp" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center relative", children: _jsx("h2", { className: `text-lg font-semibold w-full text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "Connect a Wallet" }) }), isConnected ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: `p-4 rounded-2xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`, children: [_jsxs("p", { className: theme === "dark" ? "text-gray-400" : "text-gray-500", children: ["Connected with ", connector?.name || ""] }), _jsx("p", { className: theme === "dark" ? "text-white" : "text-gray-900", style: { wordBreak: "break-all" }, children: address })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [error && (_jsx("div", { className: `border rounded-lg p-4 ${theme === "dark"
                                    ? "bg-red-900/20 border-red-800"
                                    : "bg-red-50 border-red-200"}`, children: _jsx("p", { className: `text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`, children: error }) })), _jsx("button", { onClick: onContinue, className: `w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors ${theme === "dark"
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-blue-500 hover:bg-blue-600 text-white"}`, children: "Continue" }), _jsx("button", { type: "button", onClick: handleDisconnect, className: `w-full cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors border ${theme === "dark"
                                    ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                                    : "bg-white hover:bg-gray-50 text-gray-900 border-gray-200"}`, children: "Disconnect" })] })] })) : (_jsxs("div", { className: "flex flex-col gap-3", children: [error && (_jsx("div", { className: `border rounded-lg p-4 ${theme === "dark"
                            ? "bg-red-900/20 border-red-800"
                            : "bg-red-50 border-red-200"}`, children: _jsx("p", { className: `text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`, children: error }) })), walletOptions.map((wallet) => (_jsx("button", { type: "button", onClick: () => onConnect(wallet.id), className: `w-full flex items-center justify-center space-x-2 cursor-pointer font-semibold py-3 px-4 rounded-[24px] transition-colors ${getWalletButtonStyle(wallet.id)}`, children: wallet.id === "privy" ? (_jsx("img", { src: theme === "dark" ? PrivyLogoBlack : PrivyLogoWhite, alt: "Privy", className: "h-6" })) : wallet.id === "injected" && window.ethereum?.isMetaMask ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("img", { src: MetaMaskFox, alt: "MetaMask Fox", className: "h-6 w-6" }), _jsx("img", { src: MetaMaskLogoWhite, alt: "MetaMask", className: "h-6" })] })) : (_jsx("span", { children: wallet.name })) }, wallet.id)))] }))] }));
};
export default ConnectWallet;
