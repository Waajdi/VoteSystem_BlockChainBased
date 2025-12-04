# 🏗️ Architecture Technique

Ce document détaille le fonctionnement interne du système de vote décentralisé.

## 1. Smart Contract (`Voting.sol`)

Le contrat intelligent est le cœur du système. Il est écrit en Solidity (v0.8.24).

### Structures de Données
- **Candidate**: Structure contenant l'ID, le nom et le nombre de votes.
- **candidates**: Mapping `uint => Candidate` stockant les candidats.
- **voters**: Mapping `address => bool` pour empêcher le double vote (Sybil resistance simple).

### Fonctions Clés
- `addCandidate(string _name)`: Ajoute un candidat (réservé au propriétaire/déployeur).
- `vote(uint _candidateId)`:
  - Vérifie si l'adresse a déjà voté (`require(!voters[msg.sender])`).
  - Incrémente le compteur du candidat.
  - Marque l'adresse comme ayant voté.
  - Émet un événement `VotedEvent`.
- `getAllCandidates()`: Retourne la liste complète pour l'affichage frontend.

## 2. Frontend (React + Vite)

L'interface utilisateur communique avec la blockchain via la bibliothèque **Ethers.js v6**.

### Flux de Connexion (`App.jsx`)
1. **Détection**: Vérifie `window.ethereum` (MetaMask).
2. **Connexion**: Demande l'accès aux comptes (`eth_requestAccounts`).
3. **Vérification Réseau**:
   - Compare le `chainId` détecté avec `31337` (Hardhat Localhost).
   - Si différent, propose un changement automatique via `wallet_addEthereumChain`.

### Gestion de l'État
- `account`: Adresse du portefeuille connecté.
- `contract`: Instance Ethers du contrat pour les interactions.
- `candidates`: Liste locale des candidats mise à jour après chaque vote.
- `hasVoted`: Booléen déterminant l'affichage de l'interface de vote.

### Interaction Blockchain
- **Lecture**: `contract.getAllCandidates()` (Appel gratuit, `view`).
- **Écriture**: `contract.vote(id)` (Transaction payante en Gas).
- **Faucet**: Envoi direct d'ETH depuis le premier compte Hardhat (Signer #0) vers l'utilisateur pour les tests.

## 3. Déploiement (`deploy.js`)

Le script de déploiement automatise l'initialisation du vote :
1. Déploie le contrat `Voting`.
2. Injecte une liste prédéfinie de candidats :
   - "Mourad"
   - "Mohamed"
   - "Salim"
   - "Ahmed"
   - "Kais"
3. Affiche l'adresse du contrat pour la configuration frontend.
