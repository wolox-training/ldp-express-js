const schemaValidator = require('./middlewares/schema_validator');
const { healthCheck } = require('./controllers/healthCheck');
const { userSingUpSchema } = require('./schemas/users');
const users = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(userSingUpSchema)], users.signUp);
};
