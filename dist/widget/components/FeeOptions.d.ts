import type React from "react";
import type { ActiveTheme } from "../../theme.js";
interface FeeToken {
    name: string;
    symbol: string;
    imageUrl: string;
    decimals: number;
}
interface FeeOptionsProps {
    options: FeeToken[];
    selectedOption?: FeeToken;
    onSelect: (option: FeeToken) => void;
    theme?: ActiveTheme;
}
export declare const FeeOptions: React.FC<FeeOptionsProps>;
export default FeeOptions;
//# sourceMappingURL=FeeOptions.d.ts.map