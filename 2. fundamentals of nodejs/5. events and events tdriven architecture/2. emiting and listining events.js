const EventEmitter = require("events")


class Sales extends EventEmitter {
    constructor(){
        super()
    }
}

// const myEmitter = new EventEmitter();
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
    console.log("There was a new sale!");
})

myEmitter.on("newSale", sales => {
    console.log("Total sales", sales);
})

myEmitter.emit("newSale",9)