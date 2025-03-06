const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isAlphaNumeric', () => {
  it('should return true if the input string contains only alphanumeric characters', async () => {
    const response = await request(app)
      .post('/api/isAlphaNumeric')
      .send({
        inputString: 'abc123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false if the input string contains non-alphanumeric characters', async () => {
    const response = await request(app)
      .post('/api/isAlphaNumeric')
      .send({
        inputString: 'abc@123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isAlphaNumeric')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Input string required as a parameter.');
  });

  it('should return true if input string contains only letters', async () => {
    const response = await request(app)
      .post('/api/isAlphaNumeric')
      .send({
        inputString: 'abc'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true if input string contains only numbers', async () => {
    const response = await request(app)
      .post('/api/isAlphaNumeric')
      .send({
        inputString: '12345'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });
});
