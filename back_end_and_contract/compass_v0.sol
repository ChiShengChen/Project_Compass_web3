// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Interface for Scroll's Router
interface IScrollRouter {
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);
}

// Interface for Optimism's Router
interface IOptimismRouter {
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);
}

contract AssetSplitter {
    address public owner;
    IUniswapV2Router02 public uniswapRouter;
    IScrollRouter public scrollRouter;
    IOptimismRouter public optimismRouter;
    address public WETH;

    enum AllocationStrategy { Equal, Ratio1, Ratio2 }

    event AssetsSplitAndStaked(address indexed user, uint256 ethAmount, AllocationStrategy strategy);

    constructor(
        address _uniswapRouterAddress, // Uniswap Router Address on Sepolia
        address _scrollRouterAddress // Scroll Router Address on Sepolia
        // address _optimismRouterAddress,// Optimism Router Address on Sepolia
        // address _WETH
    ) {
        owner = msg.sender;
        uniswapRouter = IUniswapV2Router02(_uniswapRouterAddress);
        scrollRouter = IScrollRouter(_scrollRouterAddress);
        // optimismRouter = IOptimismRouter(_optimismRouterAddress);
        // WETH = _WETH;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function splitAndStake(address tokenAddress, AllocationStrategy strategy) public payable {
        uint256 ethBalance = msg.value;
        require(ethBalance > 0, "No ETH to stake");

        (uint256 uniswapPortion, uint256 scrollPortion, uint256 optimismPortion) = calculatePortions(ethBalance, strategy);

        // 1. Swap ETH for WETH on Uniswap
        swapETHForWETH(uniswapPortion);

        // 2. Swap ETH for Token on Scroll
        swapETHForTokenOnScroll(tokenAddress, scrollPortion);

        // 3. Swap ETH for Token on Optimism
        // swapETHForTokenOnOptimism(tokenAddress, optimismPortion);

        emit AssetsSplitAndStaked(msg.sender, ethBalance, strategy);
    }

    function calculatePortions(uint256 ethBalance, AllocationStrategy strategy)
        internal
        pure
        returns (uint256 uniswapPortion, uint256 scrollPortion, uint256 optimismPortion)
    {
        if (strategy == AllocationStrategy.Equal) {
            // uniswapPortion = ethBalance / 3;
            // scrollPortion = ethBalance / 3;
            // optimismPortion = ethBalance - uniswapPortion - scrollPortion; // To handle any remainder
            uniswapPortion = ethBalance / 2;
            scrollPortion = ethBalance / 2;
            
        } else if (strategy == AllocationStrategy.Ratio1) {
            uniswapPortion = (ethBalance * 20) / 100;
            scrollPortion = (ethBalance * 80) / 100;
            // optimismPortion = ethBalance - uniswapPortion - scrollPortion;
        } else if (strategy == AllocationStrategy.Ratio2) {
            uniswapPortion = (ethBalance * 80) / 100;
            scrollPortion = (ethBalance * 20) / 100;
            // optimismPortion = ethBalance - uniswapPortion - scrollPortion;
        } else {
            revert("Invalid allocation strategy");
        }
    }

    function swapETHForWETH(uint256 ethAmount) internal {
        require(ethAmount > 0, "ETH amount must be greater than zero");
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = WETH;

        uniswapRouter.swapExactETHForTokens{value: ethAmount}(
            0, // Accept any amount of WETH
            path,
            msg.sender,
            block.timestamp + 300
        );
    }

    function swapETHForTokenOnScroll(address tokenAddress, uint256 ethAmount) internal {
        require(ethAmount > 0, "ETH amount must be greater than zero");
        address[] memory path = new address[](2);
        path[0] = scrollRouter.WETH();
        path[1] = tokenAddress;

        scrollRouter.swapExactETHForTokens{value: ethAmount}(
            0, // Accept any amount of Tokens
            path,
            msg.sender,
            block.timestamp + 300
        );
    }

    // function swapETHForTokenOnOptimism(address tokenAddress, uint256 ethAmount) internal {
    //     require(ethAmount > 0, "ETH amount must be greater than zero");
    //     address[] memory path = new address[](2);
    //     path[0] = optimismRouter.WETH();
    //     path[1] = tokenAddress;

    //     optimismRouter.swapExactETHForTokens{value: ethAmount}(
    //         0, // Accept any amount of Tokens
    //         path,
    //         msg.sender,
    //         block.timestamp + 300
    //     );
    // }

    // Function to withdraw accidentally sent ERC20 tokens
    function withdrawERC20(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20(tokenAddress).transfer(owner, amount);
    }

    // Function to withdraw accidentally sent ETH
    function withdrawETH(uint256 amount) external onlyOwner {
        payable(owner).transfer(amount);
    }

    // Fallback function to accept ETH
    receive() external payable {}
}
