const express = require('express');
const { login, register, refresh } = require('../controllers/authController');
const { loginValidation, signupValidation } = require('../utils/authSchema');
const router = express.Router();

router.post('/login', loginValidation, login);

router.post('/register', signupValidation, register);

router.post('/refresh', refresh);

module.exports = router;