const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/user');
const Course = require('../models/course');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, role, name, email, phone } = req.body;

    // Check if a user already exists with the same username, email, or phone
    const existingUser = await User.findOne({ $or: [{ username }, { email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      name,
      email,
      phone
    });

    await newUser.save();

    await axios.post(`http://service5:5004/api/email/notifyReg/${email}`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error occurred during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    let tokenPayload = { username: user.username, role: user.role };
    
    if (user.role === 'student') {
      tokenPayload.sid = user.studentId;
    } else if (user.role === 'instructor') {
      tokenPayload.iid = user.instructorId;
    }

    const expiresIn = '1h';
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn });
    res.json({ token });
  } catch (error) {
    console.error('Error occurred during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get("/getuser/:sid", async (req, res) => {
  try {
    const sid = req.params.sid; 

    // Find user by studentID (assuming studentID field exists in your User model)
    const user = await User.findOne({ studentId: sid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data (including email and phone)
    const sanitizedUser = {
      username: user.username,
      role: user.role,
      sid: user.studentId,
      email: user.email,
      phone: user.phone,
      enrolledCourses: user.enrolledCourses.map((courseCode) => ({ courseCode })),
    };

    res.status(200).json(sanitizedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.get("/getins/:iid", async (req, res) => {
  try {

    const iid = req.params.iid; 

    // Find user by studentID (assuming studentID field exists in your User model)
    const user = await User.findOne({ instructorId: iid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data (excluding sensitive information)
    const sanitizedUser = {
      username: user.username,
      role: user.role,
      iid: user.instructorId,
      addedCourses: user.addedCourses.map((courseCode) => ({
        courseCode
      })),
    };

    res.status(200).json(sanitizedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.put('/admin/:code/approve', async (req, res) => {
  try {
    const courseId = req.params.code;

    // Find the course by ID
    const course = await Course.findOne({code: courseId});

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update the course to set isApproved to true
    course.isApproved = true;
    await course.save();

    res.json({ message: 'Course approved successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router;
