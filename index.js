const express = require('express');
const { rateLimit } = require("express-rate-limit");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const ValidationFunctions = require('./validationFunctions')

/**
 * Global rate limiter middleware
 * limits the number of request sent to our application
 * each IP can make up to 1000 requests per `windowsMs` (1 minute)
 */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 1000, 
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use(limiter)

const requiredParameterResponse = 'Input string required as a parameter.'

app.use(cors())
app.use(express.json())

// Middleware to parse JSON request bodies
app.use(express.json());
app.set('view engine', 'pug')

// POST routes for isEmailAddress and isPhoneNumber
app.post('/api/isEmailAddress', (req, res) => {
  let inputString = req.body.inputString;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isEmailAddress(inputString);
  res.json({ result });
});

app.post('/api/isPhoneNumber', (req, res) => {
  let inputString = req.body.inputString;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isPhoneNumber(inputString);
  res.json({ result });
});


// POST route for onlySpecialCharacters
app.post('/api/onlySpecialCharacters', (req, res) => {
  let inputString = req.body.inputString;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.onlySpecialCharacters(inputString);
  res.json({ result });
});

// POST route for trim
app.post('/api/trim', (req, res) => {
  const inputString = req.body.inputString;
  
  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.trim(inputString);
  res.json({ result });
});

// Example using query parameters (POST requests)

app.post('/api/onlyNumbers', (req, res) => {
  const inputString = req.body.inputString;
  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.onlyNumbers(inputString);
  res.json({ result });
});

app.post('/api/onlyLetters', (req, res) => {
  const inputString = req.body.inputString;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.onlyLetters(inputString);
  res.json({ result });
});

// POST route for excludeTheseCharacters
app.post("/api/excludeTheseCharacters", (req, res) => {
  const { excludeTheseCharacters, inputString } = req.body;

  if (!excludeTheseCharacters || !inputString) {
    return res.status(400).json({
      error: "excludeTheseCharacters and inputString are required.",
    });
  }

  const result = ValidationFunctions.excludeTheseCharacters(inputString, excludeTheseCharacters);
  res.json({ result });

})

app.post('/api/isAlphaNumeric', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isAlphaNumeric(inputString);
  res.json({ result });
});


app.post('/api/isZipCode', (req, res) => {
  const { inputString, countryCode } = req.body;

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

  if (!inputString || !countryCode) {
    return res.status(400).json({ error: 'inputString and countryCode are required.' });
  }

  const upperCountryCode = countryCode.toUpperCase();

  if (!patterns[upperCountryCode]) {
    return res.status(400).json({ 
      error: 'Country code not supported at this time. If this is a valid country code, please open an issue with the developers.', 
      supportedCountries: Object.keys(patterns) 
    });
  }

  const result = ValidationFunctions.isZipCode(inputString, upperCountryCode, patterns);
  res.json({ result });
});

app.post('/api/isInteger', (req, res) => {
  const { inputString } = req.body;
  
  if (!inputString) {
      return res.status(400).json({ 
          error: "inputString is required." 
      });
  }
  
  const result = ValidationFunctions.isInteger(inputString);
  

  res.json({ result });
});

app.post('/api/isHexadecimal', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isHexadecimal(inputString);
  res.json({ result });
});
app.post('/api/isDecimal', (req, res) => {
  const { inputString } = req.body;
  
  if (!inputString) {
      return res.status(400).json({ 
          error: "inputString is required." 
      });
  }
  
  const result = ValidationFunctions.isDecimal(inputString);
  
  res.json({ result });
});

app.post('/api/isLowercase', (req, res) => {
  const { inputString } = req.body;

  if(!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }
  const result = ValidationFunctions.isLowercase(inputString);

  res.json({ result });
});

app.post('/api/isDate', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isDate(inputString);
  res.json({ result });
});

app.post('/api/onlyTheseCharacters', (req, res) => {
  const { onlyTheseCharacters, inputString } = req.body;

  if (!onlyTheseCharacters || !inputString) {
    return res.status(400).json({
      error: "characters to include and inputString are required.",
    });
  }

  const result = ValidationFunctions.includeOnlyTheseCharacters(inputString, onlyTheseCharacters);
  res.json({ result });
});

app.post('/api/isAllCaps', (req, res) => {
  const { inputString } = req.body;

  if(!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }
  const result = ValidationFunctions.isAllCaps(inputString);

  res.json({ result });
});

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
