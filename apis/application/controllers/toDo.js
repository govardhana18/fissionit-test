'use strict'
const express = require('express');
const createError = require('http-errors');
const validator = require('validator');
const connectDb = require('../models/connect');

const Todo = require('../models/todo');
const User = require('../models/user');


module.exports.view = async(req, res, next) => {
    try {
        if (!validator.isInt(req.params.toDoId)) throw createError(400, "Invalid ToDo Id");

        connectDb().then(async(resp) => {
            let result = await Todo.find({ "id": req.params.toDoId }).exec()
            return result;
        }).then(resp1 => {
            res.status(200).json({
                message: "Todo Details",
                data: resp1
            });
        }).catch(err => {
            throw createError(400, "Server Error");
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.viewAll = async(req, res, next) => {
    try {
        if (!validator.isInt(req.params.userId)) throw createError(400, "Invalid User Id");

        connectDb().then(async(resp) => {
            let result1 = await Todo.find({ "userId": req.params.userId }).exec()
            let result2 = await User.find({ "id": req.params.userId }).exec()

            return {res1:result1,res2:result2};
        }).then(resp1 => {
            // console.log(resp1.res2,"kiran")
            res.status(200).json({
                message: "Todo List",
                data: resp1.res1,
                todoUser: resp1.res2[0]
            });
        }).catch(err => {
            // throw createError(400, "Server Error");
            return next(err);
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.add = async(req, res, next) => {
    try {
        if (!validator.isIn(req.body.priority, ['low', 'medium', 'high'])) throw createError(400, "Invalid Priority");
        if (validator.isEmpty(req.body.content)) throw createError(400, "Invalid Email");
        if (!validator.isInt(req.body.userId)) throw createError(400, "Invalid User Id");

        connectDb().then(async(resp) => {
            await Todo.findOne().sort('-id').exec(function(err, todoItem) {
                // todoItem.Id is the max value
                let idd = todoItem.id + 1;
                let status = "CREATED";
                let viewed = "no";
                let todoDoc = new Todo({
                    id: idd,
                    userId: req.body.userId,
                    priority: req.body.priority,
                    content: req.body.content,
                    status: status,
                    viewed: viewed
                });

                let results = todoDoc.save(function(err, results) {
                    return results;
                });
                return results
            })
        }).then(resp1 => {
            res.status(200).json({
                message: "Todo added successfully",
                data: resp1
            });
        }).catch(err => {
            throw createError(400, "Server Error");
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.delete = async(req, res, next) => {
    try {
        if (!validator.isInt(req.body.toDoId)) throw createError(400, "Invalid ToDo Id");

        connectDb().then(async(resp) => {
            await Todo.findOneAndRemove({ "id": req.body.toDoId }, function(err, doc) {
                if (err) {
                    throw createError(400, "Failed to delete todo");
                } else {
                    return doc
                }
            })
        }).then(resp1 => {
            res.status(200).json({
                message: "ToDo deleted successfully.",
                data: resp1
            });
        }).catch(err => {
            throw createError(400, "Server Error");
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.complete = async(req, res, next) => {
    try {
        if (!validator.isInt(req.body.toDoId)) throw createError(400, "Invalid ToDo Id");

        connectDb().then(async(resp) => {
            await Todo.findOneAndUpdate({id: req.body.toDoId}, {$set:{status:"COMPLETED"}}, {new: true}, function(err, doc) {
                if (err) {
                    throw createError(400, "Failed to complete todo");
                } else {
                    return doc
                }
            })
        }).then(resp1 => {
            res.status(200).json({
                message: "ToDo completed successfully.",
                data: resp1
            });
        }).catch(err => {
            throw createError(400, "Server Error");
        })
    } catch (error) {
        return next(error);
    }
}