import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { formatUnits } from "viem";
import { useSendForm } from "../hooks/useSendForm.js";
import { ChainImage } from "./ChainImage.js";
import { TokenImage } from "./TokenImage.js";
import { QuoteDetails } from "./QuoteDetails.js";
import { TruncatedAddress } from "./TruncatedAddress.js";
import { TradeType } from "../../prepareSend.js";
import { formatAmount, formatUsdAmountDisplay } from "../../tokenBalances.js";
export const FundSendForm = ({ selectedToken, onSend, onBack, onConfirm, onComplete, account, toAmount, toRecipient, toChainId, toToken, toCalldata, walletClient, onTransactionStateChange, onError, onWaitingForWalletConfirm, paymasterUrls, gasless, setWalletConfirmRetryHandler, quoteProvider, fundMethod, onNavigateToMeshConnect, }) => {
    // Local state for fund-specific functionality
    const [isInputTypeUsd, setIsInputTypeUsd] = useState(false);
    const [tokenAmountForBackend, setTokenAmountForBackend] = useState("");
    const [inputDisplayValue, setInputDisplayValue] = useState("");
    const inputRef = useRef(null);
    const chainDropdownRef = useRef(null);
    const tokenDropdownRef = useRef(null);
    // Auto-focus input field on component mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    const { amount: hookAmount, amountUsdDisplay, balanceFormatted, balanceUsdDisplay, chainInfo, isSubmitting, isLoadingQuote, selectedDestinationChain, selectedDestToken, setAmount: setHookAmount, handleSubmit, buttonText, toAmountFormatted, toAmountDisplay, sourceTokenPrices, destTokenPrices, isValidRecipient, recipient, isChainDropdownOpen, isTokenDropdownOpen, setIsChainDropdownOpen, setIsTokenDropdownOpen, supportedChains, supportedTokens, setSelectedDestinationChain, setSelectedDestToken, prepareSendQuote, } = useSendForm({
        account,
        // Don't pass toAmount for fund form - user enters input amount
        toRecipient: toRecipient || account.address,
        toChainId,
        toToken,
        toCalldata,
        walletClient,
        onTransactionStateChange,
        onError,
        onWaitingForWalletConfirm,
        paymasterUrls,
        gasless,
        onConfirm,
        onComplete,
        onSend,
        selectedToken,
        setWalletConfirmRetryHandler,
        tradeType: TradeType.EXACT_INPUT,
        quoteProvider,
        fundMethod,
        onNavigateToMeshConnect,
    });
    // Get source token price for USD conversions
    const sourceTokenPrice = sourceTokenPrices?.[0]?.price?.value ?? 0;
    // Get destination token price for receive USD value
    const destTokenPrice = destTokenPrices?.[0]?.price?.value ?? 0;
    // Sync display value with token amount only when mode changes (not during typing)
    const [lastInputMode, setLastInputMode] = useState(isInputTypeUsd);
    useEffect(() => {
        // Only sync when mode actually changes, not during normal typing
        if (lastInputMode !== isInputTypeUsd && tokenAmountForBackend) {
            const tokenAmount = parseFloat(tokenAmountForBackend) || 0;
            if (isInputTypeUsd && sourceTokenPrice > 0) {
                // Show USD with max 2 decimals
                const usdAmount = tokenAmount * sourceTokenPrice;
                setInputDisplayValue(Number(usdAmount.toFixed(2)).toString());
            }
            else {
                // Show token with max 8 decimals
                setInputDisplayValue(Number(tokenAmount.toFixed(8)).toString());
            }
            setLastInputMode(isInputTypeUsd);
        }
    }, [isInputTypeUsd, sourceTokenPrice, tokenAmountForBackend, lastInputMode]);
    // Handle click outside for dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chainDropdownRef.current &&
                !chainDropdownRef.current.contains(event.target)) {
                setIsChainDropdownOpen(false);
            }
            if (tokenDropdownRef.current &&
                !tokenDropdownRef.current.contains(event.target)) {
                setIsTokenDropdownOpen(false);
            }
        };
        if (isChainDropdownOpen || isTokenDropdownOpen) {
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }
    }, [
        setIsChainDropdownOpen,
        setIsTokenDropdownOpen,
        isChainDropdownOpen,
        isTokenDropdownOpen,
    ]);
    // Handle input amount changes with 8 decimal limit and 16 char total limit
    const handleAmountChange = useCallback((value) => {
        // Allow empty string
        if (value === "") {
            setInputDisplayValue("");
            setTokenAmountForBackend("");
            setHookAmount("");
            return;
        }
        // Limit total length to 16 characters
        if (value.length > 16) {
            return;
        }
        // Validate decimal places (max 8 decimals) and allow single decimal point
        const decimalMatch = value.match(/^\d*\.?\d{0,8}$/);
        if (!decimalMatch) {
            return; // Don't update if invalid format
        }
        // Store the display value
        setInputDisplayValue(value);
        // Update the token amount for backend and useSendForm
        if (isInputTypeUsd && sourceTokenPrice > 0) {
            const usdAmount = parseFloat(value) || 0;
            const tokenAmount = usdAmount / sourceTokenPrice;
            setTokenAmountForBackend(tokenAmount.toString());
            setHookAmount(tokenAmount.toString());
        }
        else {
            setTokenAmountForBackend(value);
            setHookAmount(value);
        }
    }, [setHookAmount, isInputTypeUsd, sourceTokenPrice]);
    // Get display values based on input type
    const displayAmount = useMemo(() => {
        return inputDisplayValue;
    }, [inputDisplayValue]);
    const displayUsdValue = useMemo(() => {
        if (isInputTypeUsd && sourceTokenPrice > 0) {
            // Show token amount when in USD mode
            const tokenAmount = parseFloat(tokenAmountForBackend) || 0;
            return `${formatAmount(tokenAmount)} ${selectedToken.symbol}`;
        }
        return amountUsdDisplay;
    }, [
        tokenAmountForBackend,
        isInputTypeUsd,
        sourceTokenPrice,
        selectedToken.symbol,
        amountUsdDisplay,
    ]);
    // Calculate USD value for the receive section based on destination token
    const receiveUsdValue = useMemo(() => {
        if (destTokenPrice > 0) {
            const destinationAmount = parseFloat(toAmountFormatted) || 0;
            const usdValue = destinationAmount * destTokenPrice;
            console.log("[trails-sdk] Receive USD calculation:", {
                toAmountFormatted,
                destinationAmount,
                destTokenPrice,
                usdValue,
                formatted: formatUsdAmountDisplay(usdValue),
            });
            return formatUsdAmountDisplay(usdValue);
        }
        return formatUsdAmountDisplay(0);
    }, [toAmountFormatted, destTokenPrice]);
    // Handle percentage clicks for quick amounts
    const handlePercentageClick = useCallback((percentage) => {
        if (!selectedToken.balance || !selectedToken.contractInfo?.decimals) {
            return;
        }
        const totalBalance = parseFloat(formatUnits(BigInt(selectedToken.balance), selectedToken.contractInfo.decimals));
        const calculatedAmount = (totalBalance * percentage) / 100;
        // Cap decimals to 8 places
        const cappedAmount = parseFloat(calculatedAmount.toFixed(8));
        const tokenAmountStr = cappedAmount.toString();
        // Update all states consistently
        setTokenAmountForBackend(tokenAmountStr);
        setHookAmount(tokenAmountStr);
        // Update display based on current mode
        if (isInputTypeUsd && sourceTokenPrice > 0) {
            const usdAmount = cappedAmount * sourceTokenPrice;
            setInputDisplayValue(Number(usdAmount.toFixed(2)).toString());
        }
        else {
            setInputDisplayValue(tokenAmountStr);
        }
    }, [selectedToken, setHookAmount, isInputTypeUsd, sourceTokenPrice]);
    // Handle input type toggle (USD ↔ Token)
    const handleInputTypeToggle = useCallback(() => {
        // Use tokenAmountForBackend as the source of truth for conversion
        const currentTokenAmount = parseFloat(tokenAmountForBackend) || 0;
        if (isInputTypeUsd && sourceTokenPrice > 0) {
            // Switching from USD to token mode
            // Display the token amount (limit to 8 decimals)
            const tokenAmountStr = Number(currentTokenAmount.toFixed(8)).toString();
            setInputDisplayValue(tokenAmountStr);
        }
        else if (!isInputTypeUsd && sourceTokenPrice > 0) {
            // Switching from token to USD mode
            // Display USD amount (limit to 2 decimals)
            const usdAmount = currentTokenAmount * sourceTokenPrice;
            const usdAmountStr = Number(usdAmount.toFixed(2)).toString();
            setInputDisplayValue(usdAmountStr);
        }
        // hookAmount stays as token amount (don't change it)
        // tokenAmountForBackend stays as token amount (don't change it)
        setIsInputTypeUsd(!isInputTypeUsd);
        // Focus the input field after toggling
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                // Select all text for easy replacement
                inputRef.current.select();
            }
        }, 0);
    }, [tokenAmountForBackend, isInputTypeUsd, sourceTokenPrice]);
    // Dynamic font size based on input length
    const inputStyles = useMemo(() => {
        const inputLength = displayAmount.length;
        let fontSize = "text-6xl"; // Much larger initial size
        if (inputLength > 12) {
            fontSize = "text-2xl";
        }
        else if (inputLength > 9) {
            fontSize = "text-3xl";
        }
        else if (inputLength > 6) {
            fontSize = "text-4xl";
        }
        else if (inputLength > 3) {
            fontSize = "text-5xl";
        }
        return {
            fontSize,
            transition: "all 0.1s ease-in-out",
        };
    }, [displayAmount.length]);
    console.log("[trails-sdk] FundForm", {
        hookAmount, // actual token amount used by backend
        displayAmount, // what user sees in input
        isInputTypeUsd,
        sourceTokenPrice,
        toAmount,
        isSubmitting,
        selectedDestinationChain,
    });
    if (!selectedDestinationChain) {
        return null;
    }
    if (!selectedToken) {
        return null;
    }
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center relative", children: [_jsx("button", { type: "button", onClick: onBack, className: "absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:trails-hover-bg text-gray-600 dark:text-gray-400", children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }), _jsx("h2", { className: "text-lg font-semibold w-full text-center text-gray-900 dark:text-white", children: "Fund" })] }), _jsx("div", { className: "flex items-center space-x-4 p-4 trails-border-radius-container trails-bg-secondary", children: _jsxs("div", { className: "flex items-start justify-between w-full", children: [_jsx("div", { className: "flex items-start space-x-2", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { style: { width: "32px", height: "32px" }, children: _jsx(TokenImage, { symbol: selectedToken.symbol, imageUrl: selectedToken.imageUrl, chainId: selectedToken.chainId, size: 32 }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium max-w-[135px] truncate text-left text-gray-900 dark:text-white", children: selectedToken.name }), _jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["on ", chainInfo?.name || "Unknown Chain"] })] })] }) }), fundMethod !== "qr-code" && fundMethod !== "exchange" && (_jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: [_jsxs("span", { className: "text-gray-600 dark:text-gray-400", children: ["Balance:", " "] }), balanceUsdDisplay] }), _jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [balanceFormatted, " ", selectedToken.symbol] })] }))] }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-2", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "flex items-center justify-center", children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { ref: inputRef, type: "text", value: displayAmount, onChange: (e) => handleAmountChange(e.target.value), placeholder: "0", className: `bg-transparent border-none outline-none ${inputStyles.fontSize} font-bold text-right trails-text-primary placeholder-trails-text-primary`, style: {
                                                width: `${Math.max((displayAmount || "0").length, 1)}ch`,
                                                minWidth: "1ch",
                                                maxWidth: "270px",
                                                padding: "0",
                                                margin: "0",
                                            }, inputMode: "decimal" }), _jsx("span", { className: `${inputStyles.fontSize} font-bold text-gray-400 dark:text-gray-500`, style: {
                                                marginLeft: displayAmount && displayAmount !== "0" ? "0.2em" : "0.1em",
                                                padding: "0",
                                                transition: "all 0.2s ease-in-out",
                                            }, children: isInputTypeUsd ? "USD" : selectedToken.symbol.slice(0, 4) })] }) }), _jsx("div", { className: "flex items-center justify-center", children: _jsxs("button", { type: "button", onClick: handleInputTypeToggle, className: "flex items-center justify-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:trails-hover-bg hover:text-gray-700 dark:hover:text-gray-200", children: [_jsx("span", { className: "text-xs font-medium tracking-[-2px]", children: "\u2191\u2193" }), _jsx("div", { className: "text-sm font-normal", children: displayUsdValue })] }) }), _jsx("div", { className: "flex space-x-1 justify-center", children: [25, 50, 100].map((percentage) => (_jsx("button", { type: "button", onClick: () => handlePercentageClick(percentage), className: "py-1 px-2 text-xs font-medium trails-border-radius-container border transition-colors cursor-pointer border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:trails-hover-bg hover:border-gray-400 dark:hover:border-gray-500", children: percentage === 100 ? "MAX" : `${percentage}%` }, percentage))) })] }), !toChainId && (_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "destination-chain", className: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300", children: "Destination Chain" }), _jsxs("div", { className: "relative", ref: chainDropdownRef, children: [_jsxs("button", { type: "button", onClick: () => setIsChainDropdownOpen(!isChainDropdownOpen), className: "w-full flex items-center px-4 py-3 border trails-border-radius-dropdown hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-dropdown", children: [_jsx(ChainImage, { chainId: selectedDestinationChain.id, size: 24 }), _jsx("span", { className: "ml-2 flex-1 text-left", children: selectedDestinationChain.name }), _jsx(ChevronDown, { className: `h-5 w-5 text-gray-400 transition-transform ${isChainDropdownOpen ? "transform rotate-180" : ""}` })] }), isChainDropdownOpen && (_jsx("div", { className: "absolute z-10 w-full mt-1 border trails-border-radius-dropdown shadow-lg max-h-60 overflow-y-auto custom-scrollbar trails-dropdown", children: supportedChains.map((chain) => (_jsxs("button", { type: "button", onClick: (e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSelectedDestinationChain(chain);
                                                setIsChainDropdownOpen(false);
                                            }, onMouseDown: (e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }, className: `w-full flex items-center px-4 py-3 trails-dropdown-item ${selectedDestinationChain.id === chain.id
                                                ? "trails-dropdown-item-selected"
                                                : "hover:trails-dropdown-item"}`, children: [_jsx(ChainImage, { chainId: chain.id, size: 24 }), _jsx("span", { className: "ml-2", children: chain.name }), selectedDestinationChain.id === chain.id && (_jsx("span", { className: "ml-auto text-gray-900 dark:text-white", children: "\u2022" }))] }, chain.id))) }))] })] })), !toToken && (_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "token", className: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300", children: "Receive Token" }), _jsxs("div", { className: "relative", ref: tokenDropdownRef, children: [_jsxs("button", { type: "button", onClick: () => setIsTokenDropdownOpen(!isTokenDropdownOpen), className: "w-full flex items-center px-4 py-3 border trails-border-radius-dropdown hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-dropdown", children: [_jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center text-sm bg-gray-100 dark:bg-gray-700", children: _jsx(TokenImage, { symbol: selectedDestToken?.symbol, imageUrl: selectedDestToken?.imageUrl, size: 24 }) }), _jsxs("span", { className: "ml-2 flex-1 text-left", children: [selectedDestToken?.name, " (", selectedDestToken?.symbol, ")"] }), _jsx(ChevronDown, { className: `h-5 w-5 text-gray-400 transition-transform ${isTokenDropdownOpen ? "transform rotate-180" : ""}` })] }), isTokenDropdownOpen && (_jsx("div", { className: "absolute z-10 w-full mt-1 border trails-border-radius-dropdown shadow-lg max-h-60 overflow-y-auto custom-scrollbar trails-dropdown", children: supportedTokens.map((token) => (_jsxs("button", { type: "button", onClick: () => {
                                                setSelectedDestToken(token);
                                                setIsTokenDropdownOpen(false);
                                            }, className: `w-full flex items-center px-4 py-3 cursor-pointer trails-dropdown-item ${selectedDestToken?.symbol === token.symbol
                                                ? "trails-dropdown-item-selected"
                                                : "hover:trails-dropdown-item"}`, children: [_jsx(TokenImage, { symbol: token.symbol, imageUrl: token.imageUrl, size: 24 }), _jsxs("span", { className: "ml-2", children: [token.name, " (", token.symbol, ")"] }), selectedDestToken?.symbol === token.symbol && (_jsx("span", { className: "ml-auto text-gray-900 dark:text-white", children: "\u2022" }))] }, `${token.contractAddress}-${token.chainId}`))) }))] })] })), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: `text-lg font-semibold text-left ${"text-gray-900 dark:text-white"}`, children: "Receive" }), _jsx("div", { className: "p-2", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(TokenImage, { symbol: selectedDestToken?.symbol, imageUrl: selectedDestToken?.imageUrl, chainId: selectedDestinationChain.id, size: 32 }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: `text-lg font-semibold ${"text-gray-900 dark:text-white"} ${isLoadingQuote ? "animate-pulse" : ""}`, children: [toAmountDisplay, " ", selectedDestToken?.symbol] }), isLoadingQuote && (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 dark:border-blue-400", style: {
                                                                borderTopWidth: "2px",
                                                                borderBottomWidth: "2px",
                                                            } }))] }), _jsxs("div", { className: `text-xs text-left ${"text-gray-500 dark:text-gray-400"} ${isLoadingQuote ? "animate-pulse" : ""}`, children: ["\u2248 ", receiveUsdValue, " ", selectedDestinationChain
                                                            ? `on ${selectedDestinationChain.name}`
                                                            : ""] })] })] }) }), recipient &&
                                recipient.toLowerCase() !== account.address.toLowerCase() && (_jsx("div", { className: "px-2 pb-1", children: _jsxs("div", { className: "text-xs text-left text-gray-500 dark:text-gray-400", children: ["Recipient:", " ", _jsx(TruncatedAddress, { address: recipient, chainId: selectedDestinationChain.id })] }) }))] }), toCalldata && (_jsx("div", { className: "px-2 pb-1", children: _jsx("p", { className: "text-[10px] text-left text-gray-500 dark:text-gray-400", children: "This transaction includes custom calldata for contract interaction at the destination address" }) })), _jsx("button", { type: "submit", disabled: !tokenAmountForBackend ||
                            parseFloat(tokenAmountForBackend) <= 0 ||
                            isSubmitting ||
                            isLoadingQuote ||
                            !isValidRecipient ||
                            buttonText === "No quote available" ||
                            buttonText === "Getting quote...", className: `w-full font-semibold py-4 px-4 trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer relative`, children: isSubmitting ? (_jsxs("div", { className: "flex items-center justify-center", children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin mr-2 text-white dark:text-gray-400" }), _jsx("span", { children: buttonText })] })) : !tokenAmountForBackend ||
                            parseFloat(tokenAmountForBackend) <= 0 ? ("Enter an amount") : (buttonText) }), prepareSendQuote && (_jsx("div", { className: "space-y-2", children: _jsx(QuoteDetails, { quote: prepareSendQuote, showContent: true }) }))] })] }));
};
