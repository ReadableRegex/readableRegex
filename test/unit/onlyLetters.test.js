const { onlyLetters } = require('../../validationFunctions');

describe('onlyLetters', () => {
  it('should remove all non-letter characters', () => {
    expect(onlyLetters('Hello, World!')).toBe('HelloWorld');
    expect(onlyLetters('123 ABC!')).toBe('ABC');
    expect(onlyLetters('No special chars here')).toBe('Nospecialcharshere');
    expect(onlyLetters('')).toBe('');
    expect(onlyLetters('!@#$$%^&*')).toBe('');
    expect(onlyLetters('what about فارسی')).toBe('whatabout');
  });
});
