'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 /**
* Appointment Schema.
*/

var appointmentSchema = new Schema({
 	
    vehicle_num: {
 		type: String,
 		default:'',
 		trim: true,
 		required: 'Appointment number can not be blank'
 	},
 	vehicle_brand:{
 		type:String,
 		default:'',
 		trim: true
 	},
 	vehicle_model:{
 		type:String,
 		default:'',
 		trim: true
 	},
    vehicle_id:{
        type:String,
        default:'',
        trim: true
    },
 	appointment_date:{
 		type: Date,
        default: Date.now
 	},
 	appointment_time:{
 		type: Date,
        default: Date.now
 	},
 	vehicle_img:[],
    Booking_date:{
    	type: Date,
 		default: Date.now
    },
    partner_id:{
    	type:String,
 		default:'',
 		trim: true
 	},
 	consumer_id:{
    	type:String,
 		default:'',
 		trim: true
 	},
    description:{
        type:String,
        default:'',
        trim: true
    },
    status:{
        type:Boolean,
        default:false
    },
    appointment_cancel:{
        type:Boolean,
        default:false
    },
    order_id:{
        type:String,
        default:'',
        trim: true
    }
});

// Expose the model to other object (similar to a 'public' setter).
module.exports= mongoose.model('tbl_appointments', appointmentSchema);