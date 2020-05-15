'use strict';

const utility = require('../../../utilities/utility');
const crud = require('../../../models/crud');
const schema = require('../../../schemas/user');
const m = require('../../../utilities/messages/user-messages').passwordChange;


let verifyRequest = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: m.missingPassword
    });
  } else {
    next();
  }
};


let findUser = (req, res, next) => {
  req.data = {};
  crud.find({ _id: req.decoded.id }, schema, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: m.failedFindingUser,
        err
      });
    } else if (!user) {
      return res.status(404).json({
        success: false,
        message: m.userNotFound
      });
    } else {
      next();
    }
  });
};


let hashPassword = (req, res, next) => {
  const password = req.body.password;

  utility.hash(password, (err, hash) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: m.generatingHash,
        err
      });
    } else {
      req.data.hash = hash;
      next();
    }
  });
};


let updatePassword = (req, res) => {
  let hash = req.data.hash;
  const query = { _id: req.decoded.id };
  const options = {
    $set: {
      password: hash
    }
  };

  crud.findOneAndUpdate(query, options, {}, schema, (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        success: false,
        message: m.updatingPassword,
        err
      });
    } else {
      return res.status(200).json();
    }
  });
};

module.exports = [
  verifyRequest,
  findUser,
  hashPassword,
  updatePassword,
];
