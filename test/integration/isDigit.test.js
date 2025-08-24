const request = require('supertest');
const app = require('../../server');

describe('POST /api/isDigit', () => {
  it('should return true for valid digit strings', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '123' })
      .expect(200);

    expect(response.body.result).toBe(true);
  });

  it('should return true for single digit', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '0' })
      .expect(200);

    expect(response.body.result).toBe(true);
  });

  it('should return true for multiple digits with leading zeros', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '000123' })
      .expect(200);

    expect(response.body.result).toBe(true);
  });

  it('should return false for strings containing letters', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '12a3' })
      .expect(200);

    expect(response.body.result).toBe(false);
  });

  it('should return false for strings containing special characters', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '12.3' })
      .expect(200);

    expect(response.body.result).toBe(false);
  });

  it('should return true for strings with leading/trailing whitespace', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: ' 123 ' })
      .expect(200);

    expect(response.body.result).toBe(true);
  });

  it('should return false for strings with internal spaces', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '12 3' })
      .expect(200);

    expect(response.body.result).toBe(false);
  });

  it('should return 400 for empty strings', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '' })
      .expect(400);
  
    expect(response.body.error).toBe('Input string required as a parameter.');
  });
  

  it('should return false for negative numbers', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '-123' })
      .expect(200);

    expect(response.body.result).toBe(false);
  });

  it('should return false for decimal numbers', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: '12.34' })
      .expect(200);

    expect(response.body.result).toBe(false);
  });

  it('should return 400 for missing inputString parameter', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({})
      .expect(400);

    expect(response.body.error).toBe('Input string required as a parameter.');
  });

  it('should return 400 for null inputString parameter', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: null })
      .expect(400);

    expect(response.body.error).toBe('Input string required as a parameter.');
  });

  it('should return 400 for undefined inputString parameter', async () => {
    const response = await request(app)
      .post('/api/isDigit')
      .send({ inputString: undefined })
      .expect(400);

    expect(response.body.error).toBe('Input string required as a parameter.');
  });

});
