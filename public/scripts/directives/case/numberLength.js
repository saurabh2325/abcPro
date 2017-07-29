/*'use strict';
angular.module('dashyAngular')
    .directive('numberLength', function() {
    	return{
    		require: 'ngModel',
    		link: function(scope, elem, attrs, ctrl){
    		    var numberLength =	function(inputValue){
    		    	if(inputValue.maxLength > 10 ){
    		    		$log.info("invalid Number!");
    		    	}
    		    	ctrl.$setViewValue(inputValue);
                    ctrl.$render();

    		    	return inputValue;
    		    }
    		  ctrl.$parsers.push(numberLength);
   	  		  numberLength(scope[attrs.ngModel]);
    		}
    	}
    });*/