import { Relayer } from "@0xsequence/wallet-core";
export type RelayerOperationStatus = Relayer.OperationStatus;
export type RpcRelayer = Relayer.Standard.Rpc.RpcRelayer;
export type RelayerConfig = {
    hostname: string;
    chainId: number;
    rpcUrl: string;
};
export type RelayerEnv = "local" | "cors-anywhere" | "dev" | "prod";
export type RelayerEnvConfig = {
    env?: RelayerEnv;
    useV3Relayers?: boolean;
};
export type { Relayer };
export declare function getBackupRelayer(chainId: number): Relayer.Standard.Rpc.RpcRelayer | undefined;
export declare function getRelayerUrl(config: RelayerEnvConfig | undefined, chainId: number): string;
export declare function getRelayer(config: RelayerEnvConfig | undefined, chainId: number): Relayer.Standard.Rpc.RpcRelayer;
export declare function useRelayers(config?: RelayerEnvConfig): {
    relayers: Map<number, Relayer.Standard.Rpc.RpcRelayer>;
    getRelayer: (chainId: number) => Relayer.Standard.Rpc.RpcRelayer;
    getBackupRelayer: (chainId: number) => Relayer.Standard.Rpc.RpcRelayer | undefined;
};
//# sourceMappingURL=relayer.d.ts.map