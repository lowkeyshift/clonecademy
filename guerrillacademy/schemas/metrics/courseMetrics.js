'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseMetricsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    courses: [{ 
      courseId: {type: Schema.Types.ObjectId, ref: 'Course'},
      dateStarted: Date,
      dateCompleted: Date
    }]
});

module.exports = mongoose.model('CourseMetric', courseMetricsSchema);