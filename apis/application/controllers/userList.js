'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');


module.exports.userListDetails = async(req, res, next) => {
    try {
        if (!validator.isInt(req.params.userId)) throw createError(400, "Invalid User Id");

        let result = [
            { name: "virat kohli", age: "30", admin: "no" }, { name: "virat kohli", age: "30", admin: "no" }, { name: "virat kohli", age: "30", admin: "no" }, { name: "virat kohli", age: "30", admin: "no" }, { name: "virat kohli", age: "30", admin: "no" }, { name: "virat kohli", age: "30", admin: "no" }, { name: "virat kohli", age: "30", admin: "no" }
        ];
        res.status(200).json({
            message: "User List",
            data: result
        });
    } catch (error) {
        return next(error);
    }
}