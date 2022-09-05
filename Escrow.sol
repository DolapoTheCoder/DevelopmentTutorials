//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Escrow {
    //2 users
    //user a - deposits
    //user b - withdraws
    //check locked balance
    //timelock (funds sent back if user b
    //takes too many blocks to withdraw)

    address public userA;
    address public userB;
    uint256 public balance;
    uint256 public lockTime;

    constructor(address _userA, address _userB) {
        userA = _userA;
        userB = _userB;
    }

    function deposit() public payable returns (string memory, uint256) {
        require(msg.sender == userA, "Only User A can Deposit");
        balance += msg.value;
        lockTime = block.timestamp + 1 minutes;
        return ("User A Deposited", msg.value);
    }

    function returnDepo() public payable returns (string memory, uint256) {
        payable(userA).transfer(balance);
        balance = 0;
        return ("User A funds returned: ", balance);
    }

    function withdraw(uint256 withdrawAmount)
        public
        payable
        returns (string memory, uint256)
    {
        require(msg.sender == userB, "Only User B can Withdraw");
        require(withdrawAmount <= balance, "You can't withdraw this much!");
        if (block.timestamp > lockTime) {
            returnDepo();
        } else {
            payable(userB).transfer(withdrawAmount);
            balance -= withdrawAmount;
            return ("User B Withdrew: ", withdrawAmount);
        }
    }
}
