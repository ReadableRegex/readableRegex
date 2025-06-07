const request = require('supertest');
const app = require('../../server.js');

describe('POST /api/isLatLong', () => {
  it('should return true for a valid latitude and longitude in decimal degrees format', async () => {
    const response = await request(app)
      .post('/api/isLatLong')
      .send({ inputString: '34.052235,-118.243683' })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return true for a valid latitude and longitude in degrees, minutes, seconds format', async () => {
    const response = await request(app)
      .post('/api/isLatLong')
      .send({ inputString: "34°3'8.1\"N 118°14'37.2\"W", checkDMS: true })
      .expect(200);

    expect(response.body).toHaveProperty('result', true);
  });

  it('should return false for an invalid latitude and longitude in decimal degrees format', async () => {
    const response = await request(app)
      .post('/api/isLatLong')
      .send({ inputString: '34.052235,-118.243683,extra' })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return false for an invalid latitude and longitude in degrees, minutes, seconds format', async () => {
    const response = await request(app)
      .post('/api/isLatLong')
      .send({ inputString: "34°3'8.1'N 118°14'37.2'W extra", checkDMS: true })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return false if inputString is not a string', async () => {
    const response = await request(app)
      .post('/api/isLatLong')
      .send({ inputString: 12345 })
      .expect(200);

    expect(response.body).toHaveProperty('result', false);
  });

  it('should return 400 if inputString is missing', async () => {
    const response = await request(app)
      .post('/api/isLatLong')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeDefined();
  });
});
