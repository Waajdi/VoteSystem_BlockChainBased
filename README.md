# Système de Vote Décentralisé

Un système de vote transparent et décentralisé construit avec Solidity, Hardhat, React et Vite.

## Fonctionnalités

- **Vote Unique** : Un vote par adresse Ethereum.
- **Temps Réel** : Mise à jour instantanée des résultats.
- **Auto-Configuration** : Ajout automatique du réseau Localhost dans MetaMask.
- **Faucet Intégré** : Obtenez des ETH de test directement depuis l'interface.
- **Interface Réactive** : Design moderne et animations.
- **Démo** : Une vidéo de démonstration (VoteSystemDemo.mkv) est disponible à la racine du projet.

## Prérequis

- Node.js (v16+)
- MetaMask installé dans votre navigateur

## Installation et Démarrage

### 1. Backend (Blockchain)

Le backend est configuré avec Hardhat.

```bash
cd backend
npx hardhat node
```

### 2. Frontend

```bash
cd frontend
npm run dev
```

## Configuration MetaMask

1. Ouvrir MetaMask
2. Ajouter un réseau manuellement :
   - **Nom du réseau:** Localhost 8545
   - **URL RPC:** http://127.0.0.1:8545
   - **ID de chaîne:** 31337
   - **Symbole:** ETH

3. Importer un compte de test :
   - Lancez `npx hardhat node` dans le dossier backend.
   - Copiez une des clés privées affichées.
   - Importez-la dans MetaMask.

## Utilisation

1. Ouvrir http://localhost:5173
2. Connecter MetaMask (réseau Localhost 8545)
3. Voter pour un candidat
4. Confirmer la transaction

## Technologies

- **Blockchain:** Hardhat
- **Smart Contract:** Solidity 0.8.24
- **Frontend:** React + Vite
- **Wallet:** MetaMask (Web3)

## Licence

Ce projet est open source.
