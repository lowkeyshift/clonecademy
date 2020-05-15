'use strict';

const utility = require('../../utilities/utility');
const b = require('../../utilities/build-info').buildInfo;

let health = (req, res) => {
  const upTime = utility.elapsedTime(process.uptime());

  res.status(200).json({
    upTime,
    build: b.build,
    version: b.version,
    date: b.date
  });
};

module.exports = [
  health
];

