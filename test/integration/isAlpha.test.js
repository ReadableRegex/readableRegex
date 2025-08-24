const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isAlpha', () => {
  it('should return true if the input string contains only letters', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: 'hello'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for mixed case letters', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: 'HelloWorld'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for uppercase letters only', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: 'ABC'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false if the input string contains numbers', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: 'hello123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return false if the input string contains spaces', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: 'hello world'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return false if the input string contains special characters', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: 'hello!world'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 for empty strings', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({ inputString: '' })
      .expect(400);
  
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Input string required as a parameter.');
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Input string required as a parameter.');
  });

  it('should return 400 if inputString is null', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: null
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Input string required as a parameter.');
  });

  it('should return 400 if inputString is undefined', async () => {
    const response = await request(app)
      .post('/api/isAlpha')
      .send({
        inputString: undefined
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Input string required as a parameter.');
  });
});
