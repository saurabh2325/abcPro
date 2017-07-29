'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 /**
* Vehicle Schema.
*/

var vehicleSchema = new Schema({
 	vehicle_num: {
 		type: String,
 		default:'',
 		trim: true,
 		unique:true,
 		required: 'Vehicle name can not be blank'
 	},
 	manufacturer:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	model:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	chassis_num:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	vehicle_img:[],
 	engine_num:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	variant:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	make_year:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	mileage:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	insurance_vendor:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	insureance_policy_number:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	last_owner:{
 		type:String,
 		default:'',
 		trim: true
 	},
    last_workshop:{
    	type: String,
    	default:'',
    	trim: true
    },
    city:{
    	type: String,
    	default:'',
    	trim: true
    },
    state:{
    	type: String,
    	default:'',
    	trim: true
    },
    country:{
    	type: String,
    	default:'',
    	trim: true
    },
    description:{
    	type: String,
    	default:'',
    	trim: true
    },
    last_updt_date:{
    	type: Date,
 		default: Date.now
    },
    consumer_id:{
       type: String
    }
 });

 // Expose the model to other object (similar to a 'public' setter).
  module.exports= mongoose.model('tbl_vehicles', vehicleSchema);