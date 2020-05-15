'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.sendEmail = (payload, callback) => {
  let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  let request = sg.emptyRequest();
  request.body = {
    'from': {
      'email': payload.from.fromEmail,
      'name': payload.from.fromName
    },
    'personalizations': [
      {
        'to': [{
          'email': payload.email,
        }],
        'subject': payload.subject,
        'substitutions': payload.substitutions
      }
    ],
    'subject': payload.subject,
    'template_id': payload.template_id,
  };
  request.method = 'POST';
  request.path = '/v3/mail/send';

  sg.API(request, function (error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
    if (error) callback(error, null);
    else callback(null, response);
  });
};


module.exports.hash = (password, callback) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      callback(err, hash);
    });
  });
};

module.exports.checkHashPassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, function (err, res) {
    callback(err, res);
  });
};




module.exports.getCustomerId = function (req, res, next) {
  let crud = require('../model/crud');
  let schema = require('../schema/user');

  crud.findOne({ _id: req.decoded.id }, schema, (err, user) => {
    if (err) {

      return res.status(500).json({
        error: true,
        success: false,
        message: 'Something went wrong',
        err
      });

    } else if (user) {

      req.body.customerId = user.stripeCustomerId ? user.stripeCustomerId : null;
      next();

    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  });
};

/**
 * Converts an object's keys from camelCase to snake_case
 */
module.exports.toSnakeCase = function (o) {
  if (isObject(o)) {
    const n = {};
    Object.keys(o).forEach((k) => {
      n[toSnake(k)] = module.exports.toSnakeCase(o[k]);
    });
    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return module.exports.toSnakeCase(i);
    });
  }
  return o;
};

/**
 * Converts an object's keys from snake_case to camelCase
 */
module.exports.toCamelCase = function (o) {
  if (isObject(o)) {
    const n = {};
    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = module.exports.toCamelCase(o[k]);
    });
    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return module.exports.toCamelCase(i);
    });
  }
  return o;
};

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isArray = function (a) {
  return Array.isArray(a);
};

const toSnake = (c) => {
  return c.split(/(?=[A-Z])/).join('_').toLowerCase();
};

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};


/**
 * Returns an elapsed time in seconds as a human-readable string.
 *
 * Note: Function rounds down to the nearest second.
 *
 * Example:
 * elapsedTime(933234)
 * => '10 days, 19 hours, 13 minutes and 54 seconds"
 *
 * @param {number} seconds    time in seconds
 * @returns {string} a human-readable elapsed time.
 */
module.exports.elapsedTime = function (seconds) {
  seconds = Math.max(Math.floor(seconds), 0);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds / 3600) % 24);
  const minutes = Math.floor((seconds / 60) % 60);
  const sec = Math.floor(seconds % 60);

  const outs = [];

  if (days > 0) {
    let dayStr = days + ' day';
    if (days !== 1) { dayStr += 's'; }
    outs.push(dayStr);
  }

  if (hours > 0) {
    let hourStr = hours + ' hour';
    if (hours !== 1) { hourStr += 's'; }
    outs.push(hourStr);
  }

  if (minutes > 0) {
    let minStr = minutes + ' minute';
    if (minutes !== 1) { minStr += 's'; }
    outs.push(minStr);
  }

  let secStr = sec + ' second';
  if (sec !== 1) { secStr += 's'; }
  outs.push(secStr);

  return outs.join(', ').replace(/, ([^,]*)$/, ' and $1');
};



module.exports.removeSpecialCharAndDash = (name) => {
  return name.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-");
};
