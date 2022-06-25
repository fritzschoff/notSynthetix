import { ethers } from "hardhat";

async function main() {
  const deployableContractNames = ["FuturesPositionsManager"];

  for (const name of deployableContractNames) {
    const ContractFractory = await ethers.getContractFactory(name);
    const contract = await ContractFractory.deploy();
    await contract.deployed();
    console.log(`Success! ${name} deployed to '${contract.address}'`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
