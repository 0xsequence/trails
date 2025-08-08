import type React from "react";
import type { SupportedToken } from "../../tokens.js";
interface RecentTokensProps {
    recentTokens: SupportedToken[];
    onTokenSelect: (token: SupportedToken) => void;
    selectedToken?: SupportedToken | null;
}
export declare const RecentTokens: React.FC<RecentTokensProps>;
export default RecentTokens;
//# sourceMappingURL=RecentTokens.d.ts.map