const { inspect } = require('util');
const bcrypt = require('bcrypt');

const errors = require('../errors');
const User = require('../models').users;
const logger = require('../logger');

exports.createUser = newUser =>
  User.findOrCreate({ where: { email: newUser.email }, defaults: newUser })
    .then(([user, created]) => {
      if (!created) {
        throw errors.emailExistingError('Error, email already exists');
      }
      return user;
    })
    .catch(err => {
      logger.error(inspect(err));
      throw err;
    });

exports.encryptPassword = password =>
  bcrypt.hash(password, 10).catch(err => {
    logger.error(inspect(err));
    throw errors.encryptError('Error encrypting password');
  });
