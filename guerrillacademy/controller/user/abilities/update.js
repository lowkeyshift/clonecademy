'use strict';

const crud = require('../../../models/crud');
const user = require('../../../schemas/user');
const fs = require('fs-extra');


let updateUser = (req, res) => {
  // Don't change or erase the password
  if (req.body.user.hasOwnProperty('passwordHash')) {
    delete req.body.user.passwordHash;
  }

  crud.findOneAndUpdate(
    { _id: req.decoded.id }, { $set: req.body.user }, {}, user, (error, updated) => {
      if (error) {
        return res.status(500).json({
          message: 'Something went wrong.', error
        });
      }
      if (updated) {
        return res.status(200).json();
      } else {
        return res.status(500).json({ message: 'Failed to update user' });
      }
    });
};


// TODO should be replaced with an aws call
let copyImage = (req, res) => {
  if (req.body.profilePicture) {
    let folderName = req.data.updated.email.toLowerCase().replace(/ /g, '-');
    let dstPath = `${ process.env.PROFILE_IMAGE_PATH }${ folderName }/`;
    fs.remove(dstPath, (err, removed) => {
      // console.log(removed);
      fs.ensureDir(dstPath, err => {
        let srcPath = process.env.TEMP_FILE_PATH + req.body.profilePicture;
        let dstFilePath = dstPath + req.body.profilePicture;
        fs.move(srcPath, dstFilePath, err => {
          if (err) {
            return res.status(400).json({
              error: true, message: 'error occurred in copy profile picture'
            });
          } else {
            return 0;
          }
        });
      });
    });
  } else {
    return 0;
  }
};


module.exports = [
  updateUser
];
