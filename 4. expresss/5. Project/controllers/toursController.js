const Tour = require("../Model/tourModel");


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
const createTour = async (req, res) => {
    const body = req.body;
    console.log(body);

    // const testTour = new Tour({
    //   name: "The Park Camper",
    //   price: 997
    // })

    // testTour.save().then(doc => {
    //   console.log(doc);
    // }).catch(err => {
    //   console.log("error", err);
    // })

    try {

        const newTour = await Tour.create(req.body);

        // here save the tour in data base
        return res.status(200).json({ status: "success", data: newTour })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })

    }
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


module.exports = { getAllTours, getOneTour, createTour, patchTour, deleteTour }