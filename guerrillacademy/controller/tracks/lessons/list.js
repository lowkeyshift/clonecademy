'use strict';

// http://${url}:${port}/api/courses/lessons?lessonId=${lessonId}
// http://${url}:${port}/api/courses/lessons?courseId=${courseId}

// Be smarter, need to find a way to hold back vid_url if not paying
const lessonSchema = require('../../../schemas/lesson');

let getLesson = (req, res) => {
    let condition = {};

    if (req.query.lessonId) {
        condition = {_id: req.query.lessonId};  
    };

    lessonSchema.find(condition, (err, lessons) => {
        if (err) {
            return res.status(500).end();
        } else if (lessons) {
            return res.status(200).json(lessons);
        } else {
            return res.status(404).json({ message: 'lessons not found'});
        }
    });
};



module.exports = [
    getLesson
];