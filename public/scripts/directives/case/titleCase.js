'use strict';

angular.module('dashyAngular')
    .directive('camelcase',function(){
        return{
            require:'ngModel',
            link:function(scope, elm, attrs, ctrl){
                var camelcase = function(inputValue){
                    if(inputValue == undefined) 
                        inputValue = inputValue || '';
                    var camelcased = inputValue.replace(/\w\S*/g, function(match, index, title){
                        if(index > 0 && index + match.length !== title.length && title.charAt(index -2 ) !== ":"
                        && (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') 
                        && title.charAt(index-1).search(/[^/s]/) < 0  ){
                        return match.toLowerCase();
                        }

                        if(match.substr(1).search(/[A-Z]|\../) > -1){
                        return match;
                        }

                        return match.charAt(0).toUpperCase() + match.substr(1);

                    });
                    if(camelcased !== inputValue){
                        ctrl.$setViewValue(camelcased);
                        ctrl.$render();
                    }
                    return camelcased;
                }
                ctrl.$parsers.push(camelcase);
                camelcase(scope[attrs.ngModel]);
            }
        };
});
	