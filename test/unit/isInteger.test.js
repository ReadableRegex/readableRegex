const { isInteger } = require('../../validationFunctions');

describe('isInteger', () => {
  it('should return true because 1234 is integer', () => {
    expect(isInteger("1234")).toBe(true);
  });
  it('should return true because -1234 is integer', () => {
    expect(isInteger("1234")).toBe(true);
  });
  it('should return true because 01234 is not an integer, it has leading 0s', () => {
    expect(isInteger("01234")).toBe(false);
  });
  it('should return true because .1234 is not an integer', () => {
    expect(isInteger(".1234")).toBe(false);
  });
  it('should return true because 1.1 is not an integer', () => {
    expect(isInteger("1.1")).toBe(false);
  });
});