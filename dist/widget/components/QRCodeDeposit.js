import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TokenImage } from "./TokenImage.js";
import { ChainImage } from "./ChainImage.js";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { QuoteDetails } from "./QuoteDetails.js";
import { QrCode } from "./QrCode.js";
import { formatUnits } from "viem";
import { getExplorerUrlForAddress } from "../../explorer.js";
export const QRCodeDeposit = ({ onBack, quote, }) => {
    const [useSimpleQrCode, setUseSimpleQrCode] = useState(true);
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
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center relative", children: [_jsx("button", { type: "button", onClick: onBack, className: "absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:trails-hover-bg text-gray-400", children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }), _jsx("h2", { className: "text-xl font-bold w-full text-center text-gray-900 dark:text-white", children: "Deposit" })] }), _jsxs("div", { className: "flex flex-col justify-center min-h-full space-y-6 pt-8", children: [_jsx("div", { className: "text-center", children: _jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-300", children: "Scan the QR code to deposit to the fund address the exact amount stated below" }) }), _jsxs("div", { className: "space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("button", { type: "button", onClick: () => setUseSimpleQrCode(!useSimpleQrCode), className: "cursor-pointer transition-opacity hover:opacity-80", title: useSimpleQrCode
                                                ? `Click to show detailed transfer QR code (EIP-681). Current URL: ${eip631Url}`
                                                : `Click to show simple address QR code (EIP-631). Current URL: ${eip681Url}`, children: _jsx(QrCode, { url: useSimpleQrCode ? eip631Url : eip681Url, size: 200 }) }), !useSimpleQrCode && (_jsxs("a", { href: "https://eips.ethereum.org/EIPS/eip-681", target: "_blank", rel: "noopener noreferrer", className: "mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-mono hover:underline transition-all", children: ["EIP-681", _jsx(ExternalLink, { className: "w-3 h-3" })] }))] }) }), quote?.originAmount && (_jsxs("div", { className: "flex flex-col items-center justify-center gap-1 pt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "deposit exactly" }), _jsx(TokenImage, { imageUrl: quote.originToken.imageUrl, symbol: quote.originToken.symbol, chainId: quote.originChain.id, size: 20 }), _jsxs("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: [formatUnits(BigInt(quote.originAmount), quote.originToken.decimals), " ", quote.originToken.symbol] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "on" }), _jsx(ChainImage, { chainId: quote.originChain.id, size: 16 }), _jsx("span", { className: "text-xs font-bold text-gray-500 dark:text-gray-400", children: quote.originChain.name }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "to" }), _jsxs("a", { href: getExplorerUrlForAddress({
                                                    address: quote.originAddress,
                                                    chainId: quote.originChain.id,
                                                }), target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:underline transition-all", children: [_jsxs("span", { children: [quote.originAddress.slice(0, 6), "...", quote.originAddress.slice(-4)] }), _jsx(ExternalLink, { className: "w-3 h-3" })] })] })] }))] }), quote && (_jsx("div", { className: "space-y-2", children: _jsx(QuoteDetails, { quote: quote, showContent: true }) }))] })] }));
};
export default QRCodeDeposit;
