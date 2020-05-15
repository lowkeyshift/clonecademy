'use strict';

const metricsSchema = require('../../../schemas/metrics/lessonMetrics'),
      mongoose     = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.body.lessonId) {
        return res.status(400).send('No Lesson id provided');
    }
    next();
};

let startLesson = (req, res) => {
    var Date_stamp = new Date().getTime();
    var lessonObj = { lessonId: mongoose.Types.ObjectId(req.body.lessonObj), [status]: Date_stamp };
    let filter = { userId: mongoose.Types.ObjectId(req.body.userId) };
    let data = { userId: mongoose.Types.ObjectId(req.body.userId), lessons: lessonObj };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

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
    startLesson
];