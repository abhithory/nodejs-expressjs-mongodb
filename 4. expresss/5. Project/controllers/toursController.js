const Tour = require("../Model/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const CatchAsync = require("../utils/catchAsync");

const aliasTopTours = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty"
    next();
}

const getAllTours = CatchAsync(async (req, res, next) => {
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
})
const getOneTour = CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log("dfasdfs", id);
    const oneTour = await Tour.findById(id);
    return res.status(200).json({
        status: "success",
        data: oneTour
    })
})

const createTour = CatchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);
    return res.status(200).json({ status: "success", data: newTour })
})


const patchTour = CatchAsync(async (req, res, next) => {
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
})

const deleteTour = CatchAsync(async (req, res, next) => {

    const id = req.params.id
    const newTour = await Tour.findByIdAndDelete(id);
    res.status(200).json({
        status: "success", data: newTour
    })
})

const tourStats = CatchAsync(async (req, res, next) => {
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
})

const getMountlyPlan = CatchAsync(async (req, res, next) => {
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

})




module.exports = { getAllTours, getOneTour, createTour, patchTour, deleteTour, aliasTopTours, tourStats, getMountlyPlan }