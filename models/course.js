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
  videos: [{ 
    title: String, // Title of the video
    url: String,   // URL or file path of the video
  }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;