const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isBinaryString', () => {

  it('should return true for a valid binary string', async () => {
    const response = await request(app)
      .post('/api/isBinaryString')
      .send({
        inputString: "1010101010"
      });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
  });

  it('should return false for an invalid binary string', async () => {
    const response = await request(app)
      .post('/api/isBinaryString')
      .send({
        inputString: "102010"  // Contains a non-binary character
      });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(false);
  });

  it('should return 400 for a missing input string', async () => {
    const response = await request(app)
      .post('/api/isBinaryString')
      .send({});  // No inputString in the request body

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Input string required as a parameter.");
  });

});

