'use strict';

let crudModel = require('../../models/crud'),
    user = require('../../schemas/user'),
    utility = require('../../utilities/utility');

let password = (req, res, next) => {
    if (!req.body.token) {
        return res.status(400).json({
            error: true,
            success: false,
            message: 'token required',
            token: req.body.token
        });

    }
    if (!req.body.newPassword) {
        return res.status(400).json({
            error: true,
            success: false,
            message: 'newPassword required',
            password: req.body.newPassword
        });

    }
    utility.hash(req.body.newPassword, (err, hash) => {
        if (err) {
            return res.status(400).json({ error: true, message: 'error occured in hash password', err });
        }
        else {
            req.data = {};
            req.data.hash = hash;
        }
    })
}


let tokenVerification = (req, res, next) => {


    let condition = {
        _forget_verify_token: req.body.token,
        isTokenValid: true,
        emailVerified: true
    };
    let update = {
        $set: {
            _forget_verify_token: null,
            password: req.data.hash

        }
    };
    let option = {};
    crudModel.updateOne(condition, update, option, user, (err, updated) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'error occurred in checkEmail of forgetVerify',
                error: err
            });
        } else if (updated.nModified > 0 && updated.n > 0) {
            return res.status(200).json({
                success: true,
                message: 'verification done',
            });
        } else {
            return res.status(201).json({ success: false, message: 'invalid token' });
        }
    });
};


module.exports = [
    password,
    tokenVerification
];
