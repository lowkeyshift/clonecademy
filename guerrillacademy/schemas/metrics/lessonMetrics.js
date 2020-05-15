'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonMetricsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    lessons: [{
      lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson' },
      dateStarted: Date,
      dateCompleted: Date
    }]
});

module.exports = mongoose.model('LessonMetric', lessonMetricsSchema);