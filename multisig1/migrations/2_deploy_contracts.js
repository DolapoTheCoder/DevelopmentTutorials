const MultiSig = artifacts.require("MultiSig");

module.exports = function (deployer) {
    const minConfi = 2;
    deployer.deploy(MultiSig, minConfi);  
};
