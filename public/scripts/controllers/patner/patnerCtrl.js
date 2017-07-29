'use strict';
angular.module('dashyAngular')
.directive('fileModel', ['$parse', function ($parse) {
  return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        }
}])
.filter('startFrom', function() {
  return function(input, start) {
    if(input.length){
     start = +start; //parse to int
     return input.slice(start);
    }   
  }
})
.controller('createPatnerCtrl', function ($scope, $modal, $log, $http, $stateParams, $location, User) {
	$scope.items = ['item1', 'item2', 'item3'];
	
    //get country name
    $scope.countries = {}
    var countriesView = function(){
        $http.get('/countriesview').success(function(response){
            if(response.success){
               $scope.countries = response.data; 
            }
        });
    }; 
    countriesView();
    $scope.openCountry = function (size) {
        var CountKey = $scope.users.country;
        if(CountKey === 'cok'){ 
            $modal.open({
                templateUrl: 'views/particles/country/country_master.html',
                controller: 'countryCtrl',
                size: size,
                resolve:{
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
    };

    //get state name 
    $scope.state = {};
    var stateview = function(){
        $http.get('/statesview').success(function(response){
            if(response.success){
                $scope.state = response.data; 
            }
        });
    };
    stateview();
    $scope.openState = function (size){
        var StateKey = $scope.users.state;
        if(StateKey === 'sk'){ 
            $modal.open({
                templateUrl: 'views/particles/state/state_master.html',
                controller: 'stateCtrl',
                size: size,
                resolve:{
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
    };
    
    //Get city name 
    $scope.city = {}
    var cityView = function(){
        $http.get('/cityView').success(function(response){
            if(response.success){
                $scope.city = response.data; 
            }
        });
    };
    cityView();
    $scope.openCity = function (size) {
        var CityKey = $scope.users.city;
        if(CityKey === 'ck'){
            $modal.open({
                templateUrl: 'views/particles/city/city_master.html',
                controller: 'cityCtrl',
                size: size,
                resolve:{
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
    };

	// Upload Image in Images Folder
	$scope.users = {};
	$scope.uploadImage = function(){
        var file = $scope.myFile;
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/uploadFile', fd, { transFormRequest: angular.identity, headers: {'Content-Type': undefined} 
            }).success(function(response){ 
            	$scope.users.user_img = response.filename;
            }).error(function(){
        });
    };

    // Create new Patner 
    $scope.users.user_img = "userDefault.png";
    $scope.users.permission = "Partner" ;

    $scope.createPatner = function(valid, regForm){
    	$scope.errorMsg = false;
        $scope.successMsg= false;
        if(valid){
        	User.create($scope.users).success(function(response){
                if(response.success){
                    //console.log(response.message);
                    $scope.successMsg = response.message;
                    $scope.users = {};
                    regForm.$setPristine();
                    $scope.users.user_img = "userDefault.png";
                }else{
                    $scope.errorMsg = response.message;
                } 
        	})
        }else{
            $scope.errorMsg= "Please ensure from is filled our properly";
        }
    };
    
    $scope.cancel = function(){
      $location.path('/dashboard/partner/info');  
    }
})
.controller('viewPatnerCtrl', function ($scope, $http, $location, $filter){

    $scope.templateUrl = 'views/pages/dashboard/user/usergrid.html?v='+window.app_version
         
    $scope.showgrid = function(){
        $scope.templateUrl = 'views/pages/dashboard/user/usergrid.html?v='+window.app_version
    };
    
    $scope.showlist = function(){
        $scope.templateUrl = 'views/pages/dashboard/user/userlist.html?v='+window.app_version
    };
    
    // View or List of Patner
    $scope.currentPage = 0;
    $scope.pageSize = 9;
    $scope.searchText = ''; 
    $scope.users= {};
    var getUser = function() {
        $http.get('/partners').success(function(response){
            if(response.success){
                $scope.users = response.data;
                console.log($scope.users)   
            }else{
                $scope.errorMsg = response.data;
            }
        });
    };
    getUser();

    // pagination
    $scope.getData = function () {
        // needed for the pagination calc
        // https://docs.angularjs.org/api/ng/filter/filter
        return $filter('filter')($scope.users, $scope.searchText)
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    // Redirect User Detail Page 
    $scope.viewUser = function(id){
        $location.path('/dashboard/partner/info/' + id);
    };

    //REMOVE USER FROM USER LIST
    $scope.removeUser = function(id){
        if(id){
            $http.delete('/users/' + id).success(function(response){
                getUser();
            });  
        }
    };
})
.controller('PURDPatnerCtrl', function ($scope, $http, $location,$state, $stateParams, $modal){

	$scope.InfoUser = function(id){
       $location.path('/dashboard/partner/info/' + id);
    };

    $scope.editUser = function(id){ 
        $location.path('/dashboard/partner/info/' + id + '/edit');
    };

    $scope.performanceUser = function(id){
       
        $location.path('/dashboard/partner/info/' + id + '/performance');
    };

    $scope.items = ['item1', 'item2', 'item3'];
	
    //get country name
    $scope.countries = {}
    var countriesView = function(){
        $http.get('/countriesview').success(function(response){
            if(response.success){
               $scope.countries = response.data; 
            }
        });
    }; 
    countriesView();
    $scope.openCountry = function (size) {
        var CountKey = $scope.users.country;
        if(CountKey === 'cok'){ 
            $modal.open({
                templateUrl: 'views/particles/country/country_master.html',
                controller: 'countryCtrl',
                size: size,
                resolve:{
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
    };

    //get state name 
    $scope.state = {};
    var stateview = function(){
        $http.get('/statesview').success(function(response){
            if(response.success){
                $scope.state = response.data; 
            }
        });
    };
    stateview();
    $scope.openState = function (size){
        var StateKey = $scope.users.state;
        if(StateKey === 'sk'){ 
            $modal.open({
                templateUrl: 'views/particles/state/state_master.html',
                controller: 'stateCtrl',
                size: size,
                resolve:{
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
    };
    
    //Get city name 
    $scope.city = {}
    var cityView = function(){
        $http.get('/cityView').success(function(response){
            if(response.success){
                $scope.city = response.data; 
            }
        });
    };
    cityView();
    $scope.openCity = function (size) {
        var CityKey = $scope.users.city;
        if(CityKey === 'ck'){
            $modal.open({
                templateUrl: 'views/particles/city/city_master.html',
                controller: 'cityCtrl',
                size: size,
                resolve:{
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
    };

    var getUserData = function(){
        $http.get('/viewUser/' + $stateParams.id).success(function(response){
            if(response.success){
                $scope.users = response.data;
                var conid = $scope.users.country;
                var sid = $scope.users.state;
                var cid = $scope.users.city;
                $http.get('/countryDetail/' + conid).success(function(response){
                    $scope.countryName = response.data.country;
                    console.log($scope.countryName)
                    $http.get('/stateDetail/' + sid).success(function(response){
                        $scope.stateName = response.data.stateName;
                        console.log($scope.stateName)
                        $http.get('/cityDetail/' + cid).success(function(response){
                            $scope.cityName = response.data.cityName;
                            console.log($scope.cityName)
                        })
                    })
                })
                
                if($scope.users.activate == true){
                    $scope.users.active = "Active";
                }else{
                    $scope.users.active = "Deactive";
                }
            }else{

            }
        });
    };

    getUserData();
    $scope.uploadImage = function(){
        var file = $scope.myFile;
        //console.log($scope.myFile);
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/uploadFile', fd, { transFormRequest: angular.identity, headers: {'Content-Type': undefined} 
            }).success(function(response){ 
            	$scope.users.user_img = response.filename;
                //console.log($scope.users.user_img);
            }).error(function(){
        });
    };
    $scope.users = {};
    $scope.updateUser = function(valid, regForm){
        if(valid){
            $http.put('/editUser/' + $scope.users._id, $scope.users).success(function(response){
                if(response.success){
                    $scope.successMsg = response.message;
                    $location.path('/dashboard/partner/info/' + $scope.users._id);
                }else{
                    $scope.errorMsg = response.message;
                }
            });
        }else{
            $scope.errorMsg= "Please ensure from is filled our properly";
        }
    };

    $scope.cancel = function(){
       $location.path('/dashboard/partner/info/' + $scope.users._id);
    }
})
// Custom directive to check matching passwords 
.directive('match', function() {
    return {
        restrict: 'A', // Restrict to HTML Attribute
        controller: function($scope) {
            $scope.confirmed = false; // Set matching password to false by default

            // Custom function that checks both inputs against each other               
            $scope.doConfirm = function(values) {
                // Run as a loop to continue check for each value each time key is pressed
                values.forEach(function(ele) {
                    // Check if inputs match1 and set variable in $scope
                    if ($scope.confirm == ele) {
                        $scope.confirmed = true; // If inputs match1
                    } else {
                        $scope.confirmed = false; // If inputs do not match1
                    }
                });
            };
        },

        link: function(scope, element, attrs) {

            // Grab the attribute and observe it            
            attrs.$observe('match1', function() {
                scope.matches = JSON.parse(attrs.match); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });

            // Grab confirm ng-model and watch it           
            scope.$watch('confirm', function() {
                scope.matches = JSON.parse(attrs.match1); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });
        }
    };
})