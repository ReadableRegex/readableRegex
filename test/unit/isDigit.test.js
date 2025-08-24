const { isDigit } = require('../../validationFunctions');

describe('isDigit', () => {
  it('should return true for strings containing only digits', () => {
    expect(isDigit('123')).toBe(true);
    expect(isDigit('0')).toBe(true);
    expect(isDigit('123456789')).toBe(true);
    expect(isDigit('000123')).toBe(true);
  });

  it('should return false for strings containing letters', () => {
    expect(isDigit('12a3')).toBe(false);
    expect(isDigit('abc')).toBe(false);
    expect(isDigit('123abc')).toBe(false);
    expect(isDigit('abc123')).toBe(false);
  });

  it('should return false for strings containing special characters', () => {
    expect(isDigit('12.3')).toBe(false);
    expect(isDigit('12-3')).toBe(false);
    expect(isDigit('12_3')).toBe(false);
    expect(isDigit('12@3')).toBe(false);
    expect(isDigit('12#3')).toBe(false);
  });

  it('should allow leading/trailing spaces but fail on internal spaces', () => {
    expect(isDigit(' 123')).toBe(true);
    expect(isDigit('123 ')).toBe(true);
    expect(isDigit(' 123 ')).toBe(true);
    expect(isDigit('12 3')).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isDigit('')).toBe(false);
  });

  it('should return false for null and undefined', () => {
    expect(isDigit(null)).toBe(false);
    expect(isDigit(undefined)).toBe(false);
  });

  it('should return false for non-string inputs', () => {
    expect(isDigit(true)).toBe(false);
    expect(isDigit(false)).toBe(false);
    expect(isDigit({})).toBe(false);
    expect(isDigit([])).toBe(false);
  });

  it('should return true for strings with leading and trailing whitespace', () => {
    expect(isDigit('  123  ')).toBe(true);
    expect(isDigit('\t123\n')).toBe(true);
    expect(isDigit('\r123\f')).toBe(true);
  });

  it('should return false for decimal numbers', () => {
    expect(isDigit('12.34')).toBe(false);
    expect(isDigit('.123')).toBe(false);
    expect(isDigit('123.')).toBe(false);
  });

  it('should return false for negative numbers', () => {
    expect(isDigit('-123')).toBe(false);
    expect(isDigit('-0')).toBe(false);
  });

  it('should return false for hexadecimal strings', () => {
    expect(isDigit('1A2B3C')).toBe(false);
    expect(isDigit('0xFF')).toBe(false);
    expect(isDigit('1a2b3c')).toBe(false);
  });
});
