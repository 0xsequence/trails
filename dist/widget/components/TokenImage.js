import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ChainImage } from "./ChainImage.js";
export const TokenImage = ({ imageUrl, symbol, chainId, size = 24, }) => {
    const [imageError, setImageError] = React.useState(false);
    imageUrl = imageUrl?.replace("/small/", "/large/");
    const displaySymbol = symbol?.[0]?.toUpperCase() || "?";
    const handleImageError = () => {
        setImageError(true);
    };
    const shouldShowText = !imageUrl || imageError;
    return (_jsxs("div", { className: `rounded-full flex items-center justify-center text-sm relative bg-gray-900`, style: { width: size, height: size }, children: [shouldShowText ? (_jsx("div", { className: "absolute w-full h-full rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-medium text-xs", children: displaySymbol }) })) : (_jsx("img", { src: imageUrl, alt: symbol || "Token", className: "absolute w-full h-full rounded-full object-contain", onError: handleImageError })), chainId && (_jsx("div", { className: "absolute", style: { right: "-2%", bottom: "-2%" }, children: _jsx("div", { className: "border-1 border-black rounded-full", children: _jsx(ChainImage, { chainId: chainId, size: Math.round(size * 0.4) }) }) }))] }));
};
export default TokenImage;
