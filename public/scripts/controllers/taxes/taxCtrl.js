'use strict';
angular.module('dashyAngular')
.filter('startFrom', function() {
    return function(input, start) {
        if(input.length){
         start = +start; //parse to int
         return input.slice(start);
        }   
    }
})
.controller('taxCtrl', function($scope, $location,  $http, $stateParams, User, $filter){

    $scope.templateUrl = 'views/pages/dashboard/taxes/taxesList.html?v='+window.app_version

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.searchText = '';
    $scope.taxData={}
    var taxList = function(){
   	    $http.get('/taxList').success(function(response){
            if(response.success){
                $scope.taxData = response.data;
            }else{
                $scope.errorMsg = response.data;
            }
        });
    }
    taxList();

    // pagination
    $scope.getData = function () {
        // needed for the pagination calc
        // https://docs.angularjs.org/api/ng/filter/filter
        return $filter('filter')($scope.taxData, $scope.searchText)
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.removeTax = function(id){
        if(id){
            $http.delete('/deleteTax/' + id).success(function(response){
              taxList();
              alert("Tax remove successfully ");
            });
        }else{
        	alert("Tax not found ");
        };
    };

    $scope.editTax = function(id){
        $location.path('/dashboard/tax/info/' + id + '/edit');
    };
})
.controller('taxCreateCtrl', function($scope, $location, $http, $stateParams){
    $scope.taxData={ tax_status: "Active"}

    $scope.addTax = function(valid, taxForm){
        if(valid){
            $http.post('/newTax', $scope.taxData).success(function(response){
                if(response.success){
                    $scope.successMsg = response.message;
                    $scope.taxData = {tax_status: "Active"};
                    $setPristine(); 
                }else{
                    $scope.errorMsg = response.message;
                }    
            });
        }else{
            $scope.errorMsg = "Ensure tax name and tax percent";    
        }
    };

    $scope.cancel = function(){
      $location.path("/dashboard/tax");  
    }
})
.controller('URDTaxCtrl', function($scope, $location,  $http, $stateParams){

    //GET Tax
    $scope.taxData = {};
    var getTaxData = function(valid){
        
        $http.get('/taxDetail/' + $stateParams.id).success(function(response){
            if(response.success){
                $scope.taxData = response.data;
            }else{
                $scope.errorMsg = response.message;
            }
        });  
    };
    getTaxData();

    //UPDATE TAX IMAGE
    $scope.updateTax = function(id, valid){
        if(valid){
            $http.put('/editTax/' + id, $scope.taxData).success(function(response){
                if(response.success){
                    $scope.successMsg = response.data;
                    $location.path('/dashboard/tax');
                }else{
                    $scope.errorMsg = response.message;
                }
            });
        }else{
            $scope.errorMsg = "Ensure tax name and tax percent"; 
        }
    };

    $scope.cancel = function(){
      $location.path("/dashboard/tax");  
    }
})