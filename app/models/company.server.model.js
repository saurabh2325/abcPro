'use strict'

/**
* Module dependencies.
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Create Schema.
*/

var companySchema = new Schema({

	companyName: {
 		type: String,
        default:'',
        trim: true,
        unique:true
        //required: 'Company name cannot be blank'
        /*validation: [validation.len(15),'name must be 15 chars in length or less']*/
 	   },
 	street: {
 		type: String,
        default:'',
        trim: true
 	   },
 	landMark: {
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
    postalCode:{
 		type: Number,
        default:'',
        trim: true
 	   },
 	contactNo:{
 		type: Number,
 		default:'',
 		trim: true
 	},
 	mobileNo:{
 		type: Number,
 		default: '',
 		trim: true
 	},
 	faxNo:{
 		type:Number,
 		default:'',
 		trim: true
 	},
 	email:{
 		type: String,
 		default:'',
 		trim: true
 	},
 	panNo:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	tinNo:{
 		type:String,
 		default:'',
 		trim:true
 	},
 	cstNo:{
 		type:String,
 		default: '',
 		trim:true
 	},
 	currency:{
 		type:String,
 		default: '',
 		trim: true
 	}
    
});

// Expose the model to other object (similar to a 'public' setter).
  module.exports= mongoose.model('tbl_companies', companySchema);
