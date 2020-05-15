'use strict';

const courseSchema = require('../../../schemas/course'),
      mongoose     = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.body.courseId) {
        return res.status(400).send('No Course id provided');
    }
    next();
};

let deleteCourse = (req, res, next) => {
    let filter = { _id: mongoose.Types.ObjectId(req.body.courseId) };
    courseSchema.deleteOne(filter, (err, results) => {
        if (err) {
            return res.status(500).end();
        } else if (results) {
            next()
        } else {
            return res.status(404).json({ message: 'course not found'});
        }
    });
};

let deleteLessons = (req, res) => {
    let filter = { _id: mongoose.Types.ObjectId(req.body.courseId) };
    lessonSchema.deleteMany(filter, (err, results) => {
        if (err) {
            return res.status(500).end();
        } else if (results) {
            return res.status(200).json({message: 'Course & Lessons deleted', results});
        } else {
            return res.status(404).json({ message: 'Lesson not found'});
        }
    });
};

let subscriptionPlan = (req, res) => {
    // Delete subscription plan in stripe based on user created courses
};
module.exports = [
    validateRequest,
    deleteCourse,
    deleteLessons,
    //subscriptionPlan
];