const { isValidStateCode } = require('../../validationFunctions');

describe('isValidStateCode', () => {
  it('should return true for valid US state codes', () => {
    // Valid US state codes
    expect(isValidStateCode('LA')).toBe(true);
    expect(isValidStateCode('NY')).toBe(true);
    expect(isValidStateCode('FL')).toBe(true);
  });

  it('should return false for invalid US state codes', () => {
    // Invalid US state codes
    expect(isValidStateCode('LAX')).toBe(false);
    expect(isValidStateCode('NY1')).toBe(false);
    expect(isValidStateCode('FL?')).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isValidStateCode('')).toBe(false);
  });
});
