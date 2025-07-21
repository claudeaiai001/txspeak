// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./TXSPKToken.sol";

contract PresaleContract {
    TXSPKToken public txspkToken;
    
    struct PresalePhase {
        uint256 price; // ETH per TXSPK token (in wei)
        uint256 startTime;
        uint256 endTime;
        uint256 maxTokens;
        uint256 soldTokens;
        bool active;
    }
    
    struct UserPurchase {
        uint256 ethSpent;
        uint256 tokensReceived;
        uint256 timestamp;
    }
    
    mapping(uint256 => PresalePhase) public presalePhases;
    mapping(address => UserPurchase[]) public userPurchases;
    mapping(address => bool) public whitelisted;
    mapping(address => uint256) public userTotalSpent;
    
    uint256 public currentPhase;
    uint256 public totalEthRaised;
    uint256 public totalTokensSold;
    uint256 public participantCount;
    address public owner;
    bool public presaleActive;
    
    event TokensPurchased(
        address indexed buyer,
        uint256 ethAmount,
        uint256 tokenAmount,
        uint256 phase
    );
    
    event PresalePhaseStarted(uint256 phase, uint256 price, uint256 maxTokens);
    event PresaleEnded();
    event UserWhitelisted(address indexed user);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    modifier onlyWhitelisted() {
        require(whitelisted[msg.sender], "Not whitelisted");
        _;
    }
    
    constructor(address _txspkToken) {
        txspkToken = TXSPKToken(_txspkToken);
        owner = msg.sender;
        presaleActive = true;
        
        // Initialize Phase 1
        currentPhase = 1;
        presalePhases[1] = PresalePhase({
            price: 0.001 ether, // 1000 TXSPK per ETH
            startTime: block.timestamp,
            endTime: block.timestamp + 30 days,
            maxTokens: 100000000 * 10**18, // 100M tokens
            soldTokens: 0,
            active: true
        });
        
        emit PresalePhaseStarted(1, 0.001 ether, 100000000 * 10**18);
    }
    
    function buyTokens() external payable onlyWhitelisted {
        require(presaleActive, "Presale not active");
        require(msg.value > 0, "Must send ETH");
        
        PresalePhase storage phase = presalePhases[currentPhase];
        require(phase.active, "Current phase not active");
        require(block.timestamp >= phase.startTime, "Phase not started");
        require(block.timestamp <= phase.endTime, "Phase ended");
        
        uint256 tokenAmount = (msg.value * 10**18) / phase.price;
        require(phase.soldTokens + tokenAmount <= phase.maxTokens, "Exceeds phase limit");
        
        // Transfer tokens to buyer
        require(
            txspkToken.transfer(msg.sender, tokenAmount),
            "Token transfer failed"
        );
        
        // Update phase and user data
        phase.soldTokens += tokenAmount;
        totalTokensSold += tokenAmount;
        totalEthRaised += msg.value;
        
        // Record user purchase
        if (userPurchases[msg.sender].length == 0) {
            participantCount++;
        }
        
        userPurchases[msg.sender].push(UserPurchase({
            ethSpent: msg.value,
            tokensReceived: tokenAmount,
            timestamp: block.timestamp
        }));
        
        userTotalSpent[msg.sender] += msg.value;
        
        emit TokensPurchased(msg.sender, msg.value, tokenAmount, currentPhase);
    }
    
    function addToWhitelist(address[] memory users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            whitelisted[users[i]] = true;
            emit UserWhitelisted(users[i]);
        }
    }
    
    function startNextPhase(
        uint256 price,
        uint256 duration,
        uint256 maxTokens
    ) external onlyOwner {
        presalePhases[currentPhase].active = false;
        currentPhase++;
        
        presalePhases[currentPhase] = PresalePhase({
            price: price,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            maxTokens: maxTokens,
            soldTokens: 0,
            active: true
        });
        
        emit PresalePhaseStarted(currentPhase, price, maxTokens);
    }
    
    function endPresale() external onlyOwner {
        presaleActive = false;
        presalePhases[currentPhase].active = false;
        emit PresaleEnded();
    }
    
    function withdrawETH() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function getPresaleStats() external view returns (
        uint256 _totalEthRaised,
        uint256 _totalTokensSold,
        uint256 _participantCount,
        uint256 _currentPhase,
        bool _presaleActive
    ) {
        return (
            totalEthRaised,
            totalTokensSold,
            participantCount,
            currentPhase,
            presaleActive
        );
    }
    
    function getCurrentPhaseInfo() external view returns (
        uint256 price,
        uint256 startTime,
        uint256 endTime,
        uint256 maxTokens,
        uint256 soldTokens,
        bool active
    ) {
        PresalePhase memory phase = presalePhases[currentPhase];
        return (
            phase.price,
            phase.startTime,
            phase.endTime,
            phase.maxTokens,
            phase.soldTokens,
            phase.active
        );
    }
    
    function getUserPurchases(address user) external view returns (
        uint256[] memory ethAmounts,
        uint256[] memory tokenAmounts,
        uint256[] memory timestamps
    ) {
        UserPurchase[] memory purchases = userPurchases[user];
        uint256 length = purchases.length;
        
        ethAmounts = new uint256[](length);
        tokenAmounts = new uint256[](length);
        timestamps = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            ethAmounts[i] = purchases[i].ethSpent;
            tokenAmounts[i] = purchases[i].tokensReceived;
            timestamps[i] = purchases[i].timestamp;
        }
        
        return (ethAmounts, tokenAmounts, timestamps);
    }
}