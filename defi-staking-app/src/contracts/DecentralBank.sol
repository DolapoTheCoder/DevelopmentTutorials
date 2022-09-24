pragma solidity ^0.5.0;
import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    addres[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }

    //staking function
    function depostiTokens(uint256 _amount) public {
        require(_amount > 0, "Amount cannot be 0");
        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push[msg.sender];
        }

        //update staking balance
        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}
