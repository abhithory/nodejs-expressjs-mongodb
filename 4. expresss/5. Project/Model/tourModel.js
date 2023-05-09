const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    // name:String,
    name: {
        type: String,
        // required:true,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    duration: {
        type: Number,
        required: [true, "a must have duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A group size Must"]
    },
    difficulty: {
        type: String,
        required: [true, "a Tour must have a difficulty"]
    },
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQiantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a summary"]
    },
    descritpion: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover"]
    },
    images: [String],
    startDates: [Date],
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false
    }
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;