const axios = require('axios');

exports.sendSMS = async (req, res) => {

  const id = req.params.id;

        console.log(id)

        // Make a GET request to fetch user data
        const response = await axios.get(`http://service1:5000/api/user/getuser/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Extract email from the response data
        const userData = response.data;

        
        const phone = userData.phone;
        console.log(phone)


  const message = 'You have successfully enrolled in a new course! Happy learning! ~ Team EduWave';

  const url = `https://app.notify.lk/api/v1/send?user_id=${process.env.USER_ID}&api_key=${process.env.API_KEY}&sender_id=${process.env.SENDER_ID}&to=${phone}&message=${message}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};