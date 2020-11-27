const error = require('../errors');

const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validador(input) {
  const reg = /^[^%\s]{8,}/;
  const reg2 = /[a-zA-Z]/;
  const reg3 = /[0-9]/;
  return reg.test(input) && reg2.test(input) && reg3.test(input);
}
const passwordValidator = (req, res, next) => {
  if (validador(req.body.password)) {
    next();
  } else {
    next(error.invalidPasswordError('Invalid password'));
  }
};
const emailValidator = (req, res, next) => {
  if (validateEmail(req.body.email)) {
    next();
  } else {
    next(error.invalidEmailError('Invalid email'));
  }
};
module.exports = { passwordValidator, emailValidator };
