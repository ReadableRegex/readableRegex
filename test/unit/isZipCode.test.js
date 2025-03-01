const { isZipCode } = require('../../validationFunctions');

describe('isZipCode', () => {
  it('should return true for valid US zip code without space', () => {
    expect(isZipCode('90210', 'US')).toBe(true);
  });

  it('should return true for valid US zip code with space', () => {
    expect(isZipCode('90210-1234', 'US')).toBe(true);
  });

  it('should return false for invalid US zip code', () => {
    expect(isZipCode('12345-12', 'US')).toBe(false);
  });

  it('should return true for valid UK postcode', () => {
    expect(isZipCode('W1A 1AA', 'UK')).toBe(true);
  });

  it('should return false for invalid UK postcode', () => {
    expect(isZipCode('W1A 1A', 'UK')).toBe(false);
  });

  it('should return true for valid CA postal code', () => {
    expect(isZipCode('K1A 0B1', 'CA')).toBe(true);
  });

  it('should return false for invalid CA postal code', () => {
    expect(isZipCode('K1A 0B', 'CA')).toBe(false);
  });

  it('should return true for valid AU zip code', () => {
    expect(isZipCode('2000', 'AU')).toBe(true);
  });

  it('should return false for invalid AU zip code', () => {
    expect(isZipCode('20000', 'AU')).toBe(false);
  });

  it('should return false if country code is missing', () => {
    expect(isZipCode('90210', '')).toBe(false);
  });

  it('should return false for unsupported country code', () => {
    expect(isZipCode('90210', 'XY')).toBe(false);
  });

  it('should return false for missing zip code', () => {
    expect(isZipCode('', 'US')).toBe(false);
  });

  it('should return true for valid BR zip code', () => {
    expect(isZipCode('12345-678', 'BR')).toBe(true);
  });

  it('should return false for invalid BR zip code', () => {
    expect(isZipCode('12345-6789', 'BR')).toBe(false);
  });

  it('should return true for valid IN zip code', () => {
    expect(isZipCode('110001', 'IN')).toBe(true);
  });

  it('should return false for invalid IN zip code', () => {
    expect(isZipCode('000000', 'IN')).toBe(false);
  });
});
