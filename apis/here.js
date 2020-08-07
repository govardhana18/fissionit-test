'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const login = require('./application/routes/login.js');
const userList = require('./application/routes/userList.js');
const userRegistration = require('./application/routes/userRegistration.js');
const toDo = require('./application/routes/toDo.js');

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/login', login);
app.use('/userList', userList);
app.use('/userRegistration', userRegistration);
app.use('/todo', toDo);

app.listen(9009, (err) => {
    if (err) {
        console.log('Server could not start due to ' + err);
        process.exit(1);
    }
    console.log('port running @9009');
});

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ message: err.message });
})