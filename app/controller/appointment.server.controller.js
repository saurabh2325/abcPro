'use strict'

/**
* Module dependencies.
*/
var Vehicle = require('../../app/models/vehicle.server.model');
var Model = require('../../app/models/user.server.model');
var Appointment = require('../../app/models/appointment.server.model');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var options = {
      service: 'Gmail',
      auth: {
        user: 'saurabh.sixthsense@gmail.com',
        pass: 'saurabh2325'
      }
}
var client = nodemailer.createTransport(options);
 

 
/** 
* Create a Appointment
*/

exports.createAppointment = function(request,response){
  console.log(request.body);
  var vId = request.body.vehicle_num; 
  Vehicle.findOne({vehicle_num: vId}, function(err, vehicle){
    if(vehicle){
      console.log('Vehicle found');
      var appointmentDetail = new Appointment();
      appointmentDetail.vehicle_num = request.body.vehicle_num;
      appointmentDetail.vehicle_brand = request.body.vehicle_brand;
      appointmentDetail.vehicle_model = request.body.vehicle_model;
      appointmentDetail.vehicle_id = vehicle._id;
      appointmentDetail.appointment_date = request.body.appointment_date;
      appointmentDetail.appointment_time = request.body.appointment_time;
      appointmentDetail.vehicle_img = request.body.vehicle_img;
      appointmentDetail.partner_id = request.body.partner_id;
      appointmentDetail.consumer_id = request.body.consumer_id;
      appointmentDetail.description = request.body.description;
      appointmentDetail.save(function(err,appointment){
         if(err)
         {
          response.json({success: false, message: 'Appointment booking  failed, try again later!'});
         }else{
          console.log(appointment);
          var pid = appointment.partner_id
          var cid = appointment.consumer_id
          var vid = appointment.vehicle_id
          Model.findOne({_id: pid}, function(err, user){
            if(err){
              console.log("data not found")
            }else{
              // response.status(200).send(users);
              console.log(user)
              var email = {
                  from: 'VroomGarage@gmail.com',
                  to: user.email,
                  subject: 'Book Appointment',
                  text: 'Hello ' + user.name +', New appointment'+ appointment._id +'on Your Service Center,Please check appointment tab',
                  html: 'Hello<strong>' + user.name +'</strong>,<br><br> New appointment'+ appointment._id +'on Your Service Center, Please check appointment tab '
              };
              // Function to send e-mail to the user
              client.sendMail(email, function(err, info) {
                if (err) {
                  console.log(err); // If error with sending e-mail, log to console/terminal
                } else {
                  console.log(info); // Log success message to console
                  console.log('sent to: ' + user.email); // Log e-mail 
                }
              });
            }
          })
          Model.findOne({_id: cid}, function(err, user){
            if(err){
              console.log("data not found")
            }else{
              // response.status(200).send(users);
              console.log(user)
              var email = {
                  from: 'VroomGarage@gmail.com',
                  to: user.email,
                  subject: 'Book Appointment',
                  text: 'Hello ' + user.name +', Your Appointment'+ appointment._id +'is successfully booked',
                  html: 'Hello<strong>' + user.name +'</strong>,<br><br>Your Appointment'+ appointment._id +'is successfully booked'
              };
              // Function to send e-mail to the user
              client.sendMail(email, function(err, info) {
                if (err) {
                  console.log(err); // If error with sending e-mail, log to console/terminal
                } else {
                  console.log(info); // Log success message to console
                  console.log('sent to: ' + user.email); // Log e-mail 
                }
              });
            }
          })          
          vehicle.update({vehicle_img : request.body.vehicle_img} ,function(err, success){
            if(err){
              response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance'});
            }
            else{
              response.json({success: true, data: appointment, message: 'Appointment book Successfully'});
            }
          });
        }
      });
    }else{
      var vehicleModel = new Vehicle();
      vehicleModel.vehicle_num = request.body.vehicle_num;
      vehicleModel.manufacturer = request.body.vehicle_brand;
      vehicleModel.model = request.body.vehicle_model;
      vehicleModel.vehicle_img = request.body.vehicle_img;
      vehicleModel.consumer_id = request.body.consumer_id;
      vehicleModel.save(function(err,vehicles){
        if(err){
          console.log("vehicle data not save successfully");
        }else{
          var appointmentDetail = new Appointment();
          appointmentDetail.vehicle_num = request.body.vehicle_num;
          appointmentDetail.vehicle_brand = request.body.vehicle_brand;
          appointmentDetail.vehicle_model = request.body.vehicle_model;
          appointmentDetail.vehicle_id = vehicles._id;
          appointmentDetail.appointment_date = request.body.appointment_date;
          appointmentDetail.appointment_time = request.body.appointment_time;
          appointmentDetail.vehicle_img = request.body.vehicle_img;
          appointmentDetail.vehicle_owner_full_name = request.body.vehicle_owner_full_name;
          appointmentDetail.vehicle_owner_email = request.body.vehicle_owner_email;
          appointmentDetail.vehicle_owner_phone_num = request.body.vehicle_owner_phone_num;
          appointmentDetail.partner_id = request.body.partner_id;
          appointmentDetail.consumer_id = request.body.consumer_id;
          appointmentDetail.save(function(err,appointment){
            if(err)
            {
              response.json({success: false, message: 'Appointment booking  failed, try again later!'});
            }else{
              response.json({success: true, data: appointment, message: 'Appointment book Successfully'});
              console.log(appointment);
              var pid = appointment.partner_id
              var cid = appointment.consumer_id
              Model.findOne({_id: pid}, function(err, user){
                if(err){
                  console.log("data not found")
                }else{
                  // response.status(200).send(users);
                  console.log(user)
                  var email = {
                      from: 'VroomGarage@gmail.com',
                      to: user.email,
                      subject: 'Book Appointment',
                      text: 'Hello ' + user.name +', New appointment'+ appointment._id +'on Your Service Center,Please check appointment tab',
                      html: 'Hello<strong>' + user.name +'</strong>,<br><br> New appointment'+ appointment._id +'on Your Service Center, Please check appointment tab '
                  };
                  // Function to send e-mail to the user
                  client.sendMail(email, function(err, info) {
                    if (err) {
                      console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                      console.log(info); // Log success message to console
                      console.log('sent to: ' + user.email); // Log e-mail 
                    }
                  });
                }
              })
              Model.findOne({_id: cid}, function(err, user){
                if(err){
                  console.log("data not found")
                }else{
                  // response.status(200).send(users);
                  console.log(user)
                  var email = {
                      from: 'VroomGarage@gmail.com',
                      to: user.email,
                      subject: 'Book Appointment',
                      text: 'Hello ' + user.name +', Your Appointment'+ appointment._id +'is successfully booked',
                      html: 'Hello<strong>' + user.name +'</strong>,<br><br>Your Appointment'+ appointment._id +'is successfully booked'
                  };
                  // Function to send e-mail to the user
                  client.sendMail(email, function(err, info) {
                    if (err) {
                      console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                      console.log(info); // Log success message to console
                      console.log('sent to: ' + user.email); // Log e-mail 
                    }
                  });
                }
              })
            }
          });
        }
      })
    }
  })
}

