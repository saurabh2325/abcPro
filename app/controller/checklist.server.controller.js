'use strict'

// Module dependencies.

var Checklist = require('../../app/models/checklist.server.model');
var mongoose = require('mongoose');

// Create a Vehicle
exports.createChecklist = function(request,response){
      
    console.log(request.body);
    var checklistDetail = new Checklist();
    checklistDetail.checklist_item = request.body.checklist_item;
    checklistDetail.checklist_status = request.body.checklist_status;
    checklistDetail.save(function(err,checklist){
        if(err){
         	response.json({ success: false, message:'Something wrong, Please try again later!'});    
        }else{
        	response.json({ success: true, data: checklist,  message:'Checklist save successfully'});
        }
    });
};
   
// List of Checklist

exports.checklistList = function (request, response) {
    Checklist.find({}, function(err, checklist){
        if(err){
            response.json({ success: false, message:'Something wrong, Please try again later!'});
        }else{
            response.json({ success: true, data: checklist,  message:'success'});
        }
    });
};

// show the Vehicle
exports.checklistDetail = function(request, response){
	var id = request.params.id;
    console.log(id);
    Checklist.findOne({ _id: id}, function(err, checklist){
        if(err){
            response.json({ success: false, message:'Something wrong, Please try again later!'});
        }
        else{
            response.json({ success: true, data: checklist,  message:'success'});
        }   
    });
};

// Update the User
exports.updateChecklist = function(request, response){
  var id = request.params.id;
  console.log(id);
  console.log(request.body.name);
  Checklist.findById(id, function(err, Checklist){
    if(err){
      response.json({ success: false, data: err,  message:'Something wrong, Please try again later!'});
    }
    else{
      Checklist.update(request.body ,function(err, success){
        if(err){
          response.json({ success: false, data: err,  message:'Something wrong, Please try again later!'});
        }
        else{
          response.json({ success: true, message:'success'});
        }
      });
    }
  })
};

// Delete an Checklist

exports.deleteChecklist = function(request, response){
	var id = request.params.id;
    console.log(id);
    Checklist.remove({_id: id}, function(err, res){
        if(err){
          response.json({ success: false, message:'Something wrong, Please try again later!'});
        }
        else{
        	response.json({ success: true, message:'success on deleting checklist'});
        }
    });
};