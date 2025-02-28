# ChainDNS

A decentralized domain name system built on blockchain technology. ChainDNS allows users to register, manage, and resolve custom domain names on the blockchain with full ownership control.

## Features

- **Domain Registration**: Register custom domain names with IP resolution
- **Domain Management**: Transfer domains between users
- **Domain Renewal**: Extend domain expiration dates
- **Decentralized Resolution**: Resolve domains without central authority
- **Web3 Integration**: Connect with MetaMask and other Web3 wallets
- **Multi-chain Ready**: Built for Ethereum with easy multi-chain extension

## Technology Stack

- **Smart Contracts**: Solidity ^0.8.17
- **Frontend**: React 18 with Web3.js integration
- **Development**: Hardhat framework
- **Testing**: Hardhat with Chai
- **Styling**: Custom CSS with responsive design

## Getting Started

### Prerequisites

- Node.js >= 16
- MetaMask or compatible Web3 wallet
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ChainDNS.git
cd ChainDNS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Smart Contract Development

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy to Local Network

1. Start local Hardhat node:
```bash
npx hardhat node
```

2. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Testnet

1. Set up environment variables in `.env`:
```
GOERLI_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_private_key_here
```

2. Deploy to Goerli:
```bash
npx hardhat run scripts/deploy.js --network goerli
```

## Usage

### Register a Domain

1. Connect your Web3 wallet
2. Navigate to "Register/Resolve" tab
3. Enter domain name and IP address
4. Click "Register Domain" and confirm transaction

### Resolve a Domain

1. Enter domain name in the resolve section
2. Click "Resolve" to get the associated IP address

### Manage Domains

1. Navigate to "Manage Domains" tab
2. View your registered domains
3. Renew domains or transfer to other addresses

## Contract Functions

### `registerDomain(string domain, string ipAddress)`
Register a new domain with associated IP address.

### `resolveDomain(string domain)`
Get the IP address associated with a domain.

### `transferDomain(string domain, address newOwner)`
Transfer domain ownership to another address.

### `renewDomain(string domain)`
Extend domain expiration by 365 days.

## Development Notes

This project was developed as a personal learning project to explore:
- Smart contract development with Solidity
- React integration with Web3
- Domain name system concepts
- Decentralized application architecture

## Contributing

This is a personal project, but feedback and suggestions are welcome!

## License

MIT License - see LICENSE file for details.