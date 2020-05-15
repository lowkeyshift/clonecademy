'use strict';

const jwt = require('jsonwebtoken');
const m = require('../utilities/messages/auth-messages').auth.jwtMiddleware;

/**
 * Gets the access token.
 */
let getToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    next();
  } else {
    const message = m.noTokenProvided;
    return res.status(401).json({ message });
  }
};

let tokenAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.USER_SECRET, function (error, decoded) {
    if (error) {
      const message = m.invalidToken;
      return res.status(401).json({ message, error });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports = [
  getToken,
  tokenAuth
];
