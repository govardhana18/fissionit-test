'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');
const connectDb = require('../models/connect');

const User = require('../models/user');

module.exports.info = async(req, res, next) => {
    try {
        if (validator.isEmpty(req.body.name)) throw createError(400, "Invalid Name");
        if (!validator.isEmail(req.body.email)) throw createError(400, "Invalid Email");
        if (!validator.isInt(req.body.userId)) throw createError(400, "Invalid User Id");

        connectDb().then(async(resp) => {
            await User.findOne().sort('-id').exec(function(err, userItem) {
                // userItem.Id is the max value
                // console.log(userItem.id, "result")
                let idd = userItem.id + 1;

                let userDoc = new User({
                    id: idd,
                    name: req.body.name,
                    email: req.body.email,
                    password: "test",
                    admin: "no",
                    by: req.body.userId
                });

                let results = userDoc.save(function(err, results) {
                    return results;
                });
                return results
            })
        }).then(resp1 => {
            res.status(200).json({
                message: "User added successfully",
                data: resp1
            });
        }).catch(err => {
            throw createError(400, "Server Error");
        })
    } catch (error) {
        return next(error);
    }
}