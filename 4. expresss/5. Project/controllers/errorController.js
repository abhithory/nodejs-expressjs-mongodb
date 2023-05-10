const AppError = require("../utils/appError");

const handleJWTError = () => new AppError("Invaid token. Please log in again", 401);
const handleJWTExpiredError = () => new AppError("Your token has expired! Please log in again", 401);

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    console.log(message);
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/"((?:\\.|[^"\\])*)"/)[0];
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `invalid input Data ${errors.join(". ")}`;
    return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client

    console.log("aaa", err.message);
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
        // Programming or other unknown error: don't leak error details
    } else {
        res.status(err.statusCode).json({
            status: "error",
            message: "Something went very wrong",
        })
    }
}

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        // let error = { ...err }
        if (err.name === 'CastError') err = handleCastErrorDB(err);
        if (err.code === 11000) err = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError') err = handleValidationErrorDB();
        if (err.name === 'JsonWebTokenError') err = handleJWTError();
        if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();

        sendErrorProd(err, res);
    }
    // return res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    // })
}

module.exports = globalErrorHandler;