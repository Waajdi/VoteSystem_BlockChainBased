# 🎯 Quick Reference - Voting DApp

## ✅ Current Status

### Backend (Blockchain)
- **Status:** ✅ Running
- **URL:** http://127.0.0.1:8545
- **Network:** Hardhat Local
- **Chain ID:** 31337

### Smart Contract
- **Address:** `0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1`
- **Candidates:** Mourad, Mohamed, Salim, Ahmed, Kais
- **Current Votes:**
  - Mourad: 2 votes
  - Mohamed: 1 vote
  - Salim: 0 votes
  - Ahmed: 0 votes
  - Kais: 0 votes

### Frontend
- **URL:** http://localhost:5173
- **Status:** ✅ Running

## 🦊 MetaMask Configuration

### Network Settings (Already Configured)
- Network Name: **Localhost 8545**
- RPC URL: **http://127.0.0.1:8545**
- Chain ID: **31337**
- Currency: **ETH**

### Test Account (How to obtain)
- The project uses Hardhat's local test accounts. For security and best practices we do NOT store private keys in the repo.
- To get a test account (address + private key), run the local node and copy one of the keys printed in the terminal:

```powershell
cd backend
npx hardhat node
```

In the Hardhat node terminal you'll see a list of generated accounts and their private keys. Use one of those to import into MetaMask (Import Account).
Do NOT commit private keys into version control. Treat them as local secrets.

## 🚀 How to Vote

1. **Open the app:** http://localhost:5173
2. **Make sure MetaMask is on "Localhost 8545"**
3. **Click "Connecter MetaMask"**
4. **Approve the connection**
5. **Select a candidate and click "🗳️ Voter"**
6. **Confirm the transaction in MetaMask**
7. **Wait for confirmation (a few seconds)**

## 🔄 If You Need to Restart

### Restart Backend (Hardhat Node)
```powershell
cd backend
npx hardhat node
```
Keep this terminal open!

### Redeploy Contract (in new terminal)
```powershell
cd backend
npx hardhat run scripts/deploy.js --network localhost
```
**Important:** Copy the new contract address and update `frontend/src/App.jsx`

### Restart Frontend
```powershell
cd frontend
npm run dev
```

## 🧪 Test Commands

### Simulate Multiple Votes
```powershell
cd backend
npx hardhat run scripts/test-voting.js --network localhost
```

### Check Current Results
The frontend auto-refreshes every 5 seconds, or refresh the page manually.

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Aucun candidat trouvé" | Contract address mismatch - redeploy and update App.jsx |
| "Please connect to Localhost 8545" | Switch network in MetaMask |
| "You have already voted" | Each address can only vote once - use a different account |
| Balance shows 0 ETH | Make sure you're on Localhost 8545 network |
| Transaction fails | Check if Hardhat node is running |

## 📝 Important Addresses

### Your Connected Account
- Address: `0x5002...0721` (visible in the app)
- This is your imported test account

### Other Available Test Accounts
The Hardhat node provides 20 test accounts. Check the terminal where you ran `npx hardhat node` to see all addresses and their private keys.

## 🎨 Features

- ✅ Real-time vote updates (every 5 seconds)
- ✅ Beautiful gradient UI
- ✅ Smooth animations
- ✅ Clear status messages
- ✅ Vote count displayed per candidate
- ✅ Total votes counter
- ✅ French language interface
- ✅ Responsive design

## 📱 Now You Can:

1. **Vote** for your favorite candidate (if you haven't already)
2. **See results** update in real-time
3. **Check** that you can't vote twice
4. **Import** another test account to vote again
5. **Watch** the vote counts increase

Enjoy your decentralized voting system! 🎉
