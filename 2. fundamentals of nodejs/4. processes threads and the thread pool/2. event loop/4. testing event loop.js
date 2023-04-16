const fs = require("fs");

setTimeout(() => {
    console.log("timer 1 finished");
}, 0);

setImmediate(()=>{
    console.log("Immediate 1 finished");
})


fs.readFile("file.txt",()=>{
    console.log("I/O finished");

    console.log("------------- event loop exactly work form here");

    setTimeout(() => {
        console.log("timer 1 finished");
    }, 0);
    
    setTimeout(() => {
        console.log("timer 1 finished");
    }, 3000);
    
    setImmediate(()=>{
        console.log("Immediate 1 finished");
    })
    process.nextTick(()=>console.log("process.nextTick"))
})

console.log("top level code");