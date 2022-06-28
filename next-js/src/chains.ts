import type { AddEthereumChainParameter } from "@web3-react/types"

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
}

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
}

const MOONRIVER: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Moonriver",
  symbol: "MOVR",
  decimals: 18,
}

const ONE: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Harmony ONE",
  symbol: "ONE",
  decimals: 18,
}

const TEST: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Hardhat TEST",
  symbol: "TEST",
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"]
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"]
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation
} = {
  //Hardhat
  31337: {
    urls: ["http://quadvoting.twilightparadox.com:8545"],
    name: "Hardhat",
    nativeCurrency: TEST,
  },
  // Harmony
  1666600000: {
    urls: ["https://api.harmony.one"],
    name: "Harmony Mainnet",
    nativeCurrency: ONE,
    blockExplorerUrls: ["https://explorer.harmony.one/"],
  },
  1666700000: {
    urls: ["https://api.s0.b.hmny.io"],
    name: "Harmony Testnet",
    nativeCurrency: ONE,
    blockExplorerUrls: ["https://explorer.pops.one/"],
  },
  1666900000: {
    urls: ["https://api.s0.ps.hmny.io"],
    name: "Harmony Devnet",
    nativeCurrency: ONE,
    blockExplorerUrls: ["https://explorer.ps.hmny.io/"],
  },
  1285: {
    urls: ["https://rpc.api.moonriver.moonbeam.network"].filter(
      (url) => url !== undefined
    ),
    name: "Moonriver",
    nativeCurrency: MOONRIVER,
    blockExplorerUrls: ["https://moonriver.moonscan.io"],
  },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs
  }

  return accumulator
}, {})
