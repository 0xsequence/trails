import { jsx as _jsx } from "react/jsx-runtime";
import { QRCodeSVG } from "qrcode.react";
export const QrCode = ({ url, size = 250, className = "", }) => {
    return (_jsx("div", { className: `inline-block ${className}`, children: _jsx(QRCodeSVG, { value: url, size: size, bgColor: "#FFFFFF", fgColor: "#000000", level: "M", marginSize: 0, imageSettings: {
                src: "https://demo.trails.build/favicon.ico",
                height: size * 0.15,
                width: size * 0.15,
                excavate: true,
            }, className: "rounded-lg border border-gray-200 dark:border-gray-700" }) }));
};
export default QrCode;
