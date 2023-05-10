const AppError = require("../utils/appError");

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
        let error = { ...err }
        if (err.name === 'CastError') error = handleCastErrorDB(error);

        if (err.code === 11000) error = handleDuplicateFieldsDB(err)

        sendErrorProd(error, res);
    }
    // return res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    // })
}

module.exports = globalErrorHandler;