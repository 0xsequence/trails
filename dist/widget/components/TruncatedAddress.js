import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { getExplorerUrlForAddress } from "../../explorer.js";
export const TruncatedAddress = ({ address, chainId, className = "", expandOnHover = false, }) => {
    const [isHovered, setIsHovered] = useState(false);
    const truncatedAddress = `${address.slice(0, 6)}…${address.slice(-4)}`;
    const explorerUrl = getExplorerUrlForAddress({ address, chainId });
    if (!expandOnHover) {
        return (_jsx("a", { href: explorerUrl, target: "_blank", rel: "noopener noreferrer", className: `font-mono cursor-pointer hover:underline ${className}`, children: truncatedAddress }));
    }
    return (_jsxs("a", { href: explorerUrl, target: "_blank", rel: "noopener noreferrer", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), className: `font-mono transition-all duration-300 cursor-pointer hover:underline relative inline-block ${className}`, children: [_jsx("span", { className: `transition-all duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`, children: truncatedAddress }), _jsx("span", { className: `absolute left-0 top-0 transition-all duration-300 underline ${isHovered ? "opacity-100" : "opacity-0"}`, children: address })] }));
};
export default TruncatedAddress;