/** 
* List of Appointment
*/

exports.appointmentList = function (request, response) {
    Appointment.find({}, function(err, appointments){
        if(err){
            console.log("Appointment not found")
        }else
        {
            response.status(200).send(appointments);
           // console.log(appointments);
        }
    });
};

exports.partnerAppointmentsList = function (request, response) {
    var uid = request.params.uid;
    Appointment.find({partner_id: uid}, function(err, appointments){
        if(err){
            console.log("Appointment not found")
        }else
        {
            response.status(200).send(appointments);
            console.log(appointments);
        }
    });
};
exports.consumerAppointmentsList = function (request, response) {
    var uid = request.params.uid;
    Appointment.find({consumer_id: uid}, function(err, appointments){
        if(err){
            console.log("Appointment not found")
        }else
        {
            response.status(200).send(appointments);
            console.log(appointments);
        }
    });
};

/**
* show the Appointment
*/

exports.appointmentView = function(request, response){
	var id = request.params.id;
      console.log(id);
        Appointment.findOne({_id: id}, function(err, appointment){
        if(err){
        console.log("Appointment not found")
        }
        else{
        response.status(200).send(appointment);
        }   
    });
};

/**
* Update the Appointment
*/

exports.updateAppointment = function(request, response){
  var id = request.params.id;
  console.log(id);
  Appointment.findById(id, function(err, appointments){
    if(err){
      response.json({ success: false, data:err, message: 'Somthing went wrong!, Please contact support for assistance'});
    }else{
      appointments.update(request.body ,function(err, success){
        if(err){
          response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance'});
        }
        else{
          var vid = appointments.vehicle_num;
          Vehicle.findOne({vehicle_num: vid}, function(err, vehicle){
            if(vehicle){
              vehicle.update({vehicle_img : request.body.vehicle_img} ,function(err, success){
                if(err){
                  response.json({ success: false, message: 'Somthing went wrong!, Please contact support for assistance'});
                }
                else{
                  response.json({ success: true, message: 'Appointment successfully update'});
                }
              });
            }
          })
        }
      });
    }
  })
};

/**
* Delete an Appointment
*/

exports.deleteAppointment = function(request, response){
	var id = request.params.id;
      console.log(id);
      Appointment.remove({_id: id}, function(err, res){
        if(err){
          response.status(500).send(err);
        }
        else{
          response.status(201).send({message: 'success on deleting appointment'});
        }
      });
};

exports.workshopListById = function(req, res){
    var id = req.params.id;
    Model.find({city:id, permission: "Partner"}, function(err, users){
      if(err){
        console.log("data not found")
      }
      else{
        /*res.status(200).send(users);*/
        res.json({ success: true, data: users});
      }
    }); 
};

/*exports.workshopList = function(req, res){
  Model.find({permission: "Partner"}, function(err, users){
    if(err){
      console.log("data not found")
    }
    else{
      res.json({ success: true, data: users});
    }
  }); 
};*/
