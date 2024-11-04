# Project_Compass_web3
## A DeFi AI-Based Portfolio and Risk Management System

This repository provides an implementation of a decentralized finance (DeFi) platform powered by both classical and quantum AI models for portfolio optimization, risk assessment, and automated smart contract interactions.  
[Live Demo](https://ai-investment-22o3.vercel.app/)
## System Architecture Overview
![defi](https://github.com/user-attachments/assets/d4040dc4-cd63-4731-9675-b4793830fead)

The system architecture is composed of several layers, each serving a specific role in the ecosystem. Below is a detailed breakdown:

### 1. **Web Front End Layer**
- **Purpose**: Provides an intuitive user interface for interacting with the platform.
- **Integration**: Interfaces with the Smart Contracts Layer through APIs for real-time data exchange and user interactions.

### 2. **Smart Contracts Layer**
- **Purpose**: Facilitates seamless integration between the Web Front End and the core DeFi infrastructure, enabling the execution of investment strategies.
- **Functionality**: Handles data transfer between the Web Front End, Investment Layer, and AI Model Layer.
- **Key Features**: Interaction with various DeFi protocols, execution of user-defined strategies, and access to AI-generated portfolio optimization and risk assessments.

### 3. **Investment Layer**
- **Purpose**: Manages interactions with major DeFi platforms for investment operations.
- **Protocols Included**:
  - **LIDO**: Liquid staking solutions.
  - **AAVE**: Decentralized lending and borrowing.
  - **MakerDAO**: Stablecoin ecosystem.
  - **Uniswap**: Decentralized exchange (DEX).
  - **Rocket Pool**: Decentralized Ethereum staking.
  - **EigenLayer**: Re-staking protocol.

### 4. **Oracle Layer**
- **Purpose**: Provides reliable, real-time data from external sources to ensure accurate operation of smart contracts and AI models.
- **Supported Oracles**:
  - **Chainlink**
  - **RedStone**
  - **UMA**
  - **Witnet**

### 5. **AI (Classical & Quantum) Model Layer**
- **Purpose**: Hosts advanced AI models for portfolio optimization, risk assessment, and large language model (LLM) support.
- **Components**:
  - **Portfolio Optimization AI Engine**:
    - Technologies: PyTorch, Qlib, IBM Quantum, PennyLane, Backtrader, PyPortfolioOpt.
  - **Risk Optimization AI Module**:
    - Technologies: CVXPY, Gurobi, PyRIT, Riskfolio-Lib.
  - **Large Language Model (LLM) Module**:
    - Supported Models: LLaMA, Claude, Gemini, Mistral AI, Hugging Face transformers.

### 6. **Web3 Database Layer**
- **Purpose**: Manages data storage, vector databases, and model prediction logs.
- **Technologies**:
  - **IPFS**: Decentralized file storage.
  - **BigchainDB**: Blockchain database.
  - **Fluree**: Semantic graph database for immutable and composable data.

## Data Flow Description

1. **Web Front End Layer** sends user requests and receives responses via APIs connected to the Smart Contracts Layer.
2. **Smart Contracts Layer** orchestrates the data exchange between the Web Front End, Investment Layer, and AI Model Layer.
3. **Investment Layer** interacts with various DeFi protocols for transactions and data collection.
4. **Oracle Layer** fetches and supplies external real-time data to the Smart Contracts Layer for informed decision-making.
5. **AI Model Layer** processes the data for portfolio optimization and risk analysis, leveraging both classical and quantum AI technologies.
6. **Web3 Database Layer** logs results, vector data, and AI model predictions, ensuring transparency and traceability.

## Technologies Used

- **Programming Languages**: Python, Solidity, JavaScript
- **Frameworks & Libraries**:
  - **PyTorch**, **PennyLane**, **Qlib** for AI and Quantum Computing
  - **Backtrader**, **PyPortfolioOpt** for financial backtesting
  - **CVXPY**, **Gurobi** for risk optimization
  - **Hugging Face** for LLM integrations
- **Web3 Technologies**: **IPFS**, **BigchainDB**, **Fluree**

## Future Work

- Integration with additional DeFi protocols.
- Exploration of advanced quantum algorithms for further optimization.
- Enhanced user interfaces with real-time data visualizations.

