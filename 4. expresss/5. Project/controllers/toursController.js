const Tour = require("../Model/tourModel");


const getAllTours = async (req, res) => {
    try {

        // localhost:3000/api/v1/tours?duration[gte]=1&difficulty=easy&sort=1&price[lt]=1200

        // Build query
        let queryObj = { ...req.query };
        // 1) Basic filtring
        const excludedFields = ["page", "sort", "limit", "fields"]
        excludedFields.forEach(el => delete queryObj[el]);

        // 2) Advance Filtring
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, match => `$${match}`);
        queryObj = JSON.parse(queryStr);

        const query = Tour.find(queryObj);
        const tours = await query;
        // const query = Tour.find().where("duration").equals(5).where("difficulty").equals("easy");
        return res.status(200).json({
            status: "success",
            results: tours.length,
            data: tours
        })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })
    }
}
const getOneTour = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("dfasdfs", id);
        const oneTour = await Tour.findById(id);
        return res.status(200).json({
            status: "success",
            data: oneTour
        })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })
    }
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
const patchTour = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const newTour = await Tour.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        })
        // here update in database
        res.status(200).json({
            status: "success", data: newTour
        })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })

    }
}
const deleteTour = async (req, res) => {

    try {
        const id = req.params.id
        const newTour = await Tour.findByIdAndDelete(id);
        res.status(200).json({
            status: "success", data: newTour
        })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })
    }
}


module.exports = { getAllTours, getOneTour, createTour, patchTour, deleteTour }