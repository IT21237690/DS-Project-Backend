const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/notify', emailController.notify);

module.exports = router;