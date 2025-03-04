const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isLowercase', () => {
  it('should return true for valid lowercase input', async () => {
    const response = await request(app)
      .post('/api/isLowercase')
      .send({ inputString: 'hello' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
  });

  it('should return false for input with uppercase letters', async () => {
    const response = await request(app)
      .post('/api/isLowercase')
      .send({ inputString: 'Hello' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(false);
  });

  it('should return 400 for missing inputString', async () => {
    const response = await request(app)
      .post('/api/isLowercase')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Input string required as a parameter.');
  });
});
