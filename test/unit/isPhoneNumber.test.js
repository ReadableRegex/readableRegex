const { isPhoneNumber } = require('../../validationFunctions');

describe('isPhoneNumber', () => {
  it('should validate a valid phone number', () => {
    // Valid phone numbers with different formats
    expect(isPhoneNumber('123-456-7890')).toBe(true); // Hyphen separator
    expect(isPhoneNumber('123.456.7890')).toBe(true); // Dot separator
    expect(isPhoneNumber('(123) 456-7890')).toBe(true); // Parentheses around area code
    expect(isPhoneNumber('123 456 7890')).toBe(true); // Space separator
  });

  it('should return false for an invalid phone number', () => {
    // Invalid phone numbers
    expect(isPhoneNumber('123456789')).toBe(false); // Too few digits
    expect(isPhoneNumber('123-45-6789')).toBe(false); // Invalid format
    expect(isPhoneNumber('abc-456-7890')).toBe(false); // Contains letters
  });

  it('should return false for non-phone number strings', () => {
    // Non-phone number strings
    expect(isPhoneNumber('hello world')).toBe(false);
    expect(isPhoneNumber('test123')).toBe(false);
    expect(isPhoneNumber('123-45-67890')).toBe(false); // Too many digits
  });

  it('should return true for optional "+" country code', () => {
    // Valid phone numbers with a leading "+" for the country code
    expect(isPhoneNumber('+123-456-7890')).toBe(true); // With country code and hyphen separator
    expect(isPhoneNumber('+123.456.7890')).toBe(true); // With country code and dot separator
  });
});
