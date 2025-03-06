const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isPhoneNumber', () => {
  it('should return true for a valid phone number with country code', async () => {
    const response = await request(app)
      .post('/api/isPhoneNumber')
      .send({ inputString: '+1234567890' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for a valid phone number without country code', async () => {
    const response = await request(app)
      .post('/api/isPhoneNumber')
      .send({ inputString: '1234567890' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false for an invalid phone number (too short)', async () => {
    const response = await request(app)
      .post('/api/isPhoneNumber')
      .send({ inputString: '123' })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return false for an invalid phone number (letters included)', async () => {
    const response = await request(app)
      .post('/api/isPhoneNumber')
      .send({ inputString: '12345abc678' })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isPhoneNumber')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
