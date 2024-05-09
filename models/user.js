const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['student', 'instructor'],
    required: true
  },
  name: String,
  studentId: {
    type: String,
    unique: true,
    sparse: true
  },
  instructorId: {
    type: String,
    unique: true,
    sparse: true
  },
  enrolledCourses: [String]
});

// Pre-save middleware to generate a unique SID or Instructor ID
userSchema.pre('save', async function(next) {
  if (this.role === 'student' && !this.studentId) {
    let generatedId;
    // Generate a unique SID
    do {
      generatedId = generateRandomSID();
    } while (await this.constructor.findOne({ studentId: generatedId }));
    this.studentId = generatedId;
  } else if (this.role === 'instructor' && !this.instructorId) {
    let generatedId;
    // Generate a unique Instructor ID
    do {
      generatedId = generateRandomInstructorID();
    } while (await this.constructor.findOne({ instructorId: generatedId }));
    this.instructorId = generatedId;
  }
  next();
});

// Function to generate random SID
function generateRandomSID() {
  return 'SID' + Math.floor(Math.random() * 10000);
}

// Function to generate random Instructor ID
function generateRandomInstructorID() {
  return 'IID' + Math.floor(Math.random() * 10000);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
