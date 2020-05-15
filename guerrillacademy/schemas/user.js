'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  userName: { type: String, lowercase: true, unique: true, required: true },
  emailVerified: { type: Boolean, default: false },
  isTokenValid: { type: Boolean, default: false },
  passwordHash: { type: String },
  firstName: { type: String, lowercase: true, required: true },
  lastName: { type: String, lowercase: true, required: true },
  profileImgUrl: { type: String, default: null },
  stripeCustomerId: { type: String, default: null },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  role: {
    type: String,
    enum: [ 'Instructor', 'Student', 'Admin' ],
  },
  billingAddr: {
    companyName: { type: String, default: null, required: false },
    addressLine1: { type: String, default: null, required: true },
    addressLine2: { type: String, default: null, required: false },
    addressCity: { type: String, default: null, required: true },
    addressZip: { type: String, default: null, required: true },
    addressCountry: { type: String, default: null, required: true },
    addressState: { type: String, default: null, required: true },
    phone: { type: String, default: null, required: false },
  },
  dateCreated: Date,
  dateUpdated: Date,
  _email_verify_token: { type: String },
  _forget_verify_token: { type: String },
  _email_verify_token_expires_at: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
