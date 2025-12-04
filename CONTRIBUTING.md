# Contributing

Thank you for contributing! This file contains recommended steps and rules for contributing to this project.

## 1. Code of Conduct
Be respectful and constructive. Create issues for feature requests or bugs before opening large PRs.

## 2. Preparing the project locally
1. Install dependencies:

```powershell
cd backend
npm install
cd ../frontend
npm install
```

2. Start the local blockchain (Hardhat):

```powershell
cd backend
npx hardhat node
```

3. Deploy the contract (in a second terminal):

```powershell
cd backend
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the frontend:

```powershell
cd frontend
npm run dev
```

## 3. Security: Do NOT commit secrets
- Never commit private keys or `.env` files to the repository.
- Use `.gitignore` to exclude local secrets.

## 4. Git & GitHub workflow
- Create a feature branch: `git checkout -b feat/your-change`
- Make small, focused commits.
- Push and open a Pull Request.

## 5. How to push to your GitHub repo
See `README.md` for push instructions and options (HTTPS with PAT or SSH). If you need, follow the guide in the README to set up the remote and push.

## 6. CI Suggestions
- Add GitHub Actions to run linting and tests on PRs. Keep CI minimal for this tutorial project (install Node, run `npm ci`, `npm test`).
