# 🔧 Dépannage et Leçons Apprises (Troubleshooting)

Ce document recense les problèmes techniques rencontrés lors du développement et leurs solutions.

## 1. Problèmes de Connexion MetaMask (Localhost)

### Le Problème
Lors de la tentative de connexion à `Localhost 8545`, MetaMask peut parfois :
- Refuser l'URL RPC si elle ne contient pas `http://`.
- Masquer automatiquement le préfixe `http://` dans l'interface, créant de la confusion.
- Afficher une erreur "Chain ID mismatch" si le réseau n'est pas configuré sur `31337`.

### La Solution
Nous avons implémenté une **configuration automatique du réseau** dans le frontend (`App.jsx`).
- Si l'utilisateur est sur le mauvais réseau, un bouton **"🔄 Configurer le Réseau Automatiquement"** apparaît.
- Ce bouton utilise l'API `wallet_addEthereumChain` pour forcer l'ajout du réseau avec les bons paramètres :
  - **RPC URL**: `http://127.0.0.1:8545`
  - **Chain ID**: `31337` (0x7A69)
  - **Currency**: ETH

## 2. Erreur "Nonce Mismatch" (Transaction bloquée)

### Le Problème
Après avoir redémarré le nœud Hardhat (`npx hardhat node`), la blockchain repart à zéro (bloc 0). Cependant, MetaMask garde en mémoire l'historique des transactions précédentes (ex: Nonce 5).
Lorsqu'on essaie de voter, MetaMask envoie une transaction avec un Nonce trop élevé, ce qui cause un blocage infini ou une erreur.

### La Solution
Il faut réinitialiser l'historique du compte dans MetaMask :
1. Ouvrir MetaMask > **Paramètres** > **Avancés**.
2. Cliquer sur **"Effacer les données de l'onglet d'activité"**.
3. Recharger la page.

## 3. Manque de Fonds (Gas Fees)

### Le Problème
Les nouveaux comptes créés dans MetaMask pour tester l'application commencent avec **0 ETH**.
Impossible de voter car chaque transaction nécessite des frais de gaz, même sur un réseau local.

### La Solution
Nous avons ajouté un **"Faucet" (Robinet)** intégré dans l'interface.
- Un bouton **"💰 Obtenir 50 ETH (Test)"** permet de transférer des fonds depuis le compte administrateur de Hardhat vers l'utilisateur connecté.
- Code backend utilisé : `signer.sendTransaction({ to: account, value: ethers.parseEther("50.0") })`.

## 4. Confusion de l'Interface Utilisateur ("Vote effectué")

### Le Problème
Initialement, lorsque l'utilisateur avait voté, le texte "Vote effectué" s'affichait à côté de chaque bouton de vote.
L'utilisateur pensait que *tous les candidats* avaient reçu un vote, ou que son vote n'avait pas été comptabilisé correctement (ex: voir "0 votes" mais lire "Vote effectué").

### La Solution
L'interface a été clarifiée :
- Le message "Vote effectué" a été déplacé dans une bannière globale en haut de page.
- Les boutons de vote disparaissent complètement une fois le vote enregistré.
- Seul le compteur de votes reste visible pour chaque candidat.

## 5. Persistance des Données

### Le Problème
Les votes disparaissent à chaque redémarrage du terminal `npx hardhat node`.

### Explication
C'est le comportement normal de Hardhat Network (in-memory). Pour un déploiement persistant, il faudrait utiliser un réseau de test public (Sepolia) ou configurer un nœud local persistant, mais pour le développement, le reset est attendu.
