const errors = require('../errors');

exports.userSingUpSchema = {
  name: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorsMesssage: errors.MISSING_NAME_ERROR
    },
    trim: true,
    isString: true,
    errorMessage: errors.INVALID_NAME_ERROR
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorsMesssage: errors.MISSING_LASTNAME_ERROR
    },
    trim: true,
    isString: true,
    errorMessage: errors.INVALID_LASTNAME_ERROR
  },
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorsMesssage: errors.MISSING_EMAIL_ERROR
    },
    trim: true,
    isEmail: true,
    errorMessage: errors.INVALID_EMAIL_ERROR
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorsMesssage: errors.MISSING_PASSWORD_ERROR
    },
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: errors.INVALID_PASSWORD_ERROR
    },
    isAlphanumeric: true,
    errorMessage: errors.INVALID_PASSWORD_ERROR
  }
};

exports.userLogInSchema = {
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.MISSING_EMAIL_ERROR
    },
    trim: true,
    isEmail: true,
    errorMessage: errors.INVALID_EMAIL_ERROR
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorsMesssage: errors.MISSING_PASSWORD_ERROR
    },
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: errors.INVALID_PASSWORD_ERROR
    },
    isAlphanumeric: true,
    errorMessage: errors.INVALID_PASSWORD_ERROR
  }
};
