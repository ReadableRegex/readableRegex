const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isInteger', () => {
  it('should return true for a valid integer string', async () => {
    const response = await request(app)
      .post('/api/isInteger')
      .send({
        inputString: '123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false for a string with non-numeric characters', async () => {
    const response = await request(app)
      .post('/api/isInteger')
      .send({
        inputString: '12a3'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return false for a decimal number', async () => {
    const response = await request(app)
      .post('/api/isInteger')
      .send({
        inputString: '12.3'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 for missing input string', async () => {
    const response = await request(app)
      .post('/api/isInteger')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
