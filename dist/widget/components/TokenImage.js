import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from "react";
import { ChainImage } from "./ChainImage.js";
import { getCommonTokenImageUrl } from "../../tokens.js";
export const TokenImage = ({ imageUrl, symbol, chainId, size = 24, }) => {
    const [imageError, setImageError] = React.useState(false);
    const effectiveImageUrl = useMemo(() => {
        if (imageUrl) {
            return imageUrl.replace("/small/", "/large/");
        }
        else if (symbol) {
            return getCommonTokenImageUrl({ symbol, chainId });
        }
        return null;
    }, [imageUrl, symbol, chainId]);
    const displaySymbol = symbol?.[0]?.toUpperCase() || "?";
    const handleImageError = () => {
        setImageError(true);
    };
    const shouldShowText = !effectiveImageUrl || imageError;
    return (_jsxs("div", { className: `rounded-full flex items-center justify-center text-sm relative bg-gray-900`, style: {
            minWidth: size,
            minHeight: size,
            maxWidth: size,
            maxHeight: size,
            width: size,
            height: size,
        }, title: `${symbol}${chainId ? `on chain ${chainId}` : ""}`, children: [shouldShowText ? (_jsx("div", { className: "absolute w-full h-full rounded-full flex items-center justify-center", title: symbol?.length && symbol.length > 1 ? `Token: ${symbol}` : "", children: _jsx("span", { className: "text-white font-medium text-xs", children: displaySymbol }) })) : (_jsx("img", { src: effectiveImageUrl, alt: symbol || "Token", className: "absolute w-full h-full rounded-full object-contain", onError: handleImageError, title: `Token: ${symbol}`, style: {
                    width: size,
                    height: size,
                } })), chainId && (_jsx("div", { className: "absolute", style: { right: "-2%", bottom: "-2%" }, children: _jsx("div", { className: "border-1 border-black rounded-full", children: _jsx(ChainImage, { chainId: chainId, size: Math.round(size * 0.4) }) }) }))] }));
};
export default TokenImage;
