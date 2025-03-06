const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/trim', () => {
  it('should trim leading and trailing whitespace', async () => {
    const response = await request(app)
      .post('/api/trim')
      .send({ inputString: '   Hello World!   ' })
      .expect(200);

    expect(response.body).toHaveProperty('result', 'Hello World!');
  });

  it('should return the same string if no leading or trailing spaces exist', async () => {
    const response = await request(app)
      .post('/api/trim')
      .send({ inputString: 'HelloWorld' })
      .expect(200);

    expect(response.body).toHaveProperty('result', 'HelloWorld');
  });

  it('should handle strings with only spaces and return an empty string', async () => {
    const response = await request(app)
      .post('/api/trim')
      .send({ inputString: '     ' })
      .expect(200);

    expect(response.body).toHaveProperty('result', '');
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/trim')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
