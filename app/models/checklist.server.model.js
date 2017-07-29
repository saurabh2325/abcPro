'use strict';


// Module dependencies.

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 
// Checklist Schema.

var checklistSchema = new Schema({
 	checklist_item: {
 		type: String,
 		default:'',
 		trim: true,
 		unique:true,
 		required: 'Checklist name can not be blank'
 	},
 	checklist_status:{
 		type:String,
 		default:'Active',
 		trim: true
 	},
 	checklist_item_condition:{
 		type:String,
 		default:'Good',
 		trim: true
 	}
 });

 // Expose the model to other object (similar to a 'public' setter).
  module.exports= mongoose.model('tbl_checklist', checklistSchema);