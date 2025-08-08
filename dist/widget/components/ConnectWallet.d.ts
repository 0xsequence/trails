import React from "react";
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
    walletOptions: WalletOption[];
}
export declare const ConnectWallet: React.FC<ConnectWalletProps>;
export default ConnectWallet;
//# sourceMappingURL=ConnectWallet.d.ts.map