import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import TrailsLogoBlack from "../assets/Trails-logo-black.svg";
import TrailsLogoWhite from "../assets/Trails-logo-white.svg";
import DebugScreensDropdown from "./DebugScreensDropdown.js";
export const Footer = ({ theme, onDebugScreenSelect, }) => {
    const TrailsLogo = theme === "dark" ? TrailsLogoWhite : TrailsLogoBlack;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.15 }, className: `mt-auto pt-4 text-center text-sm relative flex items-center justify-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`, layout: true, children: [_jsx("div", { className: "absolute right-0 flex items-center h-full", children: _jsx(DebugScreensDropdown, { onScreenSelect: onDebugScreenSelect, theme: theme }) }), "Powered by\u00A0", _jsx("a", { href: "https://anypay.pages.dev/", target: "_blank", rel: "noopener noreferrer", className: `font-medium transition-colors hover:opacity-80 leading-none ${theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-black"}`, children: _jsx("img", { src: TrailsLogo, alt: "Trails", className: "h-4 inline-block" }) })] }));
};
export default Footer;
