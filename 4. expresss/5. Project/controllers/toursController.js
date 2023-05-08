const Tour = require("../Model/tourModel");


const checkBody = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({
            status: "error",

        })
    }
    next();
}




const getAllTours = (req, res) => {

    res.status(200).json({
        status: "success",
        time: req.requestTimeNow,
    })
}
const getOneTour = (req, res) => {
    const id = Number(req.params.id)
    res.status(200).json({
        status: "success",
        data: {
            id
        }
    })
}
const createTour = (req, res) => {
    const body = req.body;
    console.log(body);

    Tour

    // here save the tour in data base
    res.json({ status: "success" })
}
const patchTour = (req, res) => {
    const id = Number(req.params.id)
    const body = req.body;
    // here update in database
    res.status(200).json({
        status: "success", data: {
            tour: "updated tour"
        }
    })
}
const deleteTour = (req, res) => {
    const id = Number(req.params.id)
    // here update in database
    res.status(200).json({
        status: "success", data: null
    })
}


module.exports = { getAllTours, getOneTour, createTour, patchTour, deleteTour, checkBody }