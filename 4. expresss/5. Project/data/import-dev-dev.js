
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = require("../6app");
const Tour = require('../Model/tourModel');


const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(con => {
    // console.log(con.connection);
    console.log("Connected succefully");
}).catch(err => {
    console.log("Error while connecting to DB", err);
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port 3000");
});

// node .\data\import-dev-dev.js --import
// node .\data\import-dev-dev.js --delete

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`))

const importData = async () => {
    try {
        await Tour.create(tours)
        console.log("all data imported");
    } catch (error) {
        console.log(error);
    }
    process.exit()
}


const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("all tours deleted");
    } catch (error) {
        console.log(error);
    }
    process.exit()
}


if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData()
}
