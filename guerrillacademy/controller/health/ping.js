'use strict';

let ping = (req, res) => {
  res.send('pong');
};

module.exports = [
  ping
];

