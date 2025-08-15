import React from "react";
export interface WalletConnectProps {
    onBack: () => void;
    onContinue: () => void;
    projectId?: string;
    onReconnectPreviousWallet?: () => void;
}
export declare const WalletConnectScreen: React.FC<WalletConnectProps>;
export default WalletConnectScreen;
//# sourceMappingURL=WalletConnect.d.ts.map