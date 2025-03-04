const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isDecimal', () => {
  it('should return true for valid decimal input', async () => {
    const response = await request(app)
      .post('/api/isDecimal')
      .send({ inputString: '123.45' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
  });

  it('should return false for invalid decimal input', async () => {
    const response = await request(app)
      .post('/api/isDecimal')
      .send({ inputString: 'abc' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(false);
  });

  it('should return 400 for missing inputString', async () => {
    const response = await request(app)
      .post('/api/isDecimal')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Input string required as a parameter.');
  });
});
