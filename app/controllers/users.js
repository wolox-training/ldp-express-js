const logger = require('../logger');
const { createUser, encryptPassword } = require('../services/users');

exports.signUp = ({ body }, res, next) => {
  logger.info('encrypting password');
  return encryptPassword(body.password)
    .then(encryptedPassword => createUser({ ...body, password: encryptedPassword }))
    .then(user => {
      logger.info(`user: ${user.name} ${user.lastName} was created successfully`);
      return res.status(201).send(user);
    })
    .catch(next);
};
