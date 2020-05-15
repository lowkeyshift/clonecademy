'use strict';

// http://${url}:${port}/api/courses/lessons?courseId=${courseId}

const courseSchema = require('../../../schemas/course');

let getCourse = (req, res) => {
    let condition = {};

    if (req.query.courseId) {
        condition = {_id: req.query.courseId};  
    };

    courseSchema.find(condition, (err, courses) => {
        if (err) {
            return res.status(500).end();
        } else if (courses) {
            return res.status(200).json(courses);
        } else {
            return res.status(404).json({ message: 'not found'});
        }
    });
};



module.exports = [
    getCourse
];