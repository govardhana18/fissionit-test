'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');

module.exports.info = async(req, res, next) => {
    try {
        if (validator.isEmpty(req.body.name)) throw createError(400, "Invalid Name");
        if (!validator.isEmail(req.body.email)) throw createError(400, "Invalid Email");

        res.status(200).json({
            message: "User added successfully",
            data: []
        });
    } catch (error) {
        return next(error);
    }
}