const express = require('express');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Course = require('../models/course');
const checkPermission = require('../Utils/checkPermission');
require('dotenv').config();

const router = express.Router();


router.post('/enroll/:code/:sid', async (req, res) => {
  try {
    const code = req.params.code;
    const sid = req.params.sid; 

    console.log(sid);

    // Make a GET request to fetch user details including email
    const user = await User.findOne({ studentId: sid, role: 'student' });

    const course = await Course.findOne({ code });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can enroll in courses' });
    }

    if (user.enrolledCourses.includes(code)) {
      return res.status(400).json({ error: 'User is already enrolled in this course' });
    }

    user.enrolledCourses.push(code);
    await user.save();
    
    // Make API call using axios
    await axios.post(`http://service5:5004/api/email/notify/${sid}`, {
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });


    await axios.post(`http://service5:5004/api/sms/smsReg/${sid}`, {
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });


    res.status(200).json({ message: 'Enrolled successfully', sid: sid });

  } catch (error) {
    console.error('Error occurred during course enrollment:', error);

    // Handle axios error
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error('Server responded with error status:', error.response.status);
      console.error('Error response data:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
      res.status(500).json({ error: 'No response received from the server' });
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up the request:', error.message);
      res.status(500).json({ error: 'Error setting up the request' });
    }
  }
});










module.exports = router;
