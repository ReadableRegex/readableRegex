const { onlySpecialCharacters } = require('../../validationFunctions');

describe('onlySpecialCharacters', () => {
  it('should remove all alphanumberic characters and spaces, leaving only special characters', () => {
    expect(onlySpecialCharacters('Hello World 123!@#')).toBe('!@#');
    expect(onlySpecialCharacters('Hello123')).toBe('');
    expect(onlySpecialCharacters('!@#')).toBe('!@#');
    expect(onlySpecialCharacters('')).toBe('');
    expect(onlySpecialCharacters('   ')).toBe('');
  });
});
