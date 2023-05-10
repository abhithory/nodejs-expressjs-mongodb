const Tour = require("../Model/tourModel");
const APIFeatures = require("../utils/apiFeatures");

const aliasTopTours = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty"
    next();
}

const getAllTours = async (req, res) => {
    try {
               const apiSort= new APIFeatures(Tour.find(), req.query)
        .filtering()
        .sort()

        const toursSort = await apiSort.query;


        const apiFeatures = new APIFeatures(Tour.find(), req.query)
        .filtering()
        .sort()
        .fields()
        .pagination();
        const tours = await apiFeatures.query;
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

const tourStats = async (req, res) => {
    try {
        const newTour = await Tour.aggregate([
            {
                $match: { ratingAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    // _id: null,
                    // _id: '$difficulty',
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    avgRating: { $avg: '$ratingAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            },
            // {
            //     $match: { _id: { $ne: 'EASY' } }
            // }
        ]);
        res.status(200).json({
            status: "success", data: newTour
        })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })
    }
}

const getMountlyPlan = async (req, res) => {
    try {
        const year = req.params.year;

        const mountlyPlan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { mounth: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numTourStarts: -1 }
            },
            {
                $limit: 6
            }
        ])

        res.status(200).json({
            status: "success", data: mountlyPlan
        })
    } catch (error) {
        return res.status(400).json({ status: "fail", data: error })
    }
}




module.exports = { getAllTours, getOneTour, createTour, patchTour, deleteTour, aliasTopTours, tourStats, getMountlyPlan }