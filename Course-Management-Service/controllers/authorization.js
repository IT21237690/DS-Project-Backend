const jwt = require('jsonwebtoken');

const authorizeStudent = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken) {
      // Attach the decoded token to the request object for further use if needed
      req.decodedToken = decodedToken;

      // Send a response based on the role
      if (decodedToken.role === 'admin') {
        req.isAdmin = true;
      } else if (decodedToken.role === 'faculty') {
        req.isFaculty = true;
      } else {
        req.isAdmin = false;
        req.isFaculty = false;
        req.user = decodedToken; // Corrected from req.user = decoded
      }
      
      next(); // Continue to the next middleware or route handler
    } else {
      return res.status(403).json({ message: 'Forbidden: Insufficient role permissions' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

  

module.exports = authorizeStudent;
