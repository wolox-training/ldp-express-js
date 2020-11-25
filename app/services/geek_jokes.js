const axios = require('axios');
const { inspect } = require('util');

const logger = require('../logger/index');
const { apiJokesError } = require('../errors');
const config = require('../../config').common;

const getJoke = () =>
  axios
    .get(`${config.geekJokes.apiUrl}/api?format=json`)
    .then(response => response.data.joke)
    .catch(error => {
      logger.error(inspect(error));
      throw apiJokesError('error with jokes api');
    });

module.exports = { getJoke };
