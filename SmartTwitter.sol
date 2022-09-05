//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SmartTwitter {
    address public owner;
    uint256 public postCounter = 0;

    mapping(uint256 => address) authorOf;
    mapping(address => uint256) postOf;

    struct Post {
        uint256 postId;
        string title;
        string description;
        address author;
    }

    Post[] activePosts;

    constructor() public {
        owner = msg.sender;
    }

    function createPost(string memory _title, string memory _description)
        public
    {
        require(bytes(_title).length > 0, "Title can't be empty");
        require(bytes(_description).length > 0, "Description can't be empty");

        authorOf[postCounter] = msg.sender;
        postOf[msg.sender] = postCounter;
        postCounter++;

        activePosts.push(Post(postCounter, _title, _description, msg.sender));
    }

    function readPost() public returns (Post memory) {
        for (uint256 i = 0; i < activePosts.length; i++) {
            return (activePosts[i]);
        }
    }

    function updatePost(
        uint256 _postId,
        string memory _title,
        string memory _description
    ) public {
        require(bytes(_title).length > 0, "Title can't be empty");
        require(bytes(_description).length > 0, "Description can't be empty");
        require(authorOf[_postId] == msg.sender, "Unauthorised Editor");

        activePosts[_postId].title = _title;
        activePosts[_postId].description = _description;
    }

    function deletePost(uint256 _postId) public {
        require(authorOf[_postId] == msg.sender, "Unauthorised Editor");

        delete activePosts[_postId];

        postCounter--;
    }
}
