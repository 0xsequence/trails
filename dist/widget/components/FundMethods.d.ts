import type React from "react";
export interface FundMethodsProps {
    onBack?: () => void;
    onSelectWalletConnect: () => void;
    onSelectExchange: () => void;
    onSelectConnectedAccount: () => void;
    onSelectQrCode: () => void;
}
declare const FundMethods: React.FC<FundMethodsProps>;
export default FundMethods;
//# sourceMappingURL=FundMethods.d.ts.map