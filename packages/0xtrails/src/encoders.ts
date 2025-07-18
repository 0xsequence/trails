import { AbiFunction, type Address } from "ox"
import type { Hex } from "viem"

export type ERC20TransferParams = {
  recipient: string
  amount: bigint
}

export function getERC20TransferData({
  recipient,
  amount,
}: ERC20TransferParams): Hex {
  const erc20Transfer = AbiFunction.from(
    "function transfer(address,uint256) returns (bool)",
  )
  return AbiFunction.encodeData(erc20Transfer, [
    recipient as Address.Address,
    amount,
  ]) as Hex
}
