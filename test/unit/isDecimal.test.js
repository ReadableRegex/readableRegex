const { isDecimal } = require('../../validationFunctions');

describe('isDecimal', () => {
  it('should return true for positive decimal numbers with a point', () => {
    expect(isDecimal('23.45')).toBe(true);  // Valid decimal
  });

  it('should return true for positive decimal numbers without a fraction part', () => {
    expect(isDecimal('34.')).toBe(true);  // Valid decimal with trailing point
  });

  it('should return true for decimal numbers starting with a point', () => {
    expect(isDecimal('.45')).toBe(true);  // Valid decimal starting with a point
  });

  it('should return true for negative decimal numbers with a point', () => {
    expect(isDecimal('-273.15')).toBe(true);  // Valid negative decimal
  });

  it('should return true for negative decimal numbers without a fraction part', () => {
    expect(isDecimal('-42.')).toBe(true);  // Valid negative decimal with trailing point
  });

  it('should return true for decimal numbers starting with a minus and a point', () => {
    expect(isDecimal('-.45')).toBe(true);  // Valid negative decimal starting with a point
  });

  it('should return true for positive integers', () => {
    expect(isDecimal('23')).toBe(true);  // Valid integer
  });

  it('should return true for negative integers', () => {
    expect(isDecimal('-42')).toBe(true);  // Valid negative integer
  });

  it('should return false for invalid decimal numbers with multiple signs', () => {
    expect(isDecimal('-+34')).toBe(false);  // Invalid decimal due to multiple signs
  });

  it('should return false for decimal numbers with alphabetic characters', () => {
    expect(isDecimal('34abc')).toBe(false);  // Invalid decimal with letters
  });

  it('should return false for empty string', () => {
    expect(isDecimal('')).toBe(false);  // Empty string is invalid
  });

  it('should return false for decimal numbers with only a fraction part but no integer part', () => {
    expect(isDecimal('.')).toBe(false);  // Incomplete decimal number
  });
});
