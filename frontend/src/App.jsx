import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingAbi from './Voting.json';

const CONTRACT_ADDRESS = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchCandidates();
      
      // Auto-refresh every 5 seconds
      const interval = setInterval(() => {
        fetchCandidates();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [contract]);

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x7A69' }], // 31337 in hex
      });
      window.location.reload();
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x7A69',
                chainName: 'Localhost 8545',
                rpcUrls: ['http://127.0.0.1:8545'],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
              },
            ],
          });
          window.location.reload();
        } catch (addError) {
          setError('Erreur lors de l\'ajout du réseau: ' + addError.message);
        }
      } else {
        setError('Erreur lors du changement de réseau: ' + switchError.message);
      }
    }
  };

  const connectWallet = async () => {
    try {
      setError('');
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        // Check network
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        console.log("Detected Chain ID:", network.chainId);
        
        // Convert to BigInt for comparison just in case
        const chainId = BigInt(network.chainId);
        
        if (chainId !== 31337n) {
          setError(
            <div>
              <p>Mauvais réseau détecté (Chain ID: {chainId.toString()}).</p>
              <button onClick={switchNetwork} style={{marginTop: '10px', background: '#e74c3c'}}>
                🔄 Configurer le Réseau Automatiquement
              </button>
            </div>
          );
          return;
        }
        
        const signer = await provider.getSigner();
        const votingContract = new ethers.Contract(CONTRACT_ADDRESS, VotingAbi, signer);
        setContract(votingContract);
        
        // Check if already voted
        const voted = await votingContract.voters(accounts[0]);
        setHasVoted(voted);
      } else {
        setError('Please install MetaMask!');
      }
    } catch (err) {
      setError('Error connecting wallet: ' + err.message);
    }
  };

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const candidatesList = await contract.getAllCandidates();
      const formattedCandidates = candidatesList.map(c => ({
        id: Number(c.id),
        name: c.name,
        voteCount: Number(c.voteCount)
      }));
      setCandidates(formattedCandidates);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError('Error loading candidates. Make sure Hardhat node is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      setError('');
      setLoading(true);
      const tx = await contract.vote(candidateId);
      await tx.wait();
      setHasVoted(true);
      await fetchCandidates();
      alert('Vote cast successfully!');
    } catch (err) {
      const errorMsg = err.reason || err.message;
      if (errorMsg.includes('already voted')) {
        setError('You have already voted!');
        setHasVoted(true);
      } else {
        setError('Error voting: ' + errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const requestFunds = async () => {
    try {
      setLoading(true);
      const localProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = await localProvider.getSigner();
      const tx = await signer.sendTransaction({
        to: account,
        value: ethers.parseEther("50.0")
      });
      await tx.wait();
      alert("50 ETH reçus ! Réessayez de voter.");
    } catch (err) {
      console.error(err);
      alert("Erreur faucet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🗳️ Système de Vote Décentralisé</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      {!account ? (
        <div className="wallet-info">
          <p style={{marginBottom: '15px', fontSize: '18px'}}>Connectez votre portefeuille MetaMask pour commencer</p>
          <button onClick={connectWallet}>🦊 Connecter MetaMask</button>
        </div>
      ) : (
        <div className="alert alert-success">
          <p>✅ Connecté: <strong>{account.slice(0, 6)}...{account.slice(-4)}</strong></p>
          {hasVoted && (
            <div style={{marginTop: '10px', padding: '10px', background: '#d4edda', color: '#155724', borderRadius: '5px'}}>
              <strong>✓ Vote enregistré !</strong><br/>
              Vous ne pouvez voter qu'une seule fois par compte.
            </div>
          )}
          <button onClick={requestFunds} style={{marginTop: '15px', background: '#27ae60', width: '100%'}}>
            💰 Obtenir 50 ETH (Test)
          </button>
        </div>
      )}
      
      <h2>📋 Liste des Candidats</h2>
      {loading && <div className="loading">⏳ Chargement en cours...</div>}
      
      {!loading && candidates.length === 0 && account && (
        <div className="alert alert-info">
          Aucun candidat trouvé. Assurez-vous que le nœud Hardhat est en cours d'exécution.
        </div>
      )}
      
      <div className="candidates-list">
        {candidates.map((candidate, index) => (
          <div key={candidate.id} className="candidate" style={{animationDelay: `${index * 0.1}s`}}>
            <div>
              <span style={{fontSize: '20px', marginRight: '10px'}}>👤</span>
              <span><strong>{candidate.name}</strong></span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
              <span style={{background: '#667eea', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold'}}>
                {candidate.voteCount} vote{candidate.voteCount !== 1 ? 's' : ''}
              </span>
              {!hasVoted && (
                <button 
                  onClick={() => handleVote(candidate.id)}
                  disabled={!account || loading}
                >
                  🗳️ Voter
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {candidates.length > 0 && (
        <div className="alert alert-info" style={{marginTop: '30px', textAlign: 'center'}}>
          <strong>Total des votes:</strong> {candidates.reduce((sum, c) => sum + c.voteCount, 0)}
        </div>
      )}
    </div>
  );
}

export default App;
