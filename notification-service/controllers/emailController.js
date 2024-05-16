const sendEmail = require('../services/mailer');
const newCourseEnrollEmail = require('../services/emailTemplate');

exports.notify = async (req, res) => {
    try{
        const email = req.body.email;
        sendEmail(email, 'New Course Enrollment', newCourseEnrollEmail());
        res.status(200).send({message: 'Email sent successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: 'Error sending email'});
    }
};