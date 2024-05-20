const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://bookblog:sly8132i3mBpmlQu@cluster0.imtwo9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI)
        console.log('Mongo connected')
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}
module.exports = connectToMongo;
