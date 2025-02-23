const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ChainDNS", function () {
  let chainDNS;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const ChainDNS = await ethers.getContractFactory("ChainDNS");
    chainDNS = await ChainDNS.deploy();
    await chainDNS.deployed();
  });

  describe("Domain Registration", function () {
    it("Should register a new domain", async function () {
      await chainDNS.registerDomain("test.chain", "192.168.1.1");

      const result = await chainDNS.resolveDomain("test.chain");
      expect(result).to.equal("192.168.1.1");
    });

    it("Should not allow duplicate domain registration", async function () {
      await chainDNS.registerDomain("test.chain", "192.168.1.1");

      await expect(
        chainDNS.registerDomain("test.chain", "192.168.1.2")
      ).to.be.revertedWith("Domain already registered");
    });

    it("Should not register empty domain", async function () {
      await expect(
        chainDNS.registerDomain("", "192.168.1.1")
      ).to.be.revertedWith("Domain cannot be empty");
    });
  });

  describe("Domain Transfer", function () {
    beforeEach(async function () {
      await chainDNS.registerDomain("test.chain", "192.168.1.1");
    });

    it("Should transfer domain to new owner", async function () {
      await chainDNS.transferDomain("test.chain", addr1.address);

      await expect(
        chainDNS.connect(addr1).renewDomain("test.chain")
      ).to.not.be.reverted;
    });

    it("Should not allow non-owner to transfer", async function () {
      await expect(
        chainDNS.connect(addr1).transferDomain("test.chain", addr2.address)
      ).to.be.revertedWith("Only owner can transfer");
    });
  });

  describe("Domain Renewal", function () {
    it("Should renew domain by owner", async function () {
      await chainDNS.registerDomain("test.chain", "192.168.1.1");

      await expect(
        chainDNS.renewDomain("test.chain")
      ).to.not.be.reverted;
    });

    it("Should not allow non-owner to renew", async function () {
      await chainDNS.registerDomain("test.chain", "192.168.1.1");

      await expect(
        chainDNS.connect(addr1).renewDomain("test.chain")
      ).to.be.revertedWith("Only owner can renew");
    });
  });
});