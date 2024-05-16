const express = require("express");
const cors = require("cors");
const emailRoutes = require('./routes/emailRoutes');
const smsRoutes = require('./routes/smsRoutes')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/email', emailRoutes);
app.use('/api/sms', smsRoutes);

module.exports = app;