const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/onlyTheseCharacters', () => {
  it('should return 400 for missing characters to include or input string', async () => {
    const response = await request(app)
      .post('/api/onlyTheseCharacters')
      .send({}); // Missing both parameters

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("characters to include and inputString are required.");
  });

  it('should return 400 for missing onlyTheseCharacters parameter', async () => {
    const response = await request(app)
      .post('/api/onlyTheseCharacters')
      .send({ inputString: 'abc123' }); // Missing onlyTheseCharacters

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("characters to include and inputString are required.");
  });

  it('should return 400 for missing inputString parameter', async () => {
    const response = await request(app)
      .post('/api/onlyTheseCharacters')
      .send({ onlyTheseCharacters: 'abc123' }); // Missing inputString

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("characters to include and inputString are required.");
  });
});

