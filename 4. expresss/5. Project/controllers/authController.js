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
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
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

exports.protect = catchAsync(async (req, res, next) => {
    // authorization: Bearer token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access', 401)
        )
    }

    // 2) varification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) check if user exits
    const freshUser = await User.findById(decoded.id);
    // console.log(freshUser);
    if (!freshUser) {
        return next(
            new AppError('the user beloging to this token does no lognger exits', 401)
        );
    }
    // 4)check if user changed password after the token was issued

    if (freshUser.changesPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please login again', 401)
        );
    }

    // grant access to protected user

    req.user = freshUser;



    next()
})
