const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');
const checkPermission = require('../Utils/checkPermission');
const multer = require('multer'); 
const { exec } = require('child_process');
const fs = require('fs');
const { Readable } = require('stream');
const path = require('path'); 




const isEnrolled = (req, res, next) => {
  
  const { sid, courseCode } = req.params;

  // Check if user is enrolled
  const isUserEnrolled = checkUserEnrollment(sid, courseCode); 

  if (isUserEnrolled) {
      next(); // User is enrolled, proceed to download
  } else {
      res.status(403).json({ error: 'You are not enrolled in this course.' });
  }
};



const checkUserEnrollment = async (studentId, courseCode) => {
  try {

      const user = await User.findOne({ studentId });
      
     
      return user && user.enrolledCourses.includes(courseCode);
  } catch (error) {
      console.error('Error checking user enrollment:', error);
      return false; // Return false in case of an error
  }
};



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





router.post('/add', upload.single('video'), async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    const permission = await checkPermission(token);

    if (!permission.authorized) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    const { code, cname, description, price } = req.body;
    const instructorId = permission.iid;

    const user = await User.findOne({ instructorId: instructorId, role: 'instructor' });


    // Create the course object with provided details and instructor ID
    let course = new Course({
      code,
      cname,
      description,
      instructorId,
      price,
      video: {}
    });

    // Check if a video was uploaded
    if (req.file) {
      // Add the uploaded video to the course object
      const { title } = req.body;
      const videoUrl = req.file.path;

      // Create thumbnail
      const thumbnailPath = `thumbnails/${Date.now()}_thumbnail.png`;
      const thumbnailData = await createThumbnail(videoUrl, thumbnailPath);

      course.video.title = title;
      course.video.url = videoUrl;
      course.video.thumbnail = thumbnailData; // Store thumbnail data in the course document
    }

    // Save the course
    course = await course.save();
    user.addedCourses.push(code);
    await user.save();

    // Return the saved course with the thumbnail data
    res.status(201).json({ course });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error occurred
      return res.status(400).json({ message: 'Course code is already used' });
    } else {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

async function createThumbnail(videoPath, thumbnailPath) {
  return new Promise((resolve, reject) => {
    const command = `ffmpeg -i "${videoPath}" -ss 00:00:01.000 -vframes 1 "${thumbnailPath}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        // Read the generated thumbnail image
        const thumbnailStream = fs.createReadStream(thumbnailPath);

        // Convert the image stream to a buffer
        let thumbnailBuffer = Buffer.from('');
        thumbnailStream.on('data', chunk => {
          thumbnailBuffer = Buffer.concat([thumbnailBuffer, chunk]);
        });

        thumbnailStream.on('end', () => {
          // Delete the temporary thumbnail file
          fs.unlink(thumbnailPath, err => {
            if (err) {
              console.error('Error deleting thumbnail file:', err);
            }
          });

          // Encode the thumbnail data as Base64
          const thumbnailBase64 = thumbnailBuffer.toString('base64');
          resolve(thumbnailBase64);
        });
      }
    });
  });
}


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
router.get('/get/:courseCode', async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.courseCode });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update course details (excluding video)
router.patch('/update/:code', upload.single('video'), async (req, res) => {
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
    course.price = req.body.price || course.price;


    // Check if a new video file is uploaded
    if (req.file) {
      const { title } = req.body;
      const videoUrl = req.file.path;

      // Update video details
      course.video.title = title;
      course.video.url = videoUrl;
    }

    // Save the updated course
    await course.save();

    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.delete('/delete/:code', async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ code: req.params.code });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Find and update instructor's addedCourses
    await User.updateMany(
      { role: 'instructor' }, // Filter for instructors
      { $pull: { addedCourses: req.params.code } } // Remove course from addedCourses array
    );

    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/download/:sid/:courseCode', async (req, res) => {
  const { courseCode } = req.params;
  const { sid } = req.params;
 

  try {
    // Check if the user is enrolled in the course

    const user = await User.findOne({ studentId:sid });

    const isEnrolled = user.enrolledCourses.includes(courseCode);
    if (!isEnrolled) {
      return res.status(409).json({ error: 'You are not enrolled in this course.' });
    }

    // Find the course in the database
    const course = await Course.findOne({ code: courseCode });

    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Get the video URL from the course
    const videoUrl = course.video.url;

    // Check if the video URL exists
    if (!videoUrl) {
      return res.status(404).json({ error: 'Video URL not found.' });
    }

    // Stream the video file as response
    const fileStream = fs.createReadStream(videoUrl);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});






module.exports = router;
