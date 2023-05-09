const Tour = require("../Model/tourModel");


const getAllTours = async (req, res) => {
    try {
        const allTours = await Tour.find();
        console.log(allTours);

        return res.status(200).json({
            status: "success",
            results: allTours.length,
            data: allTours
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
        const newTour = await Tour.findOneAndDelete(id);
        res.status(200).json({
            status: "success", data: newTour
        })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })
    }
}


module.exports = { getAllTours, getOneTour, createTour, patchTour, deleteTour }