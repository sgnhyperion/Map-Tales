const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        min: 3,
    },
    
    description: {
        type: String,
        required: true,
        min: 3
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    // imageUrl: {
    //     type: String, // Store the URL of the uploaded image
    //     required: true
    // }
},
    {timestamps: true}
);

module.exports = mongoose.model("Pin", PinSchema);