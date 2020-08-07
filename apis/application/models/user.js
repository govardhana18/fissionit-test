const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        required: true,
    },
    by: {
        type: Number,
        default: '0'
    },
}, { timestamps: true }, { _id: false });

let collectionName = 'fission_user';
const User = mongoose.model('fission_user', userSchema, collectionName);

module.exports = User;