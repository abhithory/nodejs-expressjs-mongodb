const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`))


const checkBody = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({
            status: "error",

        })
    }
    next();
}


const checkId = (req,res,next,val) => {
    const id = Number(req.params.id)
    const tour = tours.find(item => item.id === id);

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "invailid ID"
        })
    }
    next();
}

const getAllTours = (req, res) => {

    res.status(200).json({
        status: "success",
        time: req.requestTimeNow,
        results: tours.length,
        data: {
            tours
        }
    })
}
const getOneTour = (req, res) => {
    const id = Number(req.params.id)
    const tour = tours.find(item => item.id === id);
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
    // here update in database
    res.status(200).json({
        status: "success", data: null
    })
}


module.exports = {getAllTours,getOneTour,createTour,patchTour,deleteTour,checkId,checkBody}