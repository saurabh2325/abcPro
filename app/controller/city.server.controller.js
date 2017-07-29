
'use strict';
 
/**
* Module dependencies.
*/

 var City = require('../../app/models/city.server.model');
 var mongoose = require('mongoose');

//List of city

exports.cityList = function (request, response) {
  City.find({}, function(err, cities){ 
    if(err){
      response.json({ success: false, message:'City not found'});
    }else{
      response.json({success: true, data: cities});
    }    
  });
};

/** 
* Create city
*/

exports.createCity = function(request,response){
      var cityDetail = new City();
      cityDetail.countryId = request.body.country;;
      cityDetail.stateId = request.body.state;
      cityDetail.cityName = request.body.cityName;
      cityDetail.save(function(err,cities){
         if(err)
         {
           response.status(200).send(err);
         }else
         {
           response.status(201).send(cities);
         }
      });
};

/** 
* Delete a city
*/

exports.removeCity = function(request, response){
  var id = request.params.id;
  console.log(id);
  City.remove({_id : id}, function(err, res){
    if(err){
      response.status(500).send(err);
    }
    else{
      response.status(201).send({message:"success on deleting state"});
    }
  });
};

// City Detail
exports.cityDetail = function(request, response){
  var id = request.params.id;
  City.findOne({_id: id}, function(err, city){
    if(err){
      response.json({ success: false, message:'city not found'});
    }
    else{  
      response.json({success: true, data: city});
    }   
  });
};
/** 
* Update a city
*/

exports.updateCity = function(request, response){

};
