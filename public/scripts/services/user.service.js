
'use strict';
angular.module('userServices', [])
.factory('User', function($http){
	var userFactory ={};

	userFactory.create = function(users){
		return $http.post('/newUser', users);
	}

	/*userFactory.checkUsername = function(users){
		return $http.post('/checkUsername', users);
	}
	userFactory.checkEmail = function(users){
		return $http.post('/checkEmail', users);
	}*/
     
     // User.activateAccount(token);    
	userFactory.activateAccount = function(token){
		return $http.put('/activate/'+ token);
	}
	
	userFactory.checkCredentials = function(resendData){
		return $http.post('/resend', resendData);
	}
	userFactory.resendActivationLink = function(user_name){
		return $http.put('/resend', user_name);
	}
	userFactory.getPermission = function(user_name){
		return $http.get('/permission', user_name);
	}
	return userFactory;
});
	