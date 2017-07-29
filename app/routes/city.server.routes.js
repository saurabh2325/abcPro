'use strict';

var express = require('express');
var cities = require('../../app/controller/city.server.controller.js');
var Cities = express.Router(); 
    
    Cities.post('/newCity', cities.createCity);
    Cities.get('/cityView', cities.cityList);
    Cities.delete('/newCity/:id', cities.removeCity);
    Cities.get('/cityDetail/:id', cities.cityDetail);


module.exports = Cities;