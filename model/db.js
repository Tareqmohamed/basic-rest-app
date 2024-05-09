const mongoose = require('mongoose');

// Define MongoDB schema and model
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required:true        
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('User', UserSchema);