angular.module('app').controller("ItineraryDetailController", ["$routeParams", "$localStorage", "$window", "ItineraryService", "FlightService", 
                                                               function($routeParams, $localStorage, $window, ItineraryService, FlightService) {
	
	var ctrl = this;
	
	ctrl.$storage = $localStorage;
	
	var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 27.6648, lng: -81.5158}
      });
	
	ctrl.addPoly = function addPoly(pointA, pointB, color) {
	    
		geodesicPoly = new google.maps.Polyline({
	        strokeColor: color,
	        strokeOpacity: 1.0,
	        strokeWeight: 3,
	        geodesic: true,
	        map: map
	      });
		
		geodesicPoly.setPath([pointA.getPosition(), pointB.getPosition()]);
	}
	
	ctrl.logout = function(){
		$localStorage.loggedIn = false;
		$localStorage.username = undefined;
		$localStorage.userId = undefined;
		ctrl.$storage = $localStorage;
		$window.location = "#/home";
	}
	
	ctrl.getRandomColor = function() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	};
	
	ItineraryService.getItinerary($routeParams.itineraryId).then(function(data){
		
		var current = data;
		current.bookedDate = new Date(current.bookedDate).toString();
		current["totalFlightTime"] = 0;
		current["totalLayoverTime"] = 0;
			/*current.userFlights.reduce(function(prev, curr){
			//alert(curr.flightTime);
			return prev.flightTime + +curr.flightTime;
		}, {flightTime: 0});*/
		for(var i = 0; i < current.userFlights.length; i++){
			current["totalFlightTime"] += current.userFlights[i].flightTime;
		}
		current.userFlights.forEach(function(currentFlight){
			//alert(JSON.stringify(current));
			currentFlight["arrivalTime"] = currentFlight.flightTime + currentFlight.offSet;
			
		});
		if(current.userFlights.length == 1){
			current["totalLayoverTime"] = 0;
		}else{
			current["totalLayoverTime"] = current.userFlights[1].offSet - current.userFlights[0].arrivalTime
			/*
			for(var i = 0; i < current.userFlights.length; i++){
				if(current.userFlights[i].offSet > current.userFlights[i].arrivalTime){
					current["totalLayoverTime"] += current.userFlights[i].offSet - current.userFlights[i].arrivalTime;
				}
			}
			*/
		}
		
		ctrl.itinerary = current;
		
		ctrl.itinerary.userFlights.forEach(function(current){
			//alert(JSON.stringify(current));
			var markerOrigin;
			var markerDestination;
			FlightService.getMarkerByCityName(map, current.origin.city)
				.then(function(marker) {
					
					//alert(JSON.stringify(markerOrigin));
					markerOrigin = marker;
					
					return FlightService.getMarkerByCityName(map, current.destination.city);
				})
					.then(function(marker){
						markerDestination = marker;
						ctrl.addPoly(markerOrigin, marker, ctrl.getRandomColor());
					});
			
		});
		
		
		
	})
	
	
	
	

}]);