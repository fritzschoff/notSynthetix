import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.4" }, { version: "0.5.16" }],
  },
  defaultNetwork: "kovan-ovm",
  networks: {
    "mainnet-ovm": {
      url: process.env.OVM_PROVIDER_URL || "https://mainnet.optimism.io/",
      chainId: 10,
    },
    "kovan-ovm": {
      url: process.env.OVM_PROVIDER_URL || "https://kovan.optimism.io/",
      chainId: 69,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
