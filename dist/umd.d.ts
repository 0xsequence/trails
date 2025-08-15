import type { RelayerEnv } from "./relayer.js";
import type { Theme } from "./theme.js";
interface TrailsGlobal {
    render: (element: HTMLElement, options: {
        appId: string;
        indexerUrl?: string;
        apiUrl?: string;
        env?: RelayerEnv;
        toRecipient?: string;
        toAmount?: string;
        toChainId?: number | string;
        toToken?: string;
        toCalldata?: string;
        theme?: Theme;
    }) => void;
}
declare const TrailsGlobal: TrailsGlobal;
export default TrailsGlobal;
declare global {
    interface Window {
        TrailsWidget: TrailsGlobal;
    }
}
//# sourceMappingURL=umd.d.ts.map