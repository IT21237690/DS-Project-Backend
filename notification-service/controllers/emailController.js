const sendEmail = require('../services/mailer');
const newCourseEnrollEmail = require('../services/emailTemplate');
const regEmail = require('../services/regEmailTemplate');

const axios = require('axios');

exports.notify = async (req, res) => {
    try {
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

        console.log(userData)
        const email = userData.email;

        // Perform other operations with email if needed
        sendEmail(email, 'New Course Enrollment', newCourseEnrollEmail());

        // Send response back
        res.status(200).send({ message: 'Email sent successfully', email });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error sending email' });
    }
};


exports.notifyReg = async (req, res) => {
    try {
        const email = req.params.email;

        // Perform other operations with email if needed
        sendEmail(email, 'Successfully Registered', regEmail());

        // Send response back
        res.status(200).send({ message: 'Email sent successfully', email });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error sending email' });
    }
};

