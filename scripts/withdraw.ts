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
  const walletAddress = await wallet.getAddress();

  const onesUSD = BigNumber.from(10).pow(18);

  const futuresPositionsManagerContract = new ethers.Contract(
    FuturesPositionsManager.address,
    FuturesPositionsManager.abi,
    wallet
  ) as FuturesPositionsManagerType;

  console.log("Withdrawing 50 sUSD");
  await futuresPositionsManagerContract.withdraw(
    onesUSD.mul(50),
    walletAddress,
    {
      gasLimit: 500_000,
    }
  );
};

main();
