import type React from "react";
import type { PrepareSendQuote } from "../../prepareSend.js";
interface QuoteDetailsProps {
    quote?: PrepareSendQuote | null;
    showContent?: boolean;
    children?: React.ReactNode;
    onExpand?: (isExpanded: boolean) => void;
}
export declare const QuoteDetails: React.FC<QuoteDetailsProps>;
export default QuoteDetails;
//# sourceMappingURL=QuoteDetails.d.ts.map