'use strict';

var express = require('express');
var taxes = require('../../app/controller/tax.server.controller.js');
var Taxes = express.Router();

    Taxes.post('/newTax', taxes.createTax);
    Taxes.get('/taxList', taxes.taxList);
    Taxes.delete('/deleteTax/:id', taxes.deleteTax);
    Taxes.get('/taxDetail/:id', taxes.taxDetail);
    Taxes.put('/editTax/:id', taxes.updateTax);

module.exports = Taxes;