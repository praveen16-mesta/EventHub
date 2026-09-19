const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['music', 'business', 'sports', 'food', 'tech', 'other'],
    lowercase: true
  },
  attendees: {
    type: Number,
    default: 0
  },
  capacity: {
    type: Number,
    required: true,
    default: 100
  },
  description: {
    type: String,
    default: ''
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  organizerName: {
    type: String,
    default: 'EventHub Host'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
