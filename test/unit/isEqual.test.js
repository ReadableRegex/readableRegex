const ValidationFunctions = require('../../validationFunctions');

describe('ValidationFunctions.isEqual', () => {
  test('should return true for exact match with case sensitivity enabled', () => {
    expect(ValidationFunctions.isEqual('HelloWorld', 'HelloWorld', true)).toBe(true);
  });

  test('should return false for different case when case sensitivity is enabled', () => {
    expect(ValidationFunctions.isEqual('HelloWorld', 'helloworld', true)).toBe(false);
  });

  test('should return true for case-insensitive match', () => {
    expect(ValidationFunctions.isEqual('HelloWorld', 'helloworld', false)).toBe(true);
  });

  test('should return false for completely different strings', () => {
    expect(ValidationFunctions.isEqual('HelloWorld', 'GoodbyeWorld', false)).toBe(false);
  });

  test('should return true for exact match when case sensitivity is not specified (default: true)', () => {
    expect(ValidationFunctions.isEqual('TestString', 'TestString')).toBe(true);
  });

  test('should return false for case mismatch when case sensitivity is not specified (default: true)', () => {
    expect(ValidationFunctions.isEqual('TestString', 'teststring')).toBe(false);
  });
});
