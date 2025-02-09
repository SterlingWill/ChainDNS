// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ChainDNS {
    struct Domain {
        address owner;
        string ipAddress;
        uint256 expirationDate;
        bool isActive;
    }

    mapping(string => Domain) public domains;
    mapping(address => string[]) public ownerDomains;

    event DomainRegistered(string domain, address owner, uint256 expirationDate);
    event DomainResolved(string domain, string ipAddress);

    function registerDomain(string memory _domain, string memory _ipAddress) public {
        require(bytes(_domain).length > 0, "Domain cannot be empty");
        require(!domains[_domain].isActive, "Domain already registered");

        domains[_domain] = Domain({
            owner: msg.sender,
            ipAddress: _ipAddress,
            expirationDate: block.timestamp + 365 days,
            isActive: true
        });

        ownerDomains[msg.sender].push(_domain);

        emit DomainRegistered(_domain, msg.sender, block.timestamp + 365 days);
    }

    function resolveDomain(string memory _domain) public view returns (string memory) {
        require(domains[_domain].isActive, "Domain not found or expired");
        require(domains[_domain].expirationDate > block.timestamp, "Domain expired");

        return domains[_domain].ipAddress;
    }
}