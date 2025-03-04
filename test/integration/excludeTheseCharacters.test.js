const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/excludeTheseCharacters', () => {
  it('should remove the specified characters from the input string', async () => {
    const response = await request(app)
      .post('/api/excludeTheseCharacters')
      .send({
        excludeTheseCharacters: '!@#',
        inputString: 'abc!123@def#456'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', 'abc123def456');
  });

  it('should return 400 if excludeTheseCharacters is missing', async () => {
    const response = await request(app)
      .post('/api/excludeTheseCharacters')
      .send({
        inputString: 'abc!123@def#456'
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('excludeTheseCharacters and inputString are required.');
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/excludeTheseCharacters')
      .send({
        excludeTheseCharacters: '!@#'
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('excludeTheseCharacters and inputString are required.');
  });

  it('should return an empty string if the excludeTheseCharacters matches all characters in the string', async () => {
    const response = await request(app)
      .post('/api/excludeTheseCharacters')
      .send({
        excludeTheseCharacters: 'abc123',
        inputString: 'abc123!@#def456'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', '!@#def456');
  });
});
