'use strict';

const crud = require('../../../models/crud');
const schema = require('../../../schemas/user');
const mailer = require('../../../utilities/mailer');
const jwt = require('jsonwebtoken');
const m = require('../../../utilities/messages/user-messages').passwordReset;

let verifyRequest = (req, res, next) => {
  if (!req.body.email) {
    res.status(400).json({
      success: false,
      message: m.missingEmail
    });
  } else {
    next();
  }
};

let findUser = (req, res, next) => {
  let query = {
    email: req.body.email,
    emailVerified: true
  };

  crud.findOne(query, schema, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: true,
        success: false,
        message: m.failedFindingUser,
        err
      });
    } else if (user == null) {
      return res.status(404).json({
        success: false,
        message: m.userNotFound
      });
    } else {
      req.data = {};
      req.data.user = user;
      next();
    }
  });
};

let sendEmail = (req, res) => {

  const email = req.data.user.email;
  const id = req.data.user._id;

  const payload = { id, email };

  const token = jwt.sign(payload, process.env.USER_SECRET, {
    expiresIn: '1 days'
  });

  const tpl = 'reset-password';

  const locals = {
    link: `${ process.env.SITE_URL }:${ process.env.SITE_PORT }/reset-password/${ token }`
  };

  mailer.sendMail(tpl, email, locals, function (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: m.failedSendingEmail,
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
  sendEmail
];
