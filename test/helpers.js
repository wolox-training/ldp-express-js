const request = require('supertest');
const app = require('../app');

const models = require('../app/models');

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

const getTestResponse = params =>
  request(app)
    [params.method](params.url) // eslint-disable-line
    .send(params.body);

module.exports = { getTestResponse, truncateDatabase };
