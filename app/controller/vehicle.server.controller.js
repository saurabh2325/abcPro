'use strict'

// Module dependencies.

 var Order = require('../../app/models/order.server.model');
 var Vehicle = require('../../app/models/vehicle.server.model');
 var mongoose = require('mongoose');
 
// Create a Vehicle

exports.createVehicle = function(request,response){
  console.log(request.body);
  var vehicleDetail = new Vehicle();
  vehicleDetail.vehicle_num = request.body.vehicle_num;
  vehicleDetail.manufacturer = request.body.manufacturer;
  vehicleDetail.model = request.body.model;
  vehicleDetail.chassis_num = request.body.chassis_num;
  vehicleDetail.vehicle_img = request.body.vehicle_img;
  vehicleDetail.engine_num = request.body.engine_num;
  vehicleDetail.variant = request.body.variant;
  vehicleDetail.make_year = request.body.make_year;
  vehicleDetail.mileage = request.body.mileage;
  vehicleDetail.insurance_vendor = request.body.insurance_vendor;
  vehicleDetail.insureance_policy_number = request.body.insureance_policy_number;
  vehicleDetail.last_owner = request.body.last_owner;
  vehicleDetail.last_workshop = request.body.last_workshop;
  vehicleDetail.city = request.body.city;
  vehicleDetail.state = request.body.state;
  vehicleDetail.country = request.body.country;
  vehicleDetail.description = request.body.description;
  vehicleDetail.consumer_id = request.body.consumer_id;
  vehicleDetail.save(function(err,vehicles){
    if(err){
      response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance' });
    }else{
      response.json({ success: true, message:'New Vehicle Save successfully'});
    }
  });
};
  
 
// List of Vehicle

exports.vehicleList = function (request, response) {
  Vehicle.find({}, function(err, vehicles){
    if(err){
      response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance'});
    }else
    {
      response.json({ success: true, data:vehicles});
    }
  });
};

exports.partnerVehiclesList = function (request, response) {
    var uid = request.params.uid;
    //console.log("partnerid:"+ uid);
    Order.find({ patner_id: uid }).select('vehicle_id').exec(function(err, vehicles){
        if(err){
            console.log("Appointment not found")
        }else
        {
            response.status(200).send(vehicles);
            console.log(vehicles);
        }
    });
};
exports.consumerVehiclesList = function (request, response) {
    var uid = request.params.uid;
    Vehicle.find({consumer_id: uid}, function(err, vehicles){
        if(err){
            response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance'});
        }else
        {
            response.json({ success: true, data:vehicles});
        }
    });
};

exports.vehicleNumberDetail = function(request, response){
  var id = request.params.id;
  Vehicle.findOne({vehicle_num: id}, function(err, vehicle){
    if(err){
      response.json({ success: false, message:'Vehicle not found'});
    }
    else{
      
      response.json({success: true, data: vehicle});
    }   
  });
};

// show the Vehicle
exports.vehicleDetail = function(request, response){
	var id = request.params.id;
  console.log(id);
  Vehicle.findOne({ _id: id}, function(err, vehicle){
    if(err){
      console.log("vehicle not found")
    }
    else{
      //console.log(vehicle)
      response.status(200).send(vehicle);
    }   
  });
};


// Update the User


exports.updateVehicle = function(request, response){
  var id = request.params.id;
  console.log(id);
  Vehicle.findById(id, function(err, vehicles){
    if(err){
      response.json({ success: false, data:err, message: 'Somthing went wrong!, Please contact support for assistance' });    
    }
    else{
      vehicles.update(request.body ,function(err, success){
        if(err){
          response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance' });
        }else{
          response.json({ success: true, message:'Vehicle successfully update'});
        }
      });
    }
  })
};

// Delete an User 


exports.deleteVehicle = function(request, response){
	var id = request.params.id;
  console.log(id);
  Vehicle.remove({_id: id}, function(err, res){
    if(err){
      response.status(500).send(err);
    }
    else{
      response.status(201).send({message: 'success on deleting vehicle'});
    }
  });
};

// Vehicle history
  exports.vehicleHistory = function (request, response) {
    var vid = request.params.id;
    console.log(vid)
    Order.find({vehicle_id: vid, order_status:"Complete"}, function(err, History){
      if(err){
        response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance' });
      }else{
        response.json({ success: true, data:History});
      }
    });
};