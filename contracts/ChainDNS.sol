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
    event DomainTransferred(string domain, address fromOwner, address toOwner);
    event DomainRenewed(string domain, uint256 newExpirationDate);

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

    function transferDomain(string memory _domain, address _newOwner) public {
        require(domains[_domain].isActive, "Domain not found");
        require(domains[_domain].owner == msg.sender, "Only owner can transfer");
        require(_newOwner != address(0), "Invalid new owner address");
        require(domains[_domain].expirationDate > block.timestamp, "Domain expired");

        address oldOwner = domains[_domain].owner;
        domains[_domain].owner = _newOwner;

        // Remove from old owner's list
        string[] storage oldOwnerDomains = ownerDomains[oldOwner];
        for (uint i = 0; i < oldOwnerDomains.length; i++) {
            if (keccak256(bytes(oldOwnerDomains[i])) == keccak256(bytes(_domain))) {
                oldOwnerDomains[i] = oldOwnerDomains[oldOwnerDomains.length - 1];
                oldOwnerDomains.pop();
                break;
            }
        }

        // Add to new owner's list
        ownerDomains[_newOwner].push(_domain);

        emit DomainTransferred(_domain, oldOwner, _newOwner);
    }

    function renewDomain(string memory _domain) public {
        require(domains[_domain].isActive, "Domain not found");
        require(domains[_domain].owner == msg.sender, "Only owner can renew");

        domains[_domain].expirationDate = block.timestamp + 365 days;

        emit DomainRenewed(_domain, domains[_domain].expirationDate);
    }
}