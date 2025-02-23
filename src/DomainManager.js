import React, { useState, useEffect } from 'react';
import { web3, chainDNSContract } from './web3';

function DomainManager({ account, contract }) {
  const [userDomains, setUserDomains] = useState([]);
  const [transferDomain, setTransferDomain] = useState('');
  const [transferTo, setTransferTo] = useState('');

  useEffect(() => {
    if (contract && account) {
      loadUserDomains();
    }
  }, [contract, account]);

  const loadUserDomains = async () => {
    try {
      // In a real implementation, we'd need to track user domains
      // For demo, showing placeholder data
      setUserDomains(['example.chain', 'test.chain']);
    } catch (error) {
      console.error('Error loading domains:', error);
    }
  };

  const handleTransfer = async () => {
    if (!contract || !account) return;

    try {
      await contract.methods.transferDomain(transferDomain, transferTo).send({
        from: account
      });
      alert('Domain transferred successfully!');
      loadUserDomains();
    } catch (error) {
      console.error('Error transferring domain:', error);
      alert('Failed to transfer domain');
    }
  };

  const handleRenew = async (domain) => {
    if (!contract || !account) return;

    try {
      await contract.methods.renewDomain(domain).send({
        from: account
      });
      alert('Domain renewed successfully!');
    } catch (error) {
      console.error('Error renewing domain:', error);
      alert('Failed to renew domain');
    }
  };

  return (
    <div className="domain-manager">
      <h2>My Domains</h2>

      <div className="domains-list">
        {userDomains.map((domain, index) => (
          <div key={index} className="domain-item">
            <span>{domain}</span>
            <button onClick={() => handleRenew(domain)}>Renew</button>
          </div>
        ))}
      </div>

      <div className="transfer-section">
        <h3>Transfer Domain</h3>
        <input
          type="text"
          placeholder="Domain name"
          value={transferDomain}
          onChange={(e) => setTransferDomain(e.target.value)}
        />
        <input
          type="text"
          placeholder="New owner address"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <button onClick={handleTransfer}>Transfer</button>
      </div>
    </div>
  );
}

export default DomainManager;