import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ExternalLink } from "lucide-react";
import React, { useEffect } from "react";
const getStepLabel = (index, total) => {
    if (total === 1)
        return "Transaction";
    if (total === 2)
        return index === 0 ? "Transaction" : "Swap";
    return index === 0 ? "Transfer" : index === 1 ? "Swap & Bridge" : "Execute";
};
const _truncateHash = (hash) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};
export const TransferPending = ({ onComplete, theme = "light", transactionStates, }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onComplete]);
    // Find the first pending transaction index
    const activePendingIndex = transactionStates.findIndex((tx) => tx.state === "pending");
    const renderStep = (tx, index) => {
        const isPending = tx.state === "pending";
        const isActivePending = index === activePendingIndex;
        const isAfterPending = activePendingIndex !== -1 && index > activePendingIndex;
        const dotClasses = `relative w-3 h-3 rounded-full transition-colors ${isAfterPending
            ? theme === "dark"
                ? "bg-gray-700"
                : "bg-gray-300"
            : tx.state === "confirmed"
                ? theme === "dark"
                    ? "bg-green-500"
                    : "bg-green-600"
                : tx.state === "failed"
                    ? theme === "dark"
                        ? "bg-red-500"
                        : "bg-red-600"
                    : theme === "dark"
                        ? "bg-blue-500"
                        : "bg-blue-600"} ${isActivePending ? "animate-[pulse_1.5s_ease-in-out_infinite]" : ""}`;
        const labelClasses = `mt-2 text-xs transition-colors text-center whitespace-nowrap flex items-center gap-1 ${isPending || isAfterPending
            ? theme === "dark"
                ? "text-gray-400 font-medium"
                : "text-gray-500 font-medium"
            : theme === "dark"
                ? "text-gray-100 font-semibold hover:underline"
                : "text-gray-900 font-semibold hover:underline"}`;
        const content = (_jsxs(_Fragment, { children: [_jsx("div", { className: "relative", children: _jsx("div", { className: dotClasses, children: isActivePending && (_jsx("div", { className: `absolute inset-0 rounded-full ${theme === "dark" ? "bg-blue-500" : "bg-blue-600"} animate-[pulseRing_2s_cubic-bezier(0.4,0,0.6,1)_infinite]` })) }) }), _jsx("div", { className: "mt-2 flex justify-center", children: _jsxs("div", { className: labelClasses, children: [getStepLabel(index, transactionStates.length), !isPending && !isAfterPending && (_jsx(ExternalLink, { className: "w-3 h-3" }))] }) })] }));
        if (isPending || isAfterPending) {
            return (_jsx("div", { className: "flex flex-col items-center relative", children: content }));
        }
        return (_jsx("a", { href: tx.explorerUrl, target: "_blank", rel: "noopener noreferrer", className: "flex flex-col items-center relative", children: content }));
    };
    const renderDots = (index) => {
        const isActiveDots = index === activePendingIndex - 1;
        return (_jsx("div", { className: "flex-1 flex items-center justify-center mx-4", children: _jsx("div", { className: "flex items-center space-x-2", children: [...Array(3)].map((_, i) => (_jsx("div", { className: `w-1 h-1 rounded-full ${theme === "dark"
                        ? index >= activePendingIndex
                            ? "bg-gray-700"
                            : "bg-gray-600"
                        : index >= activePendingIndex
                            ? "bg-gray-300"
                            : "bg-gray-400"} ${isActiveDots ? "animate-[dotFadeIn_1.5s_ease-in-out_infinite]" : ""}`, style: {
                        animationDelay: isActiveDots ? `${i * 0.2}s` : "0s",
                    } }, i))) }) }));
    };
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
          @keyframes dotFadeIn {
            0% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
          }
          @keyframes pulseRing {
            0% { transform: scale(0.7); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: scale(2); opacity: 0; }
          }
        ` }), _jsxs("div", { className: "space-y-8 flex flex-col items-center justify-center py-8", children: [_jsx("h2", { className: `text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "Transfer Pending" }), _jsx("div", { className: `animate-spin rounded-full h-16 w-16 border-b-2 ${theme === "dark" ? "border-blue-400" : "border-blue-500"}`, style: { borderTopWidth: "2px", borderBottomWidth: "2px" } }), _jsx("div", { className: "w-full max-w-2xl", children: _jsx("div", { className: "relative flex items-center justify-center pb-8", children: _jsx("div", { className: `flex items-center ${transactionStates.length === 1
                                    ? "w-auto"
                                    : transactionStates.length === 2
                                        ? "w-[200px]"
                                        : "w-full justify-between"}`, children: transactionStates.map((tx, index) => (_jsxs(React.Fragment, { children: [_jsx("div", { className: "flex flex-col items-center", children: renderStep(tx, index) }), index < transactionStates.length - 1 && renderDots(index)] }, `${tx.transactionHash}-${index}`))) }) }) }), _jsx("p", { className: theme === "dark" ? "text-gray-400" : "text-gray-500", children: "Waiting for confirmation..." })] })] }));
};
export default TransferPending;
