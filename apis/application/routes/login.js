'use strict'
const express = require('express');
const router = express.Router();
const login = require('../controllers/login.js');
const postParam = require('../config/postParamCheck.js');

router.post('/', postParam('body', ['email', 'password']), login.userInformation);
module.exports = router;