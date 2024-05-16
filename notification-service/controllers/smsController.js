const axios = require('axios');

exports.sendSMS = async (req, res) => {
  const to = req.body.mobile;
  const message = 'You have successfully enrolled in a new course! Happy learning! ~ Team EduWave';

  const url = `https://app.notify.lk/api/v1/send?user_id=${process.env.USER_ID}&api_key=${process.env.API_KEY}&sender_id=${process.env.SENDER_ID}&to=${to}&message=${message}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};