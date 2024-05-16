const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/notify/:id', emailController.notify);

router.post('/notifyReg/:email', emailController.notifyReg);

module.exports = router;