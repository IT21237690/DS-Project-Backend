const axios = require('axios');


const checkPermission = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/authorize', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const authorized = response.data;
      if (authorized) {
        return { authorized: true, sid: response.data.sid };
      } else {
        return { authorized: false };
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      return { authorized: false };
    }
  };
  
  module.exports = checkPermission;
  


module.exports = checkPermission;
