const http = require("http")
const fs = require("fs");


const dataJson = fs.readFileSync(`../../files/dataJson.json`,'utf-8');


const server = http.createServer((req,res) => {
    const pathname = req.url;
    if (pathname === "/" || pathname == "/home") {
        res.end("home page")
    } else if(pathname === "/api"){
        res.writeHead(200,{
            "Content-type":"application.json"
        })
        res.end(dataJson)
    } else {
        res.writeHead(404,{
            "Content-type":'text/html',
            "my-custom-header":"hello-world"
        })

        res.end("<h1>page not found</h1>")
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to on port 8000");
})