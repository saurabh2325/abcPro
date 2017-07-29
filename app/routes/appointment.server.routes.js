'use strict';

var express = require('express');
var appointments = require('../../app/controller/appointment.server.controller.js');
var Appointments = express.Router();
    Appointments.post('/newAppointment', appointments.createAppointment);
    Appointments.get('/appointmentList', appointments.appointmentList);
    Appointments.get('/partnerAppointmentList/:uid', appointments.partnerAppointmentsList);
    Appointments.get('/consumerAppointmentList/:uid', appointments.consumerAppointmentsList);
    Appointments.get('/appointmentView/:id', appointments.appointmentView); //This code use for view data in edit vehicle from Database
    Appointments.put('/editAppointment/:id', appointments.updateAppointment); //This code use for update data from edit vehicle page on Database
    Appointments.delete('/deleteAppointment/:id', appointments.deleteAppointment); //This code use for read data in vehicle view from Database 
    Appointments.get('/workshopList/:id', appointments.workshopListById);
    /*Appointments.get('/workshopList', appointments.workshopList);*/
     


module.exports = Appointments;