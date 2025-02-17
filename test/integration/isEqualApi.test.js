const request = require('supertest');
const app = require('../../index.js');

describe('POST /api/isEqual', () => {
  test('should return true for exact match with case sensitivity enabled', async () => {
    const response = await request(app)
      .post('/api/isEqual')
      .send({ inputString: 'HelloWorld', comparisonString: 'HelloWorld', caseSensitive: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: true });
  });

  test('should return false for different case when case sensitivity is enabled', async () => {
    const response = await request(app)
      .post('/api/isEqual')
      .send({ inputString: 'HelloWorld', comparisonString: 'helloworld', caseSensitive: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: false });
  });

  test('should return true for case-insensitive match', async () => {
    const response = await request(app)
      .post('/api/isEqual')
      .send({ inputString: 'HelloWorld', comparisonString: 'helloworld', caseSensitive: false });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: true });
  });

  test('should return 400 error if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isEqual')
      .send({ comparisonString: 'HelloWorld', caseSensitive: true });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'inputString and comparisonString are required.' });
  });

  test('should return 400 error if comparisonString is missing', async () => {
    const response = await request(app)
      .post('/api/isEqual')
      .send({ inputString: 'HelloWorld', caseSensitive: true });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'inputString and comparisonString are required.' });
  });
});
