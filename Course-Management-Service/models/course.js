const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true 
  },
  cname: String,
  description: String,
  credits: String,
  video: { 
    title: String,
    url: String,
    thumbnail: String
  },
  instructorId: {
    type: String,
    required: true
  },
   
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
