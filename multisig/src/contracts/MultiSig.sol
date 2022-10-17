//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MultiSig {
    //transaction struct -> to, value, isConfirmed?, numOfConfirmations, data?
    //array of transactions
    //mapping for owners
    //events? Confirm; Revoke; Execute, Submit -> Transactions
    //events: deposit
    //constructor: list of owners (all appeneded in); minNumOfConfirmations
    //functions: deposit; submitTransactions; confirmTransactions; executeTransactions; revokeTransactions?; getTransactions

    struct Transaction {
        address to;
        uint256 value;
        string data;
        bool isConfirmed;
        uint256 numOfConfirmations;
        bool hasBeenExecuted;
    }

    mapping(address => bool) public isOwner;

    Transaction[] public transactions;

    uint256 public transCount;

    mapping(uint256 => Transaction) transMap;

    uint256 public executedCount;

    //mapping(uint256 => Transaction) executedTrans;

    Transaction[] public executedTransactions;

    address[] public owners;

    uint256 public minNumOfConfirmations;

    uint256 public walletBalance;

    //mapping mapping to check if a user confirmed transaction.
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Only owners can do this.");
        _;
    }

    constructor(uint256 _minNumOfConfirmations) {
        //        require(_owners.length > 1, "Must be more than one owner.");
        require(
            _minNumOfConfirmations > 0,
            "Minimum number of confirmations needs to be more than 0."
        );

        transCount = 0;
        executedCount = 0;

        isOwner[msg.sender] = true;
        owners.push(msg.sender);
    }

    function newOwner(address[] memory _owners) public onlyOwner {
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(!isOwner[owner], "Already an owner.");
            require(owner != address(0), "Only real addresses please.");

            isOwner[owner] = true;
            owners.push(owner);
        }
    }

    //deposit payable
    function deposit() public payable onlyOwner {
        require(msg.value > 0, "Must send a value greater than 0.");
        walletBalance += msg.value;
        // emit depositAmount(msg.sender, msg.value);
    }

    //submitTransactions
    function submit(
        address _to,
        uint256 _value,
        string memory _data
    ) public payable onlyOwner {
        require(_value > 0, "must be greate than 0");

        //uint256 txIndex = transactions.length;
        //uint256 txIndex = transCount;

        transactions.push(Transaction(_to, _value, _data, false, 0, false));
        //Transaction memory _transaction = transMap[txIndex];

        //_transaction.to = _to;
        //_transaction.value = _value;
        //_transaction.data = _data;
        //_transaction.isConfirmed = false;
        //_transaction.numOfConfirmations = 0;

        //transactions.push(_transaction);
        transCount++;

        //return _transaction.data;
    }

    //confirmTransactions
    function confirm(uint256 txIndex) public onlyOwner {
        require(
            transactions[txIndex].hasBeenExecuted == false,
            "You can't confirm an executed transaction"
        );
        transactions[txIndex].numOfConfirmations += 1;

        if (transactions[txIndex].numOfConfirmations >= minNumOfConfirmations) {
            transactions[txIndex].isConfirmed = true;
            isConfirmed[txIndex][msg.sender] = true;
        }
    }

    //count & mapping instead of array. (TICK)

    //executeTransactions
    function execute(uint256 txIndex) public payable onlyOwner {
        require(
            transactions[txIndex].numOfConfirmations >= minNumOfConfirmations,
            "Not enough confirmations."
        );
        require(
            transactions[txIndex].hasBeenExecuted == false,
            "This transaction has been executed already"
        );

        //send value to 'to' & move to executed trans
        address reciever = transactions[txIndex].to;
        uint256 amount = transactions[txIndex].value;

        //sent
        payable(reciever).transfer(amount * (10**18));

        executedCount += 1;

        executedTransactions.push(
            Transaction(
                transactions[txIndex].to,
                transactions[txIndex].value,
                transactions[txIndex].data,
                true,
                transactions[txIndex].numOfConfirmations,
                true
            )
        );

        //remove from trans mapping
        //delete transMap[txIndex];
    }

    //revokeTransactions
    function revokeConfirmation(uint256 txIndex) public onlyOwner {
        require(
            transactions[txIndex].numOfConfirmations >= 1,
            "No confirmations"
        );
        require(isConfirmed[txIndex][msg.sender], "You didn't confirm!");

        isConfirmed[txIndex][msg.sender] = false;
        transactions[txIndex].numOfConfirmations -= 1;
    }

    //getTransactions
    function get(uint256 txIndex)
        public
        view
        returns (Transaction memory transaction)
    {
        Transaction memory getTran = transactions[txIndex];

        return getTran;
    }

    //getTransactions
    function getConfirmations(uint256 txIndex) public view returns (uint256) {
        uint256 getTranConfirmation = transactions[txIndex].numOfConfirmations;

        return getTranConfirmation;
    }

    function getAmount(uint256 txIndex) public view returns (uint256) {
        uint256 getTranAmount = transactions[txIndex].value;

        return getTranAmount;
    }

    function getBalanceOf(address _address) public view returns (uint256) {
        uint256 balanceOf = address(_address).balance;

        return balanceOf;
    }
}
