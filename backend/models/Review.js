const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true, 
    },
    review:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('reviews', ReviewSchema);