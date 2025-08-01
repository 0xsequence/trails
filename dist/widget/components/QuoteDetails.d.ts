import type React from "react";
import type { ActiveTheme } from "../../theme.js";
import type { PrepareSendQuote } from "../../prepareSend.js";
interface QuoteDetailsProps {
    theme?: ActiveTheme;
    quote?: PrepareSendQuote | null;
    showContent?: boolean;
}
export declare const QuoteDetails: React.FC<QuoteDetailsProps>;
export default QuoteDetails;
//# sourceMappingURL=QuoteDetails.d.ts.map