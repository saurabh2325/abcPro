'use strict';

var express = require('express');
var orders = require('../../app/controller/order.server.controller.js');
var Orders = express.Router();
     Orders.post('/newOrder', orders.createOrder);
     Orders.get('/ordersList', orders.ordersList);
     Orders.get('/partnerOrdersList/:uid', orders.partnerOrdersList);
     Orders.get('/consumerOrdersList/:uid', orders.consumerOrdersList);
     Orders.get('/orderDetail/:id', orders.orderDetail);
     Orders.put('/editOrders/:id', orders.editOrders);
     Orders.get('/partnerOrdersList', orders.partnerOrdersList);


module.exports = Orders;