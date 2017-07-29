'use strict';

angular.module('dashyAngular')
    .directive('capitalize',function(){
        return{
            require:'ngModel',
            link:function(scope, elm, attrs, ctrl){
                var capitalize = function(inputValue){
                    if(inputValue == undefined) 
                        inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if(capitalized !== inputValue){
                    ctrl.$setViewValue(capitalized);
                    ctrl.$render();
                    }
                    return capitalized
                }
                ctrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]);
            }
        };
    });