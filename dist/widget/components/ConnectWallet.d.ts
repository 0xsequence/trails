import React from "react";
import type { ActiveTheme } from "../../theme.js";
export interface WalletOption {
    id: string;
    name: string;
    connector: () => void;
}
export interface ConnectWalletProps {
    onConnect: (walletId: string) => void;
    onDisconnect: () => void;
    onContinue: () => void;
    onError: (error: Error) => void;
    theme?: ActiveTheme;
    walletOptions: WalletOption[];
}
export declare const ConnectWallet: React.FC<ConnectWalletProps>;
export default ConnectWallet;
//# sourceMappingURL=ConnectWallet.d.ts.map