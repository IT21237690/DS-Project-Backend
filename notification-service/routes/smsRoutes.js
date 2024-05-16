const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');

router.post('/smsReg/:id', smsController.sendSMS);

module.exports = router;