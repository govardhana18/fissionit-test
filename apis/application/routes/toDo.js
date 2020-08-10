'use strict'
const express = require('express');
const router = express.Router();
const todo = require('../controllers/toDo.js');
const postParam = require('../config/postParamCheck.js');

router.post('/add', postParam('body', ['priority', 'content', 'userId']), todo.add);
router.post('/delete', postParam('body', ['toDoId']), todo.delete);
router.post('/complete', postParam('body', ['toDoId']), todo.complete);
router.get('/view/:toDoId', todo.view);
router.get('/viewAll/:userId', todo.viewAll);

module.exports = router;