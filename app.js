// app.js
// The app.js file is used to set up the server, load environment variables, and start listening on a given port.
// It imports the server configuration from server.js to avoid an issue where SuperTest prevents the server from properly closing after running integration tests.

const app = require('./server.js');
// Load environment variables
require('dotenv').config();

const port = process.env.PORT || 3000;
// Set API URL based on environment
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_API_URL
    : `http://localhost:${port}`

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`API URL: ${apiUrl}`);
});