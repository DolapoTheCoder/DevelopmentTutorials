// SPX-License-Identifier: MIT

pragma solidity ^0.8.7;

//interface to check if a user owns an NFT
interface IdaoContract {
    function balanceOf(address, uint256) external view returns (uint256);
}

contract Dao {
    address public owner;
    uint256 nextProposal;
    uint256[] public validTokens;
    IdaoContract daoContract;

    constructor() {
        owner = msg.sender;
        nextProposal = 1;
        daoContract = IdaoContract(0x2953399124F0cBB46d2CbACD8A89cF0599974963);
        validTokens = [
            28683420907420253398025648574484751016562177994318263521192187972719585787905
        ];
    }

    struct proposal {
        uint256 id;
        bool exists;
        string descritption;
        uint256 deadline;
        uint256 votesUp;
        uint256 votesDown;
        address[] canVote;
        uint256 maxVotes;
        mapping(address => bool) voteStatus;
        bool countConducted;
        bool passed;
    }

    mapping(uint256 => proposal) public Proposals;

    event propsalCreated(
        uint256 id,
        string descriptions,
        uint256 maxVotes,
        address proposer
    );

    event newVote(
        uint256 votesUp,
        uint256 votesDown,
        address voter,
        uint256 proposal,
        bool votedFor
    );

    event propsalCount(uint256 id, bool passed);

    //checks if user owns NFT
    function checkProposalEligibility(address _proposalList)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < validTokens.length; i++) {
            if (daoContract.balanceOf(_proposalList, validTokens[i]) >= 1) {
                return true;
            }
        }
        return false;
    }

    //check if someone can vote on a proposal
    //for requirements in vote and proposals!
    function checkVoteEligibility(uint256 _id, address _voter)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < Proposals[_id].canVote.length; i++) {
            if (Proposals[_id].canVote[i] == _voter) {
                return true;
            }
        }
        return false;
    }

    function createProposals(
        string memory _description,
        address[] memory _canVote
    ) public {
        require(
            checkProposalEligibility(msg.sender),
            "Only NFT Holders can put forth Proposals"
        );

        proposal storage newProposal = Proposals[nextProposal];
        newProposal.id = nextProposal;
        newProposal.exists = true;
        newProposal.descritption = _description;
        newProposal.deadline = block.number + 100;
        newProposal.canVote = _canVote;
        newProposal.maxVotes = _canVote.length;

        emit propsalCreated(
            nextProposal,
            _description,
            _canVote.length,
            msg.sender
        );
        nextProposal++;
    }

    function voteOnProposal(uint256 _id, bool _vote) public {
        require(Proposals[_id].exists, "This Proposal doesn't exist.");
        require(
            checkVoteEligibility(_id, msg.sender),
            "You need to be added to canVote"
        );
        require(
            !Proposals[_id].voteStatus[msg.sender],
            "You've already voted on this proposal."
        );
        require(
            block.number <= Proposals[_id].deadline,
            "The Deadline has passed for this proposal"
        );
    }
}
