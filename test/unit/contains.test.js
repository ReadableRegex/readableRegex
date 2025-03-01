const { contains } = require('../../validationFunctions');

describe('contains', () => {
  it("should return true when inputString contains stringContained (case-sensitive)", () => {
    expect(contains("Hello World", "World")).toBe(true);
  });

  it("should return false when inputString does not contain stringContained (case-sensitive)", () => {
    expect(contains("Hello World", "world")).toBe(false);
  });

  it("should return true when inputString contains stringContained (case-insensitive)", () => {
    expect(contains("Hello World", "world", false)).toBe(true);
  });

  it("should return false when inputString does not contain stringContained at all", () => {
    expect(contains("JavaScript", "Python")).toBe(false);
  });

  it("should return false when inputString is empty", () => {
    expect(contains("", "Hello")).toBe(false);
  });

  it("should return true when both inputString and stringContained are identical", () => {
    expect(contains("ExactMatch", "ExactMatch")).toBe(true);
  });

  it("should return true when both inputString and stringContained are identical (case-insensitive)", () => {
    expect(contains("ExactMatch", "exactmatch", false)).toBe(true);
  });

  it("should return false when stringContained is longer than inputString", () => {
    expect(contains("Short", "ShorterThanInput")).toBe(false);
  });

  it("should return true when inputString contains stringContained as a substring", () => {
    expect(contains("abcdef", "bcd")).toBe(true);
  });

  it("should return true when inputString contains stringContained as a substring (case-insensitive)", () => {
    expect(contains("abcdef", "BCD", false)).toBe(true);
  });
});
