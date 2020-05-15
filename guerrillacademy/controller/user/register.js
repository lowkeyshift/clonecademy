'use strict';

const crypto = require('crypto');
const utility = require('../../utilities/utility');
const mailer = require('../../utilities/mailer');
const m = require('../../utilities/messages/auth-messages').register;
const crud = require('../../models/crud');
const schema = require('../../schemas/user');

/**
 * Attempts to find the user.
 */
let findUser = (req, res, next) => {
  let condition = { email: req.body.user.email };
  crud.findOne(condition, schema, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: m.somethingWentWrong,
        err
      });
    } else {
      if (user) {
        if (user && user.emailVerified) {
          return res.status(409).json({
            success: false,
            message: m.userAlreadyRegistered
          });
        } else {
          const locals = {
            firstName: user.firstName,
            link: `${ process.env.SITE_URL }:${ process.env.SITE_PORT }/verify/${ user._email_verify_token }`
          };

          mailer.sendMail('activation', user.email, locals, function (err, result) {
            if (err) {
              return res.status(500).json({
                success: false,
                message: m.failedSendingVerificationEmail,
                err
              });
            } else {
              return res.status(200).json();
            }
          });

        }
      } else {
        next();
      }
    }
  });
};

/**
 * Hashes the password.
 */
let hashPassword = (req, res, next) => {
  utility.hash(req.body.password, (err, hash) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: m.generatingHash,
        err
      });
    } else {
      req.data = {};
      req.data.hash = hash;
      next();
    }
  });
};

/**
 * Saves the user data.
 */
let saveUserData = (req, res, next) => {
  try {
    let hash = req.data.hash;
    let userData = req.body.user;
    userData['passwordHash'] = hash;
    userData['emailVerified'] = false;
    userData['company'] = req.body.company;

    let option = {};

    crud.insertMany(userData, option, schema, (err, userCreated) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: true,
          message: m.userDidNotSave,
          err
        });
      } else if (!userCreated) {
        return res.status(500).json({
          success: false,
          message: m.userDidNotSave
        });
      } else {
        req.data.user = userCreated[0];
        next();
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: m.generic.error.somethingWentWrong,
      err
    });
  }
};

let generateVerificationToken = function (req, res, next) {
  let user = req.data.user;
  let tpl = 'activation';
  let token = crypto.randomBytes(32).toString('hex');

  let condition = { _id: user._id };

  const update = {
    $set: {
      _email_verify_token: token,
      isTokenValid: true
    }
  };

  crud.updateOne(condition, update, {}, schema, (err, updated) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: 'Something went wrong updating the token.',
        err
      });
    } else {
      if (updated.n > 0 && updated.nModified > 0) {

        const locals = {
          firstName: user.firstName,
          link: `${ process.env.SITE_URL }:${ process.env.SITE_PORT }/verify/${ token }`
        };

        mailer.sendMail(tpl, user.email, locals, function (err, data) {
          if (err) {
            return res.status(500).json({
              success: false,
              error: true,
              message: 'Something went wrong trying to send verification email.',
              err
            });
          } else {
            return res.status(200).json();
          }
        });

      } else {
        return res.status(304).json({
          success: true,
          message: 'Token not updated.'
        });
      }
    }
  });
};

module.exports = [
  findUser,
  hashPassword,
  saveUserData,
  generateVerificationToken
];

