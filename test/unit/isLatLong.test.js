const { isLatLong } = require("../../validationFunctions");

describe("isLatLong", () => {
  it("should return true for valid latitude and longitude in decimal degrees format", () => {
    expect(isLatLong("34.052235,-118.243683")).toBe(true);
  });

  it("should return true for valid latitude and longitude in degrees, minutes, seconds format", () => {
    expect(isLatLong("34°3'8.1\"N 118°14'37.2\"W", { checkDMS: true })).toBe(
      true
    );
  });

  it("should return false for invalid latitude and longitude in decimal degrees format", () => {
    expect(isLatLong("34.052235,-118.243683,extra")).toBe(false);
  });

  it("should return false for invalid latitude and longitude in degrees, minutes, seconds format", () => {
    expect(
      isLatLong("34°3'8.1'N 118°14'37.2'W extra", { checkDMS: true })
    ).toBe(false);
  });

  it("should return false if inputString is not a string", () => {
    expect(isLatLong(12345)).toBe(false);
  });

  it("should return false if inputString is an empty string", () => {
    expect(isLatLong("")).toBe(false);
  });
});
