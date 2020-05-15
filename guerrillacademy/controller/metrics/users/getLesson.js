'use strict';


const metricSchema = require('../../../schemas/lesson');

let getUserMetrics = (req, res) => {
    let condition = {};

    if (req.query.userId) {
        condition = {_id: req.query.userId};  
    };

    metricSchema.find(condition, (err, data) => {
        if (err) {
            return res.status(500).end();
        } else if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: 'User metrics not found'});
        }
    });
};



module.exports = [
    getUserMetrics
];