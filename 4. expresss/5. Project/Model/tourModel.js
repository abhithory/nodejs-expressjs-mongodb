const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
    // name:String,
    name: {
        type: String,
        // required:true,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    slug: String,
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
    secretTour: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
})

// DOCUMENT MIDDLEWARE: runs only before .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    console.log(this);
    next();
})

// tourSchema.pre('save', function(next){
//     console.log("wil save documetn...");
//     next();
// })

// tourSchema.post('save', function(doc,next){
//     console.log(doc);
//     next();
// })


// Query Middleware

tourSchema.pre(/^find/, function (next) {
    // tourSchema.pre('find', function (next) {
    this.find({ secretTour: { $ne: true } })

    this.start = Date.now();
    next();
})

tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} millisecounds`);
    next();
})


const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;