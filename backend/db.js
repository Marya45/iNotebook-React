const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";

const connectToMongo = async () => {
    mongoose.connect(mongoURI).then(()=>console.log("Connected to Mongo successfully")).catch((e)=>console.log(e.message))
};

module.exports = connectToMongo;