// SPX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Dao {
    address public owner;
    uint256 nextProposal;
    uint256[] public validTokens;
}
