const { isUrl } = require('../../validationFunctions');

describe('isUrl', () => {
  it('should return true for a valid URL with http protocol', () => {
    expect(isUrl('http://example.com')).toBe(true);  // Valid URL with http protocol
  });

  it('should return true for a valid URL with https protocol', () => {
    expect(isUrl('https://example.com')).toBe(true);  // Valid URL with https protocol
  });

  it('should return true for a valid URL without protocol', () => {
    expect(isUrl('example.com')).toBe(true);  // Valid URL without protocol
  });

  it('should return true for a valid URL with path', () => {
    expect(isUrl('https://example.com/path/to/resource')).toBe(true);  // URL with path
  });

  it('should return false for an invalid URL with a missing domain', () => {
    expect(isUrl('https:///path')).toBe(false);  // Invalid URL, missing domain
  });

  it('should return false for a URL with an invalid domain', () => {
    expect(isUrl('https://example@com')).toBe(false);  // Invalid domain (invalid character '@')
  });

  it('should return false for a URL with spaces', () => {
    expect(isUrl('https://example .com')).toBe(false);  // Invalid URL with space in the domain
  });

  it('should return false for an empty string', () => {
    expect(isUrl('')).toBe(false);  // Empty string is not a valid URL
  });

  it('should return true for a URL with a subdomain', () => {
    expect(isUrl('https://sub.example.com')).toBe(true);  // Valid URL with a subdomain
  });

  it('should return false for a URL with an incomplete protocol', () => {
    expect(isUrl('https://')).toBe(false);  // Incomplete URL, missing domain
  });

  it('should return false for a URL with multiple slashes', () => {
    expect(isUrl('https:////example.com')).toBe(false);  // Multiple slashes after the protocol
  });
});
