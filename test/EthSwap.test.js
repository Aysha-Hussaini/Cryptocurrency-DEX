const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
.use(require('chai-as-promised'))
.should()

function tokens(n){
  return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', ([deployer, investor]) => {
   let token, ethSwap;

   before(async() => {
      token = await Token.new('1000000');
      ethSwap = await EthSwap.new(token.address);
      await token.transfer(ethSwap.address, tokens('1000000'));
   })

   describe('EthSwap deployment', async() =>{
      it('contract has name ', async() => {
         let name = await ethSwap.name();
         assert.equal(name, "Ethereum Swap Instant Exchange");
      })
      it ('contract has tokens', async() => {
         let balance = await token.balanceOf(ethSwap.address);
         assert.equal(balance.toString(), tokens('1000000'))
      })
   })

   describe('token deployment', async() => {
      it("token name", async() => {
         let name = await token.name();
         assert.equal(name, "ForDex");
      })
   })

   describe('buy tokens', async () => {
      let result;

      before(async () => {

        result =  await ethSwap.buyTokens({from : investor, value : '1'});
      })

      it('Buy tokens in exchange for ethereum for fixed price', async() => {
        let balance = await
         token.balanceOf(investor);
         assert.equal(balance.toString(), '150' );
      })
      

   })
})