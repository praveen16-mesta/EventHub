const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phno: {
    type: String,
    required: true,
    trim: true
  },
  pass: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
