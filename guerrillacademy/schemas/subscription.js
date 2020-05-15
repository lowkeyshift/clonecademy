'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  subscription: {
      tier: {
        type: String,
        enum: [ 'Free', 'Basic', 'Pro', 'Startup','Admin' ]
      },
      recuring: { 
          type: String,
          enum: [ 'monthly', 'yearly' ]
        },
      status: {
        type: String,
        enum: [ 'active', 'paused', 'canceled' ]
      }
  },
  dateCreated: Date,
  dateUpdated: Date
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
