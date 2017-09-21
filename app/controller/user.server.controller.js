'use strict'

/**
* Module dependencies.
*/

 var Model = require('../../app/models/user.server.model');
 var Vehicle = require('../../app/models/vehicle.server.model');
 var Order = require('../../app/models/order.server.model');
 var mongoose = require('mongoose');
 var jwt = require('jsonwebtoken'); // Import JWT Package
 var secret = 'harrypotter';
 var nodemailer = require('nodemailer');
 var options = {
  service: 'Gmail',
  auth: {
    user: '****@gmail.com',
    pass: '******'
  }
}
var client = nodemailer.createTransport(options);


 
/** 
* Create a User
*/

exports.create = function(req, res){
	var model = new Model();
    model.name = req.body.name;
	  model.user_name = req.body.user_name;
    model.email = req.body.email;
    model.password = req.body.password; 
    model.permission = req.body.permission;
    model.description = req.body.description
    model.cell_phone_1 = req.body.cell_phone_1;
    model.cell_phone_2 = req.body.cell_phone_2;
    model.work_phone_1 = req.body.work_phone_1;
    model.work_phone_2 = req.body.work_phone_2;
    model.addr_line_1 = req.body.addr_line_1;
    model.addr_line_2 = req.body.addr_line_2;
    model.addr_line_3 = req.body.addr_line_3;
    model.addr_line_4 = req.body.addr_line_4;
    model.country = req.body.country;
    model.state = req.body.state;
    model.city = req.body.city;
    model.create_date = Date.now();
    model.user_img = req.body.user_img;
    model.temporarytoken = jwt.sign({ username: model.user_name, email: model.email }, secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail
    

    if(req.body.user_name == null || req.body.user_name == '' || req.body.password == null  || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.name == null || req.body.name == ''){
      res.send('Ensure userName, email, and password were provided');
      res.json({ success: false, message:'Ensure userName, email, and password were provided'});
   
    }else{
      model.save(function(err, users){
        if (err) {
          // Check if any validation errors exists (from user model)
          if (err.errors !== null && err.errors !== undefined ) {
              if (err.errors.name) {
                  res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
              } else if (err.errors.email) {
                  res.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
              } else if (err.errors.user_name) {
                  res.json({ success: false, message: err.errors.user_name.message }); // Display error in validation (username)
              } else if (err.errors.password) {
                  res.json({ success: false, message: err.errors.password.message }); // Display error in validation (password)
              } else {
                  res.json({ success: false, message: err }); // Display any other errors with validation
              }
          } else if (err) {
              // Check if duplication error exists
              if (err.code === 11000) {
                res.json({ success: false, message: 'That username and e-mail is already taken' }); // Display error if username already taken     
              } else {
                res.json({ success: false, message: err }); // Display any other error
              }
          }
        }else{

          var email = {
            from: 'Localhost Staff, staff@localhost.com',
            to: model.email,
            subject: 'Activation Link',
            text: 'Hello' + model.name + 'Thank you for registering at localhost.com. Please click on the link below to complete your activation: http://localhost:8000/boxed/activate/'+ model.temporarytoken ,
            html: 'Hello<strong> ' + model.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8000/boxed/activate/' + model.temporarytoken + '">http://localhost:8000/boxed/activate/</a>'
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
           res.json({ success: true, message:'Account registered Please check your email for activation link '});  
        }
      });
    }
};

exports.createNew = function(req, res){
  console.log(req.body);
  var model = new Model();
    model.name = req.body.name;
    model.user_name = req.body.user_name;
    model.email = req.body.email;
    model.password = req.body.password; 
    model.permission = req.body.permission;
    model.description = req.body.description
    model.cell_phone_1 = req.body.cell_phone_1;
    model.cell_phone_2 = req.body.cell_phone_2;
    model.work_phone_1 = req.body.work_phone_1;
    model.work_phone_2 = req.body.work_phone_2;
    model.addr_line_1 = req.body.addr_line_1;
    model.addr_line_2 = req.body.addr_line_2;
    model.addr_line_3 = req.body.addr_line_3;
    model.addr_line_4 = req.body.addr_line_4;
    model.country = req.body.country;
    model.state = req.body.state;
    model.city = req.body.city;
    model.create_date = Date.now();
    model.user_img = req.body.user_img;
    model.temporarytoken = jwt.sign({ username: model.user_name, email: model.email }, secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail
    if(req.body.user_name == null || req.body.user_name == '' || req.body.password == null  || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.name == null || req.body.name == ''){
      res.send('Ensure userName, email, and password were provided');
      res.json({ success: false, message:'Ensure userName, email, and password were provided'});
   
    }else{
      model.save(function(err, users){
        if (err) {
          // Check if any validation errors exists (from user model)
          if (err.errors !== null && err.errors !== undefined ) {
              if (err.errors.name) {
                  res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
              } else if (err.errors.email) {
                  res.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
              } else if (err.errors.user_name) {
                  res.json({ success: false, message: err.errors.user_name.message }); // Display error in validation (username)
              } else if (err.errors.password) {
                  res.json({ success: false, message: err.errors.password.message }); // Display error in validation (password)
              } else {
                  res.json({ success: false, message: err }); // Display any other errors with validation
              }
          } else if (err) {
              // Check if duplication error exists
              if (err.code === 11000) {
                res.json({ success: false, message: 'That username and e-mail is already taken' }); // Display error if username already taken     
              } else {
                res.json({ success: false, message: err }); // Display any other error
              }
          }
        }else{
          //console.log(req.params.newuser);
          var newuser = req.params.newuser;
          if(newuser){  //veryfy token
            jwt.verify(newuser, secret , function(err, decoded) {
              if(err){
                res.json({sucess: false, message: "Token Invalid"});
              }else{
                req.decoded = decoded;
                var vid = req.decoded.vehicle_id;
                var oid = req.decoded._id 
                Vehicle.findOne({_id: vid}, function(err, vehicle){
                  if(vehicle){
                    vehicle.consumer_id = users._id;
                    vehicle.save(function(err){
                      console.log("save")
                    })
                  }  
                });
                Order.findOne({_id: oid}, function(err, order){
                  if(order){
                    order.consumer_id = users._id;
                    order.save(function(err){
                      console.log("save")
                    })
                  }  
                });
                var email = {
                  from: 'Localhost Staff, staff@localhost.com',
                  to: model.email,
                  subject: 'Activation Link',
                  text: 'Hello' + model.name + 'Thank you for registering at localhost.com. Please click on the link below to complete your activation: http://localhost:8080/boxed/activate/'+ model.temporarytoken ,
                  html: 'Hello<strong> ' + model.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8080/boxed/activate/' + model.temporarytoken + '">http://localhost:8080/boxed/activate/</a>'
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
                res.json({ success: true, message:'Account registered Please check your email for activation link '});
              } 
            })
          }else{
            //res.json({success: false, message: 'No token provieded'});
          }
        }
      });
    }
}

/*exports.createNew = function(req, res){
    var model = new Model();
    model.name = req.body.name;
    model.user_name = req.body.user_name;
    model.email = req.body.email;
    model.password = req.body.password; 
    model.permission = req.body.permission;
    model.description = req.body.description
    model.cell_phone_1 = req.body.cell_phone_1;
    model.cell_phone_2 = req.body.cell_phone_2;
    model.work_phone_1 = req.body.work_phone_1;
    model.work_phone_2 = req.body.work_phone_2;
    model.addr_line_1 = req.body.addr_line_1;
    model.addr_line_2 = req.body.addr_line_2;
    model.addr_line_3 = req.body.addr_line_3;
    model.addr_line_4 = req.body.addr_line_4;
    model.country = req.body.country;
    model.state = req.body.state;
    model.city = req.body.city;
    model.create_date = Date.now();
    model.user_img = req.body.user_img;
    model.temporarytoken = jwt.sign({ username: model.user_name, email: model.email }, secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail
    

    if(req.body.user_name == null || req.body.user_name == '' || req.body.password == null  || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.name == null || req.body.name == ''){
      res.send('Ensure userName, email, and password were provided');
      res.json({ success: false, message:'Ensure userName, email, and password were provided'});
   
    }else{
      model.save(function(err, users){
        if (err) {
          // Check if any validation errors exists (from user model)
          if (err.errors !== null && err.errors !== undefined ) {
              if (err.errors.name) {
                  res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
              } else if (err.errors.email) {
                  res.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
              } else if (err.errors.user_name) {
                  res.json({ success: false, message: err.errors.user_name.message }); // Display error in validation (username)
              } else if (err.errors.password) {
                  res.json({ success: false, message: err.errors.password.message }); // Display error in validation (password)
              } else {
                  res.json({ success: false, message: err }); // Display any other errors with validation
              }
          } else if (err) {
              // Check if duplication error exists
              if (err.code === 11000) {
                res.json({ success: false, message: 'That username and e-mail is already taken' }); // Display error if username already taken     
              } else {
                res.json({ success: false, message: err }); // Display any other error
              }
          }
        }else{

          var email = {
            from: 'Localhost Staff, staff@localhost.com',
            to: model.email,
            subject: 'Activation Link',
            text: 'Hello' + model.name + 'Thank you for registering at localhost.com. Please click on the link below to complete your activation: http://localhost:8000/boxed/activate/'+ model.temporarytoken ,
            html: 'Hello<strong> ' + model.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8000/boxed/activate/' + model.temporarytoken + '">http://localhost:8000/boxed/activate/</a>'
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
           res.json({ success: true, message:'Account registered Please check your email for activation link '});   
        }
      });
    }
};*/



exports.sendEmail = function(req, res){
  Model.findOne({temporarytoken: req.params.token}, function(err, user){

    if(err) throw err;
    var token = req.params.token;
    jwt.verify(token, secret , function(err, decoded) {
            if(err){
              res.json({success: false, message: "activation link has expired"});
            }else if(!user){
              res.json({success: false, message: "activation link has expired"});
            }else{
              user.temporarytoken = false;
              user.activate = true;
              user.save(function(err){
                if(err){
                  console.log(err);
                }else{
                  var email = {
                    from: 'Localhost Staff, staff@localhost.com',
                    to: user.email,
                    subject: 'localhost Account activated',
                    text: 'Hello' + user.name + ',Your account hase be Activated.',
                    html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account hase be Activated.'
                  };
                  client.sendMail(email, function(err, info){
                    if (err ){
                      console.log(error);
                    }
                    else {
                      console.log('Message sent: ' + info.response);
                    }
                  });
                  res.json({success: true, message: "Account Activated "});
                }
              });  
            } 
        });
  });
};

// Route to send reset link to the user
exports.sendResetEmail = function(req, res){
  Model.findOne({ email: req.body.email }).select('email resettoken user_name name').exec(function(err, user) {
            if (err) {
                // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                var email = {
                    from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                    to: 'saurabh.sixthsense@gmail.com',
                    subject: 'Error Logged',
                    text: 'The following error has been reported in the MEAN Stack Application: ' + err,
                    html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
                };
                // Function to send e-mail to myself
                client.sendMail(email, function(err, info) {
                    if (err) {
                        console.log(err); // If error with sending e-mail, log to console/terminal
                    } else {
                        console.log(info); // Log success message to console if sent
                        console.log(user.email); // Display e-mail that it was sent to
                    }
                });
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Username was not found' }); // Return error if username is not found in database
                }else {
                    user.resettoken = jwt.sign({name: user.name, email: user.email}, secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail
                    // Save token to user in database
                    user.save(function(err) {
                        if (err) {
                            res.json({ success: false, message: err }); // Return error if cannot connect
                        } else {
                            // Create e-mail object to send to user
                           // console.log(user.resettoken);
                            var email = {
                                from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                                to: user.email,
                                subject: 'Reset Password Request',
                                text: 'Hello ' + user.name +', You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8080/boxed/reset/' + user.resettoken,
                                html: 'Hello<strong> ' + user.name +'</strong>,<br><br>You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:8080/boxed/reset/' + user.resettoken + '">http://localhost:8080/boxed/reset/</a>'
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
                            res.json({ success: true, message: 'Please check your e-mail for password reset link' }); // Return success message
                        }
                    });
                }
            }
        });
}

// Route to send reset link to the user
exports.resetPassword = function(req, res){
  var id = req.params.resettoken;
  Model.findOne({ resettoken: id }).select('email resettoken name').exec(function(err, user) {
            if (err) {
                // Function to send e-mail to myself
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            }else{
                if (!user) {
                    res.json({ success: false, message: 'Email was not found' }); // Return error if username is not found in database
                }else {
                    user.password = req.body.password
                    // Save password to user in database
                    user.save(function(err) {
                        if (err) {
                            res.json({ success: false, message: err }); // Return error if cannot connect
                        } else {
                            //console.log(user.password);
                            var email = {
                                from: 'MEAN Stack Staff, cruiserweights@zoho.com',
                                to: user.email,
                                subject: 'Reset Password Confirmation',
                                text: 'Hello ' + user.name +',Your Password successfully Reset',
                                html: 'Hello<strong> ' + user.name +'</strong>,<br><br>Your Password successfully Reset'
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
                            res.json({ success: true, message: 'Your Password successfully Reset' }); // Return success message
                        }
                    });
                }
            }
        });
}
 

//show the current User
exports.read = function(request, response){
	var id = request.params.id;
      console.log(id);
        Model.findOne({_id: id}, function(err, users){
        if(err){
        console.log("data not found")
        }
        else{
        response.status(200).send(users);
        }   
    });
};

/**
* View for Update the User
*/
exports.view = function(request, response){
	var id = request.params.id;
  Model.findOne({_id: id}, function(err, users){
    if(err){
      response.send({success: false, message: "User not found"});
    }else{
      response.send({success: true, data: users});
    }   
  });
};

/**
* Update the User
*/

exports.update = function(request, response){
    var id = request.params.id;
    console.log(id);
    console.log(request.body.name);

    Model.findById(id, function(err, users){
        if(err){
          response.status(404).send(err);
        }
         else{
          users.update( request.body ,function(err, success){
            if(err){
              response.send({success: false, message:"somthing went wrong!, please try later"})
            }
            else{
              response.send({success: true, message:"Update successfull"})
            }
          });
        }
    })
};

/**
* Delete an User 
*/

exports.delete = function(request, response){
	var id = request.params.id;
      console.log(id);
      Model.remove({_id: id}, function(err, res){
        if(err){
          response.status(500).send(err);
        }
        else{
          response.status(201).send({message: 'success on deleting user'});
        }
      });

};

 //List of User

exports.list = function(req, res ){
  Model.find({}, function(err, users){
    if(err){
      res.send({success: false, message: "User not found"});
    }
    else{
      res.send({success: true, data: users});
    }
  });
};

exports.partnerslist = function(req, res ){

    Model.find({permission: "Partner"}, function(err, users){
      if(err){
        console.log("data not found")
      }
      else{
        /*res.status(200).send(users);*/
        res.json({ success: true, data: users});
      }
    });
  
};
