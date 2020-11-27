const { inspect } = require('util');
const bcrypt = require('bcrypt');

const errors = require('../errors');
const Users = require('../models/users');
const logger = require('../logger');

exports.createUser = newUser =>
  Users.findOrCreate(newUser)
    .then(user => {
      const created = user[1];
      if (created) return user[0];
      throw errors.emailExistingError('Error, email already exists');
    })
    .catch(err => {
      logger.error(inspect(err));
      throw errors.userSignupError('Error creating user');
    });

exports.encryptPassword = password =>
  bcrypt.hash(password, 10).catch(err => {
    logger.error(inspect(err));
    throw errors.encryptError('Error encrypting password');
  });
