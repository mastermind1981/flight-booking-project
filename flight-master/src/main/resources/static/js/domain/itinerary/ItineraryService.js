angular.module('app').service('ItineraryService', ['$http', function($http) {
	
	this.createItinerary = function(username, password) {
		
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
		
		return $http.post('itinerary/create', data, config).then(function(data){return data.data});
		
	};
	
	this.addFlightToItinerary = function(origin, destination, flightTime, offset, itinerary, user){
		
		var data = {
			    "requestData" :{
			        "origin": origin,
			        "destination": destination,
			        "flightTime": flightTime,
			        "offSet": offset,
			        "itineraryId": itinerary,
			        "userId": user
			      }
			};
		
		var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            };
		
		return $http.post('itinerary/add', data, config).then(function(data){return data.data});
		
	};
	
	this.getItineraries = function(id){
		return $http.get('itinerary/user/' + id).then(function(data){
				return data.data.responseData.sort(function(a,b){
					 return a.bookedDate - b.bookedDate * -1;
				}).sort(function(a,b){
					 return b.bookedDate - a.bookedDate;
				}).map(function(current){
					current.bookedDate = new Date(current.bookedDate).toString();
					return current;
				});
			});
	};
	
	this.getItinerary = function(id){
		return $http.get('itinerary/' + id).then(function(data){return data.data.responseData});
	};
	
	
}])