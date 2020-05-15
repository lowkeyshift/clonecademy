'use strict';

const crud = require('../../models/crud');
const schema = require('../../schemas/user');

let verifyRequest = (req, res, next) => {
  if (!req.query.email) {
    return res.status(400)
      .json({ message: 'Missing email query parameter.' });
  } else {
    next();
  }
};

let emailExists = (req, res) => {
  const email = decodeURIComponent(req.query.email);
  crud.findOne({ email: email }, schema, (err, data) => {
    if (err) {return res.status(500).end(err);}
    return ( data )
      ? res.status(200).json()
      : res.status(404).json();
  });
};

module.exports = [
  verifyRequest,
  emailExists
];
