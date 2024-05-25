const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.REACT_APP_MONGO_URI;

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoURI);
        console.log('Mongo connected');
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectToMongo;
