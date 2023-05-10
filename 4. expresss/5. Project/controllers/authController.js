const catchAsync = require("../utils/catchAsync");
const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const AppError = require("../utils/appError");


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);


    res.status(201).json({
        status: 'success',
        token,
        data: newUser
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please provide email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");


    if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError("incorrect email or password", 401))

    const token = signToken(user._id);

    res.status(201).json({
        status: 'success',
        token
    })
})