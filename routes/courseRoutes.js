const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const multer = require('multer'); 

// Multer configuration for storing uploaded videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos'); // Destination folder for storing videos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename the video file
  }
});

const upload = multer({ storage: storage });

// Route to add a new course along with video upload
router.post('/add', upload.single('video'), async (req, res) => {
  try {
    const { code, cname, description, credits } = req.body;

    // Create the course object with provided details
    const course = await Course.create({
      code,
      cname,
      description,
      credits,
      videos: [] 
    });

    // Check if a video was uploaded
    if (req.file) {
      // Add the uploaded video to the course's videos array
      const { title } = req.body;
      const videoUrl = req.file.path;

      course.videos.push({ title, url: videoUrl });

      // Save the course with the added video
      await course.save();
    }

    res.status(201).json(course);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error occurred
      return res.status(400).json({ message: 'Course code is already used' });
    } else {
      // Other errors
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

//authorization should be passed
router.get('/allCourses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ single course
//authorization should be passed
router.get('/get/:code', async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update course details (excluding video)
router.patch('/update/:code', async (req, res) => {
  try {
    const { code } = req.params;

    // Find the course by code
    let course = await Course.findOne({ code });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update course details (excluding video)
    course.cname = req.body.cname || course.cname;
    course.description = req.body.description || course.description;
    course.credits = req.body.credits || course.credits;

    // Save the updated course
    await course.save();

    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//authorization should be passed
router.delete('/delete/:code', async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ code: req.params.code });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;