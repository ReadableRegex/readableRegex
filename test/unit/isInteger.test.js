const ValidationFunctions = require('../../validationFunctions');

describe('ValidationFunctions.isInteger', () => {
  test('should return true because 1234 is integer', () => {
    expect(ValidationFunctions.isInteger("1234")).toBe(true);
  });
  test('should return true because -1234 is integer', () => {
    expect(ValidationFunctions.isInteger("1234")).toBe(true);
  });
  test('should return true because 01234 is not an integer, it has leading 0s', () => {
    expect(ValidationFunctions.isInteger("01234")).toBe(false);
  });
  test('should return true because .1234 is not an integer', () => {
    expect(ValidationFunctions.isInteger(".1234")).toBe(false);
  });
  test('should return true because 1.1 is not an integer', () => {
    expect(ValidationFunctions.isInteger("1.1")).toBe(false);
  });
});