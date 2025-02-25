const { includeOnlyTheseCharacters } = require('../../validationFunctions');

describe('onlyTheseCharacters', () => {
  it("should only include certain characters", () => {
    expect(includeOnlyTheseCharacters("$drew$%", ["$", "%"])).toBe("$$%");
    expect(includeOnlyTheseCharacters("123abc456", ["1", "2", "3"])).toBe("123");
    expect(includeOnlyTheseCharacters("abc123def456ghi789", ["7", "8", "9"])).toBe("789");
    expect(includeOnlyTheseCharacters("!@#123$%^456&*()", ["4", "5", "6"])).toBe("456");
    expect(includeOnlyTheseCharacters("abc", ["1", "2", "3"])).toBe("");
  });
});
