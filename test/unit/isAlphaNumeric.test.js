const { isAlphaNumeric } = require('../../validationFunctions');

describe('isAlphaNumeric', () => {
  it('should return true for alphanumeric strings', () => {
    expect(isAlphaNumeric('abc123')).toBe(true); // Valid alphanumeric string
    expect(isAlphaNumeric('ABC123')).toBe(true); // Uppercase letters and numbers
    expect(isAlphaNumeric('123ABC')).toBe(true); // Numbers followed by letters
  });

  it('should return false for strings containing spaces', () => {
    expect(isAlphaNumeric('abc 123')).toBe(false); // Contains space
    expect(isAlphaNumeric('123 ABC')).toBe(false); // Contains space
  });

  it('should return false for strings containing special characters', () => {
    expect(isAlphaNumeric('abc!123')).toBe(false); // Contains special character (!)
    expect(isAlphaNumeric('abc@123')).toBe(false); // Contains special character (@)
    expect(isAlphaNumeric('123#ABC')).toBe(false); // Contains special character (#)
  });

  it('should return false for empty strings', () => {
    expect(isAlphaNumeric('')).toBe(false); // Empty string
  });
});
