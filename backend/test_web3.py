#!/usr/bin/env python3
from web3 import Web3
import os
from dotenv import load_dotenv

load_dotenv()

INFURA_URL = os.getenv('INFURA_URL')
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

print(f"Connected to Web3: {w3.is_connected()}")
if w3.is_connected():
    print(f"Latest block: {w3.eth.block_number}")
else:
    print("Not connected to network")