import { MaciKeyPair } from "@models/poll"
import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils"
import { Keypair } from "maci-domainobjs"

export function parseBigNumberToFloat(val: BigNumber, decimals: number = 18) {
  if (!val) {
    return 0
  }

  const formatted = formatUnits(val, decimals)
  const parsed = parseFloat(formatted)
  return parsed
}

export function getBaseLog(x: number, y: number): number {
  return Math.log(y) / Math.log(x)
}


export function genKeyPair(): MaciKeyPair {
  const keys = new Keypair()
  const keyPair = {
    sk: keys.privKey.serialize(),
    pk: keys.pubKey.serialize(),
  }
  return keyPair
}