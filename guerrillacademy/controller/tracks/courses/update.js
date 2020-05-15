'use strict';

const courseSchema = require('../../../schemas/course'),
      mongoose     = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.body.courseId) {
        return res.status(400).send('No Course id provided');
    }
    next();
};

let updateCourse = (req, res, next) => {
    var Date_stamp = new Date().getTime();
    let filter = { _id: mongoose.Types.ObjectId(req.body.courseId) };
    let update =
        {$set:
            {
                title: req.body.title,
                decription: req.body.description,
                tier: req.body.tier,
                category: req.body.category,
                language: req.body.language,
                stack: req.body.stack,
                instructor: req.body.instructor,
                img_url: req.body.img_url,
                status: req.body.status,
                dateUpdated: Date_stamp
            }
        };
    courseSchema.updateOne(filter, update, (err, results) => {
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
    updateCourse
];