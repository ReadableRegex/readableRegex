const request = require('supertest');
const app = require('../../server');

// Import constants from server
const SIZE_LIMIT_ERROR = 'Input exceeds maximum size of 10MB';

describe('CSV Validation API', () => {
  // Test valid CSV data
  test('should return true for valid CSV data', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .send({
        inputString: 'name,age\njohn,30\nsmith,25'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: true });
  });

  // Test missing input string
  test('should return 400 for missing input string', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Input string required as a parameter.' });
  });

  // Test empty input string
  test('should return 400 for empty input string', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .send({ inputString: '' });
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Input string required as a parameter.' });
  });

  // Test large input handling
  describe('Large input handling', () => {
    // Test moderately large input (within limits)
    test('should handle large CSV data within limits', async () => {
      // Create a string close to but under 10MB
      const largeString = 'a,b,c\n'.repeat(1024 * 1024); // ~4MB of CSV data
      
      const response = await request(app)
        .post('/api/isCSV')
        .send({ inputString: largeString });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ result: true });
    });

    // Test extremely large input (exceeding limits)
    test('should reject oversized input with 413 status', async () => {
      // Create a string larger than the limit
      const hugeString = 'x'.repeat(11 * 1024 * 1024); // 11MB of data
      
      try {
        const response = await request(app)
          .post('/api/isCSV')
          .send({ inputString: hugeString });
        
        // We should get a 413 Payload Too Large response
        expect(response.status).toBe(413);
        expect(response.body.error).toBe(SIZE_LIMIT_ERROR);
      } catch (error) {
        // If the request fails at the network level, it should be due to size limits
        expect(error.message).toMatch(/request entity too large|payload too large/i);
      }
    });
  });

  // Test invalid CSV format
  test('should handle invalid CSV format', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .send({
        inputString: 'invalid,,csv\nformat,,\nincomplete'
      });
    
    // Even with some formatting issues, if it can be parsed as CSV, it returns true
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: true });
  });

  // Test CSV with different delimiters
  test('should handle CSV with different line endings', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .send({
        inputString: 'name,age\rjohn,30\r\nsmith,25\nbob,40'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: true });
  });

  // Test CSV with quoted values
  test('should handle CSV with quoted values', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .send({
        inputString: 'name,description\n"Smith, John","Senior Developer"\n"Doe, Jane","Project Manager"'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: true });
  });

  // Test CSV with special characters
  test('should handle CSV with special characters', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .send({
        inputString: 'name,email\nJöhn,user@domain.com\nMarie,another@email.com'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: true });
  });

  // Test malformed JSON request
  test('should handle malformed JSON request', async () => {
    const response = await request(app)
      .post('/api/isCSV')
      .set('Content-Type', 'application/json')
      .send('{"inputString": "malformed JSON');
    
    expect(response.status).toBe(400);
  });
}); 