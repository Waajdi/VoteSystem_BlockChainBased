# 🗳️ How to Use the Voting DApp

## Quick Start Guide

### 1. Configure MetaMask

1. **Install MetaMask** if you haven't already (you already have this ✓)

2. **Add Localhost Network**:
   - Click MetaMask extension
   - Click the network dropdown (at the top)
   - Click "Add Network" or "Add network manually"
   - Enter these details:
     - **Network Name**: Localhost 8545
     - **RPC URL**: `http://127.0.0.1:8545`
     - **Chain ID**: `31337`
     - **Currency Symbol**: ETH
   - Click "Save"

3. **Import a Test Account**:
  - In MetaMask, click your account icon
  - Select "Import Account"
  - To get a private key for testing, start the local Hardhat node and copy one of the keys printed in the terminal. Example:

```powershell
cd backend
npx hardhat node
```

  - Copy one of the private keys shown in that terminal output and paste it into MetaMask's import dialog.
  - Click "Import"
  - That imported account will have test ETH when using the local Hardhat node.

### 2. Connect and Vote

1. **Refresh** the page at `http://localhost:5173/`
2. **Make sure** MetaMask is connected to "Localhost 8545"
3. Click **"Connect Wallet"** on the page
4. **Approve** the connection in MetaMask
5. **Select a candidate** and click "Vote"
6. **Confirm** the transaction in MetaMask
7. Wait a few seconds for the vote to be confirmed

### Current Candidates:
- Mourad
- Mohamed
- Salim
- Ahmed
- Kais

### Important Notes:
- ✅ Each address can only vote once
- ✅ The Hardhat node must be running (already started)
- ✅ Make sure you're on the Localhost 8545 network in MetaMask
- ✅ Transactions are instant on the local network

### Troubleshooting:
- **"Please install MetaMask!"** → Install the MetaMask extension
- **"Please connect MetaMask to Localhost 8545"** → Switch network in MetaMask
- **"You have already voted"** → You can only vote once per address
- **Transaction fails** → Make sure you have ETH in your account

Enjoy voting! 🎉
