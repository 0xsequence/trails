import { jsx as _jsx } from "react/jsx-runtime";
import { NetworkImage } from "@0xsequence/design-system";
export const ChainImage = ({ chainId, size = 24, }) => {
    return (_jsx("div", { className: `rounded-full flex items-center justify-center text-sm relative bg-black-100 bg-opacity-90`, style: { width: size, height: size }, title: `Chain ID: ${chainId}`, children: _jsx(NetworkImage, { chainId: chainId ?? 0, size: "xl", className: "absolute w-full h-full text-white", disableAnimation: true }) }));
};
export default ChainImage;
