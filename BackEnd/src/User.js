const mongoose = require('mongoose')
const marked = require('marked')

// Defined schema for user database storage
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    cart: [{
        Type: String,
        PlantName: String,
        Price: String,
        Quantity: Number,
        Advice: [String],
        Picture: String,
        Popular: Number
    }]


})

module.exports = mongoose.model('User', userSchema)