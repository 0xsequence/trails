import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { TokenImage } from "./TokenImage.js";
import { QuoteDetails } from "./QuoteDetails.js";
export const TransferPending = ({ onElapsedTime, transactionStates, quote, timestamp, }) => {
    const [showContent, setShowContent] = useState(false);
    const [activePendingIndex, setActivePendingIndex] = useState(-1);
    const [showDots, setShowDots] = useState(false);
    const [showLine, setShowLine] = useState(false);
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    useEffect(() => {
        const timeoutTimer = setTimeout(() => {
            setShowTimeoutWarning(true);
        }, 60000); // 1 minute
        return () => clearTimeout(timeoutTimer);
    }, []);
    useEffect(() => {
        // Animate content in
        const contentTimer = setTimeout(() => {
            setShowContent(true);
        }, 200);
        return () => clearTimeout(contentTimer);
    }, []);
    useEffect(() => {
        // Show dots first, then animate them in
        const dotsTimer = setTimeout(() => {
            setShowDots(true);
        }, 400);
        // Show line after dots are visible
        const lineTimer = setTimeout(() => {
            setShowLine(true);
        }, 800);
        return () => {
            clearTimeout(dotsTimer);
            clearTimeout(lineTimer);
        };
    }, []);
    useEffect(() => {
        // Update active pending index with animation
        const newActiveIndex = transactionStates.findIndex((tx) => tx.state === "pending");
        if (newActiveIndex !== activePendingIndex) {
            setActivePendingIndex(newActiveIndex);
        }
    }, [transactionStates, activePendingIndex]);
    // Add CSS animation for draw effect
    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
      @keyframes draw {
        from {
          stroke-dasharray: 0 100;
        }
        to {
          stroke-dasharray: 100 0;
        }
      }
      
      .animate-draw {
        animation: draw 0.6s ease-out forwards;
      }

      @keyframes slideInFromTop {
        from {
          transform: translateY(-20px);
        }
        to {
          transform: translateY(0);
        }
      }

      @keyframes lineGrow {
        from {
          height: 0;
        }
        to {
          height: 100%;
        }
      }

      .animate-slide-in {
        animation: slideInFromTop 0.3s ease-out forwards;
      }

      .animate-line-grow {
        animation: lineGrow 0.6s ease-out forwards;
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    // Live timer state for 'Sent just now'
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedSeconds(elapsedSeconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [elapsedSeconds]);
    useEffect(() => {
        onElapsedTime(elapsedSeconds);
    }, [onElapsedTime, elapsedSeconds]);
    // Format timer as 'Xs…', '1m1s…', etc.
    function formatElapsed(seconds) {
        if (seconds < 60)
            return `${seconds}s…`;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m${s}s…`;
    }
    // Calculate time difference
    const getTimeAgo = () => {
        if (!timestamp)
            return "Sent just now";
        const now = Date.now();
        const diffInSeconds = Math.floor((now - timestamp) / 1000);
        if (diffInSeconds < 1)
            return "Sent just now";
        if (diffInSeconds === 1)
            return "Sent 1 second ago";
        if (diffInSeconds < 60)
            return `Sent ${diffInSeconds} seconds ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes === 1)
            return "Sent 1 minute ago";
        if (diffInMinutes < 60)
            return `Sent ${diffInMinutes} minutes ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours === 1)
            return "Sent 1 hour ago";
        if (diffInHours < 24)
            return `Sent ${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1)
            return "Sent 1 day ago";
        return `Sent ${diffInDays} days ago`;
    };
    // Compute effective states: a tx is only confirmed if all previous are confirmed, else pending
    const effectiveStates = [];
    let foundUnconfirmed = false;
    for (const tx of transactionStates) {
        if (foundUnconfirmed || tx.state !== "confirmed") {
            foundUnconfirmed = true;
            effectiveStates.push({
                ...tx,
                state: tx.state === "confirmed" ? "pending" : tx.state,
            });
        }
        else {
            effectiveStates.push(tx);
        }
    }
    const renderStep = (tx, index) => {
        const isActivePending = index === activePendingIndex;
        const isCompleted = tx.state === "confirmed";
        const isFailed = tx.state === "failed";
        // Determine step state
        let stepState;
        if (isFailed) {
            stepState = "failed";
        }
        else if (isCompleted) {
            stepState = "completed";
        }
        else if (isActivePending) {
            stepState = "active";
        }
        else {
            stepState = "pending";
        }
        // Circle styles based on state
        const getCircleStyles = () => {
            const baseStyles = "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ease-out";
            switch (stepState) {
                case "completed":
                    return `${baseStyles} bg-green-600 dark:bg-green-500 scale-100`;
                case "active":
                    return `${baseStyles} bg-blue-600 dark:bg-blue-500 scale-110`;
                case "failed":
                    return `${baseStyles} bg-red-600 dark:bg-red-500 scale-100`;
                case "pending":
                    return `${baseStyles} bg-gray-300 dark:bg-gray-600 scale-100`;
            }
        };
        // Checkmark icon for completed steps
        const CheckmarkIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [_jsx("title", { children: "Completed" }), _jsx("path", { d: "M2.5 6L5 8.5L9.5 4", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-draw" })] }));
        // X icon for failed steps
        const XIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [_jsx("title", { children: "Failed" }), _jsx("path", { d: "M3 3L9 9M9 3L3 9", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "animate-draw" })] }));
        // Spinner icon for active steps
        const SpinnerIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "animate-spin", children: [_jsx("title", { children: "Processing" }), _jsx("circle", { cx: "6", cy: "6", r: "4", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeDasharray: "6 6", strokeDashoffset: "0" })] }));
        // Text styles based on state
        const getTextStyles = () => {
            const baseStyles = "text-sm font-medium transition-all duration-500 ease-out";
            // Use regular colors instead of state-based colors
            return `${baseStyles} text-gray-900 dark:text-white`;
        };
        const content = (_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsxs("div", { className: getCircleStyles(), children: [stepState === "completed" && _jsx(CheckmarkIcon, {}), stepState === "failed" && _jsx(XIcon, {}), stepState === "active" && _jsx(SpinnerIcon, {})] }) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: getTextStyles(), children: tx.label }), stepState === "completed" ? (_jsx(ExternalLink, { className: "w-4 h-4 text-gray-400 transition-opacity duration-300" })) : (_jsx("div", { className: "w-4 h-4" }))] }) })] }));
        if (stepState === "completed" || stepState === "failed") {
            return (_jsx("a", { href: tx.explorerUrl, target: "_blank", rel: "noopener noreferrer", className: "block hover:opacity-80 transition-all duration-300 ease-out", children: content }));
        }
        return _jsx("div", { className: "block", children: content });
    };
    return (_jsxs("div", { className: "space-y-8 flex flex-col items-center justify-center py-8", children: [_jsx("h2", { className: `text-2xl font-bold transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} text-gray-900 dark:text-white`, children: "Transaction status" }), _jsx("div", { className: `w-full max-w-sm p-3 trails-border-radius-container transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} trails-bg-secondary trails-text-secondary`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { className: "flex items-start space-x-2", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { style: { width: "24px", height: "24px" }, children: _jsx(TokenImage, { imageUrl: quote?.originToken.imageUrl, symbol: quote?.originToken.symbol, chainId: quote?.originChain.id, size: 24 }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xs font-medium text-left text-gray-900 dark:text-white", children: quote?.originToken.name }), _jsxs("span", { className: "text-xs text-gray-500 dark:text-gray-400 flex items-center", children: [getTimeAgo(), _jsx("span", { className: "ml-1 font-mono animate-pulse text-gray-500 dark:text-gray-400", children: formatElapsed(elapsedSeconds) })] })] })] }) }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-xs font-medium text-right text-gray-900 dark:text-white", children: quote?.originAmountUsdDisplay }), _jsxs("div", { className: "text-xs text-gray-600 dark:text-gray-400", children: [quote?.originAmountFormatted, " ", quote?.originToken.symbol] })] })] }) }), showTimeoutWarning && (_jsx("div", { className: `w-full max-w-sm transition-all duration-500 ease-out delay-150 ${showContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"}`, children: _jsx("div", { className: "p-4 trails-border-radius-container text-sm bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700/50", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsxs("svg", { className: "w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [_jsx("title", { children: "Warning" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-yellow-800 dark:text-yellow-300", children: "Transaction taking longer than expected" }), _jsx("p", { className: "mt-1 text-xs text-yellow-700 dark:text-yellow-400", children: "This transaction is taking longer than expected. Please reach out to support for help if the issue persists." })] })] }) }) })), _jsx("div", { className: "mb-2 w-full mx-auto", style: { width: "auto" }, children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: `absolute left-2.5 top-5 bottom-5 w-0.5 transition-all duration-500 ease-out bg-gray-300 dark:bg-gray-700 ${showLine ? "animate-line-grow" : "h-0"}` }), activePendingIndex > 0 && showLine && (_jsx("div", { className: "absolute left-2.5 top-5 w-0.5 bg-green-500 transition-all duration-1000 ease-out", style: {
                                height: `${(activePendingIndex / (transactionStates.length - 1)) * 80}%`,
                                maxHeight: "calc(100% - 20px)",
                            } })), _jsx("div", { className: "space-y-6", children: effectiveStates.map((tx, index) => (_jsx("div", { className: "relative transition-all duration-300 ease-out", style: {
                                    transitionDelay: showDots ? `${index * 100}ms` : "0ms",
                                    transform: showDots ? "translateY(0)" : "translateY(-20px)",
                                    visibility: showDots ? "visible" : "hidden",
                                }, children: renderStep(tx, index) }, `${tx.transactionHash}-${index}`))) })] }) }), _jsx("div", { className: `w-full max-w-sm transition-all duration-500 ease-out delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: _jsx("div", { className: "mt-4", children: _jsx(QuoteDetails, { quote: quote, showContent: true }) }) })] }));
};
export default TransferPending;
