# -*- coding: utf-8 -*-
from solcx import compile_standard, install_solc
import json

# �w�˫��w������ Solidity �sĶ��
install_solc('0.8.0')

# Ū������X�����X
with open('SimpleStorage.sol', 'r') as file:
    simple_storage_file = file.read()

# �sĶ�X��
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

# �N�sĶ���G�O�s�� JSON ���
with open('compiled_code.json', 'w') as file:
    json.dump(compiled_sol, file)
