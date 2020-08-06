'use strict'
const express   = require('express');
const router    = express.Router();
const userList  = require('../controllers/userList.js');

router.get('/:userId', userList.userListDetails);
module.exports = router;
