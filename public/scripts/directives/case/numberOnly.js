'use strict'
angular.module('dashyAngular')
   .directive('numberOnly', function(){
   	  return{
   	  	require: 'ngModel',
   	  	link: function(scope, elem, attrs, ctrl){
   	  		    var numberOnly  = function (inputValue) {
   	  			    if (inputValue == undefined) return '' 
   	  			    var transformedInput = inputValue.replace(/[^0-9]/g, '');
   	  			    if (transformedInput!=inputValue) {
                    ctrl.$setViewValue(transformedInput);
                    ctrl.$render();
                }
                  return transformedInput;
   	  		    }
   	  		  ctrl.$parsers.push(numberOnly);
   	  		  numberOnly(scope[attrs.ngModel]);
   	  	    }
   	    };
    });
