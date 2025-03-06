const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/contains', () => {
  it('should return true if the inputString contains the supplied string (case-sensitive)', async () => {
    const response = await request(app)
      .post('/api/contains')
      .send({
        inputString: '   Hello World!   ',
        stringContained: 'World',
        caseSensitive: true
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false if the inputString does not contain the supplied string (case-sensitive)', async () => {
    const response = await request(app)
      .post('/api/contains')
      .send({
        inputString: '   Hello World!   ',
        stringContained: 'world',
        caseSensitive: true
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return true if the inputString contains the supplied string (case-insensitive)', async () => {
    const response = await request(app)
      .post('/api/contains')
      .send({
        inputString: '   Hello World!   ',
        stringContained: 'world',
        caseSensitive: false
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/contains')
      .send({ stringContained: 'World', caseSensitive: true })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });

  it('should return 400 if stringContained is missing', async () => {
    const response = await request(app)
      .post('/api/contains')
      .send({ inputString: '   Hello World!   ', caseSensitive: true })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('stringContained is a required parameter');
  });

  it('should return 400 if caseSensitive is missing', async () => {
    const response = await request(app)
      .post('/api/contains')
      .send({
        inputString: '   Hello World!   ',
        stringContained: 'World'
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('caseSensitive is a required parameter');
  });
});
