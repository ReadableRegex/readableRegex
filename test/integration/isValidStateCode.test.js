const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isValidStateCode', () => {
  it('should return true for a valid US state code', async () => {
    const response = await request(app)
      .post('/api/isValidStateCode')
      .send({ inputString: 'LA' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false for an invalid US state code', async () => {
    const response = await request(app)
      .post('/api/isValidStateCode')
      .send({ inputString: 'LAX' })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isValidStateCode')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
