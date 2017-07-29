'use strict';

var express = require('express');
/*var router = express.Router();*/
var users = require('../../app/controller/user.server.controller');
/*var countries = require('../../app/controller/country.server.controller.js');*/
var Users = express.Router();

  Users.get('/users',users.list);//This code use for Save data in Database
  Users.get('/partners',users.partnerslist); 
  Users.put('/activate/:token',users.sendEmail);                          
  Users.post('/newUser', users.create);
  Users.delete('/users/:id', users.delete); //This code use for read data in user view from Database 
  Users.get('/UserView/:id', users.read); //This code use for view data in edit user from Database
  Users.get('/viewUser/:id', users.view);
  Users.put('/editUser/:id', users.update); //This code use for update data from edit user page on Database
  Users.post('/newUserSignup/:newuser',users.createNew);
  Users.put('/sendResetLink', users.sendResetEmail);
  Users.put('/resetPassword/:resettoken', users.resetPassword);
  
       
  module.exports = Users;
