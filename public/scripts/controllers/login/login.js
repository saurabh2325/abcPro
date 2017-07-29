
'use strict';
angular.module('dashyAngular')
 .controller('mainCtrl', function($scope, $log, $http, $timeout, Auth, $location, $rootScope, AuthToken, $window, $interval, $modal, User, $state) {
        /*$scope.menuToggle = function  () {
              $('body').toggleClass('menu-hidden');
        }*/       
        $scope.checkSession = function(){
          console.log()
          if(Auth.isLoggedIn()){
            $scope.checkingSession = true;
            var token = $window.localStorage.getItem('token');
            self.parseJwt = function(token){
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              return JSON.parse($window.atob(base64));
            }
            var expireTime = self.parseJwt(token);
            var timeStamp = Math.floor(Date.now() / 1000)
            var timeCheck =(expireTime.exp - timeStamp);
            /*console.log(expireTime);
            console.log(timeCheck);*/
            if(timeCheck <= 0){
              Auth.logout();
            }else{
              var interval = $interval(function(){
                var token = $window.localStorage.getItem('token');
                if(token === null){
                  $interval.cancel(interval);
                }else{
                  self.parseJwt = function(token){
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace('-', '+').replace('_', '/');
                    return JSON.parse($window.atob(base64));
                  }
                  var expireTime = self.parseJwt(token);
                  var timeStamp = Math.floor(Date.now() / 1000)
                  var timeCheck =(expireTime.exp - timeStamp);
                  /*console.log(expireTime);
                  console.log(timeCheck);*/
                  if(timeCheck < 0){
                    showModal('sm');
                    $interval.cancel(interval);
                    console.log("token has expired"); 
                  }else{  
                    console.log("token not yet expired"); 
                  }
                }
              },60000);
            }  
          }else{
            console.log("not login")
          }
        };

        $scope.checkSession();

        $scope.items = ['item1', 'item2', 'item3'];
        var showModal = function (size) {
          var modalInstance = $modal.open({
            template: 
                      '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<button ng-hide="hideButton" type="button" ng-click="endSession();" class="close" data-dismiss="modal">&times;</button>'+
                                '<!-- Modal Header -->'+
                            '<h4 class="modal-title">{{modalHeader}}</h4>'+
                        '</div>'+
                          '<!-- Modal Body -->'+
                        '<div class="modal-body">'+
                            '<p>{{modalBody}}</p>'+
                            '<div ng-show="hideButton" class="dizzy-gillespie"></div>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<!-- Modal Yes & No Buttons -->'+
                            '<button type="button" ng-hide="hideButton" ng-click="endSession();" class="btn btn-danger" data-dismiss="modal">OK</button>'+
                        '</div>'+
                      '</div>',
            controller: function($scope, $modalInstance, Auth){
               $scope.choiceMade = false;
               $scope.modalHeader = "Timeout Warning";
               $scope.modalBody ="Your session will please Login again";
               $timeout(function(){
                 if(!$scope.choiceMade){
                  logout();
                  hideModal();
                 }
               }, 4000);
               /*$scope.renewSession = function(){
                $scope.choiceMade = true;
                console.log("session has been removed");
                 hideModal();
               };*/
               $scope.endSession = function(){
                $scope.choiceMade = true;
                console.log("session has ended");
                 logout();
                 hideModal();
               };
              var hideModal = function(){
                $modalInstance.close();
               }
              var logout = function(){
                  Auth.logout();
                  $timeout(function(){
                    $location.path('/login');
                  }, 2000);
                  //console.log("logout testing");
                };
              },
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          })          
        };
        
          
        /*var showModal = function(){
          $scope.modalHeader = "Timeout Warning";
          $scope.modalBody =" Your session will expired in 5 minutes, would you like to renew your session";
          $("#myModal").modal({ backdrop: "static" }); // Open modal
        };*/
        $scope.profileData ={};
        
        $rootScope.$on('$stateChangeStart', function(){

          if(!$scope.checkingSession) $scope.checkSession();

            if(Auth.isLoggedIn()){
              $scope.isLoggedIn = true;
                //console.log('success: User is logged in.');
              Auth.getUser().then(function(data){
                
                $scope.user_name = data.data.user_name; 
                $scope.email = data.data.email;
                User.getPermission().then(function(response){

                  $scope.profileData = response.data.data;
                    //console.log("This is Profile Data:" + " " +$scope.profileData);
                    $scope.name = response.data.data.name;
                    $scope.userImage = response.data.data.user_img;
                    $scope.permission = response.data.data.permission;
                    //console.log($scope.permission);
                  if(response.data.data.permission === 'Admin'|| response.data.data.permission === 'Partner' || response.data.data.permission === 'Consumer' ){ 
                    $scope.loadme = true;
                    if(response.data.data.permission === 'Admin'){
                      $scope.authorized = true;
                      $scope.performance = true;
                      $scope.createPermission = true;
                      $scope.editPermission = true;
                      $scope.deletePermission = true;
                    }else if(response.data.data.permission === 'Partner'){
                      $scope.performance = true;
                      $scope.createPermission = true;
                      $scope.editPermission = true;
                      $scope.deletePermission = false;
                    }else if(response.data.data.permission === 'Consumer'){
                      $scope.performance = false;
                      $scope.createPermission = false;
                      $scope.editPermission = false;
                      $scope.deletePermission = false;
                    }

                  }else{
                    $scope.loadme =true;
                    $scope.authorized = false;
                  } 
                });
              });
            }else{
            //console.log('Failure: User is NOT logged in.');
               //$scope.user_name = '';
            }

            if ($location.hash() == '_=_') $location.hash(null);
        });

        $scope.facebook = function(){
          //console.log($window.location.host);
          //console.log($window.location.protocol);
          $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
        };
        
        $scope.twitter = function(){
          //console.log($window.location.host);
          //console.log($window.location.protocol);
          $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/twitter';
        };

        $scope.google = function(){
          //console.log($window.location.host);
          //console.log($window.location.protocol);
          $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google';
        };

    $scope.submit = function(loginData) {
    	$scope.errorMsg =false;
      $scope.expired = false;
    	Auth.login($scope.loginData).then(function(data){
    	    if(data.data.success){
    		    $scope.successMsg = 'redirecting...';
    		        $timeout(function(){
                      $state.go('orders');
                       //$location.path('/dashboard/orders');
                       $scope.loginData = '';
                    }, 2000);
                /*console.log("token :" + data.data.token)*/
    	    }else{
            if(data.data.expired){
              $scope.expired = true;
              $scope.errorMsg = data.data.message;


            }else{
              $scope.errorMsg = data.data.message;
              $scope.loginData = {};
            }
    		    
    	    }
    	});
    };
});