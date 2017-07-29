'use strict';
/**
 * @ngdoc directive
 * @name DashdashyAngular.directive:pageHeader1
 * @description
 * # pageHeader
 */
 angular.module('dashyAngular')
  .directive('pageheader1', function() {
  	return{
  		templateUrl:'scripts/directives/pageheader1/pageheader1.html?v='+window.app_version,
  		restrict: 'E',
  		replace:true,
  		scope:{
  			'pagename': '@',
  			'subtitle': '@',
  			'btnname': '@',
  			'btn2name': '@',
        'gridview':'@',
        'listview': '@'

  		}
  	}
  });