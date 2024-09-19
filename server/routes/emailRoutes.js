const express = require('express');
const authController = require('../controller/emailController');
const router = express.Router();

router.post('/register', authController.registerUser);

module.exports = router;
