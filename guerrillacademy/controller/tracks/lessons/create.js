'use strict';

const lessonSchema = require('../../../schemas/lesson');

let validateRequest = (req, res, next) => {
    if (!req.body.courseId) {
        return res.status(400).send('No Course id provided');
    }
    next();
};

let createLesson = (req, res) => {
    var Date_stamp = new Date().getTime();
    let data = {
        courseId: req.body.courseId,
        lesson_number: req.body.lesson_number,
        title: req.body.title,
        decription: req.body.description,
        category: req.body.category,
        language: req.body.language,
        stack: req.body.stack,
        instructor: req.body.instructor,
        img_url: req.body.img_url,
        vid_url: req.body.vid_url,
        status: req.body.status,
        dateCreated: Date_stamp
    };
    lessonSchema.create(data, (err, lesson) => {
        if (err) {
            return res.status(500).end();
        } else if (lesson) {
            return res.status(200).json(lesson);
        } else {
            return res.status(404).json({ message: 'lesson not created'});
        }
    });
};
      
      
module.exports = [
    createLesson
];