'use strict';

var express = require('express');
var auth = require('../../app/controller/login.server.controller');
var Auth = express.Router();

    Auth.post('/authentication', auth.login);
    Auth.post('/resend', auth.resendLink);
    Auth.put('/resend', auth.putresendLink);
    Auth.post('/me', auth.getMeToken); 
    Auth.get('/permission', auth.getPermission);
   /* Auth.post('/checkUsername', auth.checkUserName);
    Auth.post('/checkEmail', auth.checkEmail);*/
  
        
  module.exports = Auth;

  