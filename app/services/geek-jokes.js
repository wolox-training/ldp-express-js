const axios = require('axios');

const getJoke = () => {
  axios
    .get('https://geek-jokes.sameerkumar.website/api?format=json')
    .then(
      response =>
        // handle success
        response.data.joke
    )
    .catch(
      error =>
        // handle error
        error
    )
    .then(() => {
      // always executed
    });
};

module.exports = { getJoke };
