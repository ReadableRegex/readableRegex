const { excludeTheseCharacters } = require('../../validationFunctions');

describe('excludeTheseCharacters', () => {
  it('should remove the specified characters from the string', () => {
    // Test with various input strings and exclude characters
    expect(excludeTheseCharacters('hello world', 'lo')).toBe('he wrd'); // Removes 'l' and 'o'
    expect(excludeTheseCharacters('abc123', '1')).toBe('abc23'); // Removes '1'
    expect(excludeTheseCharacters('special!@#$%', '!@#')).toBe('special$%'); // Removes '!', '@', '#'
  });

  it('should return the same string if no characters are excluded', () => {
    // No characters to remove, the string stays the same
    expect(excludeTheseCharacters('hello world', '')).toBe('hello world');
  });

  it('should return an empty string if all characters are excluded', () => {
    // Remove all characters (e.g., exclude every character from the input string)
    expect(excludeTheseCharacters('hello', 'helo')).toBe('');
  });

  it('should handle an empty string as input', () => {
    // Empty string should return an empty string
    expect(excludeTheseCharacters('', 'abc')).toBe('');
  });

  it('should handle special characters correctly', () => {
    // Test with special characters
    expect(excludeTheseCharacters('hello!@#$', '!@#')).toBe('hello$'); // Removes '!@#'
    expect(excludeTheseCharacters('test@home.com', '@.')).toBe('testhomecom'); // Removes '@' and '.'
  });
});
