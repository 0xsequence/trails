import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GreenCheckAnimation } from "./GreenCheckAnimation.js";
import { getTxTimeDiff } from "../../transactions.js";
import { QuoteDetails } from "./QuoteDetails.js";
import { truncateAddress } from "../../address.js";
// Hook to fetch the time difference in seconds between two transactions on possibly different chains
function useTxTimeDiff(firstTx, lastTx) {
    const enabled = Boolean(firstTx?.chainId &&
        lastTx?.chainId &&
        firstTx &&
        lastTx &&
        (firstTx.blockNumber || firstTx.transactionHash) &&
        (lastTx.blockNumber || lastTx.transactionHash) &&
        (firstTx.blockNumber !== lastTx.blockNumber ||
            firstTx.transactionHash !== lastTx.transactionHash));
    const { data: completionTimeSeconds = 0 } = useQuery({
        queryKey: [
            "completionTimeSeconds",
            firstTx?.blockNumber,
            lastTx?.blockNumber,
            firstTx?.transactionHash,
            lastTx?.transactionHash,
            firstTx?.chainId,
            lastTx?.chainId,
        ],
        enabled,
        queryFn: async () => {
            return getTxTimeDiff(firstTx, lastTx);
        },
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    });
    return completionTimeSeconds;
}
// Custom hook to compute finalExplorerUrl and completionTimeSeconds
function useReceipt(transactionStates) {
    const finalExplorerUrl = transactionStates?.[transactionStates.length - 1]?.explorerUrl;
    // Only consider confirmed transactions
    const confirmedTxs = (transactionStates || []).filter((tx) => tx.state === "confirmed");
    const first = confirmedTxs[0];
    const last = confirmedTxs[confirmedTxs.length - 1];
    const completionTimeSeconds = useTxTimeDiff(first, last);
    return { finalExplorerUrl, completionTimeSeconds };
}
export const Receipt = ({ onClose, renderInline = false, transactionStates = [], totalCompletionSeconds, quote, }) => {
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 400);
        return () => clearTimeout(timer);
    }, []);
    const { finalExplorerUrl, completionTimeSeconds: calculatedCompletionTime } = useReceipt(transactionStates);
    // Use provided totalCompletionSeconds if available, otherwise use calculated time
    const completionTimeSeconds = totalCompletionSeconds ?? calculatedCompletionTime;
    if (!finalExplorerUrl) {
        return (_jsxs("div", { className: "flex flex-col justify-center min-h-full space-y-6 pt-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: `mx-auto flex items-center justify-center mb-4`, children: _jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/20", children: _jsxs("svg", { className: "w-8 h-8 text-red-500 dark:text-red-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("title", { children: "Error" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" })] }) }) }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Transaction Failed" }), _jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: "No final transaction hash found. This is likely due to a failed transaction or failed relay. Please reach out to support." })] }), !renderInline && (_jsx("div", { className: "text-center", children: _jsx("button", { type: "button", onClick: onClose, className: "w-full cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white", children: "Close" }) }))] }));
    }
    return (_jsxs("div", { className: "flex flex-col justify-center min-h-full space-y-6 pt-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: `mx-auto flex items-center justify-center`, children: _jsx(GreenCheckAnimation, {}) }), _jsxs("div", { className: `transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [_jsx("h2", { className: "mt-4 text-2xl font-bold text-gray-900 dark:text-white", children: "Transaction Confirmed" }), completionTimeSeconds > 0 && (_jsxs("div", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 justify-center animate-fade-in-up", style: {
                                    animation: "fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                                    animationFillMode: "both",
                                }, children: [_jsxs("span", { className: "inline-block animate-fade-in-up", children: ["Completed in ", _jsxs("strong", { children: [completionTimeSeconds, "s"] })] }), totalCompletionSeconds && totalCompletionSeconds < 15 && (_jsxs("svg", { className: "w-4 h-4 ml-1 text-yellow-400 inline", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: [_jsx("title", { children: "Lightning Fast" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z", fill: "currentColor" })] })), _jsx("style", { children: `
                @keyframes fadeInUp {
                  0% { opacity: 0; transform: translateY(16px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
              ` })] }))] })] }), _jsx("div", { className: `text-center transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsxs("a", { href: finalExplorerUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors border text-sm bg-white border-gray-200 text-black hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-blue-300 dark:hover:bg-gray-800 dark:hover:text-blue-200", children: ["View on Explorer", _jsxs("svg", { className: "w-4 h-4 ml-1 text-black dark:text-blue-300", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("title", { children: "External Link" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" })] })] }) }), _jsxs("div", { className: `space-y-3 transition-all duration-500 ease-out delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: [!renderInline && (_jsx("button", { type: "button", onClick: onClose, className: "w-full cursor-pointer font-semibold py-3 px-4 trails-border-radius-button transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white", children: "Close" })), quote && (_jsx("div", { className: "mt-2", children: _jsx(QuoteDetails, { quote: quote, showContent: true, children: transactionStates.length > 0 && (_jsxs(_Fragment, { children: [_jsx("div", { className: "font-medium text-gray-700 dark:text-gray-300", children: "Transactions:" }), _jsx("div", { className: "space-y-2", children: transactionStates.map((state) => (_jsxs("div", { className: "p-2 rounded bg-gray-100 dark:bg-gray-700/50", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-gray-600 dark:text-gray-400", children: [state.label, ":"] }), _jsx("span", { className: `px-2 py-0.5 rounded-full text-xs ${state.state === "confirmed"
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"}`, children: state.state })] }), _jsxs("div", { className: "mt-1 flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Chain ID:" }), _jsx("span", { className: "text-gray-900 dark:text-white", children: state.chainId })] }), _jsxs("div", { className: "mt-1 flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Hash:" }), _jsxs("a", { href: state.explorerUrl, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-1 hover:underline text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300", children: [_jsx("span", { children: truncateAddress(state.transactionHash) }), _jsxs("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("title", { children: "External Link" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" })] })] })] })] }, state.transactionHash))) })] })) }) }))] })] }));
};
export default Receipt;
