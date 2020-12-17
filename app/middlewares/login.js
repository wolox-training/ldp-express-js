const { findUser } = require('../services/login');
const logger = require('../logger');
const errors = require('../errors');

exports.checkUser = (req, res, next) =>
  findUser(req.body).then(user => {
    if (!user) {
      logger.error('Invalid email');
      next(errors.authenticationError('wrong email or password'));
    }
    req.user = user;
    next();
  });
