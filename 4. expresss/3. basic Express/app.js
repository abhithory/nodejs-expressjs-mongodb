const express = require("express");

const app = express();


app.get("/", (req,res) => {
    // res.send("hello word")
    // res.status(200).send("hello word")
    res.status(200).json({message: "hello word"})
})

app.post("/", (req,res) => {
    // res.send("hello word")
    // res.status(200).send("hello word")
    res.status(200).json({message: "data posted"})
})

const port = 3000;
app.listen(port, ()=>{
    console.log("Listening on port:",port);
})