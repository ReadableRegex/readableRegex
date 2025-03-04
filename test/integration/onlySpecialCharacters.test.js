const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/onlySpecialCharacters', () => {
  it('should return only special characters from a mixed string', async () => {
    const response = await request(app)
      .post('/api/onlySpecialCharacters')
      .send({ inputString: 'Hello@World!' })
      .expect(200);

    expect(response.body).toHaveProperty('result', '@!');
  });

  it('should return all special characters when input contains only special characters', async () => {
    const response = await request(app)
      .post('/api/onlySpecialCharacters')
      .send({ inputString: '!@#$%^&*()_+' })
      .expect(200);

    expect(response.body).toHaveProperty('result', '!@#$%^&*()_+');
  });

  it('should return an empty string if no special characters are found', async () => {
    const response = await request(app)
      .post('/api/onlySpecialCharacters')
      .send({ inputString: 'HelloWorld123' })
      .expect(200);

    expect(response.body).toHaveProperty('result', '');
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/onlySpecialCharacters')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
