import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useQueryParams } from "../../queryParams.js";
const SCREENS = [
    "Connect",
    "Fund Methods",
    "Mesh Connect",
    "Wallet Connect",
    "Tokens",
    "Send Form",
    "Fund Form",
    "Earn Pools",
    "Wallet Confirmation",
    "Wallet Confirmation Retry",
    "Pending 1-item-0-confirmed",
    "Pending 1-item-1-confirmed",
    "Pending 2-item-0-confirmed",
    "Pending 2-item-1-confirmed",
    "Pending 2-item-2-confirmed",
    "Pending 3-item-0-confirmed",
    "Pending 3-item-1-confirmed",
    "Pending 3-item-2-confirmed",
    "Pending 3-item-3-confirmed",
    "Receipt",
    "Receipt Failed",
];
export const DebugScreensDropdown = ({ onScreenSelect, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { hasParam } = useQueryParams();
    const shouldShow = hasParam("debug", "true");
    if (!shouldShow) {
        return null;
    }
    return (_jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsx("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: "p-1 rounded-full hover:bg-opacity-10 hover:bg-gray-50 text-gray-900 dark:hover:bg-gray-800 dark:text-gray-200", children: _jsx(ChevronDown, { className: "w-4 h-4" }) }), isOpen && (_jsx("div", { className: "absolute bottom-full right-0 mb-1 w-40 border rounded-lg shadow-lg overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar bg-white border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200", children: SCREENS.map((screen) => (_jsx("button", { type: "button", onClick: () => {
                        onScreenSelect(screen?.toLowerCase().replaceAll(" ", "-"));
                        setIsOpen(false);
                    }, className: "w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700", children: screen }, screen))) }))] }));
};
export default DebugScreensDropdown;
