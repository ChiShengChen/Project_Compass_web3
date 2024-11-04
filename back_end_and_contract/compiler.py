# -*- coding: utf-8 -*-
from solcx import compile_standard, install_solc
import json

# 安裝指定版本的 Solidity 編譯器
install_solc('0.8.0')

# 讀取智能合約源碼
with open('SimpleStorage.sol', 'r') as file:
    simple_storage_file = file.read()

# 編譯合約
compiled_sol = compile_standard(
    {
        'language': 'Solidity',
        'sources': {'SimpleStorage.sol': {'content': simple_storage_file}},
        'settings': {
            'outputSelection': {
                '*': {'*': ['abi', 'metadata', 'evm.bytecode', 'evm.sourceMap']}
            }
        },
    },
    solc_version='0.8.0',
)

# 將編譯結果保存為 JSON 文件
with open('compiled_code.json', 'w') as file:
    json.dump(compiled_sol, file)
