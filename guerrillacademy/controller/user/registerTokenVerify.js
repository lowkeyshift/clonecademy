'use strict';

let crudModel = require('../../models/crud'),
  user = require('../../schemas/user');


let tokenVerification = (req, res, next) => {
  if (!req.body.token) {
    return res.status(400).json({
      error: true,
      success: false,
      message: 'token required',
      token: req.body.token
    });
  }

  let condition = {
    _email_verify_token: req.body.token,
    isTokenValid: true
  };
  let update = {
    $set: {
      emailVerified: true,
      _email_verify_token: null

    }
  };

  crudModel.updateOne(condition, update, {}, user, (err, updated) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'error occurred in checkEmail of forgetVerify',
        error: err
      });
    } else if (updated.nModified > 0 && updated.n > 0) {
      return res.status(200).json({
        success: true,
        message: 'verification done',
      });
    } else {
      return res.status(201).json({ success: false, message: 'invalid token' });
    }
  });
};


module.exports = [
  tokenVerification
];
