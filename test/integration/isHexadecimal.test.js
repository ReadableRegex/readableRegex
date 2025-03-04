const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isHexadecimal', () => {
  it('should return true for a valid hexadecimal string', async () => {
    const response = await request(app)
      .post('/api/isHexadecimal')
      .send({
        inputString: '0x1A3'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for a valid hexadecimal string in uppercase', async () => {
    const response = await request(app)
      .post('/api/isHexadecimal')
      .send({
        inputString: '0xABC123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false for a non-hexadecimal string', async () => {
    const response = await request(app)
      .post('/api/isHexadecimal')
      .send({
        inputString: '123G'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return false for a string without the 0x prefix', async () => {
    const response = await request(app)
      .post('/api/isHexadecimal')
      .send({
        inputString: '1A3'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 for missing input string', async () => {
    const response = await request(app)
      .post('/api/isHexadecimal')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Input string required as a parameter.');
  });
});
