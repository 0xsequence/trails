import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import TrailsLogoBlack from "../assets/Trails-logo-black.svg";
import TrailsLogoWhite from "../assets/Trails-logo-white.svg";
import { SITE_URL } from "../../constants.js";
import DebugScreensDropdown from "./DebugScreensDropdown.js";
export const Footer = ({ onDebugScreenSelect }) => {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.15 }, className: "mt-auto pt-4 text-center text-sm relative flex items-center justify-center text-gray-500 dark:text-gray-400", layout: true, children: [_jsx("div", { className: "absolute right-0 flex items-center h-full", children: _jsx(DebugScreensDropdown, { onScreenSelect: onDebugScreenSelect }) }), "Powered by\u00A0", _jsxs("a", { href: SITE_URL, target: "_blank", rel: "noopener noreferrer", className: "font-medium transition-colors hover:opacity-80 leading-none text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white", children: [_jsx("img", { src: TrailsLogoBlack, alt: "Trails", className: "h-4 inline-block dark:hidden" }), _jsx("img", { src: TrailsLogoWhite, alt: "Trails", className: "h-4 hidden dark:inline-block" })] })] }));
};
export default Footer;
