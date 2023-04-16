const http = require("http")
const fs = require("fs");
const url = require("url");


const dataJson = fs.readFileSync(`../../files/dataJson.json`,'utf-8');


const server = http.createServer((req,res) => {
    const {query, pathname} = url.parse(req.url,true);
    console.log(query);
    console.log(pathname);
    if (pathname === "/" || pathname == "/home") {
        res.end("home page")
    } else if(pathname === "/api"){
        res.writeHead(200,{
            "Content-type":"application/json"
        })
        res.end(dataJson)
    } else if(pathname === "/item"){
        res.writeHead(200,{
            "Content-type":"application/json"
        })
        res.end(JSON.stringify({"for id:":query.id }))
    } 
    else {
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