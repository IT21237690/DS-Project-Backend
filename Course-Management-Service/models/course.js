const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true 
  },
  cname: String,
  description: String,
  video: { 
    title: String,
    url: String,
    thumbnail: String
  },
  instructorId: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
