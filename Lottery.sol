//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "hardhat/console.sol";

contract Lottery {
    //users can buy a ticket
    //money is added to a 'pool'
    //after a pre-defined number of blocks is mined a winner is chosen
    //winner recieves all the fund from the pool
    address public owner;
    uint256 public lotteryPool;
    uint256 public playersCount = 1;
    mapping(address => bool) players;
    mapping(uint256 => address) whoIsPlayer;
    uint256 public minPlayers;
    uint256 public startTime;
    uint256 public lotteryTime = 3 minutes;
    address public winner;

    constructor(uint256 _minPlayers) {
        owner = msg.sender;
        minPlayers = _minPlayers;
    }

    function enterLottery() public payable {
        require(msg.value >= .01 ether, "Minimum cost to enter is 0.01 Ether");
        require(!players[msg.sender], "You cannot enter the lottery twice.");

        lotteryPool += msg.value;
        playersCount += 1;
        whoIsPlayer[playersCount] = msg.sender;
        players[msg.sender] = true;

        if (playersCount >= minPlayers + 1) {
            startTime = block.timestamp; //start time now that min users hit
            if (block.timestamp >= startTime + lotteryTime) {
                pickWinner();
            }
        }
    }

    function pickWinner() public {
        require(
            block.timestamp >= startTime + lotteryTime,
            "It's not lottery time yet"
        );
        //find random number between 1 and playersCount
        //return winners address
        //reset players count
        //reset lotterypool
        //loop through players and whoisplayers deleting everything

        uint256 randomNum = 0;
        while (randomNum == 0) {
            randomNum = random(playersCount);
        }
        winner = whoIsPlayer[randomNum];
        playersCount = 0;
        lotteryPool = 0;
        for (uint256 i = 0; i < playersCount; i++) {
            delete players[whoIsPlayer[i]];
            delete whoIsPlayer[i];
        }
        payWinner(winner);
        console.log(randomNum);
    }

    function payWinner(address winner) public payable {
        require(owner == msg.sender, "Only owner can pay Winner");
        payable(winner).transfer(address(this).balance);
    }

    function random(uint256 number) public view returns (uint256) {
        return (uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
            )
        ) % number);
    }
}
