'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');
const connectDb = require('../models/connect');

const User = require('../models/user');

module.exports.userListDetails = async(req, res, next) => {
    try {
        if (!validator.isInt(req.params.userId)) throw createError(400, "Invalid User Id");

        var result = []
        connectDb().then(async(resp) => {
            result = await User.find({ "by": req.params.userId, "admin": "no" }).exec()
            return result;
        }).then(resp1 => {
            res.status(200).json({
                message: "User List",
                data: resp1
            });
        }).catch(err => {
            throw createError(400, "Server Error");
        })
    } catch (error) {
        return next(error);
    }
}