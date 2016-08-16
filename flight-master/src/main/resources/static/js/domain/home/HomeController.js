angular.module('app').controller('HomeController', ['$window', '$localStorage', '$interval', 'UserService', 'FlightService', function($window, $localStorage, $interval, UserService, FlightService){
	
	
	var ctrl = this;
	
	var mapLocations = new Object();
	
	ctrl.$storage = $localStorage;
	
	var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 27.6648, lng: -81.5158}
      });
	
	var jacksonville = new google.maps.Marker({
        map: map,
        position: {lat: 30.3322, lng: -81.6557}
      });

	var miami = new google.maps.Marker({
	    map: map,
	    position: {lat: 25.7617, lng: -80.1918}
	  });
	
	var tallahassee = new google.maps.Marker({
		map: map,
		position: {lat: 30.4383, lng: -84.2807}
	});
	
	ctrl.user = {
			"username": "",
			"password": ""
	};

	ctrl.login = function(){
		UserService.loginUser(ctrl.user.username, ctrl.user.password)
			.then(function(data){
				if(!data.error){
					//alert(data.message);
					$localStorage.username = data.responseData.username;
					$localStorage.userId = data.responseData.id;
					$localStorage.loggedIn = true;
					ctrl.$storage = $localStorage;
					$window.location = "#/home/user/" + data.responseData.id;
				}else{
					alert(data.message);
					
				}
			
			});
	};
	
	ctrl.signUp = function(){
		UserService.createUser(ctrl.user.username, ctrl.user.password)
			.then(function(data){
				if(!data.error){
					alert(data.message);
					//$window.location = "#/home/user/" + data.responseData.id;
				}else{
					alert(data.message);
					
				}
			
			});
	};
	
	ctrl.findFlights = function(){
		if(!$localStorage.loggedIn){
			alert("You must be logged in to find flights.")
		}else{
			$window.location = "#/home/user/" + $localStorage.userId;
		}
	};
	
	
	ctrl.logout = function(){
		$localStorage.loggedIn = false;
		$localStorage.username = undefined;
		$localStorage.userId = undefined;
		ctrl.$storage = $localStorage;
	}

	FlightService.getFlights().then(function(data){
		//alert(JSON.stringify(data.data));
		ctrl.flights = data.data;
		
	});
	
	
	
	ctrl.getLocationsFromService = function(){
		FlightService.getLocations().then(function(data){
		
			//alert(JSON.stringify(data));
			ctrl.locations = data.data.responseData;
			populateMapLocations(data.data.responseData);
		
		});
	};
	ctrl.getLocationsFromService();
	//$interval(ctrl.getLocationsFromService, 1000);
	
	var populateMapLocations = function(locations){
		//alert(JSON.stringify(locations));
		locations.forEach(function(currentLocation){
			//alert(JSON.stringify(currentLocation));
			 
			//alert(JSON.stringify(newlocation));
			mapLocations[currentLocation.city] = new google.maps.Marker({
				map: document.getElementById("map"),
				position: {
					lat: currentLocation.latitude,
					lng: currentLocation.longitude
				} 
			});
			//alert(JSON.stringify(mapLocations));
			
		});
		//alert(JSON.stringify(mapLocations));
		
	}
	
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
	
	ctrl.addPoly(jacksonville, miami, '#CC0099');
    
    ctrl.addPoly(miami, tallahassee, '#AA1100');
	
    FlightService.getMarkerByCityName(map, "Orlando").then(function(marker) {
		ctrl.addPoly(tallahassee, marker, '#FF3388');
	});
    
    
}]);