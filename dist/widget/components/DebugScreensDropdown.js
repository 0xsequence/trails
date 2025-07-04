import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useQueryParams } from "../../queryParams.js";
const SCREENS = [
    "Connect",
    "Tokens",
    "Send",
    "Wallet Confirmation",
    "Pending",
    "Receipt",
];
export const DebugScreensDropdown = ({ onScreenSelect, theme = "light", }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { hasParam } = useQueryParams();
    const shouldShow = hasParam("debug", "true");
    if (!shouldShow) {
        return null;
    }
    return (_jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsx("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: `p-1 rounded-full hover:bg-opacity-10 ${theme === "dark"
                    ? "hover:bg-white text-gray-400"
                    : "hover:bg-black text-gray-500"}`, children: _jsx(ChevronDown, { className: "w-4 h-4" }) }), isOpen && (_jsx("div", { className: `absolute bottom-full right-0 mb-1 w-40 border rounded-lg shadow-lg overflow-hidden ${theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"}`, children: SCREENS.map((screen) => (_jsx("button", { type: "button", onClick: () => {
                        onScreenSelect(screen);
                        setIsOpen(false);
                    }, className: `w-full text-left px-3 py-2 text-sm ${theme === "dark"
                        ? "text-gray-200 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-50"}`, children: screen }, screen))) }))] }));
};
export default DebugScreensDropdown;
