import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChevronLeft, Search, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTokenList } from "../hooks/useTokenList.js";
import { TokenImage } from "./TokenImage.js";
import { ChainImage } from "./ChainImage.js";
import { RecentTokens } from "./RecentTokens.js";
import { getChainInfo } from "../../chains.js";
export const TokenList = ({ onContinue, onBack, indexerGatewayClient, targetAmountUsd, targetAmountUsdFormatted, onError, mode, recentTokens = [], onRecentTokenSelect, fundMethod, renderInline = false, onNavigateToFundMethods, }) => {
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [filterByChainId, setFilterByChainId] = useState(null);
    const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
    useEffect(() => {
        // Auto-focus the search input when component mounts
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsChainDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const { searchQuery, setSearchQuery, handleTokenSelect, filteredTokens, isLoadingTokens, isTokenSelected, selectedToken, showContinueButton, filteredTokensFormatted: baseFilteredTokensFormatted, totalBalanceUsd, totalBalanceUsdFormatted, showInsufficientBalance, balanceError, } = useTokenList({
        onContinue,
        targetAmountUsd,
        indexerGatewayClient,
        onError,
        fundMethod,
    });
    // Apply chain filter to tokens
    const filteredTokensFormatted = useMemo(() => {
        if (filterByChainId === null) {
            return baseFilteredTokensFormatted;
        }
        return baseFilteredTokensFormatted.filter((token) => token.chainId === filterByChainId);
    }, [baseFilteredTokensFormatted, filterByChainId]);
    // Get unique chains from all tokens (not filtered by chain)
    const uniqueChains = useMemo(() => {
        const chainIds = new Set(baseFilteredTokensFormatted.map((token) => token.chainId));
        return Array.from(chainIds)
            .map((chainId) => {
            const chainInfo = getChainInfo(chainId);
            return {
                chainId,
                name: chainInfo?.name || `Chain ${chainId}`,
                imageUrl: "", // We'll use TokenImage component for chain icons
            };
        })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [baseFilteredTokensFormatted]);
    // Filter recent tokens to only show ones that exist in the current token list and match search
    const filteredRecentTokens = recentTokens.filter((recentToken) => {
        // First check if this recent token exists in the current token list
        const existsInTokenList = filteredTokensFormatted.some((token) => token.contractAddress.toLowerCase() ===
            recentToken.contractAddress.toLowerCase() &&
            token.chainId === recentToken.chainId);
        if (!existsInTokenList)
            return false;
        // Then apply search filtering
        if (!searchQuery.trim())
            return true;
        const query = searchQuery.toLowerCase();
        return (recentToken.symbol.toLowerCase().includes(query) ||
            recentToken.name.toLowerCase().includes(query) ||
            recentToken.contractAddress.toLowerCase().includes(query));
    });
    // Handle recent token selection by finding the actual token from the list
    const handleRecentTokenSelect = (recentToken) => {
        // Find the actual token from the filtered tokens list
        const actualToken = filteredTokensFormatted.find((token) => token.contractAddress.toLowerCase() ===
            recentToken.contractAddress.toLowerCase() &&
            token.chainId === recentToken.chainId);
        if (actualToken) {
            // Use the actual token with balance info
            handleTokenSelect(actualToken);
        }
        else if (onRecentTokenSelect) {
            // Fallback to the original handler if token not found in current list
            onRecentTokenSelect(recentToken);
        }
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between relative", children: [_jsxs("div", { className: "flex items-center", children: [mode !== "fund" && (_jsx("button", { type: "button", onClick: onBack, className: "p-2 -ml-2 rounded-full transition-colors cursor-pointer hover:trails-hover-bg text-gray-400", children: _jsx(ChevronLeft, { className: "h-6 w-6" }) })), _jsx("h2", { className: `text-lg font-semibold ${targetAmountUsd || mode === "fund" ? "text-left" : "text-center"} ${"text-gray-900 dark:text-white"}`, children: mode === "fund"
                                    ? "Fund with any token in your wallet"
                                    : targetAmountUsd
                                        ? mode === "earn"
                                            ? `Deposit ${targetAmountUsdFormatted} with:`
                                            : `Pay ${targetAmountUsdFormatted} with:`
                                        : "Select Token" })] }), totalBalanceUsd > 0 &&
                        mode !== "fund" &&
                        fundMethod !== "qr-code" &&
                        fundMethod !== "exchange" && (_jsxs("div", { className: `text-right max-w-[125px] ${renderInline ? "" : "mr-8"}`, children: [_jsx("p", { className: `text-xs ${"text-gray-500 dark:text-gray-400"}`, children: "Total balance:" }), _jsx("p", { className: `text-xs font-medium ${"text-gray-900 dark:text-white"}`, children: totalBalanceUsdFormatted })] }))] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: `h-5 w-5 ${"text-gray-500 dark:text-gray-500"}` }) }), _jsx("input", { ref: searchInputRef, type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search tokens", className: "block w-full pl-10 pr-12 py-2 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-input" }), _jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center", ref: dropdownRef, children: [_jsxs("button", { type: "button", onMouseDown: (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsChainDropdownOpen(!isChainDropdownOpen);
                                }, className: "h-full px-3 flex items-center gap-2 cursor-pointer", children: [filterByChainId && (_jsx(ChainImage, { chainId: filterByChainId, size: 20 })), _jsx(ChevronDown, { className: `h-4 w-4 text-gray-400 transition-transform ${isChainDropdownOpen ? "rotate-180" : ""}` })] }), isChainDropdownOpen && (_jsxs("div", { className: "absolute right-0 top-full mt-1 min-w-10 p-2 trails-bg-secondary trails-border trails-border-radius-list shadow-lg z-50 max-h-[300px] overflow-y-auto trails-scrollbar", children: [_jsx("div", { onMouseDown: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setFilterByChainId(null);
                                            setIsChainDropdownOpen(false);
                                        }, className: `flex items-center justify-center py-2 cursor-pointer hover:trails-hover-bg transition-colors ${filterByChainId === null ? "trails-bg-selected" : ""}`, children: _jsx("div", { className: "w-8 h-8 flex items-center justify-center", children: _jsx("div", { className: "w-6 h-6 rounded-full bg-gray-400" }) }) }), uniqueChains.map((chain) => (_jsx("div", { onMouseDown: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setFilterByChainId(chain.chainId);
                                            setIsChainDropdownOpen(false);
                                        }, className: `flex items-center justify-center py-2 cursor-pointer hover:trails-hover-bg transition-colors ${filterByChainId === chain.chainId
                                            ? "trails-bg-selected"
                                            : ""}`, children: _jsx(ChainImage, { chainId: chain.chainId, size: 32 }) }, chain.chainId)))] }))] })] }), _jsx(AnimatePresence, { children: !isLoadingTokens && filteredRecentTokens.length > 0 && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.05, ease: "easeOut" }, children: _jsx(RecentTokens, { recentTokens: filteredRecentTokens, onTokenSelect: handleRecentTokenSelect }) })) }), isLoadingTokens && (_jsxs("div", { className: "text-center py-4", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 mx-auto border-black dark:border-white" }), _jsx("p", { className: "mt-2 text-gray-500 dark:text-gray-400", children: "Loading your token balances..." })] })), !isLoadingTokens && !balanceError && filteredTokens.length === 0 && (_jsx("div", { className: "text-center py-4 rounded-lg trails-bg-secondary", children: _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: searchQuery.trim()
                        ? "No tokens found matching your search."
                        : fundMethod === "qr-code" || fundMethod === "exchange"
                            ? ""
                            : "No tokens found with balance greater than 0." }) })), filteredTokensFormatted.length > 0 && (_jsx("div", { className: "max-h-[35vh] overflow-y-auto trails-border-radius-list trails-scrollbar trails-list", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredTokensFormatted.map((token) => {
                        const { symbol, imageUrl, chainId, contractAddress, balanceUsdFormatted, tokenName, priceUsd, balanceFormatted, isSufficientBalance, } = token;
                        return (_jsxs(motion.button, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: {
                                duration: 0.05,
                                ease: "easeOut",
                                layout: { duration: 0.08, ease: "easeOut" },
                            }, type: "button", onClick: () => handleTokenSelect(token), title: !isSufficientBalance &&
                                fundMethod !== "qr-code" &&
                                fundMethod !== "exchange"
                                ? "Insufficient balance for this token"
                                : undefined, className: `w-full py-2.5 px-3 flex items-center space-x-3 transition-colors trails-list-item border-b trails-border-list ${isTokenSelected(token) ? "bg-gray-50 dark:bg-gray-800" : ""} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`, children: [_jsx("div", { className: "relative flex-shrink-0", children: _jsx("div", { className: `rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700`, children: contractAddress ? (_jsx(TokenImage, { symbol: symbol[0], imageUrl: imageUrl, chainId: chainId, size: 32 })) : (_jsx("span", { className: "text-base font-medium text-gray-600 dark:text-gray-300", children: symbol })) }) }), _jsxs("div", { className: "flex-1 min-w-0 text-left", children: [_jsx("h3", { className: `text-sm font-medium truncate ${"text-gray-900 dark:text-white"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-500 dark:text-gray-500" : ""}`, children: tokenName }), _jsx("p", { className: `text-xs ${"text-gray-500 dark:text-gray-400"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-600 dark:text-gray-600" : ""}`, children: symbol })] }), fundMethod !== "qr-code" && fundMethod !== "exchange" && (_jsx("div", { className: "text-right flex-shrink-0", children: priceUsd > 0 ? (_jsxs(_Fragment, { children: [_jsx("p", { className: `text-sm font-medium ${"text-gray-900 dark:text-white"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-500 dark:text-gray-500" : ""}`, children: balanceUsdFormatted }), _jsx("p", { className: `text-xs ${"text-gray-500 dark:text-gray-400"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-600 dark:text-gray-600" : ""}`, children: balanceFormatted })] })) : (_jsx("p", { className: `text-sm font-medium ${"text-gray-900 dark:text-white"} ${!isSufficientBalance && fundMethod !== "qr-code" && fundMethod !== "exchange" ? "text-gray-500 dark:text-gray-500" : ""}`, children: balanceFormatted })) }))] }, `${chainId}-${contractAddress}`));
                    }) }) })), showInsufficientBalance &&
                fundMethod !== "qr-code" &&
                fundMethod !== "exchange" && (_jsxs("div", { className: `text-left py-3 px-4 rounded-lg ${"bg-amber-500/10 border border-amber-500/30"}`, children: [_jsx("p", { className: `text-xs font-medium ${"text-amber-400"}`, children: "Insufficient balance" }), _jsx("p", { className: `text-xs mt-1 ${"text-amber-300"}`, children: "You do not have enough funds to reach the target amount" })] })), showContinueButton && (_jsx("div", { className: "space-y-4", children: _jsx("button", { type: "button", onClick: () => selectedToken && onContinue(selectedToken), disabled: !selectedToken, className: `w-full font-semibold py-3 px-4 trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer`, children: "Continue" }) })), onNavigateToFundMethods && !isLoadingTokens && (_jsx("div", { className: "text-center pt-2 pb-1", children: _jsx("button", { type: "button", onClick: onNavigateToFundMethods, className: "text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline cursor-pointer transition-colors", children: "Pay with another method" }) }))] }));
};
export default TokenList;
