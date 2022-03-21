pragma solidity >=0.6.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{

  constructor(uint256 _supply) public ERC20("ForDex", "FDX") {
    _mint(msg.sender, _supply *(10 ** decimals()));
  }

}