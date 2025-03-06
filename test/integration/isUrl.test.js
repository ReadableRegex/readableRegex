const request = require('supertest');
const app = require('../../server.js');
const axios = require('axios');

// Mocking axios.get
jest.mock('axios');

describe('POST /api/isUrl', () => {

  it('should return true for a valid URL', async () => {
    const response = await request(app)
      .post('/api/isUrl')
      .send({ inputString: 'https://example.com' });
    
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
  });

  it('should return false for an invalid URL', async () => {
    const response = await request(app)
      .post('/api/isUrl')
      .send({ inputString: 'htp://invalid-url' });
    
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(false);
  });

  it('should return 400 when the input string (URL) is missing', async () => {
    const response = await request(app)
      .post('/api/isUrl')
      .send({}); // No inputString
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Input string required as a parameter.');
  });

  it('should check URL reachability if connectToUrlTest is true', async () => {
    // Mocking axios.get to return a successful response
    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'OK'
    });

    const response = await request(app)
      .post('/api/isUrl')
      .send({
        inputString: 'https://example.com',
        connectToUrlTest: true
      });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
    expect(response.body.connectToUrlResult).toEqual({
      responseCode: 200,
      statusText: 'OK'
    });
  });
});
