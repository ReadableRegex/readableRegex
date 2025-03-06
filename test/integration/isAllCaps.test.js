const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isAllCaps', () => {

  it('should return true when the input string is entirely uppercase', async () => {
    const response = await request(app)
      .post('/api/isAllCaps')
      .send({ inputString: 'HELLO' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
  });

  it('should return false when the input string is not entirely uppercase', async () => {
    const response = await request(app)
      .post('/api/isAllCaps')
      .send({ inputString: 'Hello' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(false);
  });

  it('should return 400 when the input string is missing', async () => {
    const response = await request(app)
      .post('/api/isAllCaps')
      .send({}); // No inputString

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Input string required as a parameter.');
  });

});


