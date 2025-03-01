const { includeOnlyTheseCharacters } = require('../../validationFunctions');

describe('includeOnlyTheseCharacters', () => {
  it('should return the string with only the allowed characters', () => {
    expect(includeOnlyTheseCharacters("abc123", ['a', 'b', 'c'])).toBe('abc');
  });

  it('should remove all characters that are not in the allowed set', () => {
    expect(includeOnlyTheseCharacters("hello world!", ['h', 'e', 'l', 'o'])).toBe('hellool');
  });

  it('should return an empty string if no characters are allowed', () => {
    expect(includeOnlyTheseCharacters("abc123", [])).toBe('');
  });

  it('should return the input string if all characters are allowed', () => {
    expect(includeOnlyTheseCharacters("abc123", ['a', 'b', 'c', '1', '2', '3'])).toBe('abc123');
  });

  it('should handle input with special characters', () => {
    expect(includeOnlyTheseCharacters("!@#abc123$", ['a', 'b', 'c', '1', '2', '3'])).toBe('abc123');
  });

  it('should handle edge case with empty input string', () => {
    expect(includeOnlyTheseCharacters("", ['a', 'b', 'c'])).toBe('');
  });

  it('should return the original string if all characters are part of the allowed set', () => {
    expect(includeOnlyTheseCharacters("abcdef", ['a', 'b', 'c', 'd', 'e', 'f'])).toBe('abcdef');
  });
});
