import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, TrendingUp, Search, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePools } from "../../pools.js";
import { ChainImage } from "./ChainImage.js";
import { TokenImage } from "./TokenImage.js";
import { getChainInfo, getChainColor } from "../../chains.js";
import { formatTvl } from "../../prices.js";
import aaveLogo from "../assets/aave.svg";
export const EarnPools = ({ onBack, onPoolSelect, }) => {
    const { data: pools, loading, error } = usePools();
    const [selectedProtocol, setSelectedProtocol] = useState("all");
    const [searchFilter, setSearchFilter] = useState("");
    const [filterByChainId, setFilterByChainId] = useState(null);
    const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);
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
    const protocols = useMemo(() => {
        if (!pools || !Array.isArray(pools)) {
            return ["all"];
        }
        try {
            return [
                "all",
                ...new Set(pools.map((pool) => pool.protocol).filter(Boolean)),
            ];
        }
        catch (error) {
            console.error("[trails-sdk] Error computing protocols:", error);
            return ["all"];
        }
    }, [pools]);
    // Get unique chains from all pools
    const uniqueChains = useMemo(() => {
        if (!pools || !Array.isArray(pools)) {
            return [];
        }
        try {
            const chainIds = new Set(pools.map((pool) => pool.chainId).filter(Boolean));
            return Array.from(chainIds)
                .map((chainId) => ({
                chainId,
                name: getChainInfo(chainId)?.name ?? "",
            }))
                .sort((a, b) => a.name.localeCompare(b.name));
        }
        catch (error) {
            console.error("[trails-sdk] Error computing unique chains:", error);
            return [];
        }
    }, [pools]);
    const filteredPools = useMemo(() => {
        if (!pools || !Array.isArray(pools)) {
            return [];
        }
        return pools.filter((pool) => {
            try {
                // Protocol filter
                const protocolMatch = selectedProtocol === "all" || pool.protocol === selectedProtocol;
                // Chain filter
                const chainMatch = filterByChainId === null || pool.chainId === filterByChainId;
                // Search filter - split by spaces to allow "usdc base" type searches
                const searchTerms = searchFilter
                    .toLowerCase()
                    .split(/\s+/)
                    .filter((term) => term.length > 0);
                const searchMatch = !searchFilter ||
                    searchTerms.every((term) => pool.token?.symbol?.toLowerCase().includes(term) ||
                        pool.token?.name?.toLowerCase().includes(term) ||
                        pool.protocol?.toLowerCase().includes(term) ||
                        getChainInfo(pool.chainId)?.name?.toLowerCase().includes(term));
                return protocolMatch && chainMatch && searchMatch;
            }
            catch (error) {
                console.error("[trails-sdk] Error filtering pool:", pool, error);
                return false;
            }
        });
    }, [pools, selectedProtocol, filterByChainId, searchFilter]);
    if (loading) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[400px] space-y-4", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Loading pools..." })] }));
    }
    if (error) {
        return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-[400px] space-y-4", children: _jsxs("div", { className: "text-red-500 text-center", children: [_jsx("p", { className: "text-sm", children: "Failed to load pools" }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Please try again later" })] }) }));
    }
    return (_jsxs("div", { className: "flex flex-col h-full overflow-hidden px-2", children: [_jsxs("div", { className: "flex items-center relative mb-2", children: [_jsx("button", { type: "button", onClick: onBack, className: "absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:trails-hover-bg text-gray-400", children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }), _jsx("h2", { className: "text-lg font-semibold w-full text-center text-gray-900 dark:text-white", children: "Earn" })] }), _jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: `h-5 w-5 ${"text-gray-500 dark:text-gray-500"}` }) }), _jsx("input", { ref: searchInputRef, type: "text", value: searchFilter, onChange: (e) => {
                            try {
                                setSearchFilter(e.target.value || "");
                            }
                            catch (error) {
                                console.error("[trails-sdk] Error updating search filter:", error);
                                setSearchFilter("");
                            }
                        }, placeholder: "Filter pools", className: "block w-full pl-10 pr-12 py-2 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-input" }), _jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center", ref: dropdownRef, children: [_jsxs("button", { type: "button", onMouseDown: (e) => {
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
                                            : ""}`, children: _jsx(ChainImage, { chainId: chain.chainId, size: 32 }) }, chain.chainId)))] }))] })] }), _jsx("div", { className: "mb-4", children: _jsx("div", { className: "flex flex-wrap gap-2", children: protocols.map((protocol) => (_jsxs("button", { onClick: () => setSelectedProtocol(protocol), className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center ${selectedProtocol === protocol
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`, children: [protocol === "Aave" && (_jsx("img", { src: aaveLogo, alt: "Aave", className: "w-3 h-3 mr-1" })), protocol === "all" ? "All Protocols" : protocol] }, protocol))) }) }), _jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden space-y-3 max-h-[300px] px-2", children: filteredPools.length === 0 ? (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: "No pools available for the selected protocol" }) })) : (filteredPools.map((pool) => (_jsxs(motion.div, { whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, onClick: () => onPoolSelect(pool), className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { style: { width: "32px", height: "32px" }, children: _jsx(TokenImage, { symbol: pool.token.symbol, imageUrl: pool.token.logoUrl, chainId: pool.chainId, size: 32 }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-gray-900 dark:text-white", children: pool.name }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-xs text-gray-500 dark:text-gray-400 flex items-center", children: [pool.protocol === "Aave" && (_jsx("img", { src: aaveLogo, alt: "Aave", className: "w-3 h-3 mr-1" })), pool.protocol] }), _jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${getChainColor(pool.chainId)}`, children: getChainInfo(pool.chainId)?.name ||
                                                                `Chain ${pool.chainId}` })] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-1 text-green-600 dark:text-green-400", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), _jsxs("span", { className: "font-semibold text-sm", children: [pool.apy.toFixed(1), "%"] })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "APY" })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("div", { className: "flex items-center space-x-1 text-gray-600 dark:text-gray-400", children: _jsxs("span", { children: ["TVL: ", formatTvl(pool.tvl)] }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${pool.isActive ? "bg-green-500" : "bg-red-500"}` }), _jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: pool.isActive ? "Active" : "Inactive" })] })] })] }, pool.id)))) }), _jsx("div", { className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700", children: _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 text-center", children: "APY rates are variable and subject to change." }) })] }));
};
export default EarnPools;
