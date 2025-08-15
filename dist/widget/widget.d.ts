import "@0xsequence/design-system/preset";
import React from "react";
import type { RelayerEnv } from "../relayer.js";
import type { Theme } from "../theme.js";
import type { Mode } from "../mode.js";
import { AaveClient } from "@aave/react";
export declare const aaveClient: AaveClient;
export declare const defaultWalletOptions: string[];
export type TrailsWidgetProps = {
    appId: string;
    sequenceUseV3Relayers?: boolean;
    sequenceIndexerUrl?: string | null;
    sequenceApiUrl?: string | null;
    sequenceEnv?: RelayerEnv;
    toAddress?: string | null;
    toAmount?: string | null;
    toChainId?: number | string | null;
    toToken?: string | null;
    toCalldata?: string | null;
    children?: React.ReactNode;
    renderInline?: boolean;
    theme?: Theme;
    mode?: Mode;
    walletOptions?: string[];
    onOriginConfirmation?: (txHash: string, chainId: number) => void;
    onDestinationConfirmation?: (txHash: string, chainId: number) => void;
    privyAppId?: string;
    privyClientId?: string;
    walletConnectProjectId?: string;
    paymasterUrls?: Array<{
        chainId: number;
        url: string;
    }>;
    gasless?: boolean;
    buttonText?: string;
    customCss?: string;
    quoteProvider?: string;
    slippageTolerance?: number | string;
};
export interface TrailsWidgetRef {
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
}
export declare const TrailsWidget: React.ForwardRefExoticComponent<TrailsWidgetProps & React.RefAttributes<TrailsWidgetRef>>;
export declare function ShadowPortal({ children, customCss, }: {
    children: React.ReactNode;
    customCss?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare const createModalController: (ref: React.RefObject<TrailsWidgetRef>) => {
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
};
export default TrailsWidget;
//# sourceMappingURL=widget.d.ts.map