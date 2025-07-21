from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3
from eth_account import Account
import os
import json
import time
from datetime import datetime
from dotenv import load_dotenv
import threading
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Web3 setup
INFURA_URL = os.getenv('INFURA_URL')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')
NETWORK = os.getenv('NETWORK', 'sepolia')

w3 = Web3(Web3.HTTPProvider(INFURA_URL))

# Contract addresses (will be set after deployment)
CONTRACT_ADDRESSES = {
    'txspk_token': None,
    'messaging': None,
    'presale': None
}

# Contract ABIs (simplified for essential functions)
TXSPK_TOKEN_ABI = [
    {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserProfile",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserInboxPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
]

MESSAGING_ABI = [
    {
        "inputs": [{"internalType": "uint256", "name": "messageId", "type": "uint256"}],
        "name": "getMessage",
        "outputs": [
            {"internalType": "address", "name": "sender", "type": "address"},
            {"internalType": "address", "name": "recipient", "type": "address"},
            {"internalType": "string", "name": "subject", "type": "string"},
            {"internalType": "string", "name": "content", "type": "string"},
            {"internalType": "string", "name": "ipfsHash", "type": "string"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"},
            {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
            {"internalType": "uint8", "name": "status", "type": "uint8"},
            {"internalType": "string", "name": "messageType", "type": "string"},
            {"internalType": "bool", "name": "encrypted", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserInbox",
        "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getLeaderboardData",
        "outputs": [
            {"internalType": "uint256", "name": "earned", "type": "uint256"},
            {"internalType": "uint256", "name": "spent", "type": "uint256"},
            {"internalType": "uint256", "name": "messagesReceived", "type": "uint256"},
            {"internalType": "uint256", "name": "messagesSent", "type": "uint256"},
            {"internalType": "uint256", "name": "avgResponseTime", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

PRESALE_ABI = [
    {
        "inputs": [],
        "name": "getPresaleStats",
        "outputs": [
            {"internalType": "uint256", "name": "_totalEthRaised", "type": "uint256"},
            {"internalType": "uint256", "name": "_totalTokensSold", "type": "uint256"},
            {"internalType": "uint256", "name": "_participantCount", "type": "uint256"},
            {"internalType": "uint256", "name": "_currentPhase", "type": "uint256"},
            {"internalType": "bool", "name": "_presaleActive", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentPhaseInfo",
        "outputs": [
            {"internalType": "uint256", "name": "price", "type": "uint256"},
            {"internalType": "uint256", "name": "startTime", "type": "uint256"},
            {"internalType": "uint256", "name": "endTime", "type": "uint256"},
            {"internalType": "uint256", "name": "maxTokens", "type": "uint256"},
            {"internalType": "uint256", "name": "soldTokens", "type": "uint256"},
            {"internalType": "bool", "name": "active", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

# In-memory cache for performance
cache = {
    'token_stats': {},
    'presale_stats': {},
    'leaderboard': {},
    'last_update': 0
}

# Helper functions
def wei_to_ether(wei_amount):
    return w3.fromWei(wei_amount, 'ether')

def ether_to_wei(ether_amount):
    return w3.toWei(ether_amount, 'ether')

def get_contract_instance(address, abi):
    return w3.eth.contract(address=address, abi=abi)

def update_cache():
    """Update cache with latest blockchain data"""
    global cache
    try:
        current_time = time.time()
        
        # Only update every 30 seconds to avoid rate limiting
        if current_time - cache['last_update'] < 30:
            return
            
        if CONTRACT_ADDRESSES['txspk_token']:
            token_contract = get_contract_instance(CONTRACT_ADDRESSES['txspk_token'], TXSPK_TOKEN_ABI)
            cache['token_stats'] = {
                'total_supply': token_contract.functions.totalSupply().call(),
                'name': token_contract.functions.name().call(),
                'symbol': token_contract.functions.symbol().call()
            }
        
        if CONTRACT_ADDRESSES['presale']:
            presale_contract = get_contract_instance(CONTRACT_ADDRESSES['presale'], PRESALE_ABI)
            stats = presale_contract.functions.getPresaleStats().call()
            phase_info = presale_contract.functions.getCurrentPhaseInfo().call()
            
            cache['presale_stats'] = {
                'total_eth_raised': wei_to_ether(stats[0]),
                'total_tokens_sold': stats[1],
                'participant_count': stats[2],
                'current_phase': stats[3],
                'presale_active': stats[4],
                'phase_price': wei_to_ether(phase_info[0]),
                'phase_start': phase_info[1],
                'phase_end': phase_info[2],
                'phase_max_tokens': phase_info[3],
                'phase_sold_tokens': phase_info[4],
                'phase_active': phase_info[5]
            }
        
        cache['last_update'] = current_time
        print(f"Cache updated at {datetime.now()}")
        
    except Exception as e:
        print(f"Error updating cache: {e}")

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'network': NETWORK,
        'connected': w3.isConnected(),
        'block_number': w3.eth.block_number if w3.isConnected() else None
    })

@app.route('/api/contracts', methods=['GET'])
def get_contracts():
    return jsonify({
        'contracts': CONTRACT_ADDRESSES,
        'network': NETWORK
    })

@app.route('/api/contracts', methods=['POST'])
def set_contracts():
    """Set contract addresses after deployment"""
    data = request.get_json()
    CONTRACT_ADDRESSES.update(data)
    return jsonify({'message': 'Contract addresses updated', 'contracts': CONTRACT_ADDRESSES})

@app.route('/api/token/stats', methods=['GET'])
def get_token_stats():
    update_cache()
    return jsonify({
        'success': True,
        'data': cache['token_stats']
    })

@app.route('/api/token/balance/<address>', methods=['GET'])
def get_token_balance(address):
    try:
        if not CONTRACT_ADDRESSES['txspk_token']:
            return jsonify({'error': 'Token contract not deployed yet'}), 400
            
        if not w3.isAddress(address):
            return jsonify({'error': 'Invalid address'}), 400
            
        token_contract = get_contract_instance(CONTRACT_ADDRESSES['txspk_token'], TXSPK_TOKEN_ABI)
        balance = token_contract.functions.balanceOf(address).call()
        
        return jsonify({
            'success': True,
            'balance': balance,
            'balance_formatted': w3.fromWei(balance, 'ether')
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/profile/<address>', methods=['GET'])
def get_user_profile(address):
    try:
        if not CONTRACT_ADDRESSES['txspk_token']:
            return jsonify({'error': 'Token contract not deployed yet'}), 400
            
        if not w3.isAddress(address):
            return jsonify({'error': 'Invalid address'}), 400
            
        token_contract = get_contract_instance(CONTRACT_ADDRESSES['txspk_token'], TXSPK_TOKEN_ABI)
        profile = token_contract.functions.getUserProfile(address).call()
        inbox_price = token_contract.functions.getUserInboxPrice(address).call()
        balance = token_contract.functions.balanceOf(address).call()
        
        return jsonify({
            'success': True,
            'profile': {
                'address': address,
                'display_name': profile if profile else address[:10] + '...',
                'inbox_price': inbox_price,
                'balance': balance,
                'balance_formatted': w3.fromWei(balance, 'ether')
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages/inbox/<address>', methods=['GET'])
def get_user_inbox(address):
    try:
        if not CONTRACT_ADDRESSES['messaging']:
            return jsonify({'error': 'Messaging contract not deployed yet'}), 400
            
        if not w3.isAddress(address):
            return jsonify({'error': 'Invalid address'}), 400
            
        messaging_contract = get_contract_instance(CONTRACT_ADDRESSES['messaging'], MESSAGING_ABI)
        inbox_ids = messaging_contract.functions.getUserInbox(address).call()
        
        messages = []
        for msg_id in inbox_ids[-10:]:  # Get last 10 messages
            try:
                msg_data = messaging_contract.functions.getMessage(msg_id).call()
                messages.append({
                    'id': msg_id,
                    'sender': msg_data[0],
                    'recipient': msg_data[1],
                    'subject': msg_data[2],
                    'content': msg_data[3],
                    'ipfsHash': msg_data[4],
                    'amount': msg_data[5],
                    'timestamp': msg_data[6],
                    'status': msg_data[7],
                    'messageType': msg_data[8],
                    'encrypted': msg_data[9]
                })
            except Exception as e:
                print(f"Error fetching message {msg_id}: {e}")
                continue
        
        return jsonify({
            'success': True,
            'messages': messages
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/presale/stats', methods=['GET'])
def get_presale_stats():
    update_cache()
    return jsonify({
        'success': True,
        'data': cache['presale_stats']
    })

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        if not CONTRACT_ADDRESSES['messaging']:
            return jsonify({'error': 'Messaging contract not deployed yet'}), 400
            
        # Mock leaderboard data for now
        # In a real implementation, this would aggregate data from all users
        mock_leaderboard = {
            'top_earners': [
                {'address': '0x742d35cc6ba9a8c0c1b0c4e2e0b9b8a2b1b7e8e1', 'earned': 12000, 'messages': 156},
                {'address': '0x742d35cc6ba9a8c0c1b0c4e2e0b9b8a2b1b7e8e2', 'earned': 8600, 'messages': 98},
                {'address': '0x742d35cc6ba9a8c0c1b0c4e2e0b9b8a2b1b7e8e3', 'earned': 6800, 'messages': 145}
            ],
            'top_senders': [
                {'address': '0x742d35cc6ba9a8c0c1b0c4e2e0b9b8a2b1b7e8e4', 'spent': 15000, 'messages': 203},
                {'address': '0x742d35cc6ba9a8c0c1b0c4e2e0b9b8a2b1b7e8e5', 'spent': 11200, 'messages': 89},
                {'address': '0x742d35cc6ba9a8c0c1b0c4e2e0b9b8a2b1b7e8e6', 'spent': 9800, 'messages': 167}
            ]
        }
        
        return jsonify({
            'success': True,
            'data': mock_leaderboard
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/nonce/<address>', methods=['GET'])
def get_auth_nonce(address):
    """Generate nonce for wallet authentication"""
    if not w3.isAddress(address):
        return jsonify({'error': 'Invalid address'}), 400
        
    nonce = f"Please sign this message to authenticate with TXSPEAK: {int(time.time())}"
    
    return jsonify({
        'success': True,
        'nonce': nonce
    })

@app.route('/api/auth/verify', methods=['POST'])
def verify_signature():
    """Verify signed message for wallet authentication"""
    data = request.get_json()
    address = data.get('address')
    message = data.get('message')
    signature = data.get('signature')
    
    if not all([address, message, signature]):
        return jsonify({'error': 'Missing required fields'}), 400
        
    try:
        # Recover address from signature
        message_hash = w3.keccak(text=message)
        recovered_address = w3.eth.account.recover_message(
            message_hash, 
            signature=signature
        )
        
        if recovered_address.lower() == address.lower():
            # Generate simple JWT-like token (in production, use proper JWT)
            token = f"{address}:{int(time.time())}"
            return jsonify({
                'success': True,
                'token': token,
                'address': address
            })
        else:
            return jsonify({'error': 'Invalid signature'}), 401
            
    except Exception as e:
        return jsonify({'error': f'Verification failed: {str(e)}'}), 401

# Background cache updater
def cache_updater():
    while True:
        update_cache()
        time.sleep(60)  # Update every minute

if __name__ == '__main__':
    print(f"Starting TXSPEAK Backend on {NETWORK} network")
    print(f"Connected to Web3: {w3.isConnected()}")
    print(f"Latest block: {w3.eth.block_number if w3.isConnected() else 'Not connected'}")
    
    # Start background cache updater
    cache_thread = threading.Thread(target=cache_updater, daemon=True)
    cache_thread.start()
    
    app.run(host='0.0.0.0', port=8001, debug=True)