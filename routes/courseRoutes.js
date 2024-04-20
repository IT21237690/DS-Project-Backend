const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const authorization = require('../controllers/authorization');

router.post('/add', authorization, async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
      }
      const course = await Course.create(req.body);
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


  
  router.post('/assign-faculty/:code', authorization, async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
      }
  
      const { code } = req.params;
      const { faculty } = req.body;
  
      // Find the course by code
      const course = await Course.findOne({ code });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Check if faculty is already assigned
      if (course.faculty.includes(faculty)) {
        return res.status(400).json({ message: 'Faculty already assigned to this course' });
      }
  
      // Add the new faculty to the existing list
      course.faculty.push(faculty);
  
      // Save the updated course
      await course.save();
  
      res.json({ message: 'Faculty assigned successfully', course });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  // READ all courses
  router.get('/allCourses', async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  // READ single course
  router.get('/get/:id', authorization, async (req, res) => {
    try {
      if (!req.isAdmin && !req.isFaculty) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
      }
      const course = await Course.findOne(req.params.code);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// UPDATE
router.patch('/update/:code', authorization, async (req, res) => {
  try {
    if (!req.isAdmin && !req.isFaculty) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
    }

    const course = await Course.findOne({ code: req.params.code });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Remove the 'code' property from req.body to ensure it cannot be updated
    delete req.body.code;

    // Loop through each property in req.body and update only if it's different
    for (let key in req.body) {
      if (course[key] !== req.body[key]) {
        course[key] = req.body[key];
      }
    }

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


  
router.delete('/delete/:code', authorization, async (req, res) => {
  try {
    if (!req.isAdmin && !req.isFaculty) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
    }
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
