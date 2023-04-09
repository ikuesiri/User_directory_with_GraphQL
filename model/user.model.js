const mongoose = require("mongoose");


const UserSchema =  new mongoose.Schema({
    first_name :{
        type: String,
        required: [true, "Please provide your first name"],
        lowercase: true
    },
    last_name :{
        type: String,
        required: [true, "Please provide your last name"],
        lowercase: true
    },
    email :{
        type: String,
        required: [true, "Please provide your email address"],
        unique: [true, "This email address already exists"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
          ],
        owercase: true
    },
    phone_number :{
        type: String,
        unique: [true, "This phone number already exists"],
        required: [true, "Please enter phone number"]
    },
    password :{
        type: String,
        required: [true, "Please Enter Your password"],
        minlength: [6 , "Password is too short"],
    },
})


module.exports = mongoose.model("User", UserSchema);