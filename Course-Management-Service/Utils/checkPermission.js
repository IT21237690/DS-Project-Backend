const axios = require('axios');

const checkPermission = async (token) => {
  try {
    const response = await axios.get('http://service1:5000/authorize', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { authorized, role, iid } = response.data;
    console.log(iid);
    
    if (authorized && role === 'instructor') {
      return { authorized: true, iid };
    } else {
      return { authorized: false };
    }
  } catch (error) {
    console.error('Error checking permission:', error);
    return { authorized: false };
  }
};

module.exports = checkPermission;
