const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isEmailAddress', () => {
  it('should return true for a valid email address', async () => {
    const response = await request(app)
      .post('/api/isEmailAddress')
      .send({ inputString: 'test@gmail.com' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false for an invalid email address', async () => {
    const response = await request(app)
      .post('/api/isEmailAddress')
      .send({ inputString: 'invalid-email' })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isEmailAddress')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
