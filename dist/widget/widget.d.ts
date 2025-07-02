import "@0xsequence/design-system/preset";
import React from "react";
import type { RelayerEnv } from "../relayer.js";
import type { Theme } from "../theme.js";
export declare const defaultWalletOptions: string[];
export type AnyPayWidgetProps = {
    sequenceProjectAccessKey: string;
    sequenceIndexerUrl?: string;
    sequenceApiUrl?: string;
    sequenceEnv?: RelayerEnv;
    toAddress?: string;
    toAmount?: string;
    toChainId?: number | string;
    toToken?: string;
    toCalldata?: string;
    provider?: any;
    children?: React.ReactNode;
    renderInline?: boolean;
    theme?: Theme;
    walletOptions?: string[];
    onOriginConfirmation?: (txHash: string) => void;
    onDestinationConfirmation?: (txHash: string) => void;
    privyAppId?: string;
    privyClientId?: string;
    useSourceTokenForButtonText?: boolean;
    paymasterUrls?: Array<{
        chainId: number;
        url: string;
    }>;
    gasless?: boolean;
};
export declare const AnyPayWidget: (props: AnyPayWidgetProps) => import("react/jsx-runtime").JSX.Element;
export declare function ShadowPortal({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export default AnyPayWidget;
//# sourceMappingURL=widget.d.ts.map