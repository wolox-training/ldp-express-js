const { inspect } = require('util');
const bcrypt = require('bcrypt');

const errors = require('../errors');
const User = require('../models').users;
const logger = require('../logger');

exports.findUser = body =>
  User.findOne({ where: { email: body.email } }).catch(err => {
    logger.error(inspect(err));
    throw errors.databaseError();
  });

exports.checkPassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword).catch(err => {
    logger.error(inspect(err));
    throw errors.decryptError('Error decrypting password');
  });
