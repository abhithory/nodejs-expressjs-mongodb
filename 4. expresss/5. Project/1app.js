// Basic CURD operations

const express = require('express');
const fs = require("fs");


const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`))
const app = express();
// middleware for getting body
app.use(express.json())

app.get("/api/v1/tours", (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
})

// app.get("/api/v1/tours/:id/:x?/:y/:z", (req,res) => { // ? for optional
app.get("/api/v1/tours/:id", (req, res) => {
    const id = Number(req.params.id)
    const tour = tours.find(item => item.id === id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "invailid ID"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
})

app.post("/api/v1/tours", (req, res) => {
    const body = req.body;
    console.log(body);
    // here save the tour in data base
    res.json({ status: "success" })
})

app.patch("/api/v1/tours/:id", (req, res) => {
    const id = Number(req.params.id)
    const body = req.body;
    const tour = tours.find(item => item.id === id);
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "invailid ID"
        })
    }
    // here update in database
    res.status(200).json({
        status: "success", data: {
            tour: "updated tour"
        }
    })
})

app.delete("/api/v1/tours/:id", (req, res) => {
    const id = Number(req.params.id)
    const tour = tours.find(item => item.id === id);
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "invailid ID"
        })
    }
    // here update in database
    res.status(200).json({
        status: "success", data: null
    })
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})