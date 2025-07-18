import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TokenImage } from "@0xsequence/design-system";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
const _truncateHash = (hash) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};
export const TransferPending = ({ onComplete, theme = "light", transactionStates, fromAmount, fromAmountUsd, fromTokenSymbol, fromTokenName, fromChainId, fromTokenImageUrl, timestamp, }) => {
    const [showContent, setShowContent] = useState(false);
    const [activePendingIndex, setActivePendingIndex] = useState(-1);
    const [showDots, setShowDots] = useState(false);
    const [showLine, setShowLine] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onComplete]);
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
                    return `${baseStyles} ${theme === "dark" ? "bg-green-500" : "bg-green-600"} scale-100`;
                case "active":
                    return `${baseStyles} ${theme === "dark" ? "bg-blue-500" : "bg-blue-600"} scale-110`;
                case "failed":
                    return `${baseStyles} ${theme === "dark" ? "bg-red-500" : "bg-red-600"} scale-100`;
                case "pending":
                    return `${baseStyles} ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"} scale-100`;
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
            return `${baseStyles} ${theme === "dark" ? "text-white" : "text-gray-900"}`;
        };
        const content = (_jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsxs("div", { className: getCircleStyles(), children: [stepState === "completed" && _jsx(CheckmarkIcon, {}), stepState === "failed" && _jsx(XIcon, {}), stepState === "active" && _jsx(SpinnerIcon, {})] }) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: getTextStyles(), children: tx.label }), stepState === "completed" && (_jsx(ExternalLink, { className: "w-4 h-4 text-gray-400 transition-opacity duration-300" }))] }) })] }));
        if (stepState === "completed" || stepState === "failed") {
            return (_jsx("a", { href: tx.explorerUrl, target: "_blank", rel: "noopener noreferrer", className: "block hover:opacity-80 transition-all duration-300 ease-out", children: content }));
        }
        return _jsx("div", { className: "block", children: content });
    };
    return (_jsxs("div", { className: "space-y-8 flex flex-col items-center justify-center py-8", children: [_jsx("h2", { className: `text-2xl font-bold transition-all duration-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: "Transaction status" }), _jsx("div", { className: `w-full max-w-sm p-3 rounded-lg transition-all duration-500 ease-out delay-100 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${theme === "dark"
                    ? "bg-gray-800/50 text-gray-200"
                    : "bg-gray-50 text-gray-700"}`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { className: "flex items-start space-x-2", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { style: { width: "24px", height: "24px" }, children: _jsx(TokenImage, { src: fromTokenImageUrl, symbol: fromTokenSymbol, size: "sm", className: "w-24 h-24 w-full h-full", withNetwork: fromChainId, disableAnimation: true }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: `text-xs font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: fromTokenName }), _jsx("span", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, children: getTimeAgo() })] })] }) }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: `text-xs font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`, children: fromAmountUsd }), _jsxs("div", { className: `text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`, children: [fromAmount, " ", fromTokenSymbol] })] })] }) }), _jsx("div", { className: "w-full mx-auto", style: { width: "auto" }, children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: `absolute left-2.5 top-5 bottom-5 w-0.5 transition-all duration-500 ease-out ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} ${showLine ? "animate-line-grow" : "h-0"}` }), activePendingIndex > 0 && showLine && (_jsx("div", { className: "absolute left-2.5 top-5 w-0.5 bg-green-500 transition-all duration-1000 ease-out", style: {
                                height: `${(activePendingIndex / (transactionStates.length - 1)) * 80}%`,
                                maxHeight: "calc(100% - 20px)",
                            } })), _jsx("div", { className: "space-y-6", children: transactionStates.map((tx, index) => (_jsx("div", { className: "relative transition-all duration-300 ease-out", style: {
                                    transitionDelay: showDots ? `${index * 100}ms` : "0ms",
                                    transform: showDots ? "translateY(0)" : "translateY(-20px)",
                                    visibility: showDots ? "visible" : "hidden",
                                }, children: renderStep(tx, index) }, `${tx.transactionHash}-${index}`))) })] }) })] }));
};
export default TransferPending;
