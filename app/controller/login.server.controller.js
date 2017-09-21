'use strict'

/**
* Module dependencies.
*/

 var Login = require('../../app/models/user.server.model');
 var mongoose = require('mongoose');
 var jwt = require('jsonwebtoken');
 var secret = "harryporter";
 var nodemailer = require('nodemailer');
 var sgTransport = require('nodemailer-sendgrid-transport');

 var options = {
  auth: {
    api_user: '****',
    api_key: '*****'
  }
}

var client = nodemailer.createTransport(sgTransport(options));
 
 // CHECK USER NAME
/*exports.checkUserName = function(req, res){
    
	Login.findOne({user_name : req.body.user_name}).select('user_name').exec(function(err, user){
		if(err) throw err;
		 if(user){
		 	res.json({success: false, message: 'This user Name already taken'});
		 }else{
		 	res.json({success: true, message: 'Valid User Name'});
		 }
	});
};
// CHECK USER EMAIL
exports.checkEmail = function(req, res){
    
	Login.findOne({email : req.body.email}).select('email').exec(function(err, user){
		if(err) throw err;
		 if(user){
		 	res.json({success: false, message: 'This email already taken'});
		 }else{
		 	res.json({success: true, message: 'Valid email'});
		 }
	});
};*/
// USER LOGIN ROUTE
exports.login = function(req, res){
    
	Login.findOne({user_name : req.body.user_name}).select('email user_name password activate').exec(function(err, user){
		if(err) throw err;
		if(!user){
			res.json({success: false, message: 'Could not authenticate user'});
		}else if(user){
			if(req.body.password){
			   var validPassword = user.comparePassword(req.body.password);
			}else{
				res.json({success:false, message:'No password Provided'})
			}
		    if(!validPassword){
		  	    res.json({success: false, message: 'Could not authenticate password'});
		  	}else if(!user.activate){
		  	    res.json({success: false, message: 'Please activate your account', expired: true });
		    }else{
		         var token = jwt.sign({user_name: user.user_name, email: user.email}, secret, { expiresIn: '24h'});
		  	     res.json({success: true, message: 'user authenticated', token: token});
		  	    //res.json({success: true, message: 'user authenticated'});
		    }
		}
	});
};
exports.resendLink = function(req, res){
    
	Login.findOne({user_name : req.body.user_name}).select('user_name password activate').exec(function(err, user){
		if(err) throw err;
		if(!user){
			res.json({success: false, message: 'Could not authenticate user'});
		}else if(user){
			if(req.body.password){
			   var validPassword = user.comparePassword(req.body.password);
			}else{
				res.json({success:false, message:'No password Provided'})
			}
		    if(!validPassword){
		  	    res.json({success: false, message: 'Could not authenticate password'});
		  	}else if(user.activate){
		  	    res.json({success: false, message: 'Account is already active.'});
		    }else{
		  	     res.json({success: true, user: user});
		  	    //res.json({success: true, message: 'user authenticated'});
		    
		    }
		}
	});
};
exports.putresendLink = function(req, res){
	Login.findOne({user_name : req.body.user_name}).select('user_name name email temporarytoken').exec(function(err, user){
		if(err) throw err;
		user.temporarytoken = jwt.sign({user_name: user.user_name, email: user.email}, secret, { expiresIn: '24h'});
		user.save(function(err){
			if(err){
				console.log(err);
			}else{
				var email = { 
                    from: 'Localhost Staff, staff@localhost.com',
                    to: user.email,
                    subject: 'Activation Link Request',
                    text: 'Hello' + user.name + 'You recently requested a new account activation link. Please click on the following link to complete your activation: http://localhost:8000/boxed/activate/'+ user.temporarytoken ,
                    html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8000/boxed/activate/' + user.temporarytoken + '">http://localhost:8000/boxed/activate/</a>'
                };

                client.sendMail(email, function(err, info){
                    if (err ){
                      console.log(error);
                    }
                    else {
                      console.log('Message sent: ' + info.response);
                    }
                });
                res.json({ success: true, message: 'Activation link has been sent to ' + user.email + '!' }); // Return success message to controller
			}
		})
	});
}

exports.getMeToken =function(req, res){
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
     console.log(token);
	if(token){
		//veryfy token
        jwt.verify(token, secret , function(err, decoded) {
            if(err){
             res.json({sucess: false, message: "Token Invalid"});
            }else{
             req.decoded = decoded;

             res.send(req.decoded);
            } 
        })
    }else{
     	res.json({success: false, message: 'No token provieded'});
    }	
};

exports.getPermission =function(req, res){
    
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if(token){	//veryfy token
        jwt.verify(token, secret , function(err, decoded) {
            if(err){
             res.json({sucess: false, message: "Token Invalid"});
            }else{
                req.decoded = decoded;
                console.log("new token" + req.decoded.user_name);
                Login.findOne({user_name : req.decoded.user_name}, function(err, user){
	                if(err) throw err;
	                if(!user){
	   	                res.json({success:false, message: 'No User has found'});
	                }else{
	   	                res.json({success: false, data: user})
	                }	
	            })
            } 
        })
    }else{
     	res.json({success: false, message: 'No token provieded'});
    }
};
    
