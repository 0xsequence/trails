import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronLeft, Loader2, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { isAddress } from "viem";
import { useSendForm } from "../hooks/useSendForm.js";
import { ChainImage } from "./ChainImage.js";
import { FeeOptions } from "./FeeOptions.js";
import { TokenImage } from "./TokenImage.js";
import { QuoteDetails } from "./QuoteDetails.js";
import { TruncatedAddress } from "./TruncatedAddress.js";
import { TradeType } from "../../prepareSend.js";
import { getChainInfo, getChainColor } from "../../chains.js";
import { formatTvl } from "../../prices.js";
import aaveLogo from "../assets/aave.svg";
export const PaySendForm = ({ selectedToken, onSend, onBack, onConfirm, onComplete, account, toAmount, toRecipient, toChainId, toToken, toCalldata, walletClient, onTransactionStateChange, onError, onWaitingForWalletConfirm, paymasterUrls, gasless, setWalletConfirmRetryHandler, quoteProvider, fundMethod, onNavigateToMeshConnect, onAmountUpdate, mode, selectedPool, }) => {
    const { amount, amountRaw, amountUsdDisplay, balanceUsdDisplay, chainInfo, balanceFormatted, handleRecipientInputChange, handleSubmit, isChainDropdownOpen, isSubmitting, isLoadingQuote, isTokenDropdownOpen, recipient, recipientInput, selectedDestinationChain, selectedDestToken, setAmount, setRecipient, setRecipientInput, setSelectedDestinationChain, setSelectedDestToken, buttonText, isValidRecipient, ensAddress, selectedFeeToken, setSelectedFeeToken, FEE_TOKENS, supportedTokens, setIsChainDropdownOpen, setIsTokenDropdownOpen, toAmountDisplay, destinationTokenAddress, supportedChains, isValidCustomToken, prepareSendQuote, } = useSendForm({
        account,
        toAmount,
        toRecipient,
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
        tradeType: TradeType.EXACT_OUTPUT,
        quoteProvider,
        fundMethod,
        mode,
        onNavigateToMeshConnect,
    });
    // Handle amount input changes with decimal validation
    const handleAmountChange = useCallback((value) => {
        // Validate decimal places (max 8 decimals)
        const decimalMatch = value.match(/^\d*\.?\d{0,8}$/);
        if (!decimalMatch && value !== "") {
            return; // Don't update if more than 8 decimals
        }
        setAmount(value);
    }, [setAmount]);
    // Call onAmountUpdate when amountRaw changes
    useEffect(() => {
        if (onAmountUpdate) {
            onAmountUpdate(amountRaw);
        }
    }, [amountRaw, onAmountUpdate]);
    const chainDropdownRef = useRef(null);
    const tokenDropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("[trails-sdk] click outside handler called, isChainDropdownOpen:", isChainDropdownOpen);
            if (chainDropdownRef.current &&
                !chainDropdownRef.current.contains(event.target)) {
                console.log("[trails-sdk] closing chain dropdown from outside click");
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
    if (!selectedDestinationChain) {
        return null;
    }
    if (!selectedToken) {
        return null;
    }
    return (_jsxs("div", { className: "space-y-2 px-2", children: [_jsxs("div", { className: "flex items-center relative", children: [_jsx("button", { type: "button", onClick: onBack, className: "absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:trails-hover-bg text-gray-400", children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }), _jsx("h2", { className: "text-lg font-semibold w-full text-center text-gray-900 dark:text-white", children: mode === "earn" ? "Earn" : "Send Payment" })] }), _jsx("div", { className: "flex items-center space-x-2 p-4 trails-border-radius-container trails-bg-secondary", children: _jsxs("div", { className: "flex items-start justify-between w-full", children: [_jsx("div", { className: "flex items-start space-x-2", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { style: { width: "32px", height: "32px" }, children: _jsx(TokenImage, { symbol: selectedToken.symbol, imageUrl: selectedToken.imageUrl, chainId: selectedToken.chainId, size: 32 }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium max-w-[135px] truncate text-left text-gray-900 dark:text-white", children: selectedToken.name }), _jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["on ", chainInfo?.name || "Unknown Chain"] })] })] }) }), fundMethod !== "qr-code" && fundMethod !== "exchange" && (_jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: [_jsxs("span", { className: "text-gray-600 dark:text-gray-400", children: ["Balance:", " "] }), balanceUsdDisplay] }), _jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [balanceFormatted, " ", selectedToken.symbol] })] }))] }) }), mode === "earn" && selectedPool && (_jsxs("div", { className: "p-4 trails-border-radius-container trails-bg-secondary", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { style: { width: "32px", height: "32px" }, children: _jsx(TokenImage, { symbol: selectedPool.token.symbol, imageUrl: selectedPool.token.logoUrl, chainId: selectedPool.chainId, size: 32 }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-gray-900 dark:text-white text-sm", children: selectedPool.poolUrl ? (_jsx("a", { href: selectedPool.poolUrl, target: "_blank", rel: "noopener noreferrer", className: "hover:underline cursor-pointer", children: selectedPool.name })) : (selectedPool.name) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-xs text-gray-500 dark:text-gray-400 flex items-center", children: [selectedPool.protocol === "Aave" && (_jsx("img", { src: aaveLogo, alt: "Aave", className: "w-3 h-3 mr-1" })), selectedPool.protocolUrl ? (_jsx("a", { href: selectedPool.protocolUrl, target: "_blank", rel: "noopener noreferrer", className: "hover:underline cursor-pointer", children: selectedPool.protocol })) : (selectedPool.protocol)] }), _jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${getChainColor(selectedPool.chainId)}`, children: getChainInfo(selectedPool.chainId)?.name ||
                                                            `Chain ${selectedPool.chainId}` })] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-1 text-green-600 dark:text-green-400", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), _jsxs("span", { className: "font-semibold text-sm", children: [selectedPool.apy.toFixed(1), "%"] })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "APY" })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("div", { className: "flex items-center space-x-1 text-gray-600 dark:text-gray-400", children: _jsxs("span", { className: "text-xs", children: ["TVL: ", formatTvl(selectedPool.tvl)] }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: `w-2 h-2 rounded-full ${selectedPool.isActive ? "bg-green-500" : "bg-red-500"}` }), _jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: selectedPool.isActive ? "Active" : "Inactive" })] })] })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-2", children: [!toChainId && (_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "destination-chain", className: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300", children: "Destination Chain" }), _jsxs("div", { className: "relative", ref: chainDropdownRef, children: [_jsxs("button", { type: "button", onClick: () => setIsChainDropdownOpen(!isChainDropdownOpen), className: "w-full flex items-center px-4 py-3 border trails-border-radius-dropdown hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 trails-dropdown", children: [_jsx(ChainImage, { chainId: selectedDestinationChain.id, size: 24 }), _jsx("span", { className: "ml-2 flex-1 text-left", children: selectedDestinationChain.name }), _jsx(ChevronDown, { className: `h-5 w-5 ${"text-gray-400"} transition-transform ${isChainDropdownOpen ? "transform rotate-180" : ""}` })] }), isChainDropdownOpen && (_jsx("div", { className: "absolute z-10 w-full mt-1 border trails-border-radius-dropdown shadow-lg max-h-60 overflow-y-auto custom-scrollbar trails-dropdown", children: supportedChains.map((chain) => (_jsxs("button", { type: "button", onClick: (e) => {
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
                                                : "hover:trails-dropdown-item"}`, children: [_jsx(TokenImage, { symbol: token.symbol, imageUrl: token.imageUrl, size: 24 }), _jsxs("span", { className: "ml-2", children: [token.name, " (", token.symbol, ")"] }), selectedDestToken?.symbol === token.symbol && (_jsx("span", { className: "ml-auto text-gray-900 dark:text-white", children: "\u2022" }))] }, `${token.contractAddress}-${token.chainId}`))) }))] })] })), !toAmount && (_jsxs("div", { className: "mb-2", children: [_jsxs("label", { htmlFor: "amount", className: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300", children: ["Amount to ", mode === "earn" ? "Deposit" : "Receive"] }), _jsxs("div", { className: "relative trails-border-radius-container", children: [_jsx("input", { id: "amount", type: "text", value: amount, onChange: (e) => handleAmountChange(e.target.value), placeholder: "0.00", className: "block w-full pl-4 pr-12 py-3 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg trails-input" }), _jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-4", children: _jsx("span", { className: "text-gray-400", children: selectedDestToken?.symbol }) })] }), amountUsdDisplay && selectedDestToken?.symbol && (_jsx("div", { className: "h-6 mt-1", children: _jsxs("div", { className: "text-sm text-gray-400", children: ["\u2248 ", amountUsdDisplay] }) }))] })), (toAmount || toChainId || toToken) && (_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: `text-lg font-semibold text-left ${"text-gray-900 dark:text-white"}`, children: mode === "earn" ? "Deposit" : "Receive" }), _jsx("div", { className: "p-2", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(TokenImage, { symbol: selectedDestToken?.symbol, imageUrl: selectedDestToken?.imageUrl, chainId: selectedDestinationChain.id, size: 32 }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: `text-lg font-semibold ${"text-gray-900 dark:text-white"} ${isLoadingQuote ? "animate-pulse" : ""}`, children: [toAmountDisplay, " ", selectedDestToken?.symbol] }), isLoadingQuote && (_jsx("div", { className: `animate-spin rounded-full h-4 w-4 border-b-2 ${"border-blue-400"}`, style: {
                                                                borderTopWidth: "2px",
                                                                borderBottomWidth: "2px",
                                                            } }))] }), _jsxs("div", { className: `text-xs ${"text-gray-500 dark:text-gray-400"} ${isLoadingQuote ? "animate-pulse" : ""}`, children: ["\u2248 ", amountUsdDisplay, " ", selectedDestinationChain
                                                            ? `on ${selectedDestinationChain.name}`
                                                            : ""] })] })] }) }), recipient &&
                                recipient.toLowerCase() !== account.address.toLowerCase() && (_jsx("div", { className: "px-2 pb-1", children: _jsxs("div", { className: `text-xs text-left ${"text-gray-400"}`, children: [mode === "earn" ? "Pool" : "Recipient", ":", " ", _jsx(TruncatedAddress, { address: recipient, chainId: selectedDestinationChain.id })] }) }))] })), !toRecipient && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "recipient", className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: toCalldata
                                                    ? "Destination Address"
                                                    : mode === "earn"
                                                        ? "Pool Address"
                                                        : "Recipient Address" }), recipient &&
                                                isAddress(recipient) &&
                                                recipient.toLowerCase() === account.address.toLowerCase() && (_jsx("div", { className: "text-xs mt-0.5 text-left text-gray-400", children: "Same as sender" }))] }), _jsx("div", { className: "h-7 flex items-center", children: recipient !== account.address ? (_jsx("button", { type: "button", onClick: (event) => {
                                                event.preventDefault();
                                                setRecipientInput(account.address);
                                                setRecipient(account.address);
                                            }, className: `px-2 py-1 text-xs cursor-pointer trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 text-white`, children: "Use Account" })) : null })] }), _jsx("input", { id: "recipient", type: "text", value: recipientInput, onChange: handleRecipientInputChange, placeholder: "0x... or name.eth", className: "block w-full px-4 py-3 border trails-border-radius-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm trails-input" }), ensAddress && _jsx("p", { className: "text-sm text-gray-400", children: recipient })] })), toCalldata && (_jsx("div", { className: "px-2 py-1", children: _jsx("p", { className: `text-[10px] text-left ${"text-gray-400"}`, children: "This transaction includes custom calldata for contract interaction at the destination address" }) })), _jsx(FeeOptions, { options: FEE_TOKENS, selectedOption: selectedFeeToken ?? undefined, onSelect: setSelectedFeeToken }), _jsx("button", { type: "submit", disabled: !amount ||
                            !isValidRecipient ||
                            isSubmitting ||
                            !destinationTokenAddress ||
                            !isValidCustomToken ||
                            isLoadingQuote ||
                            !prepareSendQuote, className: `w-full font-semibold py-4 px-4 trails-border-radius-button transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer relative`, children: isSubmitting ? (_jsxs("div", { className: "flex items-center justify-center", children: [_jsx(Loader2, { className: `w-5 h-5 animate-spin mr-2 ${"text-gray-400"}` }), _jsx("span", { children: buttonText })] })) : (buttonText) }), prepareSendQuote && (_jsx("div", { className: "space-y-2", children: _jsx(QuoteDetails, { quote: prepareSendQuote, showContent: true }) }))] })] }));
};
const styles = `
  select {
    appearance: none;
    border: 1px solid #e5e7eb;
    outline: none;
    font-size: 1rem;
    width: 100%;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    padding-right: 2rem;
    
    cursor: pointer;
    transition: all 0.2s;
  }

  select:hover {
    border-color: #d1d5db;
  }

  select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  select option {
    padding: 0.75rem 1rem;
    min-height: 3rem;
    display: flex;
    align-items: center;
    padding-left: 2.75rem;
    position: relative;
    cursor: pointer;
  }

  select option:hover {
    background-color: #f3f4f6;
  }

  select option:checked {
    background-color: #eff6ff;
    color: #1d4ed8;
  }
`;
if (typeof document !== "undefined") {
    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
}
