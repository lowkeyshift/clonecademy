'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    dateCreated: Date
});

module.exports = mongoose.model('Support', supportSchema);