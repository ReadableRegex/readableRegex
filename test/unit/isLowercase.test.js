const { isLowercase } = require('../../validationFunctions');

describe('isLowercase', () => {
  it('should return true for lowercase string', () => {
    expect(isLowercase('hello')).toBe(true);
  });

  it('should return false for string with uppercase letters', () => {
    expect(isLowercase('Hello')).toBe(false);
  });

  it('should return false for string with numbers', () => {
    expect(isLowercase('123abc')).toBe(false);
  });

  it('should return false for string with special characters', () => {
    expect(isLowercase('hello!')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isLowercase('')).toBe(false);
  });

  it('should return false for string with spaces', () => {
    expect(isLowercase('hello world')).toBe(false);
  });

  it('should return true for string with only lowercase letters', () => {
    expect(isLowercase('abcdef')).toBe(true);
  });
});
