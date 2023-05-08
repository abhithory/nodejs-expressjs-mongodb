const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// this config should be above app require

const app = require("./6app");

// enviroment variable by expressjs
// console.log(app.get('env'));

// envroment variable by nodejs
// console.log(process.env);


// setting envroment variables
// VARIABALE_NAME=VALUE npm run start

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(con => {
  // console.log(con.connection);
  console.log("Connected succefully");
}).catch(err => {
  console.log("Error while connecting to DB", err);
})


const tourSchema = new mongoose.Schema({
  // name:String,
  name: {
    type: String,
    // required:true,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
})

const Tour = mongoose.model('Tour', tourSchema);







const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port 3000");
});

// for eslint and prettier
// npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

