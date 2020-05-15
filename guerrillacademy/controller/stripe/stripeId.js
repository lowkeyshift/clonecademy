'use strict';

const userSchema = require('../../schemas/user'),
      mongoose   = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.decode.userId) {
        return res.status(400).send('No User id provided');
    }
    next();
};

let getStripId = (req, res) => {

    userSchema.find({_id: mongoose.Types.ObjectId(req.decode.userId)}, (err, stripe) => {
        if (err) {
            return res.status(500).end();
        } else if (stripe) {
            return res.status(200).json(stripe);
        } else {
            return res.status(404).json({ message: 'stripe ID not found'});
        }
    });
};



module.exports = [
    validateRequest,
    getStripId
];