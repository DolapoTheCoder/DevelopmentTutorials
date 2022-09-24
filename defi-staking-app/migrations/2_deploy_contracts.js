const Tether = artifacts.require("Tether");
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer) {
  //deploying tether contract
  await deployer.deploy(Tether);

  //deploying reward contract
  await deployer.deploy(RWD);

  //await deploying decentralbank
  await deployer.deploy(DecentralBank);
};
