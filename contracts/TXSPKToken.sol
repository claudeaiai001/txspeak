// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract TXSPKToken is IERC20 {
    string public name = "TXSPK Token";
    string public symbol = "TXSPK";
    uint8 public decimals = 18;
    uint256 public override totalSupply = 1000000000 * 10**18; // 1 billion tokens
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => string) public userProfiles; // Store user display names
    mapping(address => uint256) public userInboxPrices; // Minimum price per message
    mapping(address => bool) public whitelistedUsers;
    
    address public owner;
    uint256 public burnedTokens;
    
    event TokensBurned(address indexed from, uint256 amount);
    event ProfileUpdated(address indexed user, string profile);
    event InboxPriceSet(address indexed user, uint256 price);
    event UserWhitelisted(address indexed user);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        _balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
    
    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, currentAllowance - amount);
        
        return true;
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(_balances[sender] >= amount, "ERC20: transfer amount exceeds balance");
        
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
    
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    function burn(uint256 amount) external {
        require(_balances[msg.sender] >= amount, "Insufficient balance to burn");
        _balances[msg.sender] -= amount;
        totalSupply -= amount;
        burnedTokens += amount;
        emit Transfer(msg.sender, address(0), amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    function setUserProfile(string memory profile) external {
        userProfiles[msg.sender] = profile;
        emit ProfileUpdated(msg.sender, profile);
    }
    
    function setInboxPrice(uint256 price) external {
        userInboxPrices[msg.sender] = price;
        emit InboxPriceSet(msg.sender, price);
    }
    
    function addToWhitelist(address user) external onlyOwner {
        whitelistedUsers[user] = true;
        emit UserWhitelisted(user);
    }
    
    function getUserProfile(address user) external view returns (string memory) {
        return userProfiles[user];
    }
    
    function getUserInboxPrice(address user) external view returns (uint256) {
        return userInboxPrices[user];
    }
}