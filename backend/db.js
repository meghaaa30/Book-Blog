const mongoose= require('mongoose');
const mongoURI= "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5"
                 
const connectTo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected");
    })
}

module.exports= connectTo;
