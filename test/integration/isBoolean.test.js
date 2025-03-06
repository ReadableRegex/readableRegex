const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isBoolean', () => {
  it('should return true for a valid boolean value (true)', async () => {
    const response = await request(app)
      .post('/api/isBoolean')
      .send({ inputString: 'true' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for a valid boolean value (FALSE)', async () => {
    const response = await request(app)
      .post('/api/isBoolean')
      .send({ inputString: 'FALSE' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for numeric boolean values (1)', async () => {
    const response = await request(app)
      .post('/api/isBoolean')
      .send({ inputString: '1' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for numeric boolean values (0)', async () => {
    const response = await request(app)
      .post('/api/isBoolean')
      .send({ inputString: '0' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false for an invalid boolean string', async () => {
    const response = await request(app)
      .post('/api/isBoolean')
      .send({ inputString: 'invalid' })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isBoolean')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
