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

        result =  await ethSwap.buyTokens({from : investor, value : web3.utils.toWei('1', 'ether')});
      })

      it('Buy tokens in exchange for ethereum for fixed price', async() => {
        let balance = await token.balanceOf(investor);
         assert.equal(balance.toString(), tokens('150') );

         let esBalance = await token.balanceOf(ethSwap.address);
         assert.equal(esBalance.toString(), tokens('999850'));

         let ethBalance = await web3.eth.getBalance(ethSwap.address)
         assert.equal(ethBalance, web3.utils.toWei('1', 'ether'));

         const event = result.logs[0].args;

         assert.equal(event.from, investor);
         assert.equal(event.tkn, token.address);
         assert.equal(event.amount.toString(), tokens('150').toString());
         assert.equal(event.rate.toString(), '150');
         
      })
      

   });

   describe('sell tokens', async() => {
      let result;
      before(async () => {
         await token.approve(ethSwap.address, tokens('150'), {from: investor});
         result = await ethSwap.sellTokens(tokens('150'), {from: investor});
      });

      it("sell tokens to exchange for ethereum for fixed price", async () =>{
         let balance = await token.balanceOf(investor);
         assert.equal(balance.toString(), tokens('0') ); 

         let esBalance = await token.balanceOf(ethSwap.address);
         assert.equal(esBalance.toString(), tokens('1000000'));

         let ethBalance = await web3.eth.getBalance(ethSwap.address)
         assert.equal(ethBalance, web3.utils.toWei('0', 'ether'));

         const event = result.logs[0].args;

         assert.equal(event.from, investor);
         assert.equal(event.tkn, token.address);
         assert.equal(event.amount.toString(), tokens('150'));
         assert.equal(event.rate.toString(), '150')

      })

   })
})