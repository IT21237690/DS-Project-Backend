const jwt = require('jsonwebtoken');

const authorizeStudent = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken && decodedToken.role === 'student') {
      return { authorized: true, sid: decodedToken.sid };
    } else {
      return { authorized: false };
    }
  } catch (error) {
    return { authorized: false };
  }
};

module.exports = authorizeStudent;
