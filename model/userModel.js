const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id:{

        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true
    },
    secondName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNum: {
        type: String,
        require: true
    }
})

const users = mongoose.model("users",userSchema)
 module.exports = users