const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Course = require('../models/course');
const checkPermission = require('../Utils/checkPermission');
require('dotenv').config();

const router = express.Router();




// router.post('/enroll/:code', authorizeStudent, async (req, res) => {
//   try {
//     if (req.isAdmin || req.Faculty) {
//       return res.status(403).json({ message: 'Forbidden: Only Students can enroll in courses' });
//     }
    
//     const code = req.params.code;
//     const sid = req.user.sid; 

//     const course = await Course.findOne({ code });
//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }

//     const user = await User.findOne({ studentId: sid, role: 'student' });
//     if (!user) {
//       return res.status(403).json({ error: 'Only students can enroll in courses' });
//     }

//     if (user.enrolledCourses.includes(code)) {
//       return res.status(400).json({ error: 'User is already enrolled in this course' });
//     }

//     user.enrolledCourses.push(code);
//     await user.save();
    
//     res.status(200).json({ message: 'Enrolled successfully' });
//   } catch (error) {
//     console.error('Error occurred during course enrollment:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


router.post('/enroll/:code', async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  try {
    const permission = await checkPermission(token);
    console.log(permission)
    if (!permission.authorized) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    const code = req.params.code;
    const sid = permission.sid; 

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




// router.put('/unenroll/:code', authorization, async (req, res) => {
//   const code = req.params.code;
//   const { studentId } = req.body;

//   try {
//       // Find the student
//       const student = await User.findOne({ studentId: studentId, role: 'student' });
//       if (!student) {
//           return res.status(404).json({ error: 'Student not found' });
//       }

//       // Check if the student is enrolled in the course
//       const index = student.enrolledCourses.indexOf(code);
//       if (index === -1) {
//           return res.status(400).json({ error: 'The student is not enrolled in this course' });
//       }
      
//       // Remove the course from the student's enrolledCourses array
//       student.enrolledCourses.splice(index, 1);
//       await student.save();
//       res.status(200).json({ message: 'The student has successfully unenrolled from the course' });
           
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });




module.exports = router;
