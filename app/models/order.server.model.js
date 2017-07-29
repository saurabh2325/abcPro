'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checklistSchema = new Schema({
        checklist_id:{
            type: Number
         },
        checklist_item:{
            type: String
         },
         checklist_item_condition:{
            type: String
         },
         checklist_item_notes:{
            type: String
         },
         last_updt_date:{
            type: Date,
            default: Date.now
         }
});

var tasksSchema = new Schema({
        order_tasks_id:{
            type: Number
         },
        description:{
            type: String
         },
        inventory_desc:{
            type: String
         },
        cost_price:{
            type: Number
         },
        sell_price:{
            type: Number
         },
        task_status:{
            type: String,
            default: "Open"
         },
        start_date:{
            type: Date,
            default: Date.now
         },
        end_date:{
            type: Date,
            default: Date.now
         },
        task_img:{
        type: String,
        default:'bike-1485786482383.png'
         }
});


//var Checklist = mongoose.model('Checklist', checklistSchema);
 
var orderSchema = new Schema({
    appointment_id:{
        type: String
    },
    vehicle_id:{
        type: String
    },
    vehicle_owner_full_name:{
        type: String,
        default:'',
        trim: true,
    },
    vehicle_owner_email:{
        type: String,
        default:'',
        trim: true,
    },
    vehicle_owner_phone_num:{
        type: Number,
        default:'',
        trim: true,
    },
    vehicle_num:{
        type: String,
        default:'',
        trim: true
    },
    vehicle_brand:{
        type: String,
        default:'',
        trim: true
    },
    vehicle_model:{
        type: String,
        default:'',
        trim: true
    },
    vehicle_img:[],
    create_date:{
        type: Date,
        default: Date.now,
        trim: true
    },
    checklists:[checklistSchema],
    tasks:[tasksSchema],
    task_complete:{
       type: Number,
       default: 0
    },
    sub_Amount:{
        type: Number,
        default: 0
    },
    total_cost_Amount:{
       type: Number,
       default: 0
    },
    total_Amount:{
        type: Number,
        default: 0
    },
    payment_type:{
        type: String,
        default: ""
    },
    get_del_add:{
        type: Boolean,
        default: false
    },
    delivery_type:{
        type: String,
        default: "Pickup"
    },
    delivery_date:{
        type: Date,
        default: Date.now,
        trim: true
    },
    delivery_time:{
        type: Date,
        default: Date.now,
        trim: true
    },
    delivery_Address:{
        type: String,
        default: " "
    },
    patner_id:{
        type: String  
    },
    consumer_id:{
        type: String
    },
    task_status:{
        type: Boolean,
        default: 0
    },
    payment_status:{
        type: String,
        default: "Pendding"
    },
    delivery_status:{
        type: String,
        default: "Not Deliver"
    },
    order_status: {
        type: String,
        default: "Open"
    },
    trans_id: {
        type: String,
        default: ""
    }        
});

// Expose the model to other object (similar to a 'public' setter).

 module.exports = mongoose.model('tbl_orders', orderSchema);
