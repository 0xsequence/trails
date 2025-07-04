import type { SequenceIndexerGateway } from "@0xsequence/indexer";
import type React from "react";
import type { ActiveTheme } from "../../theme.js";
interface Token {
    id: number;
    name: string;
    symbol: string;
    balance: string;
    imageUrl: string;
    chainId: number;
    contractAddress: string;
    balanceUsdFormatted: string;
    tokenPriceUsd: number;
    contractInfo?: {
        decimals: number;
        symbol: string;
        name: string;
    };
}
interface TokenListProps {
    onContinue: (selectedToken: Token) => void;
    onBack: () => void;
    indexerGatewayClient: SequenceIndexerGateway;
    theme?: ActiveTheme;
}
export declare const TokenList: React.FC<TokenListProps>;
export default TokenList;
//# sourceMappingURL=TokenList.d.ts.map