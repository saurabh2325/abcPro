'use strict';

var express = require('express');
var checklists = require('../../app/controller/checklist.server.controller.js');
var Checklists = express.Router();

    Checklists.post('/newChecklist', checklists.createChecklist);
    Checklists.get('/checklistList', checklists.checklistList);
    Checklists.delete('/deleteChecklist/:id', checklists.deleteChecklist);
    Checklists.get('/checklistDetail/:id', checklists.checklistDetail);
    Checklists.put('/editChecklist/:id', checklists.updateChecklist);
    /*Vehicles.get('/getOrderData/:uid', vehicles.partnerVehiclesList);
    Vehicles.get('/consumervehiclesList/:uid', vehicles.consumerVehiclesList);
    Vehicles.get('/vehicleDetail/:id', vehicles.vehicleDetail);
    Vehicles.get('/vehicleNumberDetail/:id', vehicles.vehicleNumberDetail); //This code use for view data in edit vehicle from Database
    Vehicles.put('/editVehicle/:id', vehicles.updateVehicle); //This code use for update data from edit vehicle page on Database
    Vehicles.delete('/deleteVehicle/:id', vehicles.deleteVehicle); //This code use for read data in vehicle view from Database 
    Vehicles.get('/vehicleOrderhistory/:id', vehicles.vehicleHistory);*/

module.exports = Checklists;