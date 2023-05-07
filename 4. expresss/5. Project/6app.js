// better file structure approch
const express = require('express');
const fs = require("fs");
const morgan = require("morgan");
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(express.json());
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log("hi i am middleware");
    next();
})

app.use((req, res, next) => {
    req.requestTimeNow = new Date().toISOString()
    next();
})




// mounting the router
app.use("/api/v1/tours", tourRoutes)
app.use("/api/v1/users", userRoutes)


module.exports = app;