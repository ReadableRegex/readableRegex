const ValidationFunctions = require('../validationFunctions');

describe('ValidationFunctions.onlyTheseCharacters', () => {
    it("should only include certain characters", () => {
        expect(ValidationFunctions.includeOnlyTheseCharacters("$drew$%", ["$", "%"])).toBe("$$%");
        expect(ValidationFunctions.includeOnlyTheseCharacters("123abc456", ["1", "2", "3"])).toBe("123");
        expect(ValidationFunctions.includeOnlyTheseCharacters("abc123def456ghi789", ["7", "8", "9"])).toBe("789");
        expect(ValidationFunctions.includeOnlyTheseCharacters("!@#123$%^456&*()", ["4", "5", "6"])).toBe("456");
        expect(ValidationFunctions.includeOnlyTheseCharacters("abc", ["1", "2", "3"])).toBe("");
      });
});
