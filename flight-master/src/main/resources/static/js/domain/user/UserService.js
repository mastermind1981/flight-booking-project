angular.module('app').service('UserService', ['$http', function($http) {
	
	this.security = 
		{
			isLoggedIn: false,
			role: "user"
		};
	
	this.loginUser = function(username, password) {
		
		var data = {
			    "requestData" :{
			        "username": username,
			        "password": password
			    }
			};
		
		var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }
		
		return $http.post('user/login', data, config).then(function(data){return data.data});
		
	};
	
	this.createUser = function(username, password) {
			
			var data = {
				    "requestData" :{
				        "username": username,
				        "password": password
				    }
				};
			
			var config = {
	                headers : {
	                    'Content-Type': 'application/json;charset=utf-8;'
	                }
	            }
			
			return $http.post('user/create', data, config).then(function(data){return data.data});
			
		};
	
	
}])