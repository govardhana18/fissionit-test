'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');

module.exports.view = async(req, res, next) => {
    try {
        if (!validator.isInt(req.params.toDoId)) throw createError(400, "Invalid ToDo Id");

        let result = [{ name: "virat kohli", age: "30", admin: "yes" }];
        res.status(200).json({
            message: "ToDo Details",
            data: result
        });
    } catch (error) {
        return next(error);
    }
}

module.exports.viewAll = async(req, res, next) => {
    try {
        if (!validator.isInt(req.params.userId)) throw createError(400, "Invalid User Id");

        let result = [{ name: "virat kohli", age: "30", admin: "yes" }];
        res.status(200).json({
            message: "ToDo List",
            data: result
        });
    } catch (error) {
        return next(error);
    }
}

module.exports.add = async(req, res, next) => {
    try {
        if (!validator.isIn(req.body.priority, ['low', 'medium', 'high'])) throw createError(400, "Invalid Priority");
        if (validator.isEmpty(req.body.content)) throw createError(400, "Invalid Email");

        let result = [{ name: "virat kohli", age: "30", admin: "yes" }];
        res.status(200).json({
            message: "ToDo added succesfully.",
            data: result
        });
    } catch (error) {
        return next(error);
    }
}

module.exports.delete = async(req, res, next) => {
    try {
        if (!validator.isInt(req.body.toDoId)) throw createError(400, "Invalid ToDo Id");

        res.status(200).json({
            message: "ToDo deleted successfully.",
            data: []
        });
    } catch (error) {
        return next(error);
    }
}