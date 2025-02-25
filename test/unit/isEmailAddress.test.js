const { isEmailAddress } = require('../../validationFunctions');

describe('isEmailAddress', () => {
  test('should return true for valid email addresses', () => {
    // Valid email addresses
    expect(isEmailAddress('test@example.com')).toBe(true);
    expect(isEmailAddress('user.name@domain.co')).toBe(true);
    expect(isEmailAddress('firstname.lastname@subdomain.domain.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    // Invalid email addresses
    expect(isEmailAddress('plainaddress')).toBe(false); // No '@' symbol
    expect(isEmailAddress('@missinglocalpart.com')).toBe(false); // Missing local part
    expect(isEmailAddress('user@domain@domain.com')).toBe(false); // Multiple '@' symbols
    expect(isEmailAddress('user@.com')).toBe(false); // Missing domain name
    expect(isEmailAddress('user@domain,com')).toBe(false); // Invalid character (comma)
    expect(isEmailAddress('user@domain..com')).toBe(false); // Consecutive dots in domain
  });

  it('should return false for empty strings', () => {
    expect(isEmailAddress('')).toBe(false);
  });
});
