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

    static isEmailAddress(str) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    }

    static isPhoneNumber(str) {
        // A basic phone number regex (you might need to adjust it for your specific needs)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/im;
        return phoneRegex.test(str);
    }

    static isAlphaNumeric(str) {
        const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
        return alphaNumericRegex.test(str);
    }


    static isZipCode(str, countryCode) {
        //regex patterns for different global postal code formats
            const patterns = {
                US: /^\d{5}(-\d{4})?$/,
                UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
                CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
                AU: /^\d{4}$/,
                DE: /^\d{5}$/,
                FR: /^\d{5}$/,
                JP: /^\d{3}-\d{4}$/,
                BR: /^\d{5}-\d{3}$/,
                IN: /^[1-9]\d{5}$/
            };
    
            return patterns[countryCode].test(str.replace(/\s/g, ''));
    }
}