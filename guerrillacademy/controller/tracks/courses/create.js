'use strict';

const courseSchema = require('../../../schemas/course');

let createCourse = (req, res, next) => {
    var Date_stamp = new Date().getTime();
    let data = {
            title: req.body.title,
            decription: req.body.description,
            tier: req.body.tier,
            category: req.body.category,
            language: req.body.language,
            stack: req.body.stack,
            instructor: req.body.instructor,
            img_url: req.body.img_url,
            status: req.body.status,
            dateCreated: Date_stamp
        };
    courseSchema.create(data, (err, course) => {
        if (err) {
            return res.status(500).end();
        } else if (course) {
            return res.status(200).json(course);
        } else {
            return res.status(404).json({ message: 'course not created'});
        }
    });
};

let subscriptionPlan = (req, res) => {
    // Create subscription plan in stripe based on user created courses
};
module.exports = [
    createCourse,
    //subscriptionPlan
];