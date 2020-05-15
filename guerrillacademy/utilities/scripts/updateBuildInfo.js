const { version: updatedVersion } = require('../../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const buildNo = process.env.BUILD_ID ? process.env.BUILD_ID : 'NA';

let options = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'
};

localBuildDate = (new Date()).toLocaleString('en-US', options);

const info = {
  version: updatedVersion,
  date: localBuildDate,
  build: buildNo,
};

const file = resolve(__dirname, '..', 'shared', 'utility', 'build-info.js');
writeFileSync(file, `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECK IN!
/* jslint: disable */
  module.exports.buildInfo = ${JSON.stringify(info, null, 4)};
/* jslint: enable */
`, { encoding: 'utf-8' });

console.log(`Wrote version info to ${relative(resolve(__dirname, '..'), file)}`);

