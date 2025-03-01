const { isBoolean } = require('../../validationFunctions');

describe('isBoolean', () => {
  it("should return true for lowercase 'true' and 'false'", () => {
    expect(isBoolean("true")).toBe(true);
    expect(isBoolean("false")).toBe(true);
  });

  it("should return true for uppercase 'TRUE' and 'FALSE'", () => {
    expect(isBoolean("TRUE")).toBe(true);
    expect(isBoolean("FALSE")).toBe(true);
  });

  it("should return true for capitalized 'True' and 'False'", () => {
    expect(isBoolean("True")).toBe(true);
    expect(isBoolean("False")).toBe(true);
  });

  it("should return true for '0' and '1'", () => {
    expect(isBoolean("0")).toBe(true);
    expect(isBoolean("1")).toBe(true);
  });

  it("should return false for other strings", () => {
    expect(isBoolean("yes")).toBe(false);
    expect(isBoolean("no")).toBe(false);
    expect(isBoolean("maybe")).toBe(false);
    expect(isBoolean("")).toBe(false);
    expect(isBoolean("True ")).toBe(false); // Extra space
  });

  it("should return false for non-string types", () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(true)).toBe(false);
    expect(isBoolean(false)).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
  });
});
