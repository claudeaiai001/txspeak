from flask import Flask, jsonify
from flask_cors import CORS
from web3 import Web3
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Web3 setup
INFURA_URL = os.getenv('INFURA_URL')
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'network': 'sepolia',
        'connected': w3.is_connected(),
        'block_number': w3.eth.block_number if w3.is_connected() else None
    })

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'message': 'TXSPEAK Backend is running!',
        'web3_connected': w3.is_connected(),
        'latest_block': w3.eth.block_number if w3.is_connected() else None
    })

if __name__ == '__main__':
    print("Starting TXSPEAK Minimal Backend")
    print(f"Connected to Web3: {w3.is_connected()}")
    if w3.is_connected():
        print(f"Latest block: {w3.eth.block_number}")
    
    app.run(host='0.0.0.0', port=8001, debug=True)