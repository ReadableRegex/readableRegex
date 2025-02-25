const { onlyNumbers } = require('../../validationFunctions');

describe('onlyNumbers', () => {
  it('should remove all non-numeric characters', () => {
    expect(onlyNumbers('123abc456')).toBe('123456');
    expect(onlyNumbers('abc123def456ghi789')).toBe('123456789');
    expect(onlyNumbers('!@#123$%^456&*()')).toBe('123456');
  });

  it('should return empty string when no numbers present', () => {
    expect(onlyNumbers('abc')).toBe('');
    expect(onlyNumbers('!@#$%^')).toBe('');
    expect(onlyNumbers('')).toBe('');
  });

  it('should handle special characters and spaces', () => {
    expect(onlyNumbers('123 456 789')).toBe('123456789');
    expect(onlyNumbers('1.2.3')).toBe('123');
    expect(onlyNumbers('1-2-3')).toBe('123');
  });

  it('should handle mixed content correctly', () => {
    expect(onlyNumbers('Phone: (123) 456-7890')).toBe('1234567890');
    expect(onlyNumbers('Price: $12.99')).toBe('1299');
    expect(onlyNumbers('ID#123-ABC-456')).toBe('123456');
  });
});
