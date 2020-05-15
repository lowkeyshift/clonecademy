'use strict';

const metricsSchema = require('../../../schemas/metrics/courseMetrics'),
      mongoose     = require('mongoose');

let validateRequest = (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).send('No User provided');
    }
    next();
};

let updateMetrics = (req, res, next) => {
    var Date_stamp = new Date().getTime();
    var status;
    if (req.body.status === "completed") {
        status = "dateCompleted";
    } else {
        status = "dateStarted";
    }
    let filter = {userId: mongoose.Types.ObjectId(req.body.userId)};

    var course = {courseId: mongoose.Types.ObjectId(req.body.courseId), [status]: Date_stamp};
    var lesson = {lessonId: mongoose.Types.ObjectId(req.body.lessonId), [status]: Date_stamp};
            data = {
                $push: {
                courses: course,
                lessons: lesson
            }
        }
    metricsSchema.findOne(filter, (err, found) => { // Need to findOne then use the output to update individual sections based on "if found".
        if (err) {
            return res.status(500).json({message:"Cannot search metrics", err});
        } else if (found) {
            if(found.courses){
                for(var x = 0; x < found.courses.length; x++){
                    if(req.body.courseId !== found.courses[x].courseId){
                        let data = {
                            $push: {
                            courses: course
                            }
                        }
                        metricsSchema.update(filter, data, (err, results) => {
                            if (err) {
                                return res.status(500).json(err);
                            } else {
                                console.log(`patch metrics: Added courses ${courses}`);
                            }
                        });
                    } else {

                    }
                }
                metricsSchema.update(filter, (err, results) => {});
            } else {
                return res.status(200).json(results);
            }
        } else {
            return res.status(404).json({ message: 'course not found'});
        }
    });
};
      
      
module.exports = [
    validateRequest,
    updateMetrics
];