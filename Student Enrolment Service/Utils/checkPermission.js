const axios = require('axios');

const checkPermission = async (token) => {
  try {
    const response = await axios.get('http://service1:5000/authorize', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { authorized, role, sid } = response.data;
    
    if (authorized && role === 'student') {
      return { authorized: true, sid };
    } else {
      return { authorized: false };
    }
  } catch (error) {
    console.error('Error checking permission:', error);
    return { authorized: false };
  }
};

module.exports = checkPermission;
