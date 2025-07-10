interface TrailsGlobal {
    render: (element: HTMLElement, options: {
        sequenceProjectAccessKey: string;
        indexerUrl?: string;
        apiUrl?: string;
        env?: "local" | "cors-anywhere" | "dev" | "prod";
        toRecipient?: string;
        toAmount?: string;
        toChainId?: number | string;
        toToken?: "USDC" | "ETH";
        toCalldata?: string;
        theme?: "light" | "dark" | "auto";
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