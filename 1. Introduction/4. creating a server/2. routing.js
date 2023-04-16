const http = require("http")

const server = http.createServer((req,res) => {
    
    const pathname = req.url;
    
    if (pathname === "/" || pathname == "/home") {
        res.end("home page")
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