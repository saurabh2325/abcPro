'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 /**
* City Schema.
*/

var citySchema = new Schema({
 	cityName: {
 		type: String,
 		default:'',
 		trim: true,
 		unique:true,
 		required: 'City name can not be blank'
 	},
 	stateId:{
 		type:String,
 		default:'',
 		trim: true
 	},
    countryId:{
    	type: String,
    	default:'',
    	trim: true
    }

 });

 // Expose the model to other object (similar to a 'public' setter).
  module.exports= mongoose.model('tbl_cities', citySchema);