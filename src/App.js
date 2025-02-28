import React, { useState, useEffect } from 'react';
import './App.css';
import { initWeb3, initContract, web3, chainDNSContract } from './web3';
import DomainManager from './DomainManager';
import { validateDomain, validateIPAddress } from './utils/validation';

function App() {
  const [domain, setDomain] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [resolveResult, setResolveResult] = useState('');
  const [currentTab, setCurrentTab] = useState('register');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setError('');

    // Validate inputs
    const domainValidation = validateDomain(domain);
    if (!domainValidation.isValid) {
      setError(domainValidation.error);
      return;
    }

    const ipValidation = validateIPAddress(ipAddress);
    if (!ipValidation.isValid) {
      setError(ipValidation.error);
      return;
    }

    if (!contract || !account) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      await contract.methods.registerDomain(domain, ipAddress).send({
        from: account
      });
      alert('Domain registered successfully!');
      setDomain('');
      setIpAddress('');
    } catch (error) {
      console.error('Error registering domain:', error);
      setError('Failed to register domain. It may already exist or you may not have enough gas.');
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async () => {
    setError('');
    setResolveResult('');

    // Validate domain
    const domainValidation = validateDomain(domain);
    if (!domainValidation.isValid) {
      setError(domainValidation.error);
      return;
    }

    if (!contract) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const result = await contract.methods.resolveDomain(domain).call();
      setResolveResult(result);
    } catch (error) {
      console.error('Error resolving domain:', error);
      setError('Domain not found or expired');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChainDNS</h1>
        <p>Decentralized Domain Name System</p>
        {account && <p>Connected: {account.substring(0, 6)}...{account.substring(38)}</p>}
      </header>

      <nav className="tab-nav">
        <button
          className={currentTab === 'register' ? 'active' : ''}
          onClick={() => setCurrentTab('register')}
        >
          Register/Resolve
        </button>
        <button
          className={currentTab === 'manage' ? 'active' : ''}
          onClick={() => setCurrentTab('manage')}
        >
          Manage Domains
        </button>
      </nav>

      <main>
        {error && <div className="error-message">{error}</div>}

        {currentTab === 'register' && (
          <>
            <div className="form-section">
              <h2>Register Domain</h2>
              <input
                type="text"
                placeholder="Enter domain name"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className={error && error.includes('Domain') ? 'error-input' : ''}
              />
              <input
                type="text"
                placeholder="Enter IP address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className={error && error.includes('IP') ? 'error-input' : ''}
              />
              <button
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register Domain'}
              </button>
            </div>

            <div className="form-section">
              <h2>Resolve Domain</h2>
              <input
                type="text"
                placeholder="Enter domain to resolve"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className={error && error.includes('Domain') ? 'error-input' : ''}
              />
              <button
                onClick={handleResolve}
                disabled={loading}
              >
                {loading ? 'Resolving...' : 'Resolve'}
              </button>
              {resolveResult && <div className="success-message">Result: {resolveResult}</div>}
            </div>
          </>
        )}

        {currentTab === 'manage' && (
          <DomainManager account={account} contract={contract} />
        )}
      </main>
    </div>
  );
}

export default App;