const error = require('../errors');

const regexEmailValidator = input => {
  const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return reg.test(input);
};
const regexNamesValidator = input => {
  const reg = /^[a-zA-Z][a-zA-Z][^#&<>"~;$^%@!¿¡/()[\],\-_.{}?0-9]{1,30}$/g;
  return reg.test(input);
};
const regexPasswordValidator = input => {
  const reg = /^[^%\s]{8,}/;
  const reg2 = /[a-zA-Z]/;
  const reg3 = /[0-9]/;
  return reg.test(input) && reg2.test(input) && reg3.test(input);
};

const passwordValidator = (req, res, next) => {
  if (!req.body.password) next(error.missingPasswordError('Missing password property'));
  return regexPasswordValidator(req.body.password)
    ? next()
    : next(error.invalidPasswordError('Invalid password'));
};
const emailValidator = (req, res, next) => {
  if (!req.body.email) next(error.missingEmailError('missing email property'));
  return regexEmailValidator(req.body.email) ? next() : next(error.invalidEmailError('Invalid email'));
};
const nameValidator = (req, res, next) => {
  if (!req.body.name) next(error.missingNameError('missing name property'));
  return regexNamesValidator(req.body.name) ? next() : next(error.invalidNameError('Invalid name'));
};

const lastnameValidator = (req, res, next) => {
  if (!req.body.lastName) next(error.missingLastnameError('missing lastName property'));
  return regexNamesValidator(req.body.lastName)
    ? next()
    : next(error.invalidLastnameError('Invalid lastname'));
};

module.exports = { passwordValidator, emailValidator, nameValidator, lastnameValidator };
