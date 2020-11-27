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

exports.EMAIL_EXISTING_ERROR = 'email_existing_error';
exports.emailExistingError = message => internalError(message, exports.EMAIL_EXISTING_ERROR);

exports.INVALID_EMAIL_ERROR = 'invalid_email_error';
exports.invalidEmailError = message => internalError(message, exports.INVALID_EMAIL_ERROR);
