const { isDate } = require('../../validationFunctions');

describe('isDate', () => {
  it('should return true for a valid date in YYYY-MM-DD format', () => {
    expect(isDate('2025-02-23')).toBe(true);  // Valid date in YYYY-MM-DD format
  });

  it('should return true for a valid date in MM/DD/YYYY format', () => {
    expect(isDate('02/23/2025')).toBe(true);  // Valid date in MM/DD/YYYY format
  });

  it('should return true for a valid date in DD/MM/YYYY format', () => {
    expect(isDate('23/02/2025')).toBe(true);  // Valid date in DD/MM/YYYY format
  });

  it('should return true for a valid date in YYYY/MM/DD format', () => {
    expect(isDate('2025/02/23')).toBe(true);  // Valid date in YYYY/MM/DD format
  });

  it('should return true for a valid date in DD-MM-YYYY format', () => {
    expect(isDate('23-02-2025')).toBe(true);  // Valid date in DD-MM-YYYY format
  });

  it('should return true for a valid date in YYYY.MM.DD format', () => {
    expect(isDate('2025.02.23')).toBe(true);  // Valid date in YYYY.MM.DD format
  });

  it('should return true for a valid date in DD.MM.YYYY format', () => {
    expect(isDate('23.02.2025')).toBe(true);  // Valid date in DD.MM.YYYY format
  });

  it('should return true for a valid date in YYYYMMDD format', () => {
    expect(isDate('20250223')).toBe(true);  // Valid date in YYYYMMDD format
  });

  it('should return true for a valid date in YYYY-MM-DD HH:mm:ss format', () => {
    expect(isDate('2025-02-23 14:30:00')).toBe(true);  // Valid date with time
  });

  it('should return false for an empty string', () => {
    expect(isDate('')).toBe(false);  // Empty string is not a valid date
  });

  it('should return false for an invalid date format with letters', () => {
    expect(isDate('23rd February 2025')).toBe(false);  // Invalid date with letters
  });

  it('should return false for a string that is not a date', () => {
    expect(isDate('random text')).toBe(false);  // Random string is not a valid date
  });

  it('should return false for a date in an unsupported format', () => {
    expect(isDate('2025/02/23 14:30')).toBe(false);  // Unsupported format (missing seconds)
  });

  it('should return false for a date with incorrect separators', () => {
    expect(isDate('2025-02/23')).toBe(false);  // Incorrect separator
  });
});
