const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const {
  passwordValidator,
  emailValidator,
  nameValidator,
  lastnameValidator,
  bodyValidator
} = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(
    '/users',
    [bodyValidator, emailValidator, passwordValidator, nameValidator, lastnameValidator],
    users.signUp
  );
};
