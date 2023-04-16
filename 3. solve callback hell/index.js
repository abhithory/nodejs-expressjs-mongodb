const fs = require("fs");



// this is callback hell
// fs.readFile("./file1.txt",'utf-8', (err,data)=>{
//     fs.readFile(`./${data}.txt`,'utf-8', (err,data2)=>{
//         fs.readFile(`./${data2}.txt`,'utf-8', (err,data3)=>{
//             console.log(data3);
//         })
//     })  
// })


// Solution 1 - promise

const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./${file}.txt`, 'utf-8', (err, data) => {
            if (err) reject("file not found");
            resolve(data)
        })
    })
}


// readFilePromise("file1").then(data=>{
//     return readFilePromise(data)
// }).then(data=>{
//     return readFilePromise(data)
// }).then(data=>{
//     console.log(data);
// })

// solution 3 - async await



const getDataFromFile = async () => {

    try {
        const data1 = await readFilePromise("file1");
        const data2 = await readFilePromise(data1);
        const data3 = await readFilePromise(data2);
        console.log(data3);
        
    } catch (error) {
        
    }
}
getDataFromFile();