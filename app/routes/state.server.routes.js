'use strict';

var express = require('express'),
    states = require('../../app/controller/state.server.controller.js'),
    States = express.Router();

    States.post('/newState', states.createState);
    States.delete('/newState/:id', states.removeState);
    States.get('/statesview', states.stateList);
    States.get('/stateDetail/:sid', states.stateDetail);


module.exports = States;


