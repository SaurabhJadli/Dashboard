const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const userModel = model('userModel', userSchema, 'users')

module.exports = userModel