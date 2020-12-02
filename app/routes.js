const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const {
  passwordValidator,
  emailValidator,
  nameValidator,
  lastnameValidator
} = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [emailValidator, passwordValidator, nameValidator, lastnameValidator], users.signUp);
};
