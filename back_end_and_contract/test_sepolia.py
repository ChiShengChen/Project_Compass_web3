# -*- coding: utf-8 -*-
from web3 import Web3

# �ϥ� Infura �� Sepolia ���պ����I
infura_url = ''
w3 = Web3(Web3.HTTPProvider(infura_url))

# �ˬd�s�����A
if w3.is_connected():
    print('Successfully connected to Sepolia testnet')
else:
    print('Unable to connect to Sepolia testnet')
