from web3 import Web3
from solcx import compile_standard, install_solc

# Connect to an Ethereum node (e.g., Infura)
infura_url = "https://sepolia.infura.io/v3/4"
web3 = Web3(Web3.HTTPProvider(infura_url))

# Ensure connection is successful
if not web3.is_connected():
    raise Exception("Failed to connect to Ethereum node")

# Set the account and private key (use environment variables for security)
account = ''
private_key = ''

# Install Solidity compiler version 0.8.0
install_solc("0.8.0")

# Load and compile the Solidity contract
with open("compass_v0.sol", "r") as file:
    contract_source_code = file.read()

compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {
            "compass_v0.sol": {
                "content": contract_source_code
            }
        },
        "settings": {
            "outputSelection": {
                "*": {
                    "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]
                }
            }
        },
    },
    solc_version="0.8.0",
)

# Get bytecode and ABI
bytecode = compiled_sol["contracts"]["compass_v0.sol"]["AssetSplitter"]["evm"]["bytecode"]["object"]
abi = compiled_sol["contracts"]["compass_v0.sol"]["AssetSplitter"]["abi"]

# Create the contract instance
AssetSplitter = web3.eth.contract(abi=abi, bytecode=bytecode)

# Build and sign the transaction for deployment
nonce = web3.eth.get_transaction_count(account)
transaction = AssetSplitter.constructor(
    '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3',  # Replace with actual router address
    '0xB89a6778D1efE7a5b7096757A21b810CC2886fa1'    # Replace with actual router address
).build_transaction({
    "chainId": 11155111,  # Replace with appropriate chain ID for Sepolia
    "gasPrice": web3.eth.gas_price,
    "nonce": nonce,
    "from": account
})

signed_txn = web3.eth.account.sign_transaction(transaction, private_key=private_key)

# Send the transaction
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
print(f"Deploying contract... Transaction hash: {txn_hash.hex()}")

# Wait for the transaction to be mined
txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)
print(f"Contract deployed at address: {txn_receipt.contractAddress}")
