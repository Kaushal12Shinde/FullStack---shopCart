const mongoose = require('mongoose');
const mongoUrl = 'mongodb://0.0.0.0:27017/estore-database';
//beacuse of ipv6 mongo creates some problem

// const connectToMongo = ()=>{
//     mongoose.connect(mongoUrl,()=>{
//         console.log("Connected to MongoDB");
//     })   
// } no longer expects call back.

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("hi Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect", error);
    }   
}

module.exports = connectToMongo;