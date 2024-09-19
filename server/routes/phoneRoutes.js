const express = require('express');
const authController = require('../controller/phoneController');
const router = express.Router();

router.post('/register-phone', authController.registerUserByPhone);

module.exports = router;
