import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TokenImage } from "@0xsequence/design-system";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryParams } from "../../queryParams.js";
// Simulated fee amounts and prices
const FEE_AMOUNTS = {
    ETH: "0.00001",
    USDC: "0.1",
};
const TOKEN_PRICES = {
    ETH: 3500, // Simulated ETH price in USD
    USDC: 1, // USDC is pegged to USD
};
export const FeeOptions = ({ options, selectedOption, onSelect, theme = "light", }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { hasParam } = useQueryParams();
    // Show fee display if feeOptions=true is in URL params
    const shouldShowFeeDisplay = hasParam("feeOptions", "true");
    // Calculate USD value of fee
    const feeUsdValue = useMemo(() => {
        if (!selectedOption)
            return "0.00";
        const feeAmount = parseFloat(FEE_AMOUNTS[selectedOption.symbol] || "0");
        const tokenPrice = TOKEN_PRICES[selectedOption.symbol] || 0;
        const usdValue = feeAmount * tokenPrice;
        return usdValue.toFixed(2);
    }, [selectedOption]);
    // Set first option as default if none selected
    useEffect(() => {
        if (!selectedOption && options.length > 0) {
            onSelect(options[0]);
        }
    }, [selectedOption, options, onSelect]);
    // Handle clicking outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    if (!shouldShowFeeDisplay) {
        return null;
    }
    return (_jsxs("div", { className: "space-y-1", ref: dropdownRef, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: `block text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`, children: "Pay fee with" }), selectedOption && (_jsxs("div", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: ["Fee ", FEE_AMOUNTS[selectedOption.symbol], " ", selectedOption.symbol, _jsxs("span", { className: `ml-1 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: ["\u2248 $", feeUsdValue] })] }))] }), _jsxs("div", { className: "relative flex justify-start", children: [_jsxs("button", { type: "button", onClick: () => setIsDropdownOpen(!isDropdownOpen), className: `w-32 flex items-center px-3 py-2 border rounded-[16px] hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"}`, children: [selectedOption ? (_jsxs(_Fragment, { children: [_jsx(TokenImage, { symbol: selectedOption.symbol, src: selectedOption.imageUrl, size: "xs" }), _jsx("span", { className: "ml-1.5 flex-1 text-left", children: selectedOption.symbol })] })) : (_jsx("span", { className: "flex-1 text-left text-gray-400", children: "Select Fee Token" })), _jsx(ChevronDown, { className: `h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}` })] }), isDropdownOpen && (_jsx("div", { className: `absolute z-10 mt-1 border rounded-[16px] shadow-lg w-32 ${theme === "dark"
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"}`, children: options.map((option) => (_jsxs("button", { type: "button", onClick: () => {
                                onSelect(option);
                                setIsDropdownOpen(false);
                            }, className: `w-full flex items-center px-3 py-2 cursor-pointer text-sm ${theme === "dark"
                                ? selectedOption?.symbol === option.symbol
                                    ? "bg-gray-700 text-white"
                                    : "text-white hover:bg-gray-700"
                                : selectedOption?.symbol === option.symbol
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-900 hover:bg-gray-50"}`, children: [_jsx("div", { className: `w-4 h-4 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`, children: _jsx(TokenImage, { symbol: option.symbol, src: option.imageUrl, size: "xs" }) }), _jsx("span", { className: "ml-1.5", children: option.symbol }), selectedOption?.symbol === option.symbol && (_jsx("span", { className: `ml-auto ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "\u2022" }))] }, option.symbol))) }))] })] }));
};
export default FeeOptions;
