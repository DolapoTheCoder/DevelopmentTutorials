const MultiSig = artifacts.require("MultiSig");

module.exports = async function (deployer) {
    const minConfi = 2;
    await deployer.deploy(MultiSig, minConfi);
    
};
