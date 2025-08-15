import type { SequenceIndexerGateway } from "@0xsequence/indexer";
import type React from "react";
import type { Token } from "../hooks/useTokenList.js";
import type { Mode } from "../../mode.js";
import type { SupportedToken } from "../../tokens.js";
interface TokenListProps {
    onContinue: (selectedToken: Token) => void;
    onBack: () => void;
    indexerGatewayClient: SequenceIndexerGateway;
    targetAmountUsd?: number | null;
    targetAmountUsdFormatted?: string | null;
    onError: (error: Error | string | null) => void;
    mode?: Mode;
    recentTokens?: SupportedToken[];
    onRecentTokenSelect?: (token: SupportedToken) => void;
    fundMethod?: string | null;
    renderInline?: boolean;
    onNavigateToFundMethods?: () => void;
}
export declare const TokenList: React.FC<TokenListProps>;
export default TokenList;
//# sourceMappingURL=TokenList.d.ts.map