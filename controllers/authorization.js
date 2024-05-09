const jwt = require('jsonwebtoken');

const authorizeUser = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return { authorized: false };
    }

    if (decodedToken.role === 'student') {
      return { authorized: true, role: 'student', id: decodedToken.sid };
    } else if (decodedToken.role === 'instructor') {
      return { authorized: true, role: 'instructor', id: decodedToken.instructorId };
    } else {
      return { authorized: false };
    }
  } catch (error) {
    return { authorized: false };
  }
};

module.exports = authorizeUser;
