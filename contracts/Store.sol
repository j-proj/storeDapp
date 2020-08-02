// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Store is Ownable {

  struct Item {
    string name;
    uint256 value;
  }
  address public Owner;
  mapping (uint256 => Item) public itemsForSale;
  uint256 public itemCount = 0;

  event itemAdded(uint256 _idNumber, string _name, uint256 _value);

  function addItemsToSale(
    uint256 _idNum,
    string memory _name,
    uint256 _value
  )
      external
      onlyOwner()
  {
    itemsForSale[_idNum] = Item(
      {
        name: _name,
        value: _value
      }
    );
    itemCount++;
    emit itemAdded(_idNum, _name, _value);
  }

  function removeItemFromSale(uint256 _idNum) external onlyOwner() {
    delete itemsForSale[_idNum];
  }

  function changeOwnership(address _newOwner) public onlyOwner() {
    transferOwnership(_newOwner);
    emit OwnershipTransferred(msg.sender, _newOwner);
  }

}
