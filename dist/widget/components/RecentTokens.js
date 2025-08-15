import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TokenImage } from "./TokenImage.js";
export const RecentTokens = ({ recentTokens, onTokenSelect, selectedToken, }) => {
    if (recentTokens.length === 0) {
        return null;
    }
    const isTokenSelected = (token) => {
        if (!selectedToken)
            return false;
        return (token.contractAddress === selectedToken.contractAddress &&
            token.chainId === selectedToken.chainId);
    };
    return (_jsxs("div", { className: "mb-0", children: [_jsx("h3", { className: "text-xs font-medium text-gray-500 dark:text-gray-500", children: "Recently Used" }), _jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 trails-scrollbar", children: recentTokens.map((token) => {
                    const isSelected = isTokenSelected(token);
                    return (_jsx("button", { type: "button", onClick: () => onTokenSelect(token), title: `${token.symbol} - ${token.name}`, className: `flex-shrink-0 p-2 trails-border-radius-button transition-colors cursor-pointer ${isSelected
                            ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500"
                            : "trails-bg-secondary border-2 border-transparent hover:trails-hover-bg"}`, children: _jsx("div", { className: "rounded-full flex items-center justify-center bg-white dark:bg-gray-600", children: _jsx(TokenImage, { symbol: token.symbol, imageUrl: token.imageUrl, chainId: token.chainId, size: 32 }) }) }, `${token.chainId}-${token.contractAddress}`));
                }) })] }));
};
export default RecentTokens;
