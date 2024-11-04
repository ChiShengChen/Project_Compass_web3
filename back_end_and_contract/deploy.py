# -*- coding: utf-8 -*-
import json
# from web3.middleware import geth_poa_middleware
from web3 import Web3
from web3.middleware import ExtraDataToPOAMiddleware

# 
w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/'))
# Add PoA middleware (if needed)
# w3.middleware_onion.inject(geth_poa_middleware, layer=0)
w3.middleware_onion.inject(ExtraDataToPOAMiddleware, layer=0)

# Read the compiled contract JSON file
with open('compiled_code.json', 'r') as file:
    compiled_sol = json.load(file)

# Get the ABI and Bytecode of the contract
abi = compiled_sol['contracts']['SimpleStorage.sol']['SimpleStorage']['abi']
bytecode = compiled_sol['contracts']['SimpleStorage.sol']['SimpleStorage']['evm']['bytecode']['object']

# Set up contract
SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

# Set up deployment account
deployer_address = ''
private_key = ''

# Get the latest transaction count
nonce = w3.eth.get_transaction_count(deployer_address)

# Create transaction
transaction = SimpleStorage.constructor().build_transaction({
    'chainId': 11155111,  # Sepolia testnet chainId
    'gas': 500000,
    'gasPrice': w3.to_wei('10', 'gwei'),
    'nonce': nonce,
})

# Sign transaction
signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)

# Send transaction
tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)

# Wait for transaction to complete
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f'The contract has been deployed and the address is: {tx_receipt.contractAddress}') # 0xF6F82c740eb8A4a487a630e3882Af90F5B9F9cBB

# https://sepolia.etherscan.io/ 
