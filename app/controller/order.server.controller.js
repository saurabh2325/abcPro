'use strict';
 
/**
* Module dependencies.
*/
var Order = require('../../app/models/order.server.model');
var Consumer = require('../../app/models/user.server.model');
var Vehicle = require('../../app/models/vehicle.server.model');
var Appointment = require('../../app/models/appointment.server.model');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter';
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
* Create city
*/
exports.createOrder = function(request,response){
  var conEmail = request.body.vehicle_owner_email;
  var conmob = request.body.vehicle_owner_phone_num;
  Consumer.findOne({email: conEmail}, function(err, users){
    if(users){
      console.log('That username and e-mail is already taken');
      var vId = request.body.vehicle_num;
       Vehicle.findOne({vehicle_num: vId}, function(err, vehicle){
        if(vehicle){
          console.log('Vehicle found 1');
          var orderDetail = new Order();
              orderDetail.vehicle_owner_full_name = request.body.vehicle_owner_full_name;
              orderDetail.vehicle_owner_email = request.body.vehicle_owner_email;
              orderDetail.vehicle_owner_phone_num = request.body.vehicle_owner_phone_num;
              orderDetail.vehicle_num = request.body.vehicle_num;
              orderDetail.vehicle_brand = request.body.vehicle_brand;
              orderDetail.vehicle_model = request.body.vehicle_model;
              orderDetail.vehicle_img = request.body.vehicle_img;
              orderDetail.vehicle_id = vehicle._id;
              orderDetail.patner_id = request.body.patner_id;
              orderDetail.consumer_id = users._id;
              orderDetail.appointment_id = request.body.appointment_id;
              orderDetail.delivery_status = request.body.delivery_status;
              orderDetail.create_date = Date.now();
              orderDetail.checklists = request.body.checklists;
              orderDetail.get_del_add = request.body.get_del_add;
              orderDetail.tasks = request.body.tasks;
              orderDetail.save(function(err,order){
                /*var newuser = jwt.sign({vehicle_id: order.vehicle_id, _id: order._id}, secret, { expiresIn: '24h'});*/
                if(err){
                  response.json({ success: false, message:'Order not save, try again!'});
                }else{
                  var email = {
                    from: 'VROOM GARAGES, VROOMGARAGES@localhost.com',
                    to: orderDetail.vehicle_owner_email,
                    subject: 'Order Status',
                    text: 'Hello' + orderDetail.vehicle_owner_full_name + 'Thank you for Order,your order is' + order._id + 'Please click on the link below to see your Order: http://localhost:8080/boxed/login/',
                    html: 'Hello <strong> ' + orderDetail.vehicle_owner_full_name + '</strong> , <br><br> Thank you for Order,your order is' + order._id + 'Please click on the link below to see your Order: <br> <br> <a href="http://localhost:8080/boxed/signup/">http://localhost:8080/boxed/signup/</a>'
                  };
                  client.sendMail(email, function(err, info){
                    if (err ){
                      console.log(err);
                    }
                    else {
                      console.log(info);
                      console.log('Message sent: ' + info.response);
                    }
                  });
                  response.json({ success: false, data: order,  message:'Order save successfully, please check email'});
                  var aid = order.appointment_id;
                  Appointment.findOne({_id : aid}, function(err, appointment){
                    if(appointment){
                      appointment.status = true
                      appointment.order_id = order._id
                      appointment.save(function(err) {
                        if (err){
                          console.log(err);
                        }
                      })
                    }else{
                      console.log(err);
                    }
                  })
                }
              })
        }else{
          var vehicleModel = new Vehicle();
          vehicleModel.vehicle_num = request.body.vehicle_num;
          vehicleModel.manufacturer = request.body.vehicle_brand;
          vehicleModel.model = request.body.vehicle_model;
          vehicleModel.vehicle_img = request.body.vehicle_img;
          vehicleModel.save(function(err,vehicles){
            if(err){
              console.log("vehicle data not save successfully");
            }else{
              var orderDetail = new Order();
              orderDetail.vehicle_owner_full_name = request.body.vehicle_owner_full_name;
              orderDetail.vehicle_owner_email = request.body.vehicle_owner_email;
              orderDetail.vehicle_owner_phone_num = request.body.vehicle_owner_phone_num;
              orderDetail.vehicle_num = request.body.vehicle_num;
              orderDetail.vehicle_brand = request.body.vehicle_brand;
              orderDetail.vehicle_model = request.body.vehicle_model;
              orderDetail.vehicle_img = request.body.vehicle_img;
              orderDetail.vehicle_id = vehicles._id;
              orderDetail.patner_id = request.body.patner_id;
              orderDetail.consumer_id = users._id;
              orderDetail.appointment_id = request.body.appointment_id;
              orderDetail.create_date = Date.now();
              orderDetail.checklists = request.body.checklists;
              orderDetail.tasks = request.body.tasks;
              orderDetail.get_del_add = request.body.get_del_add;
              orderDetail.save(function(err,order){
                var newuser = jwt.sign({vehicle_id: order.vehicle_id, _id: order._id}, secret, { expiresIn: '24h'});
                if(err){
                  response.json({ success: false, message:'Order not save, try again!'});
                }else{
                  var email = {
                    from: 'VROOM GARAGES, VROOMGARAGES@localhost.com',
                    to: orderDetail.vehicle_owner_email,
                    subject: 'Order Status',
                    text: 'Hello' + orderDetail.vehicle_owner_full_name + 'Thank you for Order,your order is' + order._id + 'Please click on the link below to see your Order: http://localhost:8080/boxed/login/',
                    html: 'Hello <strong> ' + orderDetail.vehicle_owner_full_name + '</strong> , <br><br> Thank you for Order,your order is' + order._id + 'Please click on the link below to see your Order: <br> <br> <a href="http://localhost:8080/boxed/login/">http://localhost:8080/boxed/login/</a>'
                  };
                  client.sendMail(email, function(err, info){
                    if (err ){
                      console.log(err);
                    }
                    else {
                      console.log(info);
                      console.log('Message sent: ' + info.response);
                    }
                  });
                  response.json({ success: false, data: order,  message:'Order save successfully, please check email'});
                  var aid = order.appointment_id;
                  Appointment.findOne({_id : aid}, function(err, appointment){
                    if(appointment){
                      appointment.status = true
                      appointment.order_id = order._id
                      appointment.save(function(err) {
                        if (err){
                          console.log(err);
                        }
                      })
                    }else{
                      console.log(err);
                    }
                  })
                }
              })
            }
          })
        }
      })
    }else{
      var vId = request.body.vehicle_num;
      Vehicle.findOne({vehicle_num: vId}, function(err, vehicle){
        if(vehicle){
          console.log('Vehicle found 2');
        }
        else{
          var vehicleModel = new Vehicle();
          vehicleModel.vehicle_num = request.body.vehicle_num;
          vehicleModel.manufacturer = request.body.vehicle_brand;
          vehicleModel.model = request.body.vehicle_model;
          vehicleModel.vehicle_img = request.body.vehicle_img;
          vehicleModel.save(function(err,vehicles){
            if(err){
              console.log("vehicle data not save successfully");
            }else{
              var orderDetail = new Order();
              orderDetail.vehicle_owner_full_name = request.body.vehicle_owner_full_name;
              orderDetail.vehicle_owner_email = request.body.vehicle_owner_email;
              orderDetail.vehicle_owner_phone_num = request.body.vehicle_owner_phone_num;
              orderDetail.vehicle_num = request.body.vehicle_num;
              orderDetail.vehicle_brand = request.body.vehicle_brand;
              orderDetail.vehicle_model = request.body.vehicle_model;
              orderDetail.vehicle_img = request.body.vehicle_img;
              orderDetail.vehicle_id = vehicles._id;
              orderDetail.patner_id = request.body.patner_id;
              orderDetail.create_date = Date.now();
              orderDetail.checklists = request.body.checklists;
              orderDetail.tasks = request.body.tasks;
              orderDetail.get_del_add = request.body.get_del_add;
              orderDetail.save(function(err,order){
                var newuser = jwt.sign({vehicle_id: order.vehicle_id, _id: order._id}, secret, { expiresIn: '24h'});
                if(err){
                  response.json({ success: false, message:'Order not save, try again!'});
                }else{
                  var email = {
                    from: 'VROOM GARAGES, VROOMGARAGES@localhost.com',
                    to: orderDetail.vehicle_owner_email,
                    subject: 'Order Status',
                    text: 'Hello' + orderDetail.vehicle_owner_full_name + 'Thank you for Order, Please click on the link below to see your Order: http://localhost:8080/boxed/signup/'+ newuser,
                    html: 'Hello <strong> ' + orderDetail.vehicle_owner_full_name + '</strong> , <br><br> Thank you for Order, Please click on the link below to see your Order: <br> <br> <a href="http://localhost:8080/boxed/signup/' + newuser + '">http://localhost:8080/boxed/signup/</a>'
                  };
                  client.sendMail(email, function(err, info){
                    if (err ){
                      console.log(err);
                    }
                    else {
                      console.log(info);
                      console.log('Message sent: ' + info.response);
                    }
                  });
                  response.json({ success: false, data: order,  message:'Order save successfully, please check email'});
                  var aid = order.appointment_id;
                  Appointment.findOne({_id : aid}, function(err, appointment){
                    if(appointment){
                      appointment.status = true
                      appointment.order_id = order._id
                      appointment.save(function(err) {
                        if (err){
                          console.log(err);
                        }
                      })
                    }else{
                      console.log(err);
                    }
                  })
                }
              })
            }
          })
        }
      })

    }

  })
}

