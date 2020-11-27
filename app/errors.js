const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.API_JOKES_ERROR = 'api_jokes_error';
exports.apiJokesError = message => internalError(message, exports.API_JOKES_ERROR);

exports.USER_SIGNUP_ERROR = 'user_signup_error';
exports.userSignupError = message => internalError(message, exports.USER_SIGNUP_ERROR);

exports.ENCRYPT_PASSWORD_ERROR = 'encrypt_password_error';
exports.encryptError = message => internalError(message, exports.USER_SIGNUP_ERROR);

exports.INVALID_PASSWORD_ERROR = 'invalid_password_error';
exports.invalidPasswordError = message => internalError(message, exports.INVALID_PASSWORD_ERROR);
