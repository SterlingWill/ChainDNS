import React, { useState } from 'react';
import './App.css';

function App() {
  const [domain, setDomain] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const handleRegister = async () => {
    console.log('Registering domain:', domain, 'with IP:', ipAddress);
    // TODO: Integrate with smart contract
  };

  const handleResolve = async () => {
    console.log('Resolving domain:', domain);
    // TODO: Integrate with smart contract
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChainDNS</h1>
        <p>Decentralized Domain Name System</p>
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
        </div>
      </main>
    </div>
  );
}

export default App;