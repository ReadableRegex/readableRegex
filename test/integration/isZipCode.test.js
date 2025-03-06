const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isZipCode', () => {
  it('should return true for a valid zip code in a supported country (US)', async () => {
    const response = await request(app)
      .post('/api/isZipCode')
      .send({
        inputString: '90210',
        countryCode: 'US'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return 400 for unsupported country code', async () => {
    const response = await request(app)
      .post('/api/isZipCode')
      .send({
        inputString: '12345',
        countryCode: 'XYZ'
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid input or country code not supported.');
    expect(response.body).toHaveProperty('supportedCountries');
    expect(response.body.supportedCountries).toEqual(expect.arrayContaining(['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'BR', 'IN']));
  });

  it('should return 400 for missing inputString or countryCode', async () => {
    const response = await request(app)
      .post('/api/isZipCode')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid input or country code not supported.');
  });

  it('should return true for a valid zip code in the UK', async () => {
    const response = await request(app)
      .post('/api/isZipCode')
      .send({
        inputString: 'W1A 1AA',
        countryCode: 'UK'
      })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });
});
