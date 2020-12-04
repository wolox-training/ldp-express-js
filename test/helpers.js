const request = require('supertest');
const app = require('../app');

const models = require('../app/models');

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

async function testResponse(method, url, body, result) {
  await request(app)
    [method](url) // eslint-disable-line
    .send(body)
    .expect(result);
}

module.exports = { testResponse, truncateDatabase };
