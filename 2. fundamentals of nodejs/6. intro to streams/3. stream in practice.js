const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req,res) => {
    // Solution 1
    // fs.readFile("content.txt", (err,data) => {
    //     if(err) console.log(err);
    //     res.end(data)
    // })


    // Solution 2
    // const readable = fs.createReadStream("content.txt");
    // readable.on('data', chunk => {
    //     res.write(chunk)
    // })
    // readable.on('end', chunk => {
    //     res.end()
    // })

    // it is not able to match the speed of process and sending data

    // solution 3
    const readable = fs.createReadStream("content.txt");
    readable.pipe(res)
    // readableSource.pipe(writableDestination)

})


server.listen(5000,'127.0.0.1',()=>{
    console.log("Listening");
})