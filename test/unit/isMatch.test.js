const ValidationFunctions = require('../../validationFunctions');

describe('ValidationFunctions.isMatch', () => {
  test('should return true for exact match with case sensitivity enabled', () => {
    expect(ValidationFunctions.isMatch('HelloWorld', 'HelloWorld', true)).toBe(true);
  });

  test('should return false for different case when case sensitivity is enabled', () => {
    expect(ValidationFunctions.isMatch('HelloWorld', 'helloworld', true)).toBe(false);
  });

  test('should return true for case-insensitive match', () => {
    expect(ValidationFunctions.isMatch('HelloWorld', 'helloworld', false)).toBe(true);
  });

  test('should return false for completely different strings', () => {
    expect(ValidationFunctions.isMatch('HelloWorld', 'GoodbyeWorld', false)).toBe(false);
  });

  test('should return true for exact match when case sensitivity is not specified (default: true)', () => {
    expect(ValidationFunctions.isMatch('TestString', 'TestString')).toBe(true);
  });

  test('should return false for case mismatch when case sensitivity is not specified (default: true)', () => {
    expect(ValidationFunctions.isMatch('TestString', 'teststring')).toBe(false);
  });
});
