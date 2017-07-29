'use strict';

var express = require('express');
var vehicles = require('../../app/controller/vehicle.server.controller.js');
var Vehicles = express.Router();
    Vehicles.post('/newVehicle', vehicles.createVehicle);
    Vehicles.get('/vehiclesList', vehicles.vehicleList);
    Vehicles.get('/getOrderData/:uid', vehicles.partnerVehiclesList);
    Vehicles.get('/consumervehiclesList/:uid', vehicles.consumerVehiclesList);
    Vehicles.get('/vehicleDetail/:id', vehicles.vehicleDetail);
    Vehicles.get('/vehicleNumberDetail/:id', vehicles.vehicleNumberDetail); //This code use for view data in edit vehicle from Database
    Vehicles.put('/editVehicle/:id', vehicles.updateVehicle); //This code use for update data from edit vehicle page on Database
    Vehicles.delete('/deleteVehicle/:id', vehicles.deleteVehicle); //This code use for read data in vehicle view from Database 
    Vehicles.get('/vehicleOrderhistory/:id', vehicles.vehicleHistory);

module.exports = Vehicles;