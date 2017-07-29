'use strict';

var Country = require('../../app/models/country.server.model');
var mongoose = require('mongoose');

/**
* List of countries
*/
exports.countriesList = function(req, res){
  Country.find({},function(err,countries){
    if(err){
      res.json({ success: false, message:'Country not found'});
    }else{
      res.json({success: true, data: countries});
    }
  });
};

/** 
* Create a countries
*/
exports.countryCreate = function(req, res){
	var countryDetail = new Country();
	countryDetail.country =req.body.country;
	countryDetail.save(function(err, country){
		if(err){
			res.status(500).send(err);
		}else
		{
			res.status(201).send(country);
		}
	}); 
};
/** 
* Delete a countries
*/

exports.countryRemove = function(request, response){
    var id = request.params.id;
    console.log(id);
    Country.remove({_id: id}, function(err,res){
   	    if(err){
   		    response.status(500).send(err);
   	    }
   	    else{
   		response.status(201).send({message:"success on deleting country"});
   	    }
    });
};

// Country Detail
exports.countryDetail = function(request, response){
  var id = request.params.conid;
  Country.findOne({_id: id}, function(err, country){
    if(err){
      response.json({ success: false, message:'Country not found'});
    }
    else{  
      response.json({success: true, data: country});
    }   
  });
};



