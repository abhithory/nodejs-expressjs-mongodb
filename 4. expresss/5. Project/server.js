const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
// this config should be above app require

process.on("uncaughtException", err => {
  console.log(err);
  console.log("uncaughtException! Shutting down...");
  process.exit(1)
})


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


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Listening on port 3000");
});

// for eslint and prettier
// npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev


process.on("unhandledRejection", err => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection! Shutting down...");
  server.close(() => {
    process.exit(1)
  })
})

