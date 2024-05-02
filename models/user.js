const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['student', 'instructor'], // Assuming these are the roles
    required: true
  },
  name: String,
  studentId: {
    type: String,
    unique: true, // Ensures uniqueness of SID
    sparse: true // Allows null values to be unique (in case student role isn't immediately set)
  },
  enrolledCourses: [String]
});

// Pre-save middleware to generate a unique SID for student role
userSchema.pre('save', async function(next) {
  if (this.role === 'student' && !this.studentId) {
    let generatedId;
    // Generate a unique SID
    do {
      generatedId = generateRandomSID();
    } while (await this.constructor.findOne({ studentId: generatedId }));
    this.studentId = generatedId;
  }
  next();
});

// Function to generate random SID
function generateRandomSID() {
  // Implement your SID generation logic here
  return 'SID' + Math.floor(Math.random() * 10000);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
