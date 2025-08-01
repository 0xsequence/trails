import type React from "react";
import type { ActiveTheme } from "../../theme.js";
interface TruncatedAddressProps {
    address: string;
    chainId: number;
    theme?: ActiveTheme;
    className?: string;
    expandOnHover?: boolean;
}
export declare const TruncatedAddress: React.FC<TruncatedAddressProps>;
export default TruncatedAddress;
//# sourceMappingURL=TruncatedAddress.d.ts.map