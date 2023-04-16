// Go to nodejs websties docs for knowing about all modules


// File system module - for reading and writing files
const fs = require("fs");


// this is reading and write file synchronously
const textInput = fs.readFileSync("./files/1.inputtxt.txt",'utf-8');

console.log(textInput);


const textoutput = "this text will be shown in new file. in output file";
fs.writeFileSync("./files/2.outputtxt.txt",textoutput)
console.log("file created succefully!");


// keywords - read, write, file,