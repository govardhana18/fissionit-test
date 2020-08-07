'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');
const connectDb = require('../models/connect');

const User = require('../models/user');

module.exports.userInformation = async(req, res, next) => {
    try {
        if (!validator.isEmail(req.body.email)) throw createError(400, "Invalid Email");
        if (validator.isEmpty(req.body.password)) throw createError(400, "Invalid Password");

        var result = []
        connectDb().then(async(resp) => {
            result = await User.find({ "email": req.body.email, "password": req.body.password }).exec()
            return result;
        }).then(resp1 => {
            if (resp1.length === 1) {
                res.status(200).json({
                    message: "Login Succeed.",
                    data: resp1
                });
            } else {
                res.status(400).json({
                    message: "Failed to login.",
                    data: []
                });
            }
        }).catch(err => {
            throw createError(400, "Server Error");
        })
    } catch (error) {
        return next(error);
    }
}