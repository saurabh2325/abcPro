'use strict'

/**
* Module dependencies.
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');

// User Name Validator
var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: 'Name Must be at least 3 characters, max 20, no spaecial characters and number'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// User E-mail Validator
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// Username Validator
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];

// Password Validator
var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [8, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

//User Schema
var UserSchema = new Schema({
    name:{
        type: String,
       },
 	user_name: {
 		type: String,
        lowercase: true,
 	   },
 	email: {
 		type: String,
        lowercase: true,
        unique:true,
        validate: emailValidator  
 	   },
 	password: {
 		type: String, 
        select: false 
 	   },
 	activate: {
 		type: Boolean,
        default: false,
 	   },
    temporarytoken: { 
        type: String, 
       },
    permission:{
        type: String,
        required: true,
        default:'Consumer',
       },
    description: {
 		type: String,
        default:'',
        trim: true
 	   },
    cell_phone_1: {
 		type: Number,
        default:'',
        trim: true
 	   },
    cell_phone_2: {
 		type: Number,
        default:'',
        trim: true
 	   },
    work_phone_1: {
 		type: Number,
        default:'',
        trim: true
 	   },
    work_phone_2: {
 		type: Number,
        default:'',
        trim: true
 	   },
    addr_line_1: {
 		type: String,
        default:'',
        trim: true
 	   },
    addr_line_2: {
        type: String,
        default:'',
        trim: true
       },
    addr_line_3: {
        type: String,
        default:'',
        trim: true
       },
    addr_line_4: {
        type: String,
        default:'',
        trim: true
       },
    country: {
        type: String,
        default:'',
        trim: true
       },
    state: {
        type: String,
        default:'',
        trim: true
       },
    city: {
        type: String,
        default:'',
        trim: true
       },
    create_date:{ 
        type: Date,
        format: 'YYYY-MM-DD', 
        default: Date.now
       },
    user_img:{ 
        type: String,
        default:'bike-1485786482383.png'
       },
    resettoken: { 
       type: String, 
       required: false 
    }
});

 // store hase to your password in DB
UserSchema.pre('save',function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

  // Attach some mongoose hooks 
UserSchema.plugin(titlize, {
    paths: ['name'] // Array of paths 
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

// Expose the model to other object (similar to a 'public' setter).

 module.exports = mongoose.model('tbl_users', UserSchema);

