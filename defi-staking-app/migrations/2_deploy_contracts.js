const Tether = artifacts.require("Tether");
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer, network, accounts) {
  //deploying tether contract
  await deployer.deploy(Tether)
  const tether = await Tether.deployed();

  //deploying reward contract
  await deployer.deploy(RWD)
  const rwd = await RWD.deployed();

  //await deploying decentralbank
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  //Transfer RWD tokens to decentralbank
  await rwd.transfer(decentralBank.address, '1000000000000000000000000');

  //transfer 100 tether tokens to investor
  await tether.transfer(accounts[1], '100000000000000000000')
};
