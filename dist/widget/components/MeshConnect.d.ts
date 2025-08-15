import type React from "react";
import type { PrepareSendQuote } from "../../prepareSend.js";
export interface MeshConnectProps {
    onBack: () => void;
    toTokenSymbol?: string;
    onComplete?: (transferData: any) => void;
    toTokenAmount?: string;
    toChainId?: number;
    toRecipientAddress?: string;
    quote?: PrepareSendQuote | null;
}
export declare const MeshConnect: React.FC<MeshConnectProps>;
export default MeshConnect;
//# sourceMappingURL=MeshConnect.d.ts.map