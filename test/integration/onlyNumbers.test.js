const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/onlyNumbers', () => {
  it('should extract and return only the numbers from the input string', async () => {
    const response = await request(app)
      .post('/api/onlyNumbers')
      .send({
        inputString: 'abc123def456'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', '123456');
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/onlyNumbers')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });

  it('should return 400 if inputString is empty', async () => {
    const response = await request(app)
      .post('/api/onlyNumbers')
      .send({ inputString: '' })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });

  it('should return only numbers if the input string contains numbers and special characters', async () => {
    const response = await request(app)
      .post('/api/onlyNumbers')
      .send({ inputString: 'a1b2c3!@#4d5e6' })
      .expect(200);

    expect(response.body).toHaveProperty('result', '123456');
  });
});
