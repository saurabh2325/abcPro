'use strict';
   
   var express = require('express');
   var companies = require('../../app/controller/company.server.controller');
   var Companies = express.Router();

    Companies.get('/companyView', companies.companyList);
    Companies.post('/newCompany', companies.createCompany);
    Companies.delete('/companyView/:id', companies.removeCompany);




   module.exports = Companies;