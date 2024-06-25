const mongoose = require('mongoose');
require("dotenv").config();
const mongoURI = process.env.REACT_APP_MONGO_URL

const connectToMongo = async () => {
    mongoose.connect(mongoURI).then(()=>console.log("Connected to Mongo successfully")).catch((e)=>console.log(e.message))
};

module.exports = connectToMongo;