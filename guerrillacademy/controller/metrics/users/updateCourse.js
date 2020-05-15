'use strict';

const metricsSchema = require('../../../schemas/metrics/courseMetrics'),
      mongoose     = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.body.courseId) {
        return res.status(400).send('No Course id provided');
    }
    next();
};

let startCourse = (req, res) => {
    var Date_stamp = new Date().getTime();
    var status;
    if (req.body.status === "completed") {
        status = "dateCompleted";
    } else {
        status = "dateStarted";
    }
    var courseObj = { courseId: mongoose.Types.ObjectId(req.body.courseId), [status]: Date_stamp };
    let filter = { userId: mongoose.Types.ObjectId(req.body.userId) };
    let data = { userId: mongoose.Types.ObjectId(req.body.userId), $push: {courses: courseObj }};
    let options = {useFindAndModify: false, upsert: true, new: true, setDefaultsOnInsert: true};

    metricsSchema.findOneAndUpdate(filter, data, options, (err, found) => {
        if (err) {
            return res.status(500).end();
        } else if (found) {
                return res.status(200).json(found);
        } else {
            return res.status(404).json({ message: 'user metrics not found'});
        }
    });
};
      
      
module.exports = [
    validateRequest,
    startCourse
];