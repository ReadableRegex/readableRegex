const { isBinaryString } = require('../../validationFunctions');

describe('isBinaryString', () => {
  it('should return true for a valid binary string with only 0s and 1s', () => {
    expect(isBinaryString('101010')).toBe(true);  // Valid binary string
  });

  it('should return false for a binary string containing non-binary characters', () => {
    expect(isBinaryString('102010')).toBe(false);  // Invalid string with a '2'
  });

  it('should return true for a binary string with only 0s', () => {
    expect(isBinaryString('000000')).toBe(true);  // Valid binary string with all 0s
  });

  it('should return true for a binary string with only 1s', () => {
    expect(isBinaryString('111111')).toBe(true);  // Valid binary string with all 1s
  });

  it('should return false for an empty string', () => {
    expect(isBinaryString('')).toBe(false);  // An empty string is invalid
  });

  it('should return false for a string with spaces', () => {
    expect(isBinaryString('101 01')).toBe(false);  // Invalid string with a space
  });

  it('should return false for a string with special characters', () => {
    expect(isBinaryString('101@01')).toBe(false);  // Invalid string with special character '@'
  });

  it('should return false for a string with mixed characters', () => {
    expect(isBinaryString('10a101')).toBe(false);  // Invalid string with non-binary character 'a'
  });

  it('should return true for a single character binary string "0"', () => {
    expect(isBinaryString('0')).toBe(true);  // Single valid binary digit
  });

  it('should return true for a single character binary string "1"', () => {
    expect(isBinaryString('1')).toBe(true);  // Single valid binary digit
  });
});
