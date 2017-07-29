'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* User Schema
*/

var countrySchema = new Schema({

	country:{
 		type: String,
        default:'',
        trim: true,
        unique:true,
        required: 'Country Name cannot be blank'
 	}
});

// Expose the model to other object (similar to a 'public' setter).

 module.exports = mongoose.model('tbl_countries', countrySchema);

 /*module.exports = User;*/