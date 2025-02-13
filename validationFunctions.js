module.exports = class ValidationFunctions {
  // Function to remove all non-numeric characters
  static onlyNumbers(str) {
    return str.replace(/[^0-9]/g, '');
  }

  // Function to remove all non-letter characters (including spaces and punctuation)
  static onlyLetters(str) {
    return str.replace(/[^a-zA-Z]/g, '');
  }

  static onlySpecialCharacters(str) {
    return str.replace(/[a-zA-Z0-9\s]/g, ''); // Keep only special characters
  }


  // Function to trim leading and trailing whitespace
  static trim(str) {
    return str.trim();
  }

  // Function to exclude specific characters
  static excludeTheseCharacters(inputString, excludeChars) {
    const regex = new RegExp(`[${excludeChars}]`, "g");
    return inputString.replace(regex, "");
  }
  
   
  // Function to include only specific characters in input string
  static includeOnlyTheseCharacters(inputString, onlyTheseCharacters) {
    const regex = new RegExp(`[^${onlyTheseCharacters.join("")}]`, "g");
    return inputString.replace(regex, "");
  }


}