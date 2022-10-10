const MultiSig = artifacts.require('MultiSig');

module.exports = async function(deployer) {
    await deployer.deploy(MultiSig)
};