// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  const depositAmount = hre.ethers.utils.parseEther("1");

  //test accounts
  const accounts = await hre.ethers.getSigners();

  owner1 = accounts[0];
  owner2 = accounts[1];
  owner3 = accounts[2];

  ownerList = [owner1.address, owner2.address, owner3.address];

  const minNumOfConfirmations = 3;

  const MultiSig = await hre.ethers.getContractFactory("MultiSig");
  const multisig = await MultiSig.deploy(ownerList, minNumOfConfirmations);

  await multisig.deployed();

  console.log(
    `Deployed MultiSig at: ${multisig.address}.`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
