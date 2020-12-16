const { checkSchema, validationResult } = require('express-validator');
const { schemaError } = require('../errors');

module.exports = schema => [
  checkSchema(schema),
  (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) return next(schemaError(result));
    return next();
  }
];
