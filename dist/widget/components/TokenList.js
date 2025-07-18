import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NetworkImage, TokenImage } from "@0xsequence/design-system";
import { ChevronLeft, Search } from "lucide-react";
import { useTokenList } from "../hooks/useTokenList.js";
export const TokenList = ({ onContinue, onBack, indexerGatewayClient, theme = "light", targetAmountUsd, targetAmountUsdFormatted, onError, }) => {
    const { searchQuery, setSearchQuery, handleTokenSelect, filteredTokens, isLoadingSortedTokens, isTokenSelected, selectedToken, showContinueButton, filteredTokensFormatted, totalBalanceUsd, totalBalanceUsdFormatted, showInsufficientBalance, balanceError, } = useTokenList({
        onContinue,
        targetAmountUsd,
        indexerGatewayClient,
        onError,
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between relative", children: [_jsxs("div", { className: "flex items-center", children: [!targetAmountUsd && (_jsx("button", { type: "button", onClick: onBack, className: `p-2 rounded-full transition-colors cursor-pointer ${theme === "dark"
                                    ? "hover:bg-gray-800 text-gray-400"
                                    : "hover:bg-gray-100 text-gray-600"}`, children: _jsx(ChevronLeft, { className: "h-6 w-6" }) })), _jsx("h2", { className: `text-lg font-semibold ${targetAmountUsd ? "text-left" : "text-center"} ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: targetAmountUsd
                                    ? `Pay ${targetAmountUsdFormatted} with:`
                                    : "Select Token" })] }), totalBalanceUsd > 0 && (_jsxs("p", { className: `text-xs mr-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: ["Total balance: ", totalBalanceUsdFormatted] }))] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: `h-5 w-5 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}` }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search tokens", className: `block w-full pl-10 pr-3 py-2 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}` })] }), isLoadingSortedTokens && (_jsxs("div", { className: "text-center py-4", children: [_jsx("div", { className: `animate-spin rounded-full h-8 w-8 border-b-2 mx-auto ${theme === "dark" ? "border-white" : "border-black"}` }), _jsx("p", { className: `mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "Loading your token balances..." })] })), !isLoadingSortedTokens &&
                !balanceError &&
                filteredTokens.length === 0 && (_jsx("div", { className: `text-center py-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`, children: _jsx("p", { className: theme === "dark" ? "text-gray-400" : "text-gray-500", children: searchQuery.trim()
                        ? "No tokens found matching your search."
                        : "No tokens found with balance greater than 0." }) })), _jsx("div", { className: `divide-y ${theme === "dark" ? "divide-gray-700/50" : "divide-gray-200"} max-h-[35vh] overflow-y-auto rounded-[16px] ${theme === "dark" ? "bg-gray-800/50" : "bg-white"}`, children: filteredTokensFormatted.map((token) => {
                    const { symbol, imageUrl, chainId, contractAddress, balanceUsdFormatted, tokenName, priceUsd, balanceFormatted, isSufficientBalance, } = token;
                    return (_jsxs("button", { type: "button", onClick: () => handleTokenSelect(token), title: !isSufficientBalance
                            ? "Insufficient balance for this token"
                            : undefined, className: `w-full py-2.5 px-3 flex items-center space-x-3 transition-colors ${theme === "dark"
                            ? isTokenSelected(token)
                                ? "bg-gray-800"
                                : "hover:bg-gray-800/80"
                            : isTokenSelected(token)
                                ? "bg-gray-100"
                                : "hover:bg-gray-50"} ${!isSufficientBalance ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`, children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("div", { className: `w-7 h-7 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`, children: contractAddress ? (_jsx(TokenImage, { symbol: symbol[0], src: imageUrl, disableAnimation: true })) : (_jsx("span", { className: `text-base font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`, children: symbol })) }), _jsx("div", { className: "absolute -bottom-0.5 -right-0.5", children: _jsx(NetworkImage, { chainId: chainId, size: "sm", className: "w-3.5 h-3.5", disableAnimation: true }) })] }), _jsxs("div", { className: "flex-1 min-w-0 text-left", children: [_jsx("h3", { className: `text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"} ${!isSufficientBalance ? (theme === "dark" ? "text-gray-500" : "text-gray-400") : ""}`, children: tokenName }), _jsx("p", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} ${!isSufficientBalance ? (theme === "dark" ? "text-gray-600" : "text-gray-400") : ""}`, children: symbol })] }), _jsx("div", { className: "text-right flex-shrink-0", children: priceUsd > 0 ? (_jsxs(_Fragment, { children: [_jsx("p", { className: `text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"} ${!isSufficientBalance ? (theme === "dark" ? "text-gray-500" : "text-gray-400") : ""}`, children: balanceUsdFormatted }), _jsx("p", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"} ${!isSufficientBalance ? (theme === "dark" ? "text-gray-600" : "text-gray-400") : ""}`, children: balanceFormatted })] })) : (_jsx("p", { className: `text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"} ${!isSufficientBalance ? (theme === "dark" ? "text-gray-500" : "text-gray-400") : ""}`, children: balanceFormatted })) })] }, `${chainId}-${contractAddress}`));
                }) }), showInsufficientBalance && (_jsxs("div", { className: `text-left py-3 px-4 rounded-lg ${theme === "dark"
                    ? "bg-amber-500/10 border border-amber-500/30"
                    : "bg-amber-50 border border-amber-200"}`, children: [_jsx("p", { className: `text-xs font-medium ${theme === "dark" ? "text-amber-400" : "text-amber-700"}`, children: "Insufficient balance" }), _jsx("p", { className: `text-xs mt-1 ${theme === "dark" ? "text-amber-300" : "text-amber-600"}`, children: "You do not have enough funds to reach the target amount" })] })), showContinueButton && (_jsx("div", { className: "space-y-4", children: _jsx("button", { type: "button", onClick: () => selectedToken && onContinue(selectedToken), disabled: !selectedToken, className: `w-full font-semibold py-3 px-4 rounded-[24px] transition-colors ${theme === "dark"
                        ? "bg-blue-600 disabled:bg-gray-700 text-white disabled:text-gray-400 enabled:hover:bg-blue-700"
                        : "bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 enabled:hover:bg-blue-600"} disabled:cursor-not-allowed cursor-pointer`, children: "Continue" }) }))] }));
};
export default TokenList;
