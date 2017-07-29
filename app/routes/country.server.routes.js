'use strict';

var express = require('express');
var countries = require('../../app/controller/country.server.controller.js');
   var Countries = express.Router();

   Countries.post('/newCountry', countries.countryCreate);
   Countries.delete('/newCountry/:id', countries.countryRemove);
   Countries.get('/countriesview', countries.countriesList);
   Countries.get('/countryDetail/:conid', countries.countryDetail);
   
module.exports = Countries;