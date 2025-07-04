import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NetworkImage, TokenImage } from "@0xsequence/design-system";
import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { isAddress } from "viem";
import { useSendForm } from "../hooks/useSendForm.js";
import { FeeOptions } from "./FeeOptions.js";
export const SendForm = ({ selectedToken, onSend, onBack, onConfirm, onComplete, account, sequenceProjectAccessKey, apiUrl, env, toAmount, toRecipient, toChainId, toToken, toCalldata, walletClient, theme = "light", onTransactionStateChange, useSourceTokenForButtonText = false, onError, onWaitingForWalletConfirm, paymasterUrls, gasless, setWalletConfirmRetryHandler, }) => {
    const { amount, amountUsdFormatted, balanceUsdFormatted, chainInfo, error, balanceFormatted, handleRecipientInputChange, handleSubmit, isChainDropdownOpen, isSubmitting, isTokenDropdownOpen, recipient, recipientInput, selectedChain, selectedDestToken, setAmount, setRecipient, setRecipientInput, setSelectedChain, setSelectedDestToken, buttonText, isValidRecipient, ensAddress, selectedFeeToken, setSelectedFeeToken, FEE_TOKENS, SUPPORTED_TO_TOKENS, SUPPORTED_TO_CHAINS, setIsChainDropdownOpen, setIsTokenDropdownOpen, } = useSendForm({
        account,
        sequenceProjectAccessKey,
        apiUrl,
        env,
        toAmount,
        toRecipient,
        toChainId,
        toToken,
        toCalldata,
        walletClient,
        theme,
        onTransactionStateChange,
        useSourceTokenForButtonText,
        onError,
        onWaitingForWalletConfirm,
        paymasterUrls,
        gasless,
        onConfirm,
        onComplete,
        onSend,
        selectedToken,
        setWalletConfirmRetryHandler,
    });
    const chainDropdownRef = useRef(null);
    const tokenDropdownRef = useRef(null);
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
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsChainDropdownOpen, setIsTokenDropdownOpen]);
    if (!selectedChain) {
        return null;
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center relative", children: [_jsx("button", { type: "button", onClick: onBack, className: `absolute -left-2 p-2 rounded-full transition-colors cursor-pointer ${theme === "dark"
                            ? "hover:bg-gray-800 text-gray-400"
                            : "hover:bg-gray-100 text-gray-600"}`, children: _jsx(ChevronLeft, { className: "h-6 w-6" }) }), _jsx("h2", { className: `text-lg font-semibold w-full text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "Send Payment" })] }), _jsxs("div", { className: `flex items-center space-x-4 p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `w-12 h-12 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`, children: selectedToken.contractAddress ? (_jsx(TokenImage, { symbol: selectedToken.symbol, src: selectedToken.imageUrl, disableAnimation: true })) : (_jsx("span", { className: `text-2xl font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`, children: selectedToken.symbol[0] })) }), _jsx("div", { className: "absolute -bottom-1 -right-1", children: _jsx(NetworkImage, { chainId: selectedToken.chainId, size: "sm", className: "w-6 h-6", disableAnimation: true }) })] }), _jsxs("div", { children: [_jsxs("h3", { className: `text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: ["From: ", selectedToken.name] }), _jsxs("p", { className: theme === "dark" ? "text-gray-400" : "text-gray-500", children: ["on ", chainInfo?.name || "Unknown Chain", " \u2022 Balance:", " ", balanceFormatted, " ", selectedToken.symbol, balanceUsdFormatted && (_jsxs("span", { className: `ml-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: ["(", balanceUsdFormatted, ")"] }))] })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-2", children: [_jsxs("div", { className: !toChainId ? "mb-4" : undefined, children: [_jsx("label", { htmlFor: "destination-chain", className: `block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`, children: "Destination Chain" }), toChainId ? (_jsxs("div", { className: "flex items-center px-2 py-1", children: [_jsx(NetworkImage, { chainId: selectedChain.id, size: "sm", className: "w-5 h-5", disableAnimation: true }), _jsx("span", { className: `ml-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: selectedChain.name })] })) : (_jsxs("div", { className: "relative", ref: chainDropdownRef, children: [_jsxs("button", { type: "button", onClick: () => setIsChainDropdownOpen(!isChainDropdownOpen), className: `w-full flex items-center px-4 py-3 border rounded-[24px] hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${theme === "dark"
                                            ? "bg-gray-800 border-gray-700 text-white"
                                            : "bg-white border-gray-300 text-gray-900"}`, children: [_jsx(NetworkImage, { chainId: selectedChain.id, size: "sm", className: "w-5 h-5", disableAnimation: true }), _jsx("span", { className: "ml-2 flex-1 text-left", children: selectedChain.name }), _jsx(ChevronDown, { className: `h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} transition-transform ${isChainDropdownOpen ? "transform rotate-180" : ""}` })] }), isChainDropdownOpen && (_jsx("div", { className: `absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg ${theme === "dark"
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-white border-gray-200"}`, children: SUPPORTED_TO_CHAINS.map((chain) => (_jsxs("button", { type: "button", onClick: () => {
                                                setSelectedChain(chain);
                                                setIsChainDropdownOpen(false);
                                            }, className: `w-full flex items-center px-4 py-3 ${theme === "dark"
                                                ? selectedChain.id === chain.id
                                                    ? "bg-gray-700 text-white"
                                                    : "text-white hover:bg-gray-700"
                                                : selectedChain.id === chain.id
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-900 hover:bg-gray-50"}`, children: [_jsx(NetworkImage, { chainId: chain.id, size: "sm", className: "w-5 h-5", disableAnimation: true }), _jsx("span", { className: "ml-2", children: chain.name }), selectedChain.id === chain.id && (_jsx("span", { className: `ml-auto ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "\u2022" }))] }, chain.id))) }))] }))] }), _jsxs("div", { className: !toToken ? "mb-4" : undefined, children: [_jsx("label", { htmlFor: "token", className: `block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`, children: "Receive Token" }), toToken ? (_jsxs("div", { className: "flex items-center px-2 py-1", children: [_jsx(TokenImage, { symbol: selectedDestToken.symbol, src: selectedDestToken.imageUrl, size: "sm", disableAnimation: true }), _jsxs("span", { className: `ml-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: [selectedDestToken.name, " (", selectedDestToken.symbol, ")"] })] })) : (_jsxs("div", { className: "relative", ref: tokenDropdownRef, children: [_jsxs("button", { type: "button", onClick: () => setIsTokenDropdownOpen(!isTokenDropdownOpen), className: `w-full flex items-center px-4 py-3 border rounded-[24px] hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${theme === "dark"
                                            ? "bg-gray-800 border-gray-700 text-white"
                                            : "bg-white border-gray-300 text-gray-900"}`, children: [_jsx("div", { className: `w-5 h-5 rounded-full flex items-center justify-center text-sm ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`, children: _jsx(TokenImage, { symbol: selectedDestToken.symbol, src: selectedDestToken.imageUrl, size: "sm", disableAnimation: true }) }), _jsxs("span", { className: "ml-2 flex-1 text-left", children: [selectedDestToken.name, " (", selectedDestToken.symbol, ")"] }), _jsx(ChevronDown, { className: `h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} transition-transform ${isTokenDropdownOpen ? "transform rotate-180" : ""}` })] }), isTokenDropdownOpen && (_jsx("div", { className: `absolute z-10 w-full mt-1 border rounded-[24px] shadow-lg ${theme === "dark"
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-white border-gray-200"}`, children: SUPPORTED_TO_TOKENS.map((token) => (_jsxs("button", { type: "button", onClick: () => {
                                                setSelectedDestToken(token);
                                                setIsTokenDropdownOpen(false);
                                            }, className: `w-full flex items-center px-4 py-3 cursor-pointer ${theme === "dark"
                                                ? selectedDestToken.symbol === token.symbol
                                                    ? "bg-gray-700 text-white"
                                                    : "text-white hover:bg-gray-700"
                                                : selectedDestToken.symbol === token.symbol
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-900 hover:bg-gray-50"}`, children: [_jsx("div", { className: `w-5 h-5 rounded-full flex items-center justify-center text-sm ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`, children: _jsx(TokenImage, { symbol: token.symbol, src: token.imageUrl, size: "sm", disableAnimation: true }) }), _jsxs("span", { className: "ml-2", children: [token.name, " (", token.symbol, ")"] }), selectedDestToken.symbol === token.symbol && (_jsx("span", { className: `ml-auto ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "\u2022" }))] }, token.symbol))) }))] }))] }), _jsxs("div", { className: !toAmount ? "mb-2" : undefined, children: [_jsx("label", { htmlFor: "amount", className: `block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`, children: "Amount to Receive" }), toAmount ? (_jsxs("div", { className: "flex items-center justify-between px-2 py-1", children: [_jsxs("span", { className: `${theme === "dark" ? "text-white" : "text-gray-900"}`, children: [toAmount, " ", selectedDestToken.symbol] }), _jsxs("span", { className: `text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: ["\u2248 ", amountUsdFormatted] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "relative rounded-lg", children: [_jsx("input", { id: "amount", type: "text", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0.00", className: `block w-full pl-4 pr-12 py-3 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg ${theme === "dark"
                                                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                                                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}` }), _jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-4", children: _jsx("span", { className: theme === "dark" ? "text-gray-400" : "text-gray-500", children: selectedDestToken.symbol }) })] }), _jsx("div", { className: "h-6 mt-1", children: amount && selectedDestToken.symbol && (_jsxs("div", { className: `text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: ["\u2248 ", amountUsdFormatted] })) })] }))] }), _jsxs("div", { className: !toRecipient ? "mb-4" : undefined, children: [_jsxs("div", { className: "flex justify-between items-center mb-1", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "recipient", className: `text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`, children: toCalldata ? "Destination Address" : "Recipient Address" }), recipient &&
                                                isAddress(recipient) &&
                                                recipient.toLowerCase() === account.address.toLowerCase() && (_jsx("div", { className: `text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: "Same as sender" }))] }), _jsx("div", { className: "h-7 flex items-center", children: !toRecipient && recipient !== account.address ? (_jsx("button", { type: "button", onClick: (event) => {
                                                event.preventDefault();
                                                setRecipientInput(account.address);
                                                setRecipient(account.address);
                                            }, className: `px-2 py-1 text-xs cursor-pointer rounded-[24px] transition-colors bg-blue-500 hover:bg-blue-600 text-white`, children: "Use Account" })) : null })] }), toRecipient ? (_jsx("div", { className: "px-2 py-1 font-mono text-sm", children: _jsx("span", { className: `break-all ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: recipient }) })) : (_jsxs(_Fragment, { children: [_jsx("input", { id: "recipient", type: "text", value: recipientInput, onChange: handleRecipientInputChange, placeholder: "0x... or name.eth", className: `block w-full px-4 py-3 border rounded-[24px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${theme === "dark"
                                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"}` }), ensAddress && (_jsx("p", { className: theme === "dark"
                                            ? "text-sm text-gray-400"
                                            : "text-sm text-gray-500", children: recipient }))] }))] }), toCalldata && (_jsx("div", { className: "px-2 py-1", children: _jsx("p", { className: `text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`, children: "This transaction includes custom calldata for contract interaction at the destination address" }) })), _jsx(FeeOptions, { options: FEE_TOKENS, selectedOption: selectedFeeToken ?? undefined, onSelect: setSelectedFeeToken, theme: theme }), _jsxs("div", { className: "flex flex-col space-y-3 pt-2", children: [error && (_jsx("div", { className: `px-3 py-2 rounded-lg max-h-80 overflow-y-auto ${theme === "dark" ? "bg-red-900/20" : "bg-red-50"}`, children: _jsx("p", { className: `text-sm break-words ${theme === "dark" ? "text-red-200" : "text-red-600"}`, children: error }) })), _jsx("button", { type: "submit", disabled: !amount || !isValidRecipient || isSubmitting, className: `w-full font-semibold py-3 px-4 rounded-[24px] transition-colors relative ${theme === "dark"
                                    ? "bg-blue-600 disabled:bg-gray-700 text-white disabled:text-gray-400 enabled:hover:bg-blue-700"
                                    : "bg-blue-500 disabled:bg-gray-300 text-white disabled:text-gray-500 enabled:hover:bg-blue-600"} disabled:cursor-not-allowed cursor-pointer`, children: isSubmitting ? (_jsxs("div", { className: "flex items-center justify-center", children: [_jsx(Loader2, { className: `w-5 h-5 animate-spin mr-2 ${theme === "dark" ? "text-gray-400" : "text-white"}` }), _jsx("span", { children: buttonText })] })) : (buttonText) })] })] })] }));
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
export default SendForm;
