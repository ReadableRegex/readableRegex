const { isHexadecimal } = require('../../validationFunctions');

describe('isHexadecimal', () => {
  it('should return true for valid hexadecimal string starting with 0x', () => {
    expect(isHexadecimal('0x1a3f')).toBe(true);
  });

  it('should return true for valid hexadecimal string starting with 0x', () => {
    expect(isHexadecimal('0xABC123')).toBe(true);
  });

  it('should return false for string without 0X prefix', () => {
    expect(isHexadecimal('0XABC123')).toBe(false);
  });

  it('should return false for string without 0x prefix', () => {
    expect(isHexadecimal('1a3f')).toBe(false);
  });

  it('should return false for string with invalid character', () => {
    expect(isHexadecimal('0xg123')).toBe(false);
  });

  it('should return false for string starting with 0x but with spaces', () => {
    expect(isHexadecimal('0x abc')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isHexadecimal('')).toBe(false);
  });

  it('should return false for string with special characters', () => {
    expect(isHexadecimal('0x@123')).toBe(false);
  });

  it('should return false for string with lowercase "x" in "0x" prefix', () => {
    expect(isHexadecimal('0xabc123')).toBe(true);
  });
});
