'use strict';

const jwt = require('jsonwebtoken');

const utility = require('../../utilities/utility');
const crudModel = require('../../models/crud');
const userSchema = require('../../schemas/user');
const m = require('../../utilities/messages/auth-messages').user.login;

let findUser = (req, res, next) => {
  let condition = { email: req.body.email };
  crudModel.findOne(condition, userSchema, (error, user) => {
    if (error) {
      const message = m.errorFindingUser;
      return res.status(500).json({ message, error });
    }
    if (!user) {
      const message = m.userNotFound;
      return res.status(404).json({ message });
    } else if (!user.emailVerified && req.body.email === user.email) {
      const message = m.emailNotYetVerified;
      return res.status(401).json({ message });
    } else {
      req.data = {};
      req.data.user = user;
      next();
    }
  });
};


let authenticatePassword = (req, res) => {
  let user = req.data.user;
  utility.checkHashPassword(
    req.body.password,
    user.passwordHash,
    function (err, isPasswordMatch) {
      if (isPasswordMatch) {
        let payload = {};
        if (user) {
          payload = {
            id: user._id,
            email: user.email,
            role: user.role
          };
        }
        const token = jwt.sign(payload, process.env.USER_SECRET, {
          expiresIn: '30d'// expires in 30 days
        });
        return res.status(200).send({ token });
      } else {
        const message = m.emailAndPasswordDontMatch;
        return res.status(401).json({ message });
      }
    });
};

module.exports = [
  findUser,
  authenticatePassword
];
