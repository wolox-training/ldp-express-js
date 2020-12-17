const schemaValidator = require('./middlewares/schema_validator');
const { healthCheck } = require('./controllers/healthCheck');
const { userSingUpSchema, userLogInSchema } = require('./schemas/users');
const users = require('./controllers/users');
const { checkUser } = require('./middlewares/login');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(userSingUpSchema)], users.signUp);
  app.post('/users/sessions', [schemaValidator(userLogInSchema), checkUser], users.logIn);
};
