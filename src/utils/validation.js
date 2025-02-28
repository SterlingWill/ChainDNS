export const validateDomain = (domain) => {
  if (!domain || domain.trim() === '') {
    return { isValid: false, error: 'Domain name is required' };
  }

  if (domain.length < 3) {
    return { isValid: false, error: 'Domain must be at least 3 characters long' };
  }

  if (domain.length > 63) {
    return { isValid: false, error: 'Domain must be less than 63 characters' };
  }

  // Check for valid characters
  const domainRegex = /^[a-zA-Z0-9.-]+$/;
  if (!domainRegex.test(domain)) {
    return { isValid: false, error: 'Domain can only contain letters, numbers, dots, and hyphens' };
  }

  // Cannot start or end with hyphen
  if (domain.startsWith('-') || domain.endsWith('-')) {
    return { isValid: false, error: 'Domain cannot start or end with hyphen' };
  }

  return { isValid: true };
};

export const validateIPAddress = (ip) => {
  if (!ip || ip.trim() === '') {
    return { isValid: false, error: 'IP address is required' };
  }

  // Basic IPv4 validation
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (!ipv4Regex.test(ip)) {
    return { isValid: false, error: 'Please enter a valid IPv4 address' };
  }

  return { isValid: true };
};

export const validateAddress = (address) => {
  if (!address || address.trim() === '') {
    return { isValid: false, error: 'Ethereum address is required' };
  }

  if (!address.startsWith('0x')) {
    return { isValid: false, error: 'Address must start with 0x' };
  }

  if (address.length !== 42) {
    return { isValid: false, error: 'Address must be 42 characters long' };
  }

  const hexRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!hexRegex.test(address)) {
    return { isValid: false, error: 'Invalid Ethereum address format' };
  }

  return { isValid: true };
};