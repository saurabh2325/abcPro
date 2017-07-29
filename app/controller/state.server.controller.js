
'use strict';
 
/**
* Module dependencies.
*/

 var State = require('../../app/models/state.server.model');
 var mongoose = require('mongoose');

/** 
* List of state
*/

exports.stateList = function (request, response) {
	State.find({}, function(err,states){
    if(err){
      response.json({ success: false, message:'State not found'});
    }else{
      response.json({success: true, data: states});
    }
	});
};
/** 
* Create state
*/

exports.createState = function(request, response){
    var stateDetail = new State();
    stateDetail.stateName = request.body.stateName;
    stateDetail.countryId=request.body.country;
    stateDetail.save(function(err, states){
    	if(err){
    		response.status(200).send(err);
    	}else
    	{
           response.status(201).send(states);
           console.log(states);
    	}
    });
};

/** 
* Delete a state
*/

exports.removeState = function(request, response){
    var id = request.params.id;
    console.log(id);
    State.remove({_id : id}, function(err, res){
      	if(err){
   		    response.status(500).send(err);
   	    }
   	    else{
   		response.status(201).send({message:"success on deleting state"});
   	    }
    });
};

// State Detail
exports.stateDetail = function(request, response){
  var id = request.params.sid;
  State.findOne({_id: id}, function(err, state){
    if(err){
      response.json({ success: false, message:'State not found'});
    }
    else{  
      response.json({success: true, data: state});
    }   
  });
};

/** 
*  Update a state
*/

/*exports.updateState = function(request, response){

};*/
