const express = require('express');
const { rateLimit } = require("express-rate-limit");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const ValidationFunctions = require('./validationFunctions');
const { urlUtils } = require("./utils/urlUtils");
const expressJSDocSwagger = require('express-jsdoc-swagger');
const run= require('./runPrompt');
const extractJSON = require('./extractJSON');

// Load environment variables
require('dotenv').config();
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

const options = {
  info: {
    version: '1.0.0',
    title: 'Readable Regex',
    license: {
      name: 'MIT',
    },
  },
  //TODO will add this later when we have API tokens
  // security: {
  //   BasicAuth: {
  //     type: 'http',
  //     scheme: 'basic',
  //   },
  // },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  // This pattern finds any .js file. The default value from the docs didn't work
  filesPattern: '*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

expressJSDocSwagger(app)(options);


app.use(limiter)

// Set API URL based on environment
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_API_URL
    : 'http://localhost:3000'

app.use(cors())
// Middleware to parse JSON request bodies
app.use(express.json());
app.set('view engine', 'pug');


/**
 * Basic request
 * @typedef {object} BasicRequest
 * @property {string} inputString.required - Input string
 */

/**
 * Basic response
 * @typedef {object} BasicResponse
 * @property {string} result - Result
 */

/**
 * Bad request response
 * @typedef {object} BadRequestResponse
 * @property {string} error
 */

/**
 * POST /api/isField
 * @summary Returns true/false based on the input string and fieldToValidate
 * @param {BasicRequest} request.body.required
 * @return {BasicResponse} 200 - Success response
 * @return {BadRequestResponse} 400 - Bad request response
 * @example request - test
 * {
 *   "inputString": "test@gmail.com"
 * }
 * @example response - 200 - example payload
 * {
 *    "result": true,
 *    "explanation": "The email address 'test@gmail.com' follows the standard format: local-part@domain.  It contains a username ('test'), an '@' symbol, and a domain name ('gmail.com')."
  }
 * @example response - 400 - example
 * {
 *   "error": "Input string/FieldTovalidate required as a parameter."
 * }
 */
app.post('/api/isField', async(req, res) => {
  const { inputString, fieldToValidate } = req.body;

  if (!inputString || !fieldToValidate) {
    return res.status(400).json({ error: requiredParameterResponse });
  }
  const instructionToLLM = `Can you return true or false if this field '${fieldToValidate}' is valid? Here is the value for this field: '${inputString}'. Can you only return this in a JSON response(and don't write anything else like json or quotes,just the json result) where the 'result' property will be true or false, and the 'explanation' will be the reason for why it's true or false?
  Note:treat special characters(.,@/-+ etc) and digits as Lowercase
  Note:Consider date formats of all over the world
  "// YYYY-MM-DD
  // MM/DD/YYYY or DD/MM/YYYY
  // YYYY/MM/DD
  // DD-MM-YYYY or MM-DD-YYYY
  // YYYY.MM.DD
  // DD.MM.YYYY or MM.DD.YYYY
  // YYYYMMDD
  // YYYY-MM-DD HH:mm:ss"
  Note:Consider strings with only 0 and 1 to be binary
  Note:In case of phone number take into consideration all phone number formats all over the world
  Note:In case of zip code take into consideration zip codes all over the world
  `;
  const jsonResult =extractJSON(await run(instructionToLLM)) // get the string returned from LLM and extract only the JSON part from it
  console.log(jsonResult)
  res.json(jsonResult);
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

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`API URL: ${apiUrl}`);
});
