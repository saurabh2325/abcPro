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
.controller('checklistCtrl', function($scope, $location,  $http, $stateParams, User, $filter){

    $scope.templateUrl = 'views/pages/dashboard/checklist/checklistList.html?v='+window.app_version
   
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.searchText = '';
    $scope.checklists={}

    var checklistList = function(){
   	    $http.get('/checklistList').success(function(response){
            if(response.success){
                 $scope.checklists = response.data;
            }else{
                $scope.errorMsg = response.data;
            }
        });
    }
    checklistList();

    // pagination
    $scope.getData = function () {
        // needed for the pagination calc
        // https://docs.angularjs.org/api/ng/filter/filter
        return $filter('filter')($scope.checklists, $scope.searchText)
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    $scope.removeChecklist = function(id){
        if(id){
            $http.delete('/deleteChecklist/' + id).success(function(response){
              checklistList();
              alert("checklist remove successfully ");
            });
        }else{
        	alert("Checklist not found ");
        };
    };

    $scope.editChecklist = function(id){
        $location.path('/dashboard/checklist/info/' + id + '/edit');
    };
})
.controller('checklistCreateCtrl', function($scope, $location, $http, $stateParams){
	$scope.checklist = {
        checklist_status: "Active"
    }

	$scope.addChecklist = function(valid, chkForm){
        if(valid){
            $http.post('/newChecklist', $scope.checklist).success(function(response){
                if(response.success){
                    $scope.successMsg = response.message;
                    $scope.checklist = {};
                    chkForm.$setPristine();
                }else{
                    $scope.errorMsg = response.message;
                }
            });    
        }else{
            $scope.successMsg = "Ensure Checklist Name and status"; 
        }
    };

    $scope.cancel = function(){
        $location.path('/dashboard/checklist');   
    }
})
.controller('URDChecklistCtrl', function($scope, $location,  $http, $stateParams){

    //GET CHEAKLIST
    $scope.checklist = {};
    var getChecklistData = function(){
        $http.get('/checklistDetail/' + $stateParams.id).success(function(response){
            if(response.success){
                $scope.checklist = response.data;
            }else{
                $scope.errorMsg = response.data;
            }
        });    
    };
    getChecklistData();

    //UPDATE CHEAKLIST IMAGE
    $scope.updateChecklist = function(id, valid){
        if(valid){
            $http.put('/editChecklist/' + id, $scope.checklist).success(function(response){
                if(response.success){
                    $scope.successMsg = response.message;
                    $location.path('/dashboard/checklist');  
                }else{
                    $scope.errorMsg = response.message; 
                }  
            });
        }else{
            $scope.errorMsg = "Ensure Checklist Name and status";
        }    
    };

    $scope.cancel = function(){
        $location.path('/dashboard/checklist');   
    }
})