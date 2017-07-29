'use strict';
angular.module('dashyAngular').controller('signupCtrl', function ($scope, $log, $http, $timeout, $location, User, $stateParams) {

    $scope.users = {};
    $scope.users.permission = "Consumer" ;
      
    /*---------------- This Code use for save data from data base-------------------*/

  $scope.submit = function(valid){
    //console.log($scope.users);
    $scope.errorMsg = false;
    $scope.loading = true;
    if(valid){
      User.create($scope.users).success(function(response){
        if(response.success){
          // $scope.loading = false;
          //console.log(response.message);
          $scope.successMsg = response.message;
          $scope.users = {};
          /*$timeout(function(){
              $location.path('/login'); 
          }, 2000); */ 
        }else{
          $scope.loading = false;
          $scope.errorMsg = response.message;
        } 
      });
    }else{
    $scope.loading = false;
    $scope.errorMsg= "Please ensure from is filled our properly";
    }  
  };
  
  $scope.resetPassword = function(valid){

    $scope.errorMsg = false;
    if(valid){
      $http.put('/resetPassword/' + $stateParams.resettoken, $scope.users).success(function(response){
        if(response.success){
          $scope.successMsg = response.message;
          $scope.users = {};
          $timeout(function(){
              $location.path('/login'); 
          }, 2000);  
        }else{
          $scope.loading = false;
          $scope.errorMsg = response.message;
        }
      });
    }else{
      $scope.errorMsg= "Please ensure from is filled our properly";
    }      
  };
    
  /*$scope.CheckUserName = function(){
    User.checkUsername($scope.users).success(function(response){
      //$scope.CheckUserName = true;
      $scope.usernameMsg = false;
      $scope.usernameInvalid = false;
      console.log(response);

      if(response.success){
        //$scope.CheckUserName = false;
        $scope.usernameInvalid = false;
        $scope.usernameMsg = response.message;
      }else{
        //$scope.CheckUserName = false;
        $scope.usernameInvalid = true;
        $scope.usernameMsg = response.message;
      }
    });
  };*/

  /*$scope.CheckEmail = function(){
    User.checkEmail($scope.users).success(function(response){
      $scope.CheckEmail = true;
      $scope.emailMsg = false;
      $scope.emailInvalid = false;
      console.log(response);

      if(response.success){
        $scope.CheckEmail = false;
        $scope.emailInvalid = false;
        $scope.emailMsg = response.message;
      }else{
        $scope.CheckEmail = false;
        $scope.emailInvalid = true;
        $scope.emailMsg = response.message;
      }
    });
  };
*/
  /*---------------- End-------------------*/
})
'use strict';
angular.module('dashyAngular').controller('newsignupCtrl', function ($scope, $log, $http, $timeout, $location, User, $stateParams){
    $scope.users = {};
    $scope.users.permission = "Consumer" ;

    $scope.submit = function(valid){
    //console.log($scope.users);
    $scope.errorMsg = false;
    $scope.loading = true;
    console.log($stateParams.newuser);
    if(valid){
      $http.post('/newUserSignup/'+ $stateParams.newuser, $scope.users).success(function(response){
        if(response.success){
          // $scope.loading = false;
          //console.log(response.message);
          $scope.successMsg = response.message;
          $scope.users = {};
          $timeout(function(){
              $location.path('/login'); 
          }, 2000);  
        }else{
          $scope.loading = false;
          $scope.errorMsg = response.message;
        } 
      });
    }else{
    $scope.loading = false;
    $scope.errorMsg= "Please ensure from is filled our properly";
    } 
  };
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
            attrs.$observe('match', function() {
                scope.matches = JSON.parse(attrs.match); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });

            // Grab confirm ng-model and watch it           
            scope.$watch('confirm', function() {
                scope.matches = JSON.parse(attrs.match); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });
        }
    };
})
  // Controller: facebookCtrl is used finalize facebook login
.controller('facebookCtrl', function($stateParams, Auth, $location, $scope, $window){
  //console.log($stateParams.tokan);
  if($window.location.pathname == '/facebookError'){
    $scope.errorMsg = "facebook e-mail not find in database";
  }else{
    Auth.facebook($stateParams.tokan);
    $location.path('/dashboard')
  } 
})
  // Controller: twitterCtrl is used finalize twitter login
.controller('twitterCtrl', function($stateParams, Auth, $location, $scope, $window){
  //console.log($stateParams.tokan);
  if($window.location.pathname == '/twitterError'){
    $scope.errorMsg = "Twitter e-mail not find in database";
  }else{
    Auth.facebook($stateParams.tokan);
    $location.path('/dashboard')
  } 
})
  // Controller: twitterCtrl is used finalize twitter login
.controller('googleCtrl', function($stateParams, Auth, $location, $scope, $window){
  //console.log($stateParams.tokan);
  if($window.location.pathname == '/googleError'){
    $scope.errorMsg = "Google e-mail not find in database";
  }else{
    Auth.facebook($stateParams.tokan);
    $location.path('/dashboard')
  } 
});
