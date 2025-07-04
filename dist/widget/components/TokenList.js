import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NetworkImage, TokenImage } from "@0xsequence/design-system";
import { ChevronLeft, Search } from "lucide-react";
import { Address } from "ox";
import { useMemo, useState } from "react";
import { formatUnits, isAddressEqual, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { getChainInfo } from "../../chains.js";
import { useSourceTokenList, useTokenBalances } from "../../tokenBalances.js";
// Helper to format balance
const formatBalance = (balance, decimals = 18) => {
    try {
        const formatted = formatUnits(BigInt(balance), decimals);
        const num = parseFloat(formatted);
        if (num === 0)
            return "0";
        if (num < 0.0001)
            return num.toExponential(2);
        if (num < 1)
            return num.toFixed(6);
        if (num < 1000)
            return num.toFixed(4);
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    catch (e) {
        console.error("Error formatting balance:", e);
        return balance;
    }
};
export const TokenList = ({ onContinue, onBack, indexerGatewayClient, theme = "light", }) => {
    const [selectedToken, setSelectedToken] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { address } = useAccount();
    const { sortedTokens: allSortedTokens, isLoadingSortedTokens, balanceError, } = useTokenBalances(address, indexerGatewayClient);
    const sourceTokenList = useSourceTokenList();
    const sortedTokens = useMemo(() => {
        return allSortedTokens.filter((token) => {
            return (!token.contractAddress ||
                sourceTokenList.includes(token.contractInfo?.symbol || ""));
        });
    }, [allSortedTokens, sourceTokenList]);
    const handleTokenSelect = (token) => {
        const isNative = !("contractAddress" in token);
        const chainInfo = getChainInfo(token.chainId);
        const contractAddress = isNative ? zeroAddress : token.contractAddress;
        const imageUrl = `https://assets.sequence.info/images/tokens/small/${token.chainId}/${contractAddress}.webp`;
        let formattedToken;
        if (isNative) {
            formattedToken = {
                id: token.chainId,
                name: chainInfo?.nativeCurrency.name || "Native Token",
                symbol: chainInfo?.nativeCurrency.symbol || "ETH",
                balance: token.balance,
                imageUrl,
                chainId: token.chainId,
                contractAddress: zeroAddress,
                balanceUsdFormatted: token.balanceUsdFormatted ?? "",
                tokenPriceUsd: token.price?.value ?? 0,
                contractInfo: {
                    decimals: 18,
                    symbol: chainInfo?.nativeCurrency.symbol || "ETH",
                    name: chainInfo?.nativeCurrency.name || "Native Token",
                },
            };
        }
        else {
            formattedToken = {
                id: token.chainId,
                name: token.contractInfo?.name || "Unknown Token",
                symbol: token.contractInfo?.symbol || "???",
                balance: token.balance,
                imageUrl,
                chainId: token.chainId,
                contractAddress: token.contractAddress,
                contractInfo: {
                    ...token.contractInfo,
                    name: token.contractInfo?.name ?? "Unknown Token",
                    symbol: token.contractInfo?.symbol ?? "???",
                    decimals: token.contractInfo?.decimals ?? 18,
                },
                balanceUsdFormatted: token.balanceUsdFormatted ?? "",
                tokenPriceUsd: token.price?.value ?? 0,
            };
        }
        setSelectedToken(formattedToken);
        onContinue(formattedToken);
    };
    const isTokenSelected = (token) => {
        if (!selectedToken)
            return false;
        const isNative = !("contractAddress" in token);
        return (selectedToken.chainId === token.chainId &&
            (isNative
                ? selectedToken.contractAddress === zeroAddress
                : isAddressEqual(Address.from(selectedToken.contractAddress), Address.from(token.contractAddress))));
    };
    const filteredTokens = useMemo(() => {
        if (!searchQuery.trim()) {
            return sortedTokens;
        }
        const query = searchQuery.toLowerCase().trim();
        const queryParts = query.split(/\s+/).filter((part) => part.length > 0);
        return sortedTokens.filter((token) => {
            const isNative = !("contractAddress" in token);
            const chainInfo = getChainInfo(token.chainId);
            const chainName = chainInfo?.name || "";
            const chainNameLower = chainName.toLowerCase();
            if (isNative) {
                const nativeSymbol = chainInfo?.nativeCurrency.symbol || "ETH";
                const nativeName = chainInfo?.nativeCurrency.name || "Native Token";
                const nativeSymbolLower = nativeSymbol.toLowerCase();
                const nativeNameLower = nativeName.toLowerCase();
                // If multiple query parts, check if they match chain + token combination
                if (queryParts.length > 1) {
                    const matchesChain = queryParts.some((part) => chainNameLower.includes(part));
                    const matchesToken = queryParts.some((part) => nativeSymbolLower.includes(part) ||
                        nativeNameLower.includes(part));
                    return matchesChain && matchesToken;
                }
                // Single query part - match against any field
                return queryParts.some((part) => nativeSymbolLower.includes(part) ||
                    nativeNameLower.includes(part) ||
                    chainNameLower.includes(part));
            }
            const tokenSymbol = token.contractInfo?.symbol || "???";
            const tokenName = token.contractInfo?.name || "Unknown Token";
            const tokenSymbolLower = tokenSymbol.toLowerCase();
            const tokenNameLower = tokenName.toLowerCase();
            // If multiple query parts, check if they match chain + token combination
            if (queryParts.length > 1) {
                const matchesChain = queryParts.some((part) => chainNameLower.includes(part));
                const matchesToken = queryParts.some((part) => tokenSymbolLower.includes(part) || tokenNameLower.includes(part));
                return matchesChain && matchesToken;
            }
            // Single query part - match against any field
            return queryParts.some((part) => tokenSymbolLower.includes(part) ||
                tokenNameLower.includes(part) ||
                chainNameLower.includes(part));
        });
    }, [sortedTokens, searchQuery]);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center relative", children: [_jsx("button", { type: "button", onClick: onBack, className: `absolute -left-2 p-2 rounded-full transition-colors cursor-pointer ${theme === "dark"
                            ? "hover:bg-gray-800 text-gray-400"
                            : "hover:bg-gray-100 text-gray-600"}`, children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }), _jsx("h2", { className: `text-lg font-semibold w-full text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "Select Token" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: `h-5 w-5 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}` }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search tokens and chains", className: `block w-full pl-10 pr-3 py-2 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}` })] }), isLoadingSortedTokens && (_jsxs("div", { className: "text-center py-4", children: [_jsx("div", { className: `animate-spin rounded-full h-8 w-8 border-b-2 mx-auto ${theme === "dark" ? "border-white" : "border-black"}` }), _jsx("p", { className: `mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "Loading your token balances..." })] })), balanceError && (_jsx("div", { className: `border rounded-lg p-4 mb-4 ${theme === "dark"
                    ? "bg-red-900/20 border-red-800"
                    : "bg-red-50 border-red-200"}`, children: _jsx("div", { className: "flex items-start", children: _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: `text-sm font-medium ${theme === "dark" ? "text-red-200" : "text-red-800"}`, children: "Error loading balances" }), _jsx("p", { className: `text-sm mt-1 ${theme === "dark" ? "text-red-200" : "text-red-700"}`, children: balanceError instanceof Error
                                    ? balanceError.message
                                    : "Failed to fetch token balances. Please try again." }), _jsx("button", { type: "button", onClick: () => window.location.reload(), className: `mt-2 text-sm font-medium underline ${theme === "dark"
                                    ? "text-red-200 hover:text-red-100"
                                    : "text-red-700 hover:text-red-900"}`, children: "Refresh page" })] }) }) })), !isLoadingSortedTokens &&
                !balanceError &&
                filteredTokens.length === 0 && (_jsx("div", { className: `text-center py-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`, children: _jsx("p", { className: theme === "dark" ? "text-gray-400" : "text-gray-500", children: searchQuery.trim()
                        ? "No tokens found matching your search."
                        : "No tokens found with balance greater than 0." }) })), _jsx("div", { className: `divide-y ${theme === "dark" ? "divide-gray-700/50" : "divide-gray-200"} max-h-[35vh] overflow-y-auto rounded-[16px] ${theme === "dark" ? "bg-gray-800/50" : "bg-white"}`, children: filteredTokens.map((token) => {
                    const isNative = !("contractAddress" in token);
                    const chainInfo = getChainInfo(token.chainId);
                    const nativeSymbol = chainInfo?.nativeCurrency.symbol || "ETH";
                    const tokenSymbol = isNative
                        ? nativeSymbol
                        : token.contractInfo?.symbol || "???";
                    const contractAddress = isNative ? zeroAddress : token.contractAddress;
                    let imageContractAddress = contractAddress;
                    if (tokenSymbol === "WETH") {
                        imageContractAddress = zeroAddress;
                    }
                    const imageUrl = `https://assets.sequence.info/images/tokens/small/${token.chainId}/${imageContractAddress}.webp`;
                    const tokenName = isNative
                        ? `${nativeSymbol} (${chainInfo?.name || "Unknown Chain"})`
                        : token.contractInfo?.name || "Unknown Token";
                    const formattedBalance = formatBalance(token.balance, isNative ? 18 : token.contractInfo?.decimals);
                    const priceUsd = Number(token.price?.value) ?? 0;
                    const balanceUsdFormatted = token.balanceUsdFormatted ?? "";
                    return (_jsxs("button", { type: "button", onClick: () => handleTokenSelect(token), className: `w-full py-2.5 px-3 flex items-center space-x-3 cursor-pointer transition-colors ${theme === "dark"
                            ? isTokenSelected(token)
                                ? "bg-gray-800"
                                : "hover:bg-gray-800/80"
                            : isTokenSelected(token)
                                ? "bg-gray-100"
                                : "hover:bg-gray-50"}`, children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("div", { className: `w-7 h-7 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`, children: contractAddress ? (_jsx(TokenImage, { symbol: tokenSymbol, src: imageUrl, disableAnimation: true })) : (_jsx("span", { className: `text-base font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`, children: tokenSymbol[0] })) }), _jsx("div", { className: "absolute -bottom-0.5 -right-0.5", children: _jsx(NetworkImage, { chainId: token.chainId, size: "sm", className: "w-3.5 h-3.5", disableAnimation: true }) })] }), _jsxs("div", { className: "flex-1 min-w-0 text-left", children: [_jsx("h3", { className: `text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: tokenName }), _jsx("p", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: tokenSymbol })] }), _jsx("div", { className: "text-right flex-shrink-0", children: priceUsd > 0 ? (_jsxs(_Fragment, { children: [_jsx("p", { className: `text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: balanceUsdFormatted }), _jsx("p", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: formattedBalance })] })) : (_jsx("p", { className: `text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: formattedBalance })) })] }, isNative
                        ? `${token.chainId}-native`
                        : `${token.chainId}-${token.contractAddress}`));
                }) }), _jsx("div", { className: "space-y-4", children: _jsx("button", { type: "button", onClick: () => selectedToken && onContinue(selectedToken), disabled: !selectedToken, className: `w-full font-semibold py-3 px-4 rounded-[24px] transition-colors ${theme === "dark"
                        ? "bg-blue-600 disabled:bg-gray-700 text-white disabled:text-gray-400 enabled:hover:bg-blue-700"
                        : "bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 enabled:hover:bg-blue-600"} disabled:cursor-not-allowed cursor-pointer`, children: "Continue" }) })] }));
};
export default TokenList;
