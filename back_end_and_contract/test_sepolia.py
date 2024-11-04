# -*- coding: utf-8 -*-
from web3 import Web3

# 使用 Infura 的 Sepolia 測試網端點
infura_url = ''
w3 = Web3(Web3.HTTPProvider(infura_url))

# 檢查連接狀態
if w3.is_connected():
    print('Successfully connected to Sepolia testnet')
else:
    print('Unable to connect to Sepolia testnet')
