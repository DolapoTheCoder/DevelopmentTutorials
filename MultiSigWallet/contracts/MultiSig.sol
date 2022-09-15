//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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
        bytes data;
        bool isConfirmed;
        uint256 numOfConfirmations;
    }

    mapping(address => bool) public isOwner;
    Transaction[] public transactions;
    uint256 public transCount;
    mapping(uint256 => Transaction) transMap;
    uint256 public executedCount;
    mapping(uint256 => Transaction) executedTrans;
    address[] public owners;
    uint256 public minNumOfConfirmations;
    uint256 public walletBalance;

    //mapping mapping to check if a user confirmed transaction.
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Only owners can do this.");
        _;
    }

    //events

    event depositAmount(address indexed from, uint256 amount);
    event submitTransaction(
        address indexed owner,
        address indexed to,
        uint256 value,
        bytes data,
        uint256 indexed txIndex
    );
    event confirmTransaction(
        Transaction transaction,
        uint256 indexed txIndex,
        bool confirmed
    );
    event revokeTransaction(Transaction transaction, uint256 indexed txIndex);
    event executeTransaction(Transaction transaction, uint256 indexed txIndex);
    event submitTransaction(Transaction transaction, uint256 indexed txIndex);

    constructor(address[] memory _owners, uint256 _minNumOfConfirmations) {
        require(_owners.length > 1, "Must be more than one owner.");
        require(
            _minNumOfConfirmations >= owners.length &&
                _minNumOfConfirmations > 0,
            "Minimum number of confirmations needs to be lower than amount of owners."
        );

        transCount = 0;
        executedCount = 0;

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
        walletBalance += msg.value;
        emit depositAmount(msg.sender, msg.value);
    }

    //submitTransactions
    function submit(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public payable onlyOwner {
        require(_value >= 0, "must be greate than 0");

        //uint256 txIndex = transactions.length;

        //transactions.push(Transaction(_to, _value, _data, false, 0));

        transMap[transCount].to = _to;
        transMap[transCount].value = _value;
        transMap[transCount].data = _data;
        transMap[transCount].isConfirmed = false;
        transMap[transCount].numOfConfirmations = 0;

        emit submitTransaction(msg.sender, _to, _value, _data, transCount);
    }

    //confirmTransactions
    function confirm(uint256 txIndex) public onlyOwner {
        transMap[txIndex].numOfConfirmations += 1;

        if (transMap[txIndex].numOfConfirmations >= minNumOfConfirmations) {
            transMap[txIndex].isConfirmed = true;
            isConfirmed[txIndex][msg.sender] = true;
            emit confirmTransaction(transMap[txIndex], txIndex, true);
        } else {
            emit confirmTransaction(transMap[txIndex], txIndex, false);
        }
    }

    //count & mapping instead of array. (TICK)

    //executeTransactions
    function execute(uint256 txIndex) public payable onlyOwner {
        require(
            transMap[txIndex].numOfConfirmations >= minNumOfConfirmations,
            "Not enough confirmations."
        );

        //send value to 'to' & move to executed trans
        address reciever = transMap[txIndex].to;
        uint256 amount = transMap[txIndex].value;

        //sent
        payable(reciever).transfer(amount);

        executedCount += 1;

        Transaction memory _transaction = executedTrans[executedCount];

        _transaction.to = transMap[txIndex].to;
        _transaction.value = transMap[txIndex].value;
        _transaction.data = transMap[txIndex].data;
        _transaction.isConfirmed = true;
        _transaction.numOfConfirmations = transMap[txIndex].numOfConfirmations;

        //take away from balance
        walletBalance -= transMap[txIndex].value;

        //remove from trans mapping
        delete transMap[txIndex];

        emit executeTransaction(executedTrans[executedCount], executedCount);
    }

    //revokeTransactions
    function revokeConfirmation(uint256 txIndex) public onlyOwner {
        require(transMap[txIndex].numOfConfirmations >= 1, "No confirmations");
        require(isConfirmed[txIndex][msg.sender], "You didn't confirm!");

        isConfirmed[txIndex][msg.sender] = false;
        transMap[txIndex].numOfConfirmations -= 1;

        emit revokeTransaction(transMap[txIndex], txIndex);
    }

    //getTransactions
    function get(uint256 txIndex)
        public
        view
        returns (Transaction memory transaction)
    {
        Transaction memory getTran = transMap[txIndex];

        return getTran;
    }
}
