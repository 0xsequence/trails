import type { SupportedToken } from "../../tokens.js";
export declare function useRecentTokens(accountAddress?: string): {
    recentTokens: SupportedToken[];
    addRecentToken: (token: SupportedToken) => void;
    clearRecentTokens: () => void;
};
//# sourceMappingURL=useRecentTokens.d.ts.map