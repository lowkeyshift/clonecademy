'use strict';

const utility = require('../../utilities/utility');
const crudModel = require('../../models/crud');
const userSchema = require('../../schemas/user');
//const jwt = require('jsonwebtoken');
const crypto = require('crypto');


let updateToken = (req, res, next) => {
  req.data = {};
  let token = crypto.randomBytes(32).toString('hex');
  req.data.token = token;
  crudModel.findOneAndUpdate({
    email: req.body.email,
    emailVerified: true
  }, {
      $set: {
        _forget_verify_token: token,
        isTokenValid: true
      }
    }, { new: true }, userSchema, (err, updated) => {
      if (err) {
        return res.status(400).json({ error: true, success: false, message: 'error occured in updateToken', err });
      }
      else if (updated && updated.isTokenValid) {
        res.status(200).json({ success: true, message: 'Link sent On your Registered Email' })
        req.data.user = updated;
        next();
      }
      else {
        return res.status(201).json({ success: false, message: 'email not register/ not verified with the system' });
      }
    })
}



let sendEmail = (req, res) => {
  let user = req.data.user;
  var payload = {
    email: user.email,
    subject: process.env.FORGOT_SUBJECT,
    template_id: process.env.FORGOT_TEMPLATE_ID,
    from: {
      fromEmail: process.env.FROM_EMAIL,
      fromName: process.env.FROM_NAME
    },

  };

  if (process.env.NODE_ENV == 'localhost') {
    payload.substitutions = {
      "{{link}}": process.env.SITE_URL + ':' + process.env.SITE_PORT + process.env.FORGOT_ROUTE + user._forget_verify_token
    }
  }
  else {
    payload.substitutions = {
      "{{link}}": process.env.SITE_URL + process.env.FORGOT_ROUTE + user._forget_verify_token
    }
  }
  utility.sendEmail(payload, (err, email) => {
    if (err) {
      // console.log('ERROR :' + err)
      return 1;
    }
    return 0;
  })
};


module.exports = [
  updateToken, sendEmail
];
