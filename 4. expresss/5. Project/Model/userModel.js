const mongoose = require('mongoose');
const validator = require('validator');


const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: 2,
        maxLength: 40
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide correct email"]
    },
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, "password confirm is required"],
        minLength: 8
    },



})

const User = mongoose.model("User", tourSchema);
exports.default = User;