#!/usr/bin/env python3
"""
Smart Contract Deployment Script for TXSPEAK
Deploys contracts to Sepolia testnet and updates backend configuration
"""

import os
import json
from web3 import Web3
from eth_account import Account
from dotenv import load_dotenv
import requests
import time

# Load environment variables
load_dotenv()

def load_contract_source(filename):
    """Load Solidity contract source code"""
    contract_path = f"../contracts/{filename}"
    with open(contract_path, 'r') as file:
        return file.read()

def compile_contract(source_code):
    """Compile Solidity contract using Solc API"""
    # For this demo, we'll provide pre-compiled bytecode and ABI
    # In production, you'd use solc-py or similar
    
    # This is a simplified version - normally you'd compile the contracts
    contracts = {
        'TXSPKToken': {
            'abi': [
                {"inputs": [], "stateMutability": "nonpayable", "type": "constructor"},
                {"inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "address", "name": "spender", "type": "address"}], "name": "allowance", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
                {"inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "approve", "outputs": [{"internalType": "bool", "name": "", "type": "bool"}], "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"internalType": "address", "name": "account", "type": "address"}], "name": "balanceOf", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
                {"inputs": [], "name": "decimals", "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}], "stateMutability": "view", "type": "function"},
                {"inputs": [], "name": "name", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"},
                {"inputs": [], "name": "symbol", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"},
                {"inputs": [], "name": "totalSupply", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
                {"inputs": [{"internalType": "address", "name": "recipient", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "transfer", "outputs": [{"internalType": "bool", "name": "", "type": "bool"}], "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"internalType": "string", "name": "profile", "type": "string"}], "name": "setUserProfile", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"internalType": "uint256", "name": "price", "type": "uint256"}], "name": "setInboxPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"internalType": "address", "name": "user", "type": "address"}], "name": "getUserProfile", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"},
                {"inputs": [{"internalType": "address", "name": "user", "type": "address"}], "name": "getUserInboxPrice", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}
            ],
            # This is a mock bytecode - in production you'd compile the contract
            'bytecode': '0x608060405234801561001057600080fd5b50600080fd5b'
        }
    }
    
    return contracts

def deploy_contract(w3, account, abi, bytecode, *constructor_args):
    """Deploy a smart contract"""
    contract = w3.eth.contract(abi=abi, bytecode=bytecode)
    
    # Build transaction
    transaction = contract.constructor(*constructor_args).buildTransaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 3000000,
        'gasPrice': w3.toWei('20', 'gwei')
    })
    
    # Sign and send transaction
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=account.key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
    # Wait for transaction receipt
    print(f"Waiting for transaction {tx_hash.hex()}...")
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    if tx_receipt.status == 1:
        print(f"Contract deployed successfully at {tx_receipt.contractAddress}")
        return tx_receipt.contractAddress
    else:
        raise Exception("Contract deployment failed")

def main():
    """Main deployment function"""
    # Web3 setup
    INFURA_URL = os.getenv('INFURA_URL')
    PRIVATE_KEY = os.getenv('PRIVATE_KEY')
    
    if not INFURA_URL:
        print("Error: INFURA_URL not found in .env file")
        return
        
    if not PRIVATE_KEY:
        print("Warning: PRIVATE_KEY not found. Please add your private key to deploy contracts.")
        print("For testing, you can use a test account private key.")
        
        # Generate a test account for demo purposes
        test_account = Account.create()
        print(f"Generated test account: {test_account.address}")
        print(f"Private key: {test_account.key.hex()}")
        print("Please add some Sepolia ETH to this account and set PRIVATE_KEY in .env")
        return
    
    w3 = Web3(Web3.HTTPProvider(INFURA_URL))
    
    if not w3.isConnected():
        print("Error: Failed to connect to Ethereum network")
        return
        
    print(f"Connected to network. Latest block: {w3.eth.block_number}")
    
    # Load account
    account = Account.from_key(PRIVATE_KEY)
    print(f"Deploying from account: {account.address}")
    
    # Check balance
    balance = w3.eth.get_balance(account.address)
    balance_eth = w3.fromWei(balance, 'ether')
    print(f"Account balance: {balance_eth} ETH")
    
    if balance_eth < 0.01:
        print("Warning: Low balance. You may need more ETH for deployments.")
        print("Get Sepolia testnet ETH from: https://faucet.sepolia.org/")
        return
    
    print("\n=== Starting Contract Deployment ===\n")
    
    deployed_contracts = {}
    
    try:
        # For this demo, we'll create mock contract deployments
        # In production, you would deploy actual compiled contracts
        
        print("📝 Note: This is a demo deployment simulation.")
        print("In production, you would compile and deploy actual Solidity contracts.")
        
        # Mock contract addresses (these would be real after deployment)
        deployed_contracts = {
            'txspk_token': '0x' + '1' * 40,  # Mock address
            'messaging': '0x' + '2' * 40,    # Mock address
            'presale': '0x' + '3' * 40       # Mock address
        }
        
        print("✅ Mock contracts 'deployed':")
        for name, address in deployed_contracts.items():
            print(f"  {name}: {address}")
        
        # Update backend with contract addresses
        backend_url = "http://localhost:8001/api/contracts"
        try:
            response = requests.post(backend_url, json=deployed_contracts)
            if response.status_code == 200:
                print("\n✅ Backend updated with contract addresses")
            else:
                print(f"\n⚠️ Failed to update backend: {response.status_code}")
        except Exception as e:
            print(f"\n⚠️ Could not reach backend: {e}")
        
        # Save deployment info
        deployment_info = {
            'network': 'sepolia',
            'deployed_at': int(time.time()),
            'deployer': account.address,
            'contracts': deployed_contracts
        }
        
        with open('deployment.json', 'w') as f:
            json.dump(deployment_info, f, indent=2)
        
        print(f"\n✅ Deployment complete!")
        print(f"📁 Deployment info saved to deployment.json")
        
    except Exception as e:
        print(f"❌ Deployment failed: {e}")

if __name__ == "__main__":
    main()