import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TokenImage } from "./TokenImage.js";
import { ChainImage } from "./ChainImage.js";
import { ChevronLeft, ChevronDown, QrCode as QrCodeIcon, ExternalLink, } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { QuoteDetails } from "./QuoteDetails.js";
import { QrCode } from "./QrCode.js";
import { formatUnits } from "viem";
import { getExplorerUrlForAddress } from "../../explorer.js";
export const WalletConfirmation = ({ retryEnabled = false, onRetry, onBack, quote, }) => {
    const [showContent, setShowContent] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    const [useSimpleQrCode, setUseSimpleQrCode] = useState(true);
    useEffect(() => {
        setShowContent(true);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!retryEnabled) {
                setShowTimeoutWarning(true);
            }
        }, 2 * 60 * 1000); // 2 minutes
        return () => clearTimeout(timer);
    }, [retryEnabled]);
    const eip631Url = useMemo(() => {
        if (!quote)
            return "";
        return `ethereum:${quote.originAddress}@${quote.originChain.id}`;
    }, [quote]);
    const eip681Url = useMemo(() => {
        if (!quote)
            return "";
        return `ethereum:${quote.originToken.contractAddress}@${quote.originChain.id}/transfer?address=${quote.originAddress}&uint256=${quote.originAmount}`;
    }, [quote]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center relative", children: _jsx("button", { type: "button", onClick: onBack, className: "absolute left-0 top-0 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:trails-hover-bg text-gray-600 dark:text-gray-400", children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }) }), _jsxs("div", { className: "flex flex-col justify-center min-h-full space-y-6 pt-8", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: `mx-auto flex items-center justify-center transition-all duration-500 ease-out relative ${showContent ? "transform -translate-y-8" : ""}`, children: [retryEnabled ? (_jsx("div", { className: `h-24 w-24` })) : (_jsx("div", { className: "animate-spin rounded-full h-24 w-24 border-b-2 border-blue-500 dark:border-blue-400", style: { borderTopWidth: "2px", borderBottomWidth: "2px" } })), _jsx("div", { className: "absolute", children: _jsx(TokenImage, { imageUrl: quote?.originToken.imageUrl, symbol: quote?.originToken.symbol, chainId: quote?.originChain.id, size: 64 }) })] }), _jsxs("div", { className: `transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: retryEnabled ? "Try again" : "Waiting for wallet…" }), _jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-300", children: "Please approve the request in your wallet" })] })] }), quote && quote.originChain.id !== quote.destinationChain.id && (_jsxs("div", { className: "space-y-2", children: [_jsxs("button", { type: "button", onClick: () => setShowQrCode(!showQrCode), className: "w-full flex items-center justify-center gap-2 py-1 px-4 trails-border-radius-button transition-colors cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300", children: [_jsx("span", { className: "flex items-center gap-2", children: showQrCode ? ("close QR code") : (_jsxs(_Fragment, { children: [_jsx(QrCodeIcon, { className: "w-3 h-3" }), " or scan QR code to deposit funds"] })) }), _jsx(ChevronDown, { className: `w-3 h-3 transition-transform duration-300 ease-out ${showQrCode ? "rotate-180" : ""}` })] }), showQrCode && (_jsxs("div", { className: "space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("button", { type: "button", onClick: () => setUseSimpleQrCode(!useSimpleQrCode), className: "cursor-pointer transition-opacity hover:opacity-80", title: useSimpleQrCode
                                                        ? `Click to show detailed transfer QR code (EIP-681). Current URL: ${eip631Url}`
                                                        : `Click to show simple address QR code (EIP-631). Current URL: ${eip681Url}`, children: _jsx(QrCode, { url: useSimpleQrCode ? eip631Url : eip681Url, size: 200 }) }), !useSimpleQrCode && (_jsxs("a", { href: "https://eips.ethereum.org/EIPS/eip-681", target: "_blank", rel: "noopener noreferrer", className: "mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-mono hover:underline transition-all", children: ["EIP-681", _jsx(ExternalLink, { className: "w-3 h-3" })] }))] }) }), quote.originAmount && (_jsxs("div", { className: "flex flex-col items-center justify-center gap-1 pt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "deposit exactly" }), _jsx(TokenImage, { imageUrl: quote.originToken.imageUrl, symbol: quote.originToken.symbol, chainId: quote.originChain.id, size: 20 }), _jsxs("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: [formatUnits(BigInt(quote.originAmount), quote.originToken.decimals), " ", quote.originToken.symbol] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "on" }), _jsx(ChainImage, { chainId: quote.originChain.id, size: 16 }), _jsx("span", { className: "text-xs font-bold text-gray-500 dark:text-gray-400", children: quote.originChain.name }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "to" }), _jsxs("a", { href: getExplorerUrlForAddress({
                                                            address: quote.originAddress,
                                                            chainId: quote.originChain.id,
                                                        }), target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:underline transition-all", children: [_jsxs("span", { children: [quote.originAddress.slice(0, 6), "...", quote.originAddress.slice(-4)] }), _jsx(ExternalLink, { className: "w-3 h-3" })] })] })] }))] }))] })), showTimeoutWarning && (_jsx("div", { className: `transition-all duration-500 ease-out delay-150 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsx("div", { className: "p-4 rounded-lg text-sm bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700/50", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsxs("svg", { className: "w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("title", { children: "Warning" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-yellow-800 dark:text-yellow-300", children: "Request is taking longer than expected" }), _jsx("p", { className: "mt-1 text-xs text-yellow-700 dark:text-yellow-400", children: "This transaction request is taking longer than expected. Please reach out to support for help if the issue persists." })] })] }) }) })), retryEnabled && onRetry && !showQrCode && (_jsx("div", { className: `mb-2 transition-all duration-500 ease-out delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsx("button", { type: "button", onClick: onRetry, className: "w-full px-4 py-2 trails-border-radius-button font-medium transition-colors cursor-pointer bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700", children: "Try Again" }) })), _jsx(QuoteDetails, { quote: quote, showContent: true })] })] }));
};
export default WalletConfirmation;
