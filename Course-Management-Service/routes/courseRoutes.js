const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');
const checkPermission = require('../Utils/checkPermission');
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
const { exec } = require('child_process');
const fs = require('fs');
const { Readable } = require('stream');

router.post('/add', upload.single('video'), async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    const permission = await checkPermission(token);

    if (!permission.authorized) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    const { code, cname, description, credits, price } = req.body;
    const instructorId = permission.iid;

    const user = await User.findOne({ instructorId: instructorId, role: 'instructor' });


    // Create the course object with provided details and instructor ID
    let course = new Course({
      code,
      cname,
      description,
      credits,
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
    course.credits = req.body.credits || course.credits;
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


//authorization should be passed
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


module.exports = router;
