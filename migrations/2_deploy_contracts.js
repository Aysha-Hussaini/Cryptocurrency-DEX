var EthSwap = artifacts.require("./EthSwap.sol");
var Token = artifacts.require("./Token.sol")

module.exports = async function(deployer) {
  await deployer.deploy(Token, 1000000);
  let token = await Token.deployed();

  await deployer.deploy(EthSwap, token.address);
  let ethSwap = await EthSwap.deployed();

  await token.transfer(ethSwap.address, web3.utils.toWei('1000000', 'ether'));

};
 