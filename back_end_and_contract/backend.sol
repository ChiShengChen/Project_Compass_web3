// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 引入各協議的接口
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

// dYdX 和 EigenLayer 的接口需根據其官方文件定義

contract InvestmentManager {
    address public owner;
    ILido public lido;
    IAaveLendingPool public aaveLendingPool;
    IUniswapRouter public uniswapRouter;
    // 定義 dYdX 和 EigenLayer 的合約地址

    constructor(
        address _lido,
        address _aaveLendingPool,
        address _uniswapRouter
        // 傳入 dYdX 和 EigenLayer 的合約地址
    ) {
        owner = msg.sender;
        lido = ILido(_lido);
        aaveLendingPool = IAaveLendingPool(_aaveLendingPool);
        uniswapRouter = IUniswapRouter(_uniswapRouter);
        // 初始化 dYdX 和 EigenLayer 的合約實例
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
        // 在調用此函數前，確保合約已經獲得足夠的資產許可
        aaveLendingPool.deposit(asset, amount, address(this), 0);
    }

    function investInUniswap(address[] calldata path, uint256 amountOutMin, uint256 deadline) external payable onlyOwner {
        require(msg.value > 0, "Must send ETH");
        uniswapRouter.swapExactETHForTokens{value: msg.value}(amountOutMin, path, address(this), deadline);
    }

    // 實現投資到 dYdX 和 EigenLayer 的函數
}
