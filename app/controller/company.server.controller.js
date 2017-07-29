
    'use strict';
	/**
     * Module dependencies.
    */

	var express = require('express');
	var Company = require('../../app/models/company.server.model');
	
    /** 
    * List of Company
    */

     exports.companyList = function(req, res){
        Company.find({}, function(err,companies){
            if(err){
                res.status(201).send(err);
            }else{
                res.status(201).send(companies);
                console.log(companies);
            }
        });
     };

    /***End***/

	/** 
    * Create a Company
    */

    exports.createCompany = function( request, response){
    	
    	var companyDetail = new Company();
        companyDetail.companyName = request.body.companyName;
        companyDetail.street = request.body.street;
        companyDetail.landMark = request.body.landMark;
        companyDetail.country = request.body.country;
        companyDetail.state = request.body.state;
        companyDetail.city= request.body.city;
        companyDetail.postalCode = request.body.postalCode;
        companyDetail.contactNo = request.body.contactNo;
        companyDetail.mobileNo = request.body.mobileNo;
        companyDetail.faxNo = request.body.faxNo;
        companyDetail.email = request.body.email;
        companyDetail.panNo = request.body.panNo;
        companyDetail.tinNo = request.body.tinNo;
        companyDetail.cstNo = request.body.cstNo;
        companyDetail.currency= request.body.currency;
        companyDetail.save(function(err, company){
        	if(err){
        		response.status(200).send(err);
        	}else{
        		response.status(201).send(company);
        		console.log(company);
        	}
        });

    };

    /***End***/ 

    /** 
    * Delete a Company
    */

    exports.removeCompany = function(request, response){

    	var id = request.params.id;
        console.log(id);
        Company.remove({_id : id}, function(err, res){
        if(err){
            response.status(200).send(err)
        }else{
            response.status(201).send({message:"Company remove successfully"});
        }
    });

    };

    /***End***/ 
    /** 

    * Update a Company
    */

    /*exports.UpdateCompany = function(request, response){

    	//code....
        
    };*/

    /***End***/ 


