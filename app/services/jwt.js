const jwt = require('jsonwebtoken');
const { secret, expirationTime } = require('../../config').common.session;

exports.generateToken = payload => jwt.sign(payload, secret, { expiresIn: expirationTime });
