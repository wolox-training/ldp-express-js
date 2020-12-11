const logger = require('../logger');
const { createUser, encryptPassword } = require('../services/users');

exports.signUp = ({ body }, res, next) => {
  logger.info('encrypting password');
  return encryptPassword(body.password)
    .then(encryptedPassword => createUser({ ...body, password: encryptedPassword }))
    .then(user => {
      const userFormated = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      };
      logger.info(`user: ${user.name} ${user.lastName} was created successfully`);
      return res.status(201).send(userFormated);
    })
    .catch(next);
};
