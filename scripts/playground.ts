import dotenv from "dotenv";
dotenv.config();

import { BigNumber, ethers, providers, utils } from "ethers";
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
    onesUSD.mul(100),
    {
      gasLimit: 500_000,
    }
  );

  // console.log("Depositing 100 sUSD");
  // await futuresPositionsManagerContract.deposit(onesUSD.mul(100), {
  //   gasLimit: 500_000,
  // });

  // console.log("Withdrawing 2 sUSD");
  // await futuresPositionsManagerContract.withdraw(
  //   onesUSD.mul(100),
  //   walletAddress,
  //   {
  //     gasLimit: 500_000,
  //   }
  // );

  // console.log("sUSD balance for current wallet");
  // console.log(
  //   (
  //     await futuresPositionsManagerContract.depositsByWalletAddress(
  //       walletAddress
  //     )
  //   ).toString()
  // );

  console.log("Opening position...");
  console.log(
    await futuresPositionsManagerContract.openPosition(
      onesUSD.mul(100),
      utils.parseUnits("0.02341128119406899", 18),
      utils.formatBytes32String("FuturesMarketBTC")
    )
  );
};

main();
