'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    lesson_number: { type: Number, required: true},
    title: { type: String, unique: true, required: true },
    decription: { type: String, unique: true, required: true },
    category: {
      type: String,
      required: true,
      enum: [ 'Develop', 'Design', 'Architect', 'Deploy', 'Business' ]
    },
    language: [{ type: String }],
    stack: [{ type: String }],
    instructor: [{ type: String, unique: true, required: true }],
    img_url: { type: String, default: null },
    vid_url: { type: String, default: null },
    status: {
      type: String,
      required: true,
      enum: [ 'public', 'private']
    },
  dateCreated: Date,
  dateUpdated: Date
});

module.exports = mongoose.model('Lesson', lessonSchema);