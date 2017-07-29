'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* State Schema.
*/


var stateSchema = new Schema({   
   stateName:{
   	type: String,
   	default:'',
   	trim: true,
   	required: 'State name cannot be blank'
   },
   countryId: {
      type: String,
        default:'',
        trim: true
      }
});

 // Expose the model to other object (similar to a 'public' setter).

 module.exports = mongoose.model('tbl_states', stateSchema);

