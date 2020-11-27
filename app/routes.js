// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const { passwordValidator, emailValidator } = require('./middlewares/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', passwordValidator, emailValidator, users.signUp);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
