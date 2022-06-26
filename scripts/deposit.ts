import dotenv from "dotenv";
dotenv.config();

import { BigNumber, ethers, providers } from "ethers";
import type { FuturesPositionsManager as FuturesPositionsManagerType } from "../typechain/FuturesPositionsManager";
import { FuturesPositionsManager } from "./contracts/FuturesPositionsManager";
import { sUSDToken } from "./contracts/sUSDToken";

const main = async () => {
  console.log("Initialising");

  const provider = new providers.StaticJsonRpcProvider(
    "https://kovan.optimism.io"
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const onesUSD = BigNumber.from(10).pow(18);

  console.log("Approving sUSD on wallet");
  const sUSDContract = new ethers.Contract(
    sUSDToken.address,
    sUSDToken.abi,
    wallet
  );
  const futuresPositionsManagerContract = new ethers.Contract(
    FuturesPositionsManager.address,
    FuturesPositionsManager.abi,
    wallet
  ) as FuturesPositionsManagerType;

  await sUSDContract.approve(
    FuturesPositionsManager.address,
    onesUSD.mul(1_000_000),
    {
      gasLimit: 500_000,
    }
  );

  console.log("Depositing 50 sUSD");
  await futuresPositionsManagerContract.deposit(onesUSD.mul(50), {
    gasLimit: 500_000,
  });
};

main();
