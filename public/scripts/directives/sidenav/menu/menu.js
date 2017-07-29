'use strict';

angular.module('dashyAngular')
	.directive('menu',function(Auth, $location, User, $timeout){
		return {
	        templateUrl:'scripts/directives/sidenav/menu/menu.html?v='+window.app_version,
	        restrict: 'E',
	        replace: true,
        	controller: function($scope){

	        	$scope.selectedMenu = 'dashboard';
				$scope.showingSubNav = 0;

				$scope.showSubNav = function(x){
					if(x==$scope.showingSubNav)
						$scope.showingSubNav = 0;
					else
						$scope.showingSubNav = x;
				};
                $scope.showingSubNav1 = 0;

                $scope.showSubNav1 = function(y){
                    if(y==$scope.showingSubNav1)
                        $scope.showingSubNav1 = 0;
                    else
                        $scope.showingSubNav1 = y;
                };	

				if(Auth.isLoggedIn()){
        	        //console.log('success: User is logged in.');
        	        Auth.getUser().then(function(data){
        		   // console.log(data.data.user_name);
        		    $scope.User_Name = data.data.user_name;
        		    /*User.getPermission().then(function(response){
        		    	console.log(response);
        		    	$scope.name = response.data.data.name;
        		    })*/

        	    });
                }else{
        	        console.log('Failure: User is NOT logged in.');
                }

                // come from script/services/authService.js
               $scope.logout = function(){
                   User.getPermission().then(function(response){
                        //console.log(response);
                        var permission = response.data.data.permission;
                        console.log(permission)
                        if(permission == 'Admin'){
                            console.log('Admin');
                            Auth.logout();
                            $timeout(function(){
                                $location.path('/boxed/admin/login');
                            }, 500);
                        }else if(permission == 'Partner'){
                            console.log('Patner');
                            //$location.path('/boxed/partner/login');
                            Auth.logout();                            
                            $timeout(function(){
                              $location.path('/boxed/partner/login');
                            }, 500);
                        }else if(permission == 'Consumer'){
                            console.log('Consumer');
                            Auth.logout();
                            $timeout(function(){
                                $location.path('/login');
                            }, 500);
                        }else{
                            Auth.logout();
                            $timeout(function(){
                                $location.path('/login');
                            }, 500);
                        }
                    })    
                }; 			
	        },
    	}
	});