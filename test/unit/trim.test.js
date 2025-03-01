const { trim } = require('../../validationFunctions');

describe('trim', () => {
  it('should trim leading and trailing whitespace', () => {
    // Test cases with leading and/or trailing spaces
    expect(trim('   hello world   ')).toBe('hello world');
    expect(trim('  test  ')).toBe('test');
    expect(trim('   multiple    spaces   ')).toBe('multiple    spaces');
  });

  it('should return the same string if there are no leading or trailing spaces', () => {
    // No whitespace should be changed
    expect(trim('hello')).toBe('hello');
    expect(trim('test')).toBe('test');
  });

  it('should return an empty string for strings that consist only of spaces', () => {
    // Only spaces should be trimmed to an empty string
    expect(trim('     ')).toBe('');
  });

  it('should return an empty string for an empty input', () => {
    // An empty string should return empty string
    expect(trim('')).toBe('');
  });
});
