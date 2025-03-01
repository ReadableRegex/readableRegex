const { isEqual } = require('../../validationFunctions');

describe('isEqual', () => {
  it('should return true for exact match with case sensitivity enabled', () => {
    expect(isEqual('HelloWorld', 'HelloWorld', true)).toBe(true);
  });

  it('should return false for different case when case sensitivity is enabled', () => {
    expect(isEqual('HelloWorld', 'helloworld', true)).toBe(false);
  });

  it('should return true for case-insensitive match', () => {
    expect(isEqual('HelloWorld', 'helloworld', false)).toBe(true);
  });

  it('should return false for completely different strings', () => {
    expect(isEqual('HelloWorld', 'GoodbyeWorld', false)).toBe(false);
  });

  it('should return true for exact match when case sensitivity is not specified (default: true)', () => {
    expect(isEqual('TestString', 'TestString')).toBe(true);
  });

  it('should return false for case mismatch when case sensitivity is not specified (default: true)', () => {
    expect(isEqual('TestString', 'teststring')).toBe(false);
  });
});
