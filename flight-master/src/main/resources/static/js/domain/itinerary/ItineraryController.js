angular.module('app').controller("ItineraryController", ["$routeParams", "$localStorage", "$window", "ItineraryService", function($routeParams, $localStorage, $window, ItineraryService) {
	
	var ctrl = this;
	
	ctrl.$storage = $localStorage;
	
	ctrl.logout = function(){
		$localStorage.loggedIn = false;
		$localStorage.username = undefined;
		$localStorage.userId = undefined;
		ctrl.$storage = $localStorage;
		$window.location = "#/home";
	}
	
	ItineraryService.getItineraries($routeParams.id).then(function(data){
		
		var result = data;
	
		try{
		
		result.forEach(function(current){
			
			current["totalFlightTime"] = 0;
			current["totalLayoverTime"] = 0;
			current.userFlights.sort(function(a,b){
				 return a.offSet - b.offSet;
			});
				
			for(var i = 0; i < current.userFlights.length; i++){
				current["totalFlightTime"] += current.userFlights[i].flightTime;
			}
			current.userFlights.forEach(function(currentFlight){
				
				currentFlight["arrivalTime"] = currentFlight.flightTime + currentFlight.offSet;
				
			});
			if(current.userFlights.length == 1){
				current["totalLayoverTime"] = 0;
			}else{
				current["totalLayoverTime"] = current.userFlights[1].offSet - current.userFlights[0].arrivalTime
				
			}
		});
		}catch(err){
			console.log(err);
		}
		
		ctrl.itineraries = result;
		
	})
	
	ctrl.detail = function(itineraryId){
		$window.location = "#/home/user/" + $routeParams.id + "/itinerary/" + itineraryId;
	}

}]);