'use strict'
const express = require('express');
const router = express.Router();
const userRegistration = require('../controllers/userRegistration.js');
const postParam = require('../config/postParamCheck.js');

router.post('/', postParam('body', ['name', 'email']), userRegistration.info);
module.exports = router;