'use strict';

const lessonSchema = require('../../../schemas/lesson'),
      mongoose     = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.body.courseId) {
        return res.status(400).send('No Course id provided');
    }
    if (!req.body.lessonId) {
        return res.status(400).send('No lesson id provided');
    }
    next();
};

let updateLesson = (req, res) => {

    var Date_stamp = new Date().getTime();
    let filter = { _id: mongoose.Types.ObjectId(req.body.lessonId) };

    let update =
        {$set:
            {   
                courseId: req.body.courseId,
                title: req.body.title,
                decription: req.body.description,
                category: req.body.category,
                language: req.body.language,
                stack: req.body.stack,
                instructor: req.body.instructor,
                img_url: req.body.img_url,
                vid_url: req.body.vid_url,
                lesson_number: req.body.lesson_number,
                lesson_title: req.body.lesson_title,
                lesson_body: req.body.lesson_body,
                status: req.body.status,
                dateUpdated: Date_stamp
            }
        };
    lessonSchema.findByIdAndUpdate(filter, update, (err, results) => {
        if (err) {
            return res.status(500).end();
        } else if (results) {
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ message: 'course not found'});
        }
    });
};
      
      
module.exports = [
    validateRequest,
    updateLesson
];