//List of Oeder
exports.ordersList = function (request, response) {
    Order.find({}, function(err, orders){
        if(err){
            console.log("Orders not found")
        }else
        {
            response.status(200).send(orders);
            console.log(orders);
        }
    });
};
exports.partnerOrdersList = function (request, response) {
    var uid = request.params.uid;
    Order.find({patner_id: uid}, function(err, orders){
        if(err){
            console.log("Orders not found")
        }else
        {
            response.status(200).send(orders);
            console.log(orders);
        }
    });
};
exports.consumerOrdersList = function (request, response) {
    var uid = request.params.uid;
    Order.find({consumer_id: uid}, function(err, orders){
        if(err){
            console.log("Orders not found")
        }else
        {
            response.status(200).send(orders);
            console.log(orders);
        }
    });
};
  
  // Order Detail

exports.orderDetail = function(request, response){
  var id = request.params.id;
  console.log(id);
  Order.findOne({ _id: id}, function(err, order){
    if(err){
      console.log("Order not found")
    }
    else{
      console.log(order)
      response.status(200).send(order);
    }   
  });
};


// Update Order

exports.editOrders = function(request, response){
    var id = request.params.id;
    console.log(id);
    console.log(request.body.name);

    Order.findById(id, function(err, order){
        console.log(order);
        if(err){
          response.status(404).send(err);
        }
         else{
          order.update( request.body ,function(err, success){
            if(err){
              response.json({ success: false, data: err, message:'Error, Please try again letar!'});
            }
            else{
              response.json({ success: true, data: order, message:'Orders detail successfully Update'});
              var email = {
                from: 'VROOM GARAGES, staff@localhost.com',
                to: order.vehicle_owner_email,
                subject: 'Order Status',
                text: 'Hello' + order.vehicle_owner_full_name + 'Thank you for Order, Please click on the link below to see your Order status: http://localhost:8000',
                html: 'Hello <strong> ' + order.vehicle_owner_full_name +'</strong> , <br><br> Thank you for Order, Please click on the link below to see your Order status: <br> <br> <a href="http://localhost:8000"> http://localhost:8000 </a>'
              };
              client.sendMail(email, function(err, info){
                if (err ){
                  console.log(err);
                }
                else {
                  console.log(info);
                  console.log('Message sent: ' + info.response);
                }
              });
            }
          });
        }
    })
};

/*exports.partnerOrdersList = function (request, response) {

  Consumer.aggregate([
    {
      $lookup:
              {
                from:"Order",
                localField: "_id",
                foreignField: "patner_id",
                as:"orderDetail"
              }
    }
  ]).exec(function(err, results){
    if(err){
      response.json({ success: false, data: err,  message:'try again!'});
    }else{
      response.json({ success: true, data:results, message:'success'});
    }
    
 })
};*/

