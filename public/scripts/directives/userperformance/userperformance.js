'use strict';

angular.module('dashyAngular')
  .directive('userPerformance',function(){
    return {
        templateUrl:'scripts/directives/userperformance/userperformance.html?v='+window.app_version,
        restrict: 'E',
        replace: true,
        scope: {
          'icon': '@',
          'value': '@',
          'text': '@',
          'bgclass': '@'
        }
      }
  });
