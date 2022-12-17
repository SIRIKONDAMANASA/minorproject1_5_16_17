var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    // profile image
    profileImage: {type: String},
    firstname : {
        type: String,
    },
    lastname : {
        type: String,
    },
    email : {
        type: String,
        unique: [true, 'Email is already exists'],
    },
    gender : {
        type: String,
        enum: ['Male', 'Female', 'Others'],
    },
    mobile_no : {
        type: String,
          required: [true, 'User phone number required']
    },
    password : {
        type: String,
    },
    role_id : {
        type: Number
    }
},
{ timestamps: true });

module.exports =mongoose.model('User',userSchema,'users');
