'use strict';


// Module dependencies.

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 
// Tax Schema.

var taxSchema = new Schema({
 	tax_name: {
 		type: String,
 		default:'',
 		trim: true,
 		unique:true,
 		required: 'Tax name can not be blank'
 	},
 	tax_percent:{
 		type:Number,
 		default:'',
 		trim: true
 	},
 	tax_status:{
 		type:String,
 		default:'',
 		trim: true
 	},

 });

 // Expose the model to other object (similar to a 'public' setter).
  module.exports= mongoose.model('tbl_tax', taxSchema);