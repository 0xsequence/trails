import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TokenImage } from "@0xsequence/design-system";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getExplorerUrlForAddress } from "../../explorer.js";
export const WalletConfirmation = ({ theme = "light", amount, recipient, tokenSymbol, retryEnabled = false, onRetry, onBack, fromTokenSymbol, fromChainId, fromTokenImageUrl, }) => {
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        setShowContent(true);
    }, []);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center relative", children: _jsx("button", { type: "button", onClick: onBack, className: `absolute -left-2 p-2 rounded-full transition-colors cursor-pointer ${theme === "dark"
                        ? "hover:bg-gray-800 text-gray-400"
                        : "hover:bg-gray-100 text-gray-600"}`, children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }) }), _jsxs("div", { className: "flex flex-col justify-center min-h-full space-y-6 pt-8", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: `mx-auto flex items-center justify-center transition-all duration-500 ease-out relative ${showContent ? "transform -translate-y-8" : ""}`, children: [retryEnabled ? (_jsx("div", { className: `h-24 w-24` })) : (_jsx("div", { className: `animate-spin rounded-full h-24 w-24 border-b-2 ${theme === "dark" ? "border-blue-400" : "border-blue-500"}`, style: { borderTopWidth: "2px", borderBottomWidth: "2px" } })), _jsx(TokenImage, { src: fromTokenImageUrl?.replace("/small/", "/large/"), symbol: fromTokenSymbol, size: "xl", className: "absolute w-16 h-16", withNetwork: fromChainId, disableAnimation: true })] }), _jsxs("div", { className: `transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("h2", { className: `text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: retryEnabled ? "Try again" : "Waiting for wallet..." }), _jsx("p", { className: `mt-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Please approve the request in your wallet" })] })] }), _jsx("div", { className: `transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsx("div", { className: `p-4 rounded-lg border ${theme === "dark"
                                ? "bg-gray-800/50 border-gray-700"
                                : "bg-gray-50 border-gray-200"}`, children: _jsxs("div", { className: "space-y-3", children: [amount && tokenSymbol && (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`, children: "Amount:" }), _jsxs("span", { className: `font-medium text-xs ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: [amount, " ", tokenSymbol] })] })), recipient && (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`, children: "To (Intent):" }), _jsxs("a", { href: getExplorerUrlForAddress({
                                                    address: recipient,
                                                    chainId: fromChainId,
                                                }), target: "_blank", rel: "noopener noreferrer", className: `font-mono text-xs hover:underline ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`, children: [recipient.slice(0, 6), "...", recipient.slice(-4)] })] }))] }) }) }), retryEnabled && onRetry && (_jsx("div", { className: `transition-all duration-500 ease-out delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsx("button", { type: "button", onClick: onRetry, className: `w-full px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${theme === "dark"
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-blue-500 hover:bg-blue-600 text-white"}`, children: "Try Again" }) }))] })] }));
};
export default WalletConfirmation;
