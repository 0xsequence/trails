import type { Hex } from "viem";
export type ERC20TransferParams = {
    recipient: string;
    amount: bigint;
};
export declare function getERC20TransferData({ recipient, amount, }: ERC20TransferParams): Hex;
//# sourceMappingURL=encoders.d.ts.map