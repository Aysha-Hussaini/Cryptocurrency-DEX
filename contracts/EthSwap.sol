pragma solidity >=0.6.0 <0.9.0;
import "./Token.sol";

contract EthSwap{
   //state variables
   string public name = "Ethereum Swap Instant Exchange";
   Token public token;

   uint public rate = 150;

   event TokensPurchased(
      address from,
      address tkn,
      uint amount, 
      uint rate
      );

   event TokensSold(
      address from,
      address tkn,
      uint amount, 
      uint rate
      );

   //constructor
   constructor (Token _token) public {
      token = _token;
   }

   function buyTokens() public payable{
      uint tokenAmt = msg.value * rate;
      require(token.balanceOf(address(this)) >=  tokenAmt); 

      token.transfer(msg.sender, tokenAmt);

      emit TokensPurchased(msg.sender, address(token) , tokenAmt, rate);
   }

   function sellTokens(uint _amount) public {
      uint ethAmt = _amount/rate;
      //address payable seller = payable(msg.sender);

      require(token.balanceOf(msg.sender) >= _amount);
      token.transferFrom(msg.sender, address(this), _amount);

      require(address(this).balance >= ethAmt);
      payable(msg.sender).transfer(ethAmt);

      emit TokensSold(msg.sender, address(token), _amount, rate);

   }

   
}