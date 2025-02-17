module.exports = class ValidationFunctions {
  // Function to remove all non-numeric characters
  static onlyNumbers(value) {
    return value.replace(/[^0-9]/g, '');
  }

  /**
   * If integer return true, otherwise false
   */
  static isInteger(value) {
    const regex = /^(0|[1-9][0-9]*)$/
    return regex.test(value)
  }

  // Function to remove all non-letter characters (including spaces and punctuation)
  static onlyLetters(value) {
    return value.replace(/[^a-zA-Z]/g, '');
  }

  static onlySpecialCharacters(value) {
    return value.replace(/[a-zA-Z0-9\s]/g, ''); // Keep only special characters
  }

  static isEmailAddress(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  // Function to trim leading and trailing whitespace
  static trim(value) {
    return value.trim();
  }

  // Function to exclude specific characters
  static excludeTheseCharacters(inputString, excludeChars) {
    const regex = new RegExp(`[${excludeChars}]`, "g");
    return inputString.replace(regex, "");
  }
  
  static isPhoneNumber(value) {
    // A basic phone number regex (you might need to adjust it for your specific needs)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im;
    return phoneRegex.test(value);
  }

  static isAlphaNumeric(value) {
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
    return alphaNumericRegex.test(value);
  }


  static isZipCode(value, countryCode, patterns) {
    return patterns[countryCode].test(value.replace(/\s/g, ''));
  }

  static isLowercase(value) {
    return /^[a-z]+$/g.test(value);
  }

  static isHexadecimal(value) {
    return /^0x[0-9a-fA-F]+$/.test(value);
  }

  static isDecimal(value) {
    // Allowed decimal: 23.45; 34.; .45; -273.15; -42.; -.45;
    const isDecimalRegex = /^[+-]?((\d+(\.\d*))|(\.\d+))$/;
    return isDecimalRegex.test(value);
  }

  static isBinaryString(value) {
    const regex = new RegExp("^[01]+$");
    return regex.test(value);
  }

  static isAllCaps(value) {
    return /^[A-Z]+$/.test(value);
  }
  
  static isUrl(value) {
    return /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[^\s]*)?$/i.test(value);
  }

  static isDate(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return false;

    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) return true;

    const dateFormats = [
      /^\d{4}-\d{2}-\d{2}$/,                   // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/,                 // MM/DD/YYYY or DD/MM/YYYY
      /^\d{4}\/\d{2}\/\d{2}$/,                 // YYYY/MM/DD
      /^\d{2}-\d{2}-\d{4}$/,                   // DD-MM-YYYY or MM-DD-YYYY
      /^\d{4}\.\d{2}\.\d{2}$/,                 // YYYY.MM.DD
      /^\d{2}\.\d{2}\.\d{4}$/,                 // DD.MM.YYYY or MM.DD.YYYY
      /^\d{8}$/,                               // YYYYMMDD
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/  // YYYY-MM-DD HH:mm:ss
    ];

    return dateFormats.some((regex) => regex.test(dateStr));
  }
  // Function to include only specific characters in input string
  static includeOnlyTheseCharacters(inputString, onlyTheseCharacters) {
    const regex = new RegExp(`[^${onlyTheseCharacters.join("")}]`, "g");
    return inputString.replace(regex, "");
  }

  static isBoolean(inputString) {
    const validBooleanValues = ['true', 'false', '0', '1', 'TRUE', 'FALSE', 'True', 'False']
    return validBooleanValues.includes(inputString)
  }

  static isEqual(value, comparison, caseSensitive = true) {
    if (typeof value !== "string" || typeof comparison !== "string") {
      return false;
    }
    return caseSensitive ? value === comparison : value.toLowerCase() === comparison.toLowerCase();
  }

}