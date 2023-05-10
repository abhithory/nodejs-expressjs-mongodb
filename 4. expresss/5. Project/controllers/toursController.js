const Tour = require("../Model/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const aliasTopTours = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty"
    next();
}

const getAllTours = catchAsync(async (req, res, next) => {
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
const getOneTour = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const oneTour = await Tour.findById(id);

    if (!oneTour) {
        return next(new AppError("No Tour found with that ID", 404))
    }
    return res.status(200).json({
        status: "success",
        data: oneTour
    })
})

const createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);
    return res.status(200).json({ status: "success", data: newTour })
})


const patchTour = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const oneTour = await Tour.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })

    if (!oneTour) {
        return next(new AppError("No Tour found with that ID", 404))
    }
    // here update in database
    res.status(200).json({
        status: "success", data: oneTour
    })
})

const deleteTour = catchAsync(async (req, res, next) => {

    const id = req.params.id
    const oneTour = await Tour.findByIdAndDelete(id);

    if (!oneTour) {
        return next(new AppError("No Tour found with that ID", 404))
    }
    res.status(200).json({
        status: "success", data: oneTour
    })
})

const tourStats = catchAsync(async (req, res, next) => {
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

const getMountlyPlan = catchAsync(async (req, res, next) => {
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