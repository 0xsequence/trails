import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TokenImage } from "./TokenImage.js";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { QuoteDetails } from "./QuoteDetails.js";
export const WalletConfirmation = ({ theme = "light", retryEnabled = false, onRetry, onBack, quote, }) => {
    const [showContent, setShowContent] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    useEffect(() => {
        setShowContent(true);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!retryEnabled) {
                setShowTimeoutWarning(true);
            }
        }, 60000); // 1 minute
        return () => clearTimeout(timer);
    }, [retryEnabled]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center relative", children: _jsx("button", { type: "button", onClick: onBack, className: `absolute left-0 top-0 p-2 rounded-full transition-colors cursor-pointer ${theme === "dark"
                        ? "hover:bg-gray-800 text-gray-400"
                        : "hover:bg-gray-100 text-gray-600"}`, children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }) }), _jsxs("div", { className: "flex flex-col justify-center min-h-full space-y-6 pt-8", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: `mx-auto flex items-center justify-center transition-all duration-500 ease-out relative ${showContent ? "transform -translate-y-8" : ""}`, children: [retryEnabled ? (_jsx("div", { className: `h-24 w-24` })) : (_jsx("div", { className: `animate-spin rounded-full h-24 w-24 border-b-2 ${theme === "dark" ? "border-blue-400" : "border-blue-500"}`, style: { borderTopWidth: "2px", borderBottomWidth: "2px" } })), _jsx("div", { className: "absolute", children: _jsx(TokenImage, { imageUrl: quote?.originToken.imageUrl, symbol: quote?.originToken.symbol, chainId: quote?.originChain.id, size: 64 }) })] }), _jsxs("div", { className: `transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("h2", { className: `text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: retryEnabled ? "Try again" : "Waiting for wallet…" }), _jsx("p", { className: `mt-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "Please approve the request in your wallet" })] })] }), _jsx("div", { className: `transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsxs("button", { type: "button", onClick: () => setShowDetails(!showDetails), className: `w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[24px] transition-colors cursor-pointer text-sm ${theme === "dark"
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-500 hover:text-gray-700"}`, children: [_jsx("span", { children: "More Details" }), _jsxs("svg", { className: `w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("title", { children: "Expand" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })] })] }) }), showTimeoutWarning && (_jsx("div", { className: `transition-all duration-500 ease-out delay-150 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsx("div", { className: `p-4 rounded-lg text-sm ${theme === "dark"
                                ? "bg-yellow-900/20 border border-yellow-700/50"
                                : "bg-yellow-50 border border-yellow-200"}`, children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsxs("svg", { className: `w-5 h-5 mt-0.5 flex-shrink-0 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("title", { children: "Warning" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" })] }), _jsxs("div", { children: [_jsx("p", { className: `font-medium ${theme === "dark" ? "text-yellow-300" : "text-yellow-800"}`, children: "Request is taking longer than expected" }), _jsx("p", { className: `mt-1 text-xs ${theme === "dark" ? "text-yellow-400" : "text-yellow-700"}`, children: "This transaction request is taking longer than expected. Please reach out to support for help if the issue persists." })] })] }) }) })), showDetails && (_jsx(QuoteDetails, { theme: theme, quote: quote, showContent: showContent })), retryEnabled && onRetry && (_jsx("div", { className: `transition-all duration-500 ease-out delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsx("button", { type: "button", onClick: onRetry, className: `w-full px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${theme === "dark"
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-blue-500 hover:bg-blue-600 text-white"}`, children: "Try Again" }) }))] })] }));
};
export default WalletConfirmation;
