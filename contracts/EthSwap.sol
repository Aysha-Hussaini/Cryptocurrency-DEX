pragma solidity >=0.6.0 <0.9.0;
import "./Token.sol";

contract EthSwap{
   //state variables
   string public name = "Ethereum Swap Instant Exchange";
   Token public token;

   uint public rate = 150;

   //constructor
   constructor (Token _token) public {
      token = _token;
   }

   function buyTokens() public payable{
      uint tokenAmt = msg.value * rate;
      token.transfer(msg.sender, tokenAmt);
   }

   
}