'use strict';

const lessonSchema = require('../../../schemas/lesson'),
      mongoose     = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.body.lessonId) {
        return res.status(400).send('No Lesson id provided');
    }
    next();
};

let deleteLesson = (req, res) => {
    let filter = { _id: mongoose.Types.ObjectId(req.body.lessonId) };
    lessonSchema.deleteOne(filter, (err, results) => {
        if (err) {
            return res.status(500).end();
        } else if (results) {
            return res.status(200).json({message: 'Lesson deleted', results});
        } else {
            return res.status(404).json({ message: 'Lesson not found'});
        }
    });
};
      
      
module.exports = [
    validateRequest,
    deleteLesson
];