'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, unique: true, required: true },
    decription: { type: String, unique: true, required: true },
    tier: {
      type: String,
      enum: [ 'Free', 'Basic', 'Pro', 'Startup','Admin' ]
    },
    category: {
      type: String,
      required: true,
      enum: [ 'Develop', 'Design', 'Architect', 'Deploy', 'Business' ]
    },
    language: [{ type: String }],
    stack: [{ type: String }],
    price: {type: Number, default: null},
    instructor: { type: String, unique: true, required: true },
    img_url: { type: String, default: null },
    status: {
      type: String,
      required: true,
      enum: [ 'public', 'private']
    },
  dateCreated: Date,
  dateUpdated: Date
});

module.exports = mongoose.model('Course', courseSchema);