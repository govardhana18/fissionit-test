const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    priority: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true }, { _id: false });

let collectionName = 'fission_todo';
const Todo = mongoose.model('fission_todo', todoSchema, collectionName);
module.exports = Todo;