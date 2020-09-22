import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const contractAddresses = {
  sushi: {
    1: '0xe54f9e6ab80ebc28515af8b8233c1aee6506a15e',
  },
  masterChef: {
    1: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  PASTA 0xe54f9e6ab80ebc28515af8b8233c1aee6506a15e
1  PASTA/ETH 0xe92346d9369fe03b735ed9bdeb6bdc2591b8227e
*/

export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {
      1: '0xe92346d9369fe03b735ed9bdeb6bdc2591b8227e',
    },
    tokenAddresses: {
      1: '0xe54f9e6ab80ebc28515af8b8233c1aee6506a15e',
    },
    name: 'Spaghetti LP',
    symbol: 'PASTA-ETH UNI-V2 LP',
    tokenSymbol: 'WINE',
    icon: '🦄',
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0xe54f9e6ab80ebc28515af8b8233c1aee6506a15e',
    },
    tokenAddresses: {
      1: '0xe54f9e6ab80ebc28515af8b8233c1aee6506a15e',
    },
    name: 'Spaghetti',
    symbol: 'PASTA',
    tokenSymbol: 'WINE',
    icon: '🍝',
  },
]
