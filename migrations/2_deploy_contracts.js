var EthSwap = artifacts.require("./EthSwap.sol");
var Token = artifacts.require("./Token.sol")

module.exports = function(deployer) {
  deployer.deploy(Token);
  deployer.deploy(EthSwap);
};
