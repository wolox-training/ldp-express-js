const axios = require('axios');

const getJoke = () =>
  axios
    .get('https://geek-jokes.sameerkumar.website/api?format=json')
    .then(response => response.data.joke)
    .catch(error => error);

module.exports = { getJoke };
