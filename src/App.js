import React, { useState, useEffect } from 'react';
import './App.css';
import { initWeb3, initContract, web3, chainDNSContract } from './web3';

function App() {
  const [domain, setDomain] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [resolveResult, setResolveResult] = useState('');

  useEffect(() => {
    const initApp = async () => {
      const web3Initialized = await initWeb3();
      if (web3Initialized) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // For demo, using placeholder contract address
        const contractInstance = initContract('0x0000000000000000000000000000000000000000');
        setContract(contractInstance);
      }
    };
    initApp();
  }, []);

  const handleRegister = async () => {
    if (!contract || !account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await contract.methods.registerDomain(domain, ipAddress).send({
        from: account
      });
      alert('Domain registered successfully!');
    } catch (error) {
      console.error('Error registering domain:', error);
      alert('Failed to register domain');
    }
  };

  const handleResolve = async () => {
    if (!contract) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const result = await contract.methods.resolveDomain(domain).call();
      setResolveResult(result);
    } catch (error) {
      console.error('Error resolving domain:', error);
      alert('Domain not found or expired');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChainDNS</h1>
        <p>Decentralized Domain Name System</p>
        {account && <p>Connected: {account.substring(0, 6)}...{account.substring(38)}</p>}
      </header>

      <main>
        <div className="form-section">
          <h2>Register Domain</h2>
          <input
            type="text"
            placeholder="Enter domain name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter IP address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button onClick={handleRegister}>Register Domain</button>
        </div>

        <div className="form-section">
          <h2>Resolve Domain</h2>
          <input
            type="text"
            placeholder="Enter domain to resolve"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button onClick={handleResolve}>Resolve</button>
          {resolveResult && <p>Result: {resolveResult}</p>}
        </div>
      </main>
    </div>
  );
}

export default App;