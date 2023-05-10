const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
        minLength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "password confirm is required"],
        minLength: 8,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "passwords are not the same"
        }
    },
})


userSchema.pre('save', async function (next) {
    // this will run if only the password is actually modified
    if (!this.isModified('password')) return next();

    // hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete password Confrim field
    this.passwordConfirm = undefined;
})

// instance method

userSchema.methods.correctPassword = async function (cadidatePassword, userpassword) {
    return await bcrypt.compare(cadidatePassword, userpassword);
}

const User = mongoose.model("User", userSchema);
module.exports = User;