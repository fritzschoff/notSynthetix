import { ethers } from "hardhat";

const main = async () => {
  const baseURI = "https://kovan-optimistic.etherscan.io/address";
  const addresses = {
    AddressResolver: "0xb08b62e1cdfd37eCCd69A9ACe67322CCF801b3A6",
  };

  const FuturesNFTPositionF = await ethers.getContractFactory(
    "FuturesNFTPosition"
  );
  const FuturesNFTPositionC = await FuturesNFTPositionF.deploy();
  await FuturesNFTPositionC.deployed();
  console.log(`Deployed FuturesNFTPosition at ${FuturesNFTPositionC.address}`);

  const FuturesNFTPositionFactoryF = await ethers.getContractFactory(
    "FuturesNFTPositionFactory"
  );
  const FuturesNFTPositionFactoryC = await FuturesNFTPositionFactoryF.deploy(
    FuturesNFTPositionC.address
  );
  await FuturesNFTPositionFactoryC.deployed();
  console.log(
    `Deployed FuturesNFTPositionFactory at ${FuturesNFTPositionFactoryC.address}`
  );

  const FuturesPositionsManagerF = await ethers.getContractFactory(
    "FuturesPositionsManager"
  );

  const FuturesPositionsManagerC = await FuturesPositionsManagerF.deploy(
    addresses.AddressResolver,
    FuturesNFTPositionFactoryC.address
  );
  await FuturesPositionsManagerC.deployed();
  console.log(
    `Deployed FuturesPositionsManager at ${FuturesPositionsManagerC.address}`
  );

  [
    FuturesNFTPositionC,
    FuturesNFTPositionFactoryC,
    FuturesPositionsManagerC,
  ].forEach((contract) => {
    console.log(
      `Deployed ${contract.constructor.name} to ${baseURI}/${contract.address}`
    );
  });
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
