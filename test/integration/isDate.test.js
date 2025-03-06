const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isDate', () => {
  it('should return true for a valid date in "YYYY-MM-DD" format', async () => {
    const response = await request(app)
      .post('/api/isDate')
      .send({ inputString: '2025-02-16' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
  });

  it('should return true for a valid date in "MM/DD/YYYY" format', async () => {
    const response = await request(app)
      .post('/api/isDate')
      .send({ inputString: '02/16/2025' });

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
  });

  it('should return 400 for missing inputString', async () => {
    const response = await request(app)
      .post('/api/isDate')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Input string required as a parameter.');
  });
});

