//  install mongodb server,mongosh (mongo shell) and compass

// add in enviroment variables the path of bin folder of mongodb

// run mongod for mongo server start
// run mongosg for mongo shell



// show all the databases
// > show dbs

// create database or switch to a already exiting databasse
// > use datbase-name

// see all collections in db
// show collections


// ------CRUD Operation (create,read,update,delete)


// -----creating

// creating collection and inserting document in that
// db.tours.insertOne({name:"The forest hiker",price:297,rating:4.7})

// inserting multipal documents
// db.tours.insertMany([{name:"the sea explorer",price:497,rating:4.8},{name:"the snow adventurer",price:997,rating:4.9,difficulty:"easy"}])


// ----reading

// getting all documents in collection
// db.tours.find()


// getting documents which have a property that is mentioned
// db.tours.find({name:"The forest hiker"})

// getting doucments which have numerical vaule property
// lte- less than equal to
// lt- less than
// gte - greater than equal to
// gt - greater than
// db.tours.find({price: {$lte: 500}})


// getting with two values - and condition
// db.tours.find({price: {$lt: 500},rating:{$gte: 4.8}})


// or condition
// db.tours.find({$or: [{price:{$lt:500}},{rating: {$gte:4.8}}]})


// getting only one field from document
// db.tours.find({$or: [{price:{$lt:500}},{rating: {$gte:4.8}}]},{name:1})


// not getting only one field from document
// db.tours.find({$or: [{price:{$lt:500}},{rating: {$gte:4.8}}]},{name:0})


// 