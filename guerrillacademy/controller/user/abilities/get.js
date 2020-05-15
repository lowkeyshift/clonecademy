'use strict';

const userSchema = require('../../../schemas/user'),
      mongoose   = require('mongoose');

// let validateRequest = (req, res, next) => {
//     if (!req.decoded.id) {
//         return res.status(400).send('No user provided');
//     }
//     next();
// };
// We need a validate Role function to change the conditions sent back
let getUser = (req, res) => {
  const userId = req.body.id;

    let conditions = [
        {
        $match: { _id: mongoose.Types.ObjectId(req.body.id)}
        },
        {
        $lookup: {
            from: 'tracking',
            localField: '_id',
            foreignField: 'userId',
            as: 'progressDetails',
        }
        },
        {
        $unwind: {
            path:'$progressDetails',
            preserveNullAndEmptyArrays: true
        }
        },
        {
            $project: {
                "progressDetails.userId": 0,
                stripeCustomerId: 0,
                passwordHash: 0,
                emailVerified: 0,
                isTokenValid: 0,
                dateUpdated: 0,
                _email_verify_token: 0,
                _forget_verify_token: 0,
                _email_verify_token_expires_at: 0

            }
        }
    ];
// Use the subscriptionId and trackingId
// Create add in Tracking Data for testing

  userSchema.aggregate(conditions, (err, profile) => {
    if (err) { return res.status(500).send(err); } 
    if (profile.length > 0) {
        let data = Object.assign({}, profile[0]);
        return res.status(200).send(data);
      }
      return res.status(404).end();
  });
};

module.exports = [
    // validateRequest,
    getUser
];
