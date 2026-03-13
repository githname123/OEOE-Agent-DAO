import { defineConfig } from 'hardhat/config'

export default defineConfig({
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    xlayer: {
      url: 'https://xlayerrpc.okx.com',
      chainId: 1874,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      xlayer: process.env.OKX_API_KEY || '',
    },
    customChains: [
      {
        network: 'xlayer',
        chainId: 1874,
        urls: {
          apiURL: 'https://www.okx.com/api/explorer/xlayer',
          browserURL: 'https://www.okx.com/explorer/xlayer',
        },
      },
    ],
  },
})
