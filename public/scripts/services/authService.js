'use strict';
angular.module('authServices', [])

.factory('Auth', function($http, AuthToken) {
    var authFactory = {};

    //Auth.create(loginData);
    authFactory.login = function(loginData){
    	//console.log(loginData);
  	    return $http.post('/authentication', loginData).then(function(data){
  	    	//console.log(data.data.token);
			AuthToken.setToken(data.data.token);
			return data;
  	    });
    };

    // AuthToken.getToken();
	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken()){
			return true;
		}else{
			return false;
		}	
	};
	//Auth.facebook(token);
	authFactory.facebook = function(token){
		AuthToken.setToken(token);
	};

	//Auth.getUser();
	authFactory.getUser = function(){
		var usertoken = AuthToken.getToken();
        //console.log("this is testing token:"+ "" + AuthToken.getToken());
          //console.log("this is testing token" + usertoken);
		if(usertoken){
			return $http.post('/me');
		}else{
			$q.reject({message:'User has no token'});
		}
	};

	//Auth.logout(); , this service create for distroy token and logout
	authFactory.logout = function(){
       AuthToken.setToken();
	};

    return authFactory ;	
})
.factory('AuthToken', function($window){
	var authTokenFactory = {};

	//AuthToken.setToken(token)
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token', token);
		}else{
			$window.localStorage.removeItem('token');
		}	
	};

	//AuthToken.getToken();
    authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};
	return authTokenFactory;

}).factory('AuthInterceptors', function(AuthToken){
	var authInterceptorFactory = {};

    authInterceptorFactory.request = function(config){
    	var token = AuthToken.getToken();

    	if(token){
    	config.headers['x-access-token'] = token;
    	//console.log('get token from x-access' + token);
    	//console.log(config);
        }
    	
    	return config;
    };
    return authInterceptorFactory;

});