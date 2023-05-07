const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});
// this config should be above app require

const app = require("./6app");


// enviroment variable by expressjs
// console.log(app.get('env'));

// envroment variable by nodejs
// console.log(process.env);


// setting envroment variables
// VARIABALE_NAME=VALUE npm run start

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port 3000");
})