import React, { useState, useEffect } from 'react';
import { web3, chainDNSContract } from './web3';
import { validateDomain, validateAddress } from './utils/validation';

function DomainManager({ account, contract }) {
  const [userDomains, setUserDomains] = useState([]);
  const [transferDomain, setTransferDomain] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setError('');

    // Validate inputs
    const domainValidation = validateDomain(transferDomain);
    if (!domainValidation.isValid) {
      setError(domainValidation.error);
      return;
    }

    const addressValidation = validateAddress(transferTo);
    if (!addressValidation.isValid) {
      setError(addressValidation.error);
      return;
    }

    if (!contract || !account) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      await contract.methods.transferDomain(transferDomain, transferTo).send({
        from: account
      });
      alert('Domain transferred successfully!');
      setTransferDomain('');
      setTransferTo('');
      loadUserDomains();
    } catch (error) {
      console.error('Error transferring domain:', error);
      setError('Failed to transfer domain. Check if you own this domain.');
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async (domain) => {
    setError('');

    if (!contract || !account) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      await contract.methods.renewDomain(domain).send({
        from: account
      });
      alert('Domain renewed successfully!');
    } catch (error) {
      console.error('Error renewing domain:', error);
      setError('Failed to renew domain. Check if you own this domain.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="domain-manager">
      <h2>My Domains</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="domains-list">
        {userDomains.map((domain, index) => (
          <div key={index} className="domain-item">
            <span>{domain}</span>
            <button
              onClick={() => handleRenew(domain)}
              disabled={loading}
            >
              {loading ? 'Renewing...' : 'Renew'}
            </button>
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
          className={error && error.includes('Domain') ? 'error-input' : ''}
        />
        <input
          type="text"
          placeholder="New owner address"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
          className={error && error.includes('address') ? 'error-input' : ''}
        />
        <button
          onClick={handleTransfer}
          disabled={loading}
        >
          {loading ? 'Transferring...' : 'Transfer'}
        </button>
      </div>
    </div>
  );
}

export default DomainManager;