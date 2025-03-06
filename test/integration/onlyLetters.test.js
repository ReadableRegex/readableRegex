const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/onlyLetters', () => {
  it('should extract and return only the letters from the input string', async () => {
    const response = await request(app)
      .post('/api/onlyLetters')
      .send({
        inputString: 'abc123def'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', 'abcdef');
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/onlyLetters')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });

  it('should return 400 if inputString is empty', async () => {
    const response = await request(app)
      .post('/api/onlyLetters')
      .send({ inputString: '' })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });

  it('should return only letters if the input string contains letters and special characters', async () => {
    const response = await request(app)
      .post('/api/onlyLetters')
      .send({ inputString: 'abc123!@#def' })
      .expect(200);

    expect(response.body).toHaveProperty('result', 'abcdef');
  });

  it('should return an empty string if the input string contains no letters', async () => {
    const response = await request(app)
      .post('/api/onlyLetters')
      .send({ inputString: '123456!@#' })
      .expect(200);

    expect(response.body).toHaveProperty('result', '');
  });
});
