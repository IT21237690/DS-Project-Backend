const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Course = require('../models/course');
const checkPermission = require('../Utils/checkPermission');
require('dotenv').config();

const router = express.Router();









router.post('/enroll/:code/:sid', async (req, res) => {
  
  try {
    // const permission = await checkPermission(token);
    // console.log(permission)
    // if (!permission.authorized) {
    //   return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    // }

    const code = req.params.code;
    const sid = req.params.sid; 

    console.log(sid)

    const course = await Course.findOne({ code });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const user = await User.findOne({ studentId: sid, role: 'student' });
    if (!user) {
      return res.status(403).json({ error: 'Only students can enroll in courses' });
    }

    if (user.enrolledCourses.includes(code)) {
      return res.status(400).json({ error: 'User is already enrolled in this course' });
    }

    user.enrolledCourses.push(code);
    await user.save();
    
    res.status(200).json({ message: 'Enrolled successfully', sid: sid });

  } catch (error) {
    console.error('Error occurred during course enrollment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








module.exports = router;
