// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./TXSPKToken.sol";

contract MessagingContract {
    TXSPKToken public txspkToken;
    
    struct Message {
        uint256 id;
        address sender;
        address recipient;
        string subject;
        string content;
        string ipfsHash;
        uint256 amount;
        uint256 timestamp;
        MessageStatus status;
        string messageType; // whale, founder, consultant, etc.
        bool encrypted;
    }
    
    enum MessageStatus { Pending, Accepted, Rejected, Refunded, Read }
    
    mapping(uint256 => Message) public messages;
    mapping(address => uint256[]) public userInbox;
    mapping(address => uint256[]) public userSentMessages;
    mapping(address => uint256) public userEarnings;
    mapping(address => uint256) public userSpent;
    mapping(address => uint256) public responseCount;
    mapping(address => uint256) public totalResponseTime;
    
    uint256 public messageCounter;
    
    event MessageSent(
        uint256 indexed messageId,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        string messageType
    );
    
    event MessageAccepted(uint256 indexed messageId, address indexed recipient);
    event MessageRejected(uint256 indexed messageId, address indexed recipient);
    event MessageRefunded(uint256 indexed messageId, address indexed sender, uint256 amount);
    event EarningsWithdrawn(address indexed user, uint256 amount);
    
    constructor(address _txspkToken) {
        txspkToken = TXSPKToken(_txspkToken);
    }
    
    function sendMessage(
        address recipient,
        string memory subject,
        string memory content,
        string memory ipfsHash,
        uint256 amount,
        string memory messageType,
        bool encrypted
    ) external returns (uint256) {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(content).length > 0, "Content cannot be empty");
        
        // Check if recipient has minimum price requirement
        uint256 minPrice = txspkToken.getUserInboxPrice(recipient);
        require(amount >= minPrice, "Amount below recipient's minimum price");
        
        // Transfer TXSPK tokens to this contract (escrow)
        require(
            txspkToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        
        messageCounter++;
        
        messages[messageCounter] = Message({
            id: messageCounter,
            sender: msg.sender,
            recipient: recipient,
            subject: subject,
            content: content,
            ipfsHash: ipfsHash,
            amount: amount,
            timestamp: block.timestamp,
            status: MessageStatus.Pending,
            messageType: messageType,
            encrypted: encrypted
        });
        
        userInbox[recipient].push(messageCounter);
        userSentMessages[msg.sender].push(messageCounter);
        userSpent[msg.sender] += amount;
        
        emit MessageSent(messageCounter, msg.sender, recipient, amount, messageType);
        
        return messageCounter;
    }
    
    function acceptMessage(uint256 messageId) external {
        Message storage message = messages[messageId];
        require(message.recipient == msg.sender, "Not the recipient");
        require(message.status == MessageStatus.Pending, "Message not pending");
        
        message.status = MessageStatus.Accepted;
        
        // Transfer escrowed tokens to recipient
        require(
            txspkToken.transfer(message.recipient, message.amount),
            "Token transfer failed"
        );
        
        userEarnings[message.recipient] += message.amount;
        
        emit MessageAccepted(messageId, msg.sender);
    }
    
    function rejectMessage(uint256 messageId) external {
        Message storage message = messages[messageId];
        require(message.recipient == msg.sender, "Not the recipient");
        require(message.status == MessageStatus.Pending, "Message not pending");
        
        message.status = MessageStatus.Rejected;
        
        // Refund tokens to sender
        require(
            txspkToken.transfer(message.sender, message.amount),
            "Token refund failed"
        );
        
        userSpent[message.sender] -= message.amount;
        
        emit MessageRejected(messageId, msg.sender);
        emit MessageRefunded(messageId, message.sender, message.amount);
    }
    
    function markAsRead(uint256 messageId) external {
        Message storage message = messages[messageId];
        require(message.recipient == msg.sender, "Not the recipient");
        require(message.status == MessageStatus.Accepted, "Message not accepted");
        
        message.status = MessageStatus.Read;
        
        // Record response time for leaderboard
        uint256 responseTime = block.timestamp - message.timestamp;
        responseCount[msg.sender]++;
        totalResponseTime[msg.sender] += responseTime;
    }
    
    function getUserInbox(address user) external view returns (uint256[] memory) {
        return userInbox[user];
    }
    
    function getUserSentMessages(address user) external view returns (uint256[] memory) {
        return userSentMessages[user];
    }
    
    function getMessage(uint256 messageId) external view returns (
        address sender,
        address recipient,
        string memory subject,
        string memory content,
        string memory ipfsHash,
        uint256 amount,
        uint256 timestamp,
        MessageStatus status,
        string memory messageType,
        bool encrypted
    ) {
        Message memory message = messages[messageId];
        return (
            message.sender,
            message.recipient,
            message.subject,
            message.content,
            message.ipfsHash,
            message.amount,
            message.timestamp,
            message.status,
            message.messageType,
            message.encrypted
        );
    }
    
    function getAverageResponseTime(address user) external view returns (uint256) {
        if (responseCount[user] == 0) return 0;
        return totalResponseTime[user] / responseCount[user];
    }
    
    function getLeaderboardData(address user) external view returns (
        uint256 earned,
        uint256 spent,
        uint256 messagesReceived,
        uint256 messagesSent,
        uint256 avgResponseTime
    ) {
        return (
            userEarnings[user],
            userSpent[user],
            userInbox[user].length,
            userSentMessages[user].length,
            getAverageResponseTime(user)
        );
    }
}