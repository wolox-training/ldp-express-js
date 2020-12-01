const request = require('supertest');
const app = require('../app');

async function testResponse(method, url, body, result) {
  await request(app)
    [method](url) // eslint-disable-line
    .send(body)
    .expect(result);
}

module.exports = { testResponse };
