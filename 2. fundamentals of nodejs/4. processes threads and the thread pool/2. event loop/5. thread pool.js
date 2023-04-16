const fs = require("fs");
const crypto = require("crypto")

const start = Date.now()

fs.readFile("file.txt",()=>{
    console.log("I/O finished");
    console.log("------------- event loop exactly work form here");

    crypto.pbkdf2('password','salt',100000,1024,'sha512', ()=>{
        console.log(Date.now() - start,"password encrypted");
    })

    crypto.pbkdf2('password','salt',100000,1024,'sha512', ()=>{
        console.log(Date.now() - start,"password encrypted");
    })

    crypto.pbkdf2('password','salt',100000,1024,'sha512', ()=>{
        console.log(Date.now() - start,"password encrypted");
    })

    crypto.pbkdf2('password','salt',100000,1024,'sha512', ()=>{
        console.log(Date.now() - start,"password encrypted");
    })

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