const { isAlpha } = require('../../validationFunctions');

describe('isAlpha', () => {
  it('should return true for strings containing only letters', () => {
    expect(isAlpha('hello')).toBe(true); // Lowercase letters only
    expect(isAlpha('HelloWorld')).toBe(true); // Mixed case letters
    expect(isAlpha('ABC')).toBe(true); // Uppercase letters only
    expect(isAlpha('a')).toBe(true); // Single letter
  });

  it('should return false for strings containing numbers', () => {
    expect(isAlpha('hello123')).toBe(false); // Contains numbers
    expect(isAlpha('123hello')).toBe(false); // Starts with numbers
    expect(isAlpha('hello123world')).toBe(false); // Numbers in middle
  });

  it('should return false for strings containing spaces', () => {
    expect(isAlpha('hello world')).toBe(false); // Contains space
    expect(isAlpha(' hello')).toBe(false); // Leading space
    expect(isAlpha('hello ')).toBe(false); // Trailing space
  });

  it('should return false for strings containing special characters', () => {
    expect(isAlpha('hello!')).toBe(false); // Contains exclamation mark
    expect(isAlpha('hello@world')).toBe(false); // Contains at symbol
    expect(isAlpha('hello#world')).toBe(false); // Contains hash
    expect(isAlpha('hello-world')).toBe(false); // Contains hyphen
    expect(isAlpha('hello_world')).toBe(false); // Contains underscore
  });

  it('should return false for empty strings', () => {
    expect(isAlpha('')).toBe(false); // Empty string
  });

  it('should return false for strings with only special characters', () => {
    expect(isAlpha('!@#')).toBe(false); // Only special characters
    expect(isAlpha('123')).toBe(false); // Only numbers
    expect(isAlpha('   ')).toBe(false); // Only spaces
  });

  it('should return false for strings with mixed content', () => {
    expect(isAlpha('hello123world')).toBe(false); // Letters and numbers
    expect(isAlpha('hello world!')).toBe(false); // Letters, spaces, and special characters
    expect(isAlpha('123hello@world')).toBe(false); // Numbers, letters, and special characters
  });
});
