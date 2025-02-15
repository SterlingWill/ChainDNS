const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ChainDNS = await ethers.getContractFactory("ChainDNS");
  const chainDNS = await ChainDNS.deploy();

  console.log("ChainDNS contract deployed to:", chainDNS.address);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contract: chainDNS.address,
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };

  console.log("Deployment info:", deploymentInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });