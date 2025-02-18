import Web3 from 'web3';

const ChainDNS_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_domain", "type": "string"},
      {"internalType": "string", "name": "_ipAddress", "type": "string"}
    ],
    "name": "registerDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_domain", "type": "string"}
    ],
    "name": "resolveDomain",
    "outputs": [
      {"internalType": "string", "name": "", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_domain", "type": "string"},
      {"internalType": "address", "name": "_newOwner", "type": "address"}
    ],
    "name": "transferDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_domain", "type": "string"}
    ],
    "name": "renewDomain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let web3;
let chainDNSContract;

const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      return true;
    } catch (error) {
      console.error("User denied account access");
      return false;
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    return true;
  } else {
    console.log('No web3 detected');
    return false;
  }
};

const initContract = (contractAddress) => {
  if (web3) {
    chainDNSContract = new web3.eth.Contract(ChainDNS_ABI, contractAddress);
    return chainDNSContract;
  }
  return null;
};

export { web3, initWeb3, initContract, chainDNSContract };