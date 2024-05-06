const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trime: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trime: true,
    },
    password: {
        type: String,
        trime: true
    }
});

const User = mongoose.model("Users", userSchema)
module.exports = User;