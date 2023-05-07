// creating and mounting multiple routers
const express = require('express');
const fs = require("fs");
const morgan = require("morgan");


const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`))
const app = express();
app.use(express.json());
app.use(morgan('dev'))

app.use((req,res,next)=>{
    console.log("hi i am middleware");
    next();
})

app.use((req,res,next)=>{
    req.requestTimeNow = new Date().toISOString()
    next();
})

const getAllTours = (req, res) => {

    res.status(200).json({
        status: "success",
        time:req.requestTimeNow,
        results: tours.length,
        data: {
            tours
        }
    })
}
const getOneTour = (req, res) => {
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
}
const createTour = (req, res) => {
    const body = req.body;
    console.log(body);
    // here save the tour in data base
    res.json({ status: "success" })
}
const patchTour = (req, res) => {
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
}
const deleteTour = (req, res) => {
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
}

const getAllUsers = (req,res) => {
    res.status(200).json({
        status: "success"
    })
}

const getOneUser = (req,res) => {
    res.status(200).json({
        status: "success"
    })
}

const createUser = (req,res) => {
    res.status(200).json({
        status: "success"
    })
}

const patchUser = (req,res) => {
    res.status(200).json({
        status: "success"
    })
}

const deleteUser = (req,res) => {
    res.status(200).json({
        status: "success"
    })
}

// app.get("/api/v1/tours", getAllTours)
// // app.get("/api/v1/tours/:id/:x?/:y/:z", (req,res) => { // ? for optional
// app.get("/api/v1/tours",createTour )
// app.post("/api/v1/tours", getOneTour)
// app.patch("/api/v1/tours/:id", patchTour)
// app.delete("/api/v1/tours/:id",deleteTour )

app
    .route("/api/v1/tours")
    .get(getAllTours)
    .post(createTour)

app
    .route("/api/v1/tours/:id")
    .get(getOneTour)
    .patch(patchTour)
    .delete(deleteTour)

app
    .route("/api/v1/users")
    .get(getAllUsers)
    .post(createUser)

app
    .route("/api/v1/users/:id")
    .get(getOneUser)
    .patch(patchUser)
    .delete(deleteUser)


app.listen(3000, () => {
    console.log("Listening on port 3000");
})