'use strict'

// Module dependencies.

var Tax = require('../../app/models/tax.server.model');
var mongoose = require('mongoose');

// Create a Vehicle
exports.createTax = function(request,response){
    
  console.log(request.body);
  var taxDetail = new Tax();
  taxDetail.tax_name = request.body.tax_name;
  taxDetail.tax_percent = request.body.tax_percent;
  taxDetail.tax_status = request.body.tax_status;
  taxDetail.save(function(err,tax){
      if(err){
         response.json({ success: false, message:'Something wrong, Please try again later!'});    
      }else{
        	response.json({ success: true, data: tax,  message:'Tax save successfully'});
      }
  });
};
   
// List of Tax
exports.taxList = function (request, response) {
    Tax.find({}, function(err, tax){
        if(err){
            response.json({ success: false, message:'Something wrong, Please try again later!'});
        }else{
            response.json({ success: true, data: tax,  message:'success'});
        }
    });
};

// show the Tax
exports.taxDetail = function(request, response){
	var id = request.params.id;
    console.log(id);
    Tax.findOne({ _id: id}, function(err, tax){
        if(err){
            response.json({ success: false, message:'Something wrong, Please try again later!'});
        }
        else{
            response.json({ success: true, data: tax,  message:'success'});
        }   
    });
};

// Update the User
exports.updateTax = function(request, response){
  var id = request.params.id;
  console.log(id);
  console.log(request.body.name);
  Tax.findById(id, function(err, Tax){
    if(err){
      response.json({ success: false, data: err,  message:'Something wrong, Please try again later!'});
    }
    else{
      Tax.update(request.body ,function(err, success){
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

// Delete an Tax

exports.deleteTax = function(request, response){
	var id = request.params.id;
    console.log(id);
    Tax.remove({_id: id}, function(err, res){
        if(err){
          response.json({ success: false, message:'Something wrong, Please try again later!'});
        }
        else{
        	response.json({ success: true, message:'success on deleting tax'});
        }
    });
};