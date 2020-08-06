'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');

module.exports.userInformation = async(req, res, next) => {
    try {
        if (!validator.isEmail(req.body.email)) throw createError(400, "Invalid Email");
        if (validator.isEmpty(req.body.password)) throw createError(400, "Invalid Password");

        let result = [{ name: "virat kohli", age: "30", admin: "yes" }];
        res.status(200).json({
            message: "Login Succeed.",
            data: result
        });
    } catch (error) {
        return next(error);
    }
}