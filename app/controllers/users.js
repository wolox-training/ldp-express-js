const { inspect } = require('util');

const logger = require('../logger');
const { createUser, encryptPassword } = require('../services/users');
const errors = require('../errors');

exports.signUp = ({ body }, res, next) =>
  encryptPassword(body.password)
    .then(encryptedPassword => createUser({ ...body, password: encryptedPassword }))
    .then(res.status(201).end())
    .catch(err => {
      logger.error(inspect(err));
      next(errors.userSignupError('Error creating user'));
    });
