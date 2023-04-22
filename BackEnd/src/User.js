const mongoose = require('mongoose')
const marked = require('marked')

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
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema)