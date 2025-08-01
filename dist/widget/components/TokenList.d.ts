import type { SequenceIndexerGateway } from "@0xsequence/indexer";
import type React from "react";
import type { ActiveTheme } from "../../theme.js";
import type { Token } from "../hooks/useTokenList.js";
import type { Mode } from "../../mode.js";
interface TokenListProps {
    onContinue: (selectedToken: Token) => void;
    onBack: () => void;
    indexerGatewayClient: SequenceIndexerGateway;
    theme?: ActiveTheme;
    targetAmountUsd?: number | null;
    targetAmountUsdFormatted?: string | null;
    onError: (error: Error | string | null) => void;
    mode?: Mode;
}
export declare const TokenList: React.FC<TokenListProps>;
export default TokenList;
//# sourceMappingURL=TokenList.d.ts.map