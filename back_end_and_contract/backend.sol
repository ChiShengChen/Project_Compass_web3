// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// �ޤJ�U��ĳ�����f
interface ILido {
    function submit(address _referral) external payable returns (uint256);
}

interface IAaveLendingPool {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
}

interface IUniswapRouter {
    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);
}

// dYdX �M EigenLayer �����f�ݮھڨ�x����w�q

contract InvestmentManager {
    address public owner;
    ILido public lido;
    IAaveLendingPool public aaveLendingPool;
    IUniswapRouter public uniswapRouter;
    // �w�q dYdX �M EigenLayer ���X���a�}

    constructor(
        address _lido,
        address _aaveLendingPool,
        address _uniswapRouter
        // �ǤJ dYdX �M EigenLayer ���X���a�}
    ) {
        owner = msg.sender;
        lido = ILido(_lido);
        aaveLendingPool = IAaveLendingPool(_aaveLendingPool);
        uniswapRouter = IUniswapRouter(_uniswapRouter);
        // ��l�� dYdX �M EigenLayer ���X�����
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function investInLido() external payable onlyOwner {
        require(msg.value > 0, "Must send ETH");
        lido.submit{value: msg.value}(address(0));
    }

    function investInAave(address asset, uint256 amount) external onlyOwner {
        // �b�եΦ���ƫe�A�T�O�X���w�g��o�������겣�\�i
        aaveLendingPool.deposit(asset, amount, address(this), 0);
    }

    function investInUniswap(address[] calldata path, uint256 amountOutMin, uint256 deadline) external payable onlyOwner {
        require(msg.value > 0, "Must send ETH");
        uniswapRouter.swapExactETHForTokens{value: msg.value}(amountOutMin, path, address(this), deadline);
    }

    // ��{���� dYdX �M EigenLayer �����
}
