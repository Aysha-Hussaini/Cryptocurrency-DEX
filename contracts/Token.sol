pragma solidity >=0.6.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{

  constructor() public ERC20("ExchangeToken", "EXT") {
    _mint(msg.sender, 1000000);
  }

}