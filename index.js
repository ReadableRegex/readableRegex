const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const ValidationFunctions = require('./validationFunctions');

// Load environment variables
require('dotenv').config();

// Set API URL based on environment
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_API_URL
    : process.env.DEV_API_URL;

const requiredParameterResponse = 'Input string required as a parameter.';

app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');

// Expose API URL to client-side
app.use((req, res, next) => {
  res.locals.apiUrl = apiUrl;
  next();
});

// POST routes for isEmailAddress and isPhoneNumber
app.post('/api/isEmailAddress', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isEmailAddress(inputString);
  res.json({ result });
});

app.post('/api/isPhoneNumber', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isPhoneNumber(inputString);
  res.json({ result });
});

// POST route for onlySpecialCharacters
app.post('/api/onlySpecialCharacters', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.onlySpecialCharacters(inputString);
  res.json({ result });
});

// POST routes for onlyNumbers and onlyLetters
app.post('/api/onlyNumbers', (req, res) => {
  const { inputString } = req.body;
  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.onlyNumbers(inputString);
  res.json({ result });
});

app.post('/api/onlyLetters', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.onlyLetters(inputString);
  res.json({ result });
});

// POST route for isAlphaNumeric
app.post('/api/isAlphaNumeric', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({ error: requiredParameterResponse });
  }

  const result = ValidationFunctions.isAlphaNumeric(inputString);
  res.json({ result });
});

// POST route for isInteger
app.post('/api/isInteger', (req, res) => {
  const { inputString } = req.body;

  if (!inputString) {
    return res.status(400).json({
      error: 'inputString is required.',
    });
  }

  const result = ValidationFunctions.isInteger(inputString);

  res.json({ result });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`API URL: ${apiUrl}`);
});
