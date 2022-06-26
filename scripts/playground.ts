import dotenv from "dotenv";
dotenv.config();

import { BigNumber, ethers, providers, utils } from "ethers";
import type { FuturesPositionsManager as FuturesPositionsManagerType } from "../typechain/FuturesPositionsManager";
import { FuturesPositionsManager } from "./contracts/FuturesPositionsManager";

const main = async () => {
  console.log("Initialising");

  const provider = new providers.StaticJsonRpcProvider(
    "https://kovan.optimism.io"
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const walletAddress = await wallet.getAddress();

  const onesUSD = BigNumber.from(10).pow(18);

  console.log("Approving sUSD on wallet");
  const futuresPositionsManagerContract = new ethers.Contract(
    FuturesPositionsManager.address,
    FuturesPositionsManager.abi,
    wallet
  ) as FuturesPositionsManagerType;

  console.log("Opening position...");

  // console.log(
  //   onesUSD.mul(50).toString(),
  //   utils.parseUnits("0.002340879861831907", 18).toString(),
  //   utils.formatBytes32String("FuturesMarketBTC").toString()
  // );

  console.log(
    await futuresPositionsManagerContract.openPosition(
      onesUSD.mul(50),
      utils.parseUnits("6.955117652074691", 18),
      utils.formatBytes32String("FuturesMarketLINK")
    )
  );

  // console.log("sUSD balance for current wallet");
  // console.log(
  //   (
  //     await futuresPositionsManagerContract.depositsByWalletAddress(
  //       walletAddress
  //     )
  //   ).toString()
  // );
};

main();
