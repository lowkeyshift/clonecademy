'use strict';

const nodemailer = require('nodemailer');
const Email = require('email-templates');

/**
 * Sends an email via SMTP.
 *
 * @param template the name of the pug template.
 * @param to the recipient email address.
 * @param locals local parameters for string interpolation.
 * @param callback callback function.
 * @returns {Promise<*>}
 */
module.exports.sendMail = async (template, to, locals, callback) => {

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PASSWORD;
  const user = process.env.SMTP_USERNAME;
  const pass = process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE === "true";

  const fromEmail = process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

  const from = fromName + " <" + fromEmail + ">";

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass
    }
  });

  const email = new Email({
    transport: transporter,
    send: true,
    preview: false
  });

  email.send({
    template: template,
    message: { from: from, to: to },
    locals: locals
  }).then(res =>  {
    return callback(null, res);
  }).catch(error => {
    return callback(error, null)
  });
};
