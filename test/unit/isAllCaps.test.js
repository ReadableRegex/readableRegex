const { isAllCaps } = require('../../validationFunctions');

describe('isAllCaps', () => {
  it('should return true for a string with only uppercase letters', () => {
    expect(isAllCaps('HELLO')).toBe(true);  // All uppercase letters
  });

  it('should return false for a string with lowercase letters', () => {
    expect(isAllCaps('Hello')).toBe(false);  // Contains lowercase letter 'e'
  });

  it('should return false for a string with mixed case letters', () => {
    expect(isAllCaps('HeLLo')).toBe(false);  // Mixed case letters
  });

  it('should return false for a string with numbers', () => {
    expect(isAllCaps('HELLO123')).toBe(false);  // Contains numbers
  });

  it('should return false for a string with special characters', () => {
    expect(isAllCaps('HELLO@')).toBe(false);  // Contains special character '@'
  });

  it('should return false for an empty string', () => {
    expect(isAllCaps('')).toBe(false);  // Empty string is not valid
  });

  it('should return false for a string with spaces and lowercase letters', () => {
    expect(isAllCaps('HELLO world')).toBe(false);  // Contains lowercase letter 'w'
  });

  it('should return true for a single uppercase letter', () => {
    expect(isAllCaps('A')).toBe(true);  // Single uppercase letter
  });

  it('should return false for a single lowercase letter', () => {
    expect(isAllCaps('a')).toBe(false);  // Single lowercase letter
  });
});
