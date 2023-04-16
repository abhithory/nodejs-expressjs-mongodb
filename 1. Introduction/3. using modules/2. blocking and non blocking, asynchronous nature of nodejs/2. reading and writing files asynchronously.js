
const fs = require("fs");
// this is reading and write file asynchoronously - non blocking
fs.readFile("../files/1.inputtxt.txt", 'utf-8', (err, data) => {
    console.log(data);
    const textoutput = "this text will be shown in new file. in output file";
    fs.writeFile("../files/2.outputtxt.txt",data+"\n"+textoutput, err => {
        console.log("file created succefully!");
    })
})

