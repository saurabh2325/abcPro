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
.controller('ProfileCtrl', function ($scope, $http, $location, $state, User) {
     
    $scope.profileData ={};
    var getUserData = function(){
      User.getPermission().then(function(response){
        $scope.profileData = response.data.data
        var conid = $scope.profileData.country; 
        var sid = $scope.profileData.state;
        var cid = $scope.profileData.city;
        $http.get('/cityDetail/' + cid).success(function(response){
          $scope.city = response.data.cityName 
          //console.log($scope.city);
        })
        $http.get('/stateDetail/' + sid).success(function(response){
          $scope.state = response.data.stateName
          //console.log($scope.state);
        })
        $http.get('/countryDetail/' + conid).success(function(response){
          $scope.country = response.data.country
          //console.log($scope.country);
        }); //console.log($scope.profileData);
      });
    };
  getUserData();

  $scope.editUser = function(id){
    $location.path('/dashboard/profile/' + id + '/edit'); 
  };

})
.controller('profileEditCtrl', function ($scope, $http, $location, $state, $stateParams, $modal, Auth, User) { 
  $scope.actPer = false; 
  if(Auth.isLoggedIn()){
    User.getPermission().then(function(response){
      var permission = response.data.data.permission;
      if(permission == 'Admin'){
        $scope.actPer = true;  
      }else if(permission == 'Partner'){
        $scope.actPer = false;  
      }else if(permission == 'Consumer'){
        console.log('Consumer')
        $scope.actPer = false;      
      }
    })
  }

  $scope.cancel = function() {
    $location.path('/dashboard/profile');
  };

  $scope.items = ['item1', 'item2', 'item3'];
   
   //get country name
  $scope.countries = {}
  var countriesView = function(){
    $http.get('/countriesview').success(function(response){
        //console.log('i got the data requested of countries.')
        $scope.countries = response.data ;
        // console.log($scope.countries);
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
      //console.log('state list request');
      $scope.state = response.data;
      //console.log($scope.state);
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
            //console.log('City list request');
          $scope.city = response.data;
            //console.log($scope.city);
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
      $scope.users = response.data;
      console.log($scope.users);
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
  $scope.updateUser = function(valid){
    if(valid){
      $http.put('/editUser/' + $stateParams.id, $scope.users).success(function(response){
        if(response.success){
          $scope.successMsg = response.message;
          $location.path('/dashboard/profile');
        }else{
          $scope.errorMsg = response.message;
        }  
      });
    }else{
      $scope.errorMsg = "Please ensure from is filled our properly";
    }
  };
})
// Custom directive to check matching passwords 
.directive('match1', function() {
    return {
        restrict: 'A', // Restrict to HTML Attribute
        controller: function($scope) {
            $scope.confirmed = false; // Set matching password to false by default

            // Custom function that checks both inputs against each other               
            $scope.doConfirm = function(values) {
                // Run as a loop to continue check for each value each time key is pressed
                values.forEach(function(ele) {
                    // Check if inputs match and set variable in $scope
                    if ($scope.confirm == ele) {
                        $scope.confirmed = true; // If inputs match
                    } else {
                        $scope.confirmed = false; // If inputs do not match
                    }
                });
            };
        },

        link: function(scope, element, attrs) {

            // Grab the attribute and observe it            
            attrs.$observe('match1', function() {
                scope.matches = JSON.parse(attrs.match1); // Parse to JSON
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